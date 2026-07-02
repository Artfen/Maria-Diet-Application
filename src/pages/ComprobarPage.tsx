import { useMemo, useState } from 'react'
import { MagnifyingGlass, CheckCircle, Warning, Prohibit, type Icon } from '@phosphor-icons/react'
import PageHeader from '../components/PageHeader'
import { searchFoods, type FoodStatus } from '../data/foods'

const statusStyles: Record<FoodStatus, { bg: string; text: string; badge: string; icon: Icon }> = {
  permitido: { bg: 'bg-(--color-leaf-50)', text: 'text-(--color-leaf-700)', badge: 'bg-(--color-leaf-500)', icon: CheckCircle },
  fodmap: { bg: 'bg-(--color-sun-100)', text: 'text-(--color-ink)', badge: 'bg-(--color-sun-500)', icon: Warning },
  evitar: { bg: 'bg-(--color-clay-100)', text: 'text-(--color-clay-600)', badge: 'bg-(--color-clay-500)', icon: Prohibit },
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

      <label htmlFor="food-query" className="sr-only">
        Nombre del alimento
      </label>
      <div className="relative mb-4">
        <MagnifyingGlass
          size={20}
          weight="bold"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--color-graphite-400)"
        />
        <input
          id="food-query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej: manzana, queso, ajo…"
          autoComplete="off"
          className="w-full rounded-2xl border-2 border-(--color-cream-dark) bg-white py-3 pl-11 pr-4 text-[17px] outline-none transition-colors focus:border-(--color-leaf-500) focus:ring-4 focus:ring-(--color-leaf-100)"
        />
      </div>

      {query.trim() === '' && (
        <p className="leading-snug text-(--color-ink-soft)">
          Escribe el nombre de un alimento en español para ver si está permitido.
        </p>
      )}

      {query.trim() !== '' && results.length === 0 && (
        <p className="leading-snug text-(--color-ink-soft)">
          No hemos encontrado "{query}" en la lista. Consulta con tu nutricionista si tienes dudas.
        </p>
      )}

      <ul className="flex flex-col gap-2.5 pb-6">
        {results.map((entry) => {
          const style = statusStyles[entry.status]
          const StatusIcon = style.icon
          return (
            <li key={`${entry.groupTitle}-${entry.name}`} className={`rounded-3xl p-4 shadow-card ${style.bg}`}>
              <div className="flex items-center justify-between gap-2">
                <p className={`text-[18px] font-bold ${style.text}`}>{entry.name}</p>
                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-bold text-white ${style.badge}`}
                >
                  <StatusIcon size={15} weight="fill" /> {statusLabel[entry.status]}
                </span>
              </div>
              <p className={`mt-1.5 text-[14px] leading-snug ${style.text}`}>{entry.reason}</p>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-(--color-ink-soft)">
                {entry.groupTitle}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
