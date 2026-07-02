import { useState } from 'react'
import { CaretDown, Check, Trash } from '@phosphor-icons/react'
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
          className="tap mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 text-[14px] font-bold text-(--color-clay-600) shadow-card active:scale-[0.99]"
        >
          <Trash size={17} weight="bold" /> Vaciar lista ({checkedCount} marcados)
        </button>
      )}

      <ul className="flex flex-col gap-2.5 pb-6">
        {allowedFoodGroups.map((group) => {
          const open = !!openGroups[group.id]
          return (
            <li key={group.id} className="overflow-hidden rounded-3xl bg-white shadow-card">
              <button
                onClick={() => toggleGroup(group.id)}
                aria-expanded={open}
                className="tap flex w-full items-center justify-between px-4 py-3.5 text-left text-[17px] font-semibold text-(--color-ink)"
              >
                {group.title}
                <CaretDown
                  size={18}
                  weight="bold"
                  className={`text-(--color-graphite-400) transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              </button>
              {open && (
                <ul className="flex flex-col px-2 pb-2">
                  {group.items.map((item) => {
                    const checked = !!checkedItems[item]
                    return (
                      <li key={item}>
                        <button
                          onClick={() => toggleItem(item)}
                          aria-pressed={checked}
                          className="tap flex w-full items-center gap-3 rounded-2xl px-2 py-2.5 text-left active:scale-[0.99]"
                        >
                          <span
                            className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 text-white ${
                              checked
                                ? 'border-(--color-leaf-500) bg-(--color-leaf-500)'
                                : 'border-(--color-cream-dark)'
                            }`}
                          >
                            {checked && <Check size={14} weight="bold" />}
                          </span>
                          <span className={checked ? 'text-(--color-ink-soft) line-through' : 'text-(--color-ink)'}>
                            {item}
                          </span>
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
