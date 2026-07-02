import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from './_dietContext.js'

export const config = { runtime: 'nodejs' }

const MAX_MESSAGES = 20
const MAX_MESSAGE_LENGTH = 2000

// ~5MB decoded; base64 is ~4/3 the byte size, so cap the string a bit higher.
const MAX_IMAGE_BASE64 = 7_000_000
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const
type ImageMediaType = (typeof ALLOWED_IMAGE_TYPES)[number]

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ImagePayload {
  media_type: ImageMediaType
  data: string
}

function isValidMessage(m: unknown): m is ChatMessage {
  if (typeof m !== 'object' || m === null) return false
  const candidate = m as Record<string, unknown>
  return (
    (candidate.role === 'user' || candidate.role === 'assistant') &&
    typeof candidate.content === 'string' &&
    candidate.content.length > 0 &&
    candidate.content.length <= MAX_MESSAGE_LENGTH
  )
}

function isValidImage(v: unknown): v is ImagePayload {
  if (typeof v !== 'object' || v === null) return false
  const c = v as Record<string, unknown>
  return (
    typeof c.media_type === 'string' &&
    (ALLOWED_IMAGE_TYPES as readonly string[]).includes(c.media_type) &&
    typeof c.data === 'string' &&
    c.data.length > 0 &&
    c.data.length <= MAX_IMAGE_BASE64
  )
}

// Named HTTP method export uses Vercel's Web `fetch`-style signature, so the
// returned `Response` (incl. the streaming body) is actually sent. A `default`
// export is treated as the Node `(req, res)` handler and its return is ignored.
export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'El chat no está configurado todavía (falta la clave de la API).' }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Solicitud inválida' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const messages = (body as { messages?: unknown })?.messages
  if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isValidMessage)) {
    return new Response(JSON.stringify({ error: 'Formato de mensajes inválido' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const rawImage = (body as { image?: unknown })?.image
  if (rawImage !== undefined && !isValidImage(rawImage)) {
    return new Response(JSON.stringify({ error: 'Imagen inválida' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }
  const image = rawImage as ImagePayload | undefined

  const trimmedMessages = (messages as ChatMessage[]).slice(-MAX_MESSAGES)

  // Attach the photo (if any) to the most recent user message as an image block.
  const apiMessages: Anthropic.MessageParam[] = trimmedMessages.map((m) => ({ role: m.role, content: m.content }))
  const last = apiMessages[apiMessages.length - 1]
  if (image && last && last.role === 'user') {
    last.content = [
      { type: 'image', source: { type: 'base64', media_type: image.media_type, data: image.data } },
      { type: 'text', text: typeof last.content === 'string' ? last.content : '' },
    ]
  }

  const anthropic = new Anthropic({ apiKey })
  const REFUSAL_TEXT = 'No puedo responder a eso. Si tienes dudas sobre tu salud, consulta con tu nutricionista.'

  try {
    // Text chat runs on Haiku 4.5 (fastest). Photo analysis runs on Sonnet 5,
    // which reads menus/dishes more accurately. Streaming shows text in ~1s either way.
    const llmStream = anthropic.messages.stream({
      model: image ? 'claude-sonnet-5' : 'claude-haiku-4-5',
      max_tokens: image ? 1500 : 1024,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: apiMessages,
    })

    const encoder = new TextEncoder()
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          let emittedAny = false
          for await (const event of llmStream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              emittedAny = true
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
          const final = await llmStream.finalMessage()
          if (!emittedAny && final.stop_reason === 'refusal') {
            controller.enqueue(encoder.encode(REFUSAL_TEXT))
          }
          controller.close()
        } catch (error) {
          console.error('Anthropic API error', error)
          controller.error(error)
        }
      },
    })

    return new Response(body, {
      status: 200,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Anthropic API error', error)
    return new Response(
      JSON.stringify({ error: 'No se ha podido contactar con el asistente. Inténtalo de nuevo en un momento.' }),
      { status: 502, headers: { 'content-type': 'application/json' } },
    )
  }
}
