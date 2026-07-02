import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useNow } from '../hooks/useNow'
import { useDayCycle } from '../hooks/useDayCycle'
import { useChecklist, todayDateKey } from '../hooks/useChecklist'
import { getScheduleStatus, orderedSlots } from '../lib/schedule'
import { getDayMenu } from '../data/weekMenu'
import { supplements, isSeasonalSupplementActive } from '../data/supplements'
import { getRecipeById } from '../data/recipes'
import type { MealSlot } from '../data/mealSchedule'

function slotContent(slot: MealSlot, dayMenu: ReturnType<typeof getDayMenu>) {
  if (slot.id === 'comida') return dayMenu.comida
  if (slot.id === 'cena') return dayMenu.cena
  return null
}

export default function HoyPage() {
  const now = useNow()
  const { day, setDay } = useDayCycle()
  const dateKey = todayDateKey()
  const { isChecked, toggle } = useChecklist(dateKey)
  const dayMenu = getDayMenu(day)
  const { fasting, currentSlot, nextSlot } = getScheduleStatus(now)
  const slots = orderedSlots()
  const currentMonth = now.getMonth() + 1

  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported',
  )
  const notifiedSlotRef = useRef<string | null>(null)

  useEffect(() => {
    if (!currentSlot || fasting) return
    const key = `${dateKey}-${currentSlot.id}`
    if (notifiedSlotRef.current === key) return
    if (isChecked(currentSlot.id)) return
    notifiedSlotRef.current = key
    if (permission === 'granted') {
      const content = slotContent(currentSlot, dayMenu)
      new Notification(`Hora de: ${currentSlot.label}`, {
        body: content ? content.summary : currentSlot.description,
        tag: key,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlot?.id, fasting])

  async function requestPermission() {
    if (typeof Notification === 'undefined') return
    const result = await Notification.requestPermission()
    setPermission(result)
  }

  return (
    <div>
      <PageHeader title="Hoy" subtitle={now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })} />

      <div className="px-5">
        <div className="mb-4 rounded-2xl bg-white p-3 shadow-card">
          <span className="text-sm font-semibold text-(--color-ink-soft)">Día {day} de tu ciclo de 7 días</span>
          <div className="mt-2 flex justify-between gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={`tap grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold active:scale-[0.94] ${
                  d === day ? 'bg-(--color-leaf-500) text-white' : 'bg-(--color-cream-dark) text-(--color-ink-soft)'
                }`}
                aria-label={`Ir al día ${d}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {permission === 'default' && (
          <button
            onClick={requestPermission}
            className="tap mb-4 w-full rounded-2xl border-2 border-dashed border-(--color-leaf-400) bg-(--color-leaf-50) p-3 text-left text-sm font-semibold text-(--color-leaf-700) active:scale-[0.99]"
          >
            🔔 Activar avisos — recibe un aviso cuando toque comer o tomar un suplemento (mientras tengas la app abierta)
          </button>
        )}

        {fasting ? (
          <section className="mb-6 rounded-3xl bg-(--color-leaf-700) p-6 text-white shadow-md">
            <p className="text-sm font-semibold uppercase tracking-wide text-(--color-leaf-100)">Ayuno nocturno</p>
            <h2 className="mt-1 text-2xl font-bold">Descansando 🌙</h2>
            <p className="mt-2 text-(--color-leaf-50)">
              Próxima toma: <strong>{nextSlot.label}</strong> a las {nextSlot.time}h
            </p>
          </section>
        ) : (
          currentSlot && <NowCard slot={currentSlot} dayMenu={dayMenu} checked={isChecked(currentSlot.id)} onToggle={() => toggle(currentSlot.id)} month={currentMonth} />
        )}

        <h2 className="mb-2 mt-2 text-lg font-bold text-(--color-ink)">Horario de hoy</h2>
        <ol className="flex flex-col gap-3 pb-6">
          {slots.map((slot) => {
            const content = slotContent(slot, dayMenu)
            const checked = isChecked(slot.id)
            const isCurrent = !fasting && currentSlot?.id === slot.id
            const slotSupplements = supplements.filter((s) => s.slotId === slot.id && isSeasonalSupplementActive(s, currentMonth))
            return (
              <li
                key={slot.id}
                className={`rounded-2xl border p-4 shadow-card transition-colors ${
                  isCurrent ? 'border-(--color-leaf-500) bg-(--color-leaf-50)' : 'border-transparent bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggle(slot.id)}
                    aria-label={checked ? 'Marcar como pendiente' : 'Marcar como hecho'}
                    className={`tap mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-white active:scale-[0.9] ${
                      checked ? 'border-(--color-leaf-500) bg-(--color-leaf-500)' : 'border-(--color-cream-dark) bg-white'
                    }`}
                  >
                    {checked && (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 13 4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-bold text-(--color-ink)">{slot.label}</span>
                      <span className="shrink-0 text-sm font-semibold text-(--color-ink-soft)">{slot.time}h</span>
                    </div>
                    {content ? (
                      <>
                        <p className="mt-1 text-sm text-(--color-ink-soft)">{content.summary}</p>
                        <Link to={`/recetas?id=${content.recipeId}`} className="mt-1 inline-block text-sm font-semibold text-(--color-leaf-600) underline">
                          Ver receta
                        </Link>
                      </>
                    ) : (
                      <p className="mt-1 text-sm text-(--color-ink-soft)">{slot.description}</p>
                    )}
                    {slotSupplements.length > 0 && (
                      <ul className="mt-2 flex flex-col gap-1">
                        {slotSupplements.map((s) => (
                          <li key={s.id} className="rounded-lg bg-(--color-sun-100) px-2 py-1 text-sm font-semibold text-(--color-ink)">
                            💊 {s.name} — {s.dose}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

function NowCard({
  slot,
  dayMenu,
  checked,
  onToggle,
  month,
}: {
  slot: MealSlot
  dayMenu: ReturnType<typeof getDayMenu>
  checked: boolean
  onToggle: () => void
  month: number
}) {
  const content = slotContent(slot, dayMenu)
  const recipe = content ? getRecipeById(content.recipeId) : undefined
  const slotSupplements = supplements.filter((s) => s.slotId === slot.id && isSeasonalSupplementActive(s, month))

  return (
    <section className="mb-6 rounded-3xl bg-white p-6 shadow-md">
      <p className="text-sm font-semibold uppercase tracking-wide text-(--color-leaf-600)">Ahora toca · {slot.time}h</p>
      <h2 className="mt-1 text-2xl font-bold text-(--color-ink)">{slot.label}</h2>
      {content ? (
        <>
          <p className="mt-2 text-(--color-ink-soft)">{content.summary}</p>
          {recipe && (
            <Link to={`/recetas?id=${recipe.id}`} className="mt-2 inline-block font-semibold text-(--color-leaf-600) underline">
              Ver receta completa →
            </Link>
          )}
        </>
      ) : (
        <p className="mt-2 text-(--color-ink-soft)">{slot.description}</p>
      )}
      {slotSupplements.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {slotSupplements.map((s) => (
            <li key={s.id} className="rounded-xl bg-(--color-sun-100) px-3 py-2 text-sm font-semibold text-(--color-ink)">
              💊 {s.name} — {s.dose}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={onToggle}
        className={`tap mt-4 w-full rounded-2xl py-3 text-center text-lg font-bold active:scale-[0.98] ${
          checked ? 'bg-(--color-leaf-100) text-(--color-leaf-700)' : 'bg-(--color-leaf-500) text-white'
        }`}
      >
        {checked ? '✓ Hecho' : 'Marcar como hecho'}
      </button>
    </section>
  )
}
