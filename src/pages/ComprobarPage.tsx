import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { searchFoods, type FoodStatus } from '../data/foods'

const statusStyles: Record<FoodStatus, { bg: string; text: string; badge: string; emoji: string }> = {
  permitido: { bg: 'bg-(--color-leaf-50)', text: 'text-(--color-leaf-700)', badge: 'bg-(--color-leaf-500)', emoji: '✅' },
  fodmap: { bg: 'bg-(--color-sun-100)', text: 'text-(--color-ink)', badge: 'bg-(--color-sun-500)', emoji: '⚠️' },
  evitar: { bg: 'bg-(--color-clay-100)', text: 'text-(--color-clay-600)', badge: 'bg-(--color-clay-500)', emoji: '⛔' },
}

const statusLabel: Record<FoodStatus, string> = {
  permitido: 'Sí, puedes tomarlo',
  fodmap: 'Evitar por ahora',
  evitar: 'Evitar siempre',
}

export default function ComprobarPage() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchFoods(query), [query])

  return (
    <div className="px-5">
      <PageHeader title="¿Puedo comerlo?" subtitle="Escribe un alimento para comprobarlo" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ej: manzana, queso, ajo…"
        className="mb-4 w-full rounded-2xl border-2 border-(--color-cream-dark) bg-white px-4 py-3 text-lg outline-none focus:border-(--color-leaf-500)"
      />

      {query.trim() === '' && (
        <p className="text-(--color-ink-soft)">Escribe el nombre de un alimento en español para ver si está permitido.</p>
      )}

      {query.trim() !== '' && results.length === 0 && (
        <p className="text-(--color-ink-soft)">No hemos encontrado "{query}" en la lista. Consulta con tu nutricionista si tienes dudas.</p>
      )}

      <ul className="flex flex-col gap-3 pb-6">
        {results.map((entry) => {
          const style = statusStyles[entry.status]
          return (
            <li key={`${entry.groupTitle}-${entry.name}`} className={`rounded-2xl p-4 shadow-sm ${style.bg}`}>
              <div className="flex items-center justify-between gap-2">
                <p className={`text-lg font-bold ${style.text}`}>{entry.name}</p>
                <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold text-white ${style.badge}`}>
                  {style.emoji} {statusLabel[entry.status]}
                </span>
              </div>
              <p className={`mt-1 text-sm ${style.text}`}>{entry.reason}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-(--color-ink-soft)">{entry.groupTitle}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
