import { useEffect, useRef, useState } from 'react'
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

      <div className="flex items-center justify-between px-5 pb-2">
        <p className="text-xs text-(--color-ink-soft)">
          Responde según tu plan. Para temas médicos, consulta a tu nutricionista.
        </p>
        {messages.length > 0 && (
          <button onClick={clear} className="shrink-0 text-xs font-semibold text-(--color-clay-600) underline">
            Borrar chat
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5">
        {messages.length === 0 && (
          <div className="mb-3 rounded-2xl bg-white p-4 text-(--color-ink-soft) shadow-card">
            Hola Maria 👋 Puedes preguntarme cosas como "¿Puedo comer manzana?", "¿Qué toca hoy de cena?" o "Dame
            una receta para la merienda".
          </div>
        )}
        <ul className="flex flex-col gap-3 pb-3">
          {messages.map((m, i) => (
            <li key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 shadow-card ${
                  m.role === 'user' ? 'bg-(--color-leaf-500) text-white' : 'bg-white text-(--color-ink)'
                }`}
              >
                {m.content}
              </div>
            </li>
          ))}
          {loading && (
            <li className="flex justify-start">
              <div className="rounded-2xl bg-white px-4 py-2.5 text-(--color-ink-soft) shadow-card">Escribiendo…</div>
            </li>
          )}
        </ul>
        {error && (
          <p role="alert" className="pb-2 text-sm font-semibold text-(--color-clay-600)">
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
        className="flex shrink-0 gap-2 border-t border-(--color-cream-dark) bg-(--color-cream) px-5 py-3"
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
          className="flex-1 rounded-2xl border-2 border-(--color-cream-dark) bg-white px-4 py-2.5 text-base outline-none focus:border-(--color-leaf-500) focus:ring-4 focus:ring-(--color-leaf-100)"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="tap rounded-2xl bg-(--color-leaf-500) px-5 py-2.5 font-bold text-white active:scale-[0.97] disabled:opacity-40"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
