import { useEffect, useRef, useState } from 'react'
import { PaperPlaneRight, ChatCircleDots, Trash } from '@phosphor-icons/react'
import PageHeader from '../components/PageHeader'
import { useChatHistory } from '../hooks/useChatHistory'

export default function ChatPage() {
  const { messages, addMessage, clear } = useChatHistory()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const listEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return
    setError(null)
    setInput('')
    const nextMessages = [...messages, { role: 'user' as const, content: text }]
    addMessage({ role: 'user', content: text })
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.error ?? `Error ${res.status}`)
      }
      addMessage({ role: 'assistant', content: data.reply })
    } catch (err) {
      const detail = err instanceof Error ? err.message : ''
      setError(
        detail
          ? `No se ha podido enviar el mensaje: ${detail}`
          : 'No se ha podido enviar el mensaje. Comprueba tu conexión e inténtalo de nuevo.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader title="Chat" subtitle="Pregunta sobre tu plan de alimentación" />

      <div className="flex items-center justify-between gap-3 px-5 pb-2">
        <p className="text-[13px] leading-snug text-(--color-ink-soft)">
          Responde según tu plan. Para temas médicos, consulta a tu nutricionista.
        </p>
        {messages.length > 0 && (
          <button
            onClick={clear}
            className="tap inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-(--color-clay-600) active:scale-[0.96]"
          >
            <Trash size={14} weight="bold" /> Borrar
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5">
        {messages.length === 0 && (
          <div className="mt-2 flex flex-col items-center rounded-3xl bg-white p-6 text-center shadow-card">
            <span className="mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-(--color-leaf-50) text-(--color-leaf-600)">
              <ChatCircleDots size={28} weight="fill" />
            </span>
            <p className="text-[17px] font-semibold text-(--color-ink)">Hola Maria 👋</p>
            <p className="mt-1 leading-snug text-(--color-ink-soft)">
              Pregúntame cosas como "¿Puedo comer manzana?", "¿Qué toca hoy de cena?" o "Dame una receta para la
              merienda".
            </p>
          </div>
        )}
        <ul className="flex flex-col gap-2.5 pb-3 pt-1">
          {messages.map((m, i) => (
            <li key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap px-4 py-2.5 text-[16px] leading-snug shadow-card ${
                  m.role === 'user'
                    ? 'rounded-3xl rounded-br-lg bg-(--color-leaf-500) text-white'
                    : 'rounded-3xl rounded-bl-lg bg-white text-(--color-ink)'
                }`}
              >
                {m.content}
              </div>
            </li>
          ))}
          {loading && (
            <li className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-3xl rounded-bl-lg bg-white px-4 py-3.5 shadow-card">
                <span className="typing-dot h-2 w-2 rounded-full bg-(--color-graphite-400)" />
                <span className="typing-dot h-2 w-2 rounded-full bg-(--color-graphite-400)" />
                <span className="typing-dot h-2 w-2 rounded-full bg-(--color-graphite-400)" />
              </div>
            </li>
          )}
        </ul>
        {error && (
          <p role="alert" className="pb-2 text-[14px] font-semibold text-(--color-clay-600)">
            {error}
          </p>
        )}
        <div ref={listEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage()
        }}
        className="glass flex shrink-0 items-center gap-2 border-t border-black/5 px-5 py-3"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)' }}
      >
        <label htmlFor="chat-input" className="sr-only">
          Tu pregunta
        </label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta…"
          className="min-w-0 flex-1 rounded-full border-2 border-(--color-cream-dark) bg-white px-4 py-2.5 text-[16px] outline-none transition-colors focus:border-(--color-leaf-500) focus:ring-4 focus:ring-(--color-leaf-100)"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Enviar"
          className="tap grid h-11 w-11 shrink-0 place-items-center rounded-full bg-(--color-leaf-500) text-white active:scale-[0.92] disabled:opacity-40"
        >
          <PaperPlaneRight size={20} weight="fill" />
        </button>
      </form>
    </div>
  )
}
