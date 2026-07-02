import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { allowedFoodGroups } from '../data/foods'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function ListaCompraPage() {
  const [checkedItems, setCheckedItems] = useLocalStorage<Record<string, boolean>>('maria-shopping-list', {})
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ verduras: true })

  function toggleItem(name: string) {
    setCheckedItems({ ...checkedItems, [name]: !checkedItems[name] })
  }

  function toggleGroup(id: string) {
    setOpenGroups({ ...openGroups, [id]: !openGroups[id] })
  }

  const checkedCount = Object.values(checkedItems).filter(Boolean).length

  return (
    <div className="px-5">
      <PageHeader title="Lista de la compra" subtitle="Marca lo que necesites comprar esta semana" />

      {checkedCount > 0 && (
        <button
          onClick={() => setCheckedItems({})}
          className="mb-4 w-full rounded-2xl bg-white py-2.5 text-sm font-bold text-(--color-clay-600) shadow-card"
        >
          Vaciar lista ({checkedCount} marcados)
        </button>
      )}

      <ul className="flex flex-col gap-3 pb-6">
        {allowedFoodGroups.map((group) => {
          const open = !!openGroups[group.id]
          return (
            <li key={group.id} className="overflow-hidden rounded-2xl bg-white shadow-card">
              <button
                onClick={() => toggleGroup(group.id)}
                className="flex w-full items-center justify-between px-4 py-3 text-left font-bold text-(--color-ink)"
              >
                {group.title}
                <span className="text-(--color-leaf-500)">{open ? '−' : '+'}</span>
              </button>
              {open && (
                <ul className="flex flex-col gap-1 px-4 pb-4">
                  {group.items.map((item) => {
                    const checked = !!checkedItems[item]
                    return (
                      <li key={item}>
                        <button
                          onClick={() => toggleItem(item)}
                          className="flex w-full items-center gap-3 rounded-xl py-2 text-left"
                        >
                          <span
                            className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 ${
                              checked ? 'border-(--color-leaf-500) bg-(--color-leaf-500) text-white' : 'border-(--color-cream-dark)'
                            }`}
                          >
                            {checked && (
                              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m5 13 4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <span className={checked ? 'text-(--color-ink-soft) line-through' : 'text-(--color-ink)'}>{item}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
