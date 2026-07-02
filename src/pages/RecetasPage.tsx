import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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
        <div className="sticky top-0 z-10 bg-(--color-cream)/95 pb-3 pt-6 backdrop-blur">
          <button
            onClick={() => setSearchParams({})}
            className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-(--color-leaf-600)"
          >
            ← Volver a recetas
          </button>
          <h1 className="text-2xl font-bold text-(--color-leaf-700)">{selectedRecipe.title}</h1>
          <p className="mt-0.5 text-sm font-semibold text-(--color-ink-soft)">
            {mealTypeLabels[selectedRecipe.mealType]} · {selectedRecipe.servings}
          </p>
        </div>

        <section className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-bold text-(--color-ink)">Ingredientes</h2>
          <ul className="flex flex-col gap-1.5">
            {selectedRecipe.ingredients.map((ing, i) => (
              <li key={i} className="flex gap-2 text-(--color-ink-soft)">
                <span className="text-(--color-leaf-500)">•</span>
                {ing}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-bold text-(--color-ink)">Preparación</h2>
          <ol className="flex flex-col gap-3">
            {selectedRecipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-(--color-ink-soft)">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-(--color-leaf-100) text-sm font-bold text-(--color-leaf-700)">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {selectedRecipe.portionNote && (
          <section className="mb-6 rounded-2xl bg-(--color-sun-100) p-4">
            <p className="text-sm font-semibold text-(--color-ink)">🍽️ {selectedRecipe.portionNote}</p>
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
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              filter === f.id ? 'bg-(--color-leaf-500) text-white' : 'bg-white text-(--color-ink-soft)'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <ul className="flex flex-col gap-3 px-5 pb-6">
        {visible.map((r) => (
          <li key={r.id}>
            <button
              onClick={() => setSearchParams({ id: r.id })}
              className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-left shadow-sm"
            >
              <div>
                <p className="font-bold text-(--color-ink)">{r.title}</p>
                <p className="text-sm text-(--color-ink-soft)">{mealTypeLabels[r.mealType]}</p>
              </div>
              <span className="text-(--color-leaf-500)">→</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
