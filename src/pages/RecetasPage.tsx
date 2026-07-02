import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ForkKnife } from '@phosphor-icons/react'
import PageHeader from '../components/PageHeader'
import { recipes, type MealType, getRecipeById } from '../data/recipes'

const mealTypeLabels: Record<MealType, string> = {
  desayuno: 'Desayuno',
  comida: 'Comida',
  merienda: 'Merienda',
  cena: 'Cena',
}

const filters: Array<{ id: MealType | 'todas'; label: string }> = [
  { id: 'todas', label: 'Todas' },
  { id: 'desayuno', label: 'Desayuno' },
  { id: 'comida', label: 'Comida' },
  { id: 'merienda', label: 'Merienda' },
  { id: 'cena', label: 'Cena' },
]

export default function RecetasPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filter, setFilter] = useState<MealType | 'todas'>('todas')
  const selectedId = searchParams.get('id')
  const selectedRecipe = selectedId ? getRecipeById(selectedId) : undefined

  const visible = useMemo(
    () => (filter === 'todas' ? recipes : recipes.filter((r) => r.mealType === filter)),
    [filter],
  )

  if (selectedRecipe) {
    return (
      <div className="px-5">
        <div
          className="glass sticky top-0 z-10 pb-3"
          style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1.5rem)' }}
        >
          <button
            onClick={() => setSearchParams({})}
            className="tap mb-2 inline-flex items-center gap-1 text-[15px] font-semibold text-(--color-leaf-600) active:scale-[0.97]"
          >
            <ArrowLeft size={16} weight="bold" /> Recetas
          </button>
          <h1 className="text-[28px] font-bold leading-tight text-(--color-ink)">{selectedRecipe.title}</h1>
          <p className="mt-1 text-[14px] font-semibold text-(--color-ink-soft)">
            {mealTypeLabels[selectedRecipe.mealType]} · {selectedRecipe.servings}
          </p>
        </div>

        <section className="mb-4 rounded-3xl bg-white p-5 shadow-card">
          <h2 className="mb-3 text-[15px] font-semibold uppercase tracking-[0.06em] text-(--color-ink-soft)">
            Ingredientes
          </h2>
          <ul className="flex flex-col gap-2">
            {selectedRecipe.ingredients.map((ing, i) => (
              <li key={i} className="flex gap-2.5 leading-snug text-(--color-ink)">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-leaf-400)" />
                {ing}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-4 rounded-3xl bg-white p-5 shadow-card">
          <h2 className="mb-3 text-[15px] font-semibold uppercase tracking-[0.06em] text-(--color-ink-soft)">
            Preparación
          </h2>
          <ol className="flex flex-col gap-4">
            {selectedRecipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3.5 leading-snug text-(--color-ink)">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-(--color-leaf-100) text-[14px] font-bold text-(--color-leaf-700)">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {selectedRecipe.portionNote && (
          <section className="mb-6 rounded-3xl bg-(--color-sun-100) p-5">
            <p className="text-[14px] font-semibold leading-snug text-(--color-ink)">{selectedRecipe.portionNote}</p>
          </section>
        )}
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Recetas" subtitle="Ideas con los alimentos que puedes tomar" />
      <div className="mb-4 flex gap-2 overflow-x-auto px-5 pb-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`tap shrink-0 rounded-full px-4 py-2 text-[14px] font-semibold active:scale-[0.95] ${
              filter === f.id
                ? 'bg-(--color-leaf-500) text-white shadow-card'
                : 'bg-white text-(--color-ink-soft)'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <ul className="flex flex-col gap-2.5 px-5 pb-6">
        {visible.map((r) => (
          <li key={r.id}>
            <button
              onClick={() => setSearchParams({ id: r.id })}
              className="tap flex w-full items-center gap-3.5 rounded-3xl bg-white p-4 text-left shadow-card active:scale-[0.99]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-(--color-leaf-50) text-(--color-leaf-600)">
                <ForkKnife size={22} weight="fill" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[17px] font-semibold text-(--color-ink)">{r.title}</p>
                <p className="text-[14px] text-(--color-ink-soft)">{mealTypeLabels[r.mealType]}</p>
              </div>
              <ArrowRight size={18} weight="bold" className="shrink-0 text-(--color-graphite-400)" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
