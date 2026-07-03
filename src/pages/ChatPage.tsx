import { useEffect, useRef, useState } from 'react'
import { PaperPlaneRight, ChatCircleDots, Trash, Camera, X } from '@phosphor-icons/react'
import PageHeader from '../components/PageHeader'
import { useChatHistory } from '../hooks/useChatHistory'

const MAX_EDGE = 1568

interface PendingImage {
  media_type: string
  data: string
  dataUrl: string
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'))
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('No se pudo cargar la imagen'))
    img.src = src
  })
}

// Downscale to a max long edge and re-encode as JPEG. Keeps uploads fast/cheap
// and converts iPhone HEIC to a format the API accepts.
async function compressImage(file: File): Promise<PendingImage> {
  const img = await loadImage(await readFileAsDataUrl(file))
  let { width, height } = img
  const longest = Math.max(width, height)
  if (longest > MAX_EDGE) {
    const scale = MAX_EDGE / longest
    width = Math.round(width * scale)
    height = Math.round(height * scale)
  }
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('No se pudo procesar la imagen')
  ctx.drawImage(img, 0, 0, width, height)
  const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
  return { media_type: 'image/jpeg', data: dataUrl.split(',')[1] ?? '', dataUrl }
}

export default function ChatPage() {
  const { messages, addMessage, clear } = useChatHistory()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [pendingImage, setPendingImage] = useState<PendingImage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const listEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading, streamingText, pendingImage])

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = '' // let the same file be picked again later
    if (!file) return
    setError(null)
    try {
      setPendingImage(await compressImage(file))
    } catch {
      setError('No se ha podido procesar la foto. Prueba con otra imagen.')
    }
  }

  async function sendMessage() {
    const text = input.trim()
    const image = pendingImage
    if ((!text && !image) || loading) return
    setError(null)
    setInput('')
    setPendingImage(null)

    const promptText =
      text ||
      'Aquí tienes una foto de un menú o un plato. Según mi plan, ¿qué me recomiendas pedir o comer, y qué debería evitar o pedir modificado?'
    const displayText = text || '📷 Foto de un menú o plato'

    const nextMessages = [...messages, { role: 'user' as const, content: promptText }]
    addMessage({ role: 'user', content: displayText })
    setLoading(true)
    setStreamingText('')

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 60_000)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(
          image
            ? { messages: nextMessages, image: { media_type: image.media_type, data: image.data } }
            : { messages: nextMessages },
        ),
        signal: controller.signal,
      })
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error ?? `Error ${res.status}`)
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setStreamingText(acc)
      }
      acc += decoder.decode()
      if (!acc.trim()) throw new Error('Respuesta vacía')
      addMessage({ role: 'assistant', content: acc })
    } catch (err) {
      const detail =
        err instanceof DOMException && err.name === 'AbortError'
          ? 'ha tardado demasiado, inténtalo de nuevo'
          : err instanceof Error
            ? err.message
            : ''
      setError(
        detail
          ? `No se ha podido enviar el mensaje: ${detail}`
          : 'No se ha podido enviar el mensaje. Comprueba tu conexión e inténtalo de nuevo.',
      )
    } finally {
      clearTimeout(timeout)
      setStreamingText('')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
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
              Pregúntame cosas como "¿Puedo comer manzana?" o "¿Qué toca hoy de cena?". También puedes tocar la
              cámara para enviarme una foto de un menú o un plato y te diré qué te recomiendo.
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
              {streamingText ? (
                <div className="max-w-[85%] whitespace-pre-wrap rounded-3xl rounded-bl-lg bg-white px-4 py-2.5 text-[16px] leading-snug text-(--color-ink) shadow-card">
                  {streamingText}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 rounded-3xl rounded-bl-lg bg-white px-4 py-3.5 shadow-card">
                  <span className="typing-dot h-2 w-2 rounded-full bg-(--color-graphite-400)" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-(--color-graphite-400)" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-(--color-graphite-400)" />
                </div>
              )}
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
        className="glass flex shrink-0 flex-col gap-2 border-t border-black/5 px-5 py-3"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)' }}
      >
        {pendingImage && (
          <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-2">
            <img src={pendingImage.dataUrl} alt="Foto seleccionada" className="h-14 w-14 rounded-xl object-cover" />
            <span className="flex-1 text-[13px] font-semibold text-(--color-ink-soft)">Foto lista para enviar</span>
            <button
              type="button"
              onClick={() => setPendingImage(null)}
              aria-label="Quitar foto"
              className="tap grid h-8 w-8 place-items-center rounded-full bg-(--color-cream-dark) text-(--color-ink-soft) active:scale-[0.9]"
            >
              <X size={16} weight="bold" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Añadir una foto"
            className="tap grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-(--color-cream-dark) bg-white text-(--color-leaf-600) active:scale-[0.92]"
          >
            <Camera size={20} weight="fill" />
          </button>

          <label htmlFor="chat-input" className="sr-only">
            Tu pregunta
          </label>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={pendingImage ? 'Añade una nota (opcional)…' : 'Escribe tu pregunta…'}
            className="min-w-0 flex-1 rounded-full border-2 border-(--color-cream-dark) bg-white px-4 py-2.5 text-[16px] outline-none transition-colors focus:border-(--color-leaf-500) focus:ring-4 focus:ring-(--color-leaf-100)"
          />
          <button
            type="submit"
            disabled={loading || (!input.trim() && !pendingImage)}
            aria-label="Enviar"
            className="tap grid h-11 w-11 shrink-0 place-items-center rounded-full bg-(--color-leaf-500) text-white active:scale-[0.92] disabled:opacity-40"
          >
            <PaperPlaneRight size={20} weight="fill" />
          </button>
        </div>
      </form>
    </div>
  )
}
