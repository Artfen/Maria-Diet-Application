import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from './_dietContext.js'

export const config = { runtime: 'nodejs' }

const MAX_MESSAGES = 20
const MAX_MESSAGE_LENGTH = 2000

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
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

  const trimmedMessages = (messages as ChatMessage[]).slice(-MAX_MESSAGES)

  const anthropic = new Anthropic({ apiKey })
  const REFUSAL_TEXT = 'No puedo responder a eso. Si tienes dudas sobre tu salud, consulta con tu nutricionista.'

  try {
    // Haiku 4.5: fastest model, more than capable for grounded diet Q&A.
    // Stream the reply so text appears in ~1s instead of after the whole answer generates.
    const llmStream = anthropic.messages.stream({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: trimmedMessages.map((m) => ({ role: m.role, content: m.content })),
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
