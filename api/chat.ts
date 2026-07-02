import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from './_dietContext'

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

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), {
      status: 405,
      headers: { 'content-type': 'application/json' },
    })
  }

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

  try {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages: trimmedMessages.map((m) => ({ role: m.role, content: m.content })),
    })

    if (response.stop_reason === 'refusal') {
      return new Response(
        JSON.stringify({
          reply: 'No puedo responder a eso. Si tienes dudas sobre tu salud, consulta con tu nutricionista.',
        }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      )
    }

    const textBlock = response.content.find((b) => b.type === 'text')
    const reply = textBlock && textBlock.type === 'text' ? textBlock.text : ''

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (error) {
    console.error('Anthropic API error', error)
    return new Response(
      JSON.stringify({ error: 'No se ha podido contactar con el asistente. Inténtalo de nuevo en un momento.' }),
      { status: 502, headers: { 'content-type': 'application/json' } },
    )
  }
}
