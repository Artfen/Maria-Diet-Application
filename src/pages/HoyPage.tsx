import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Pill, MoonStars, Check, ArrowRight } from '@phosphor-icons/react'
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

function getGreeting(date: Date): string {
  const h = date.getHours()
  if (h >= 6 && h < 13) return 'Buenos días'
  if (h >= 13 && h < 21) return 'Buenas tardes'
  return 'Buenas noches'
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
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
      <PageHeader
        title={`${getGreeting(now)}, Maria`}
        subtitle={capitalize(now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }))}
      />

      <div className="px-5">
        <div className="mb-4 rounded-3xl bg-white p-4 shadow-card">
          <span className="text-[13px] font-semibold text-(--color-ink-soft)">Día {day} de tu ciclo de 7 días</span>
          <div className="mt-3 flex justify-between gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={`tap grid h-10 w-10 shrink-0 place-items-center rounded-full text-[15px] font-bold active:scale-[0.9] ${
                  d === day ? 'bg-(--color-leaf-500) text-white shadow-card' : 'bg-(--color-cream-dark) text-(--color-ink-soft)'
                }`}
                aria-label={`Ir al día ${d}`}
                aria-pressed={d === day}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {permission === 'default' && (
          <button
            onClick={requestPermission}
            className="tap mb-4 flex w-full items-center gap-3 rounded-3xl border border-(--color-leaf-100) bg-(--color-leaf-50) p-4 text-left active:scale-[0.99]"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-(--color-leaf-100) text-(--color-leaf-600)">
              <Bell size={20} weight="fill" />
            </span>
            <span className="text-[14px] font-semibold leading-snug text-(--color-leaf-700)">
              Activar avisos cuando toque comer o tomar un suplemento (con la app abierta)
            </span>
          </button>
        )}

        {fasting ? (
          <section className="animate-scale-in mb-7 rounded-[28px] bg-(--color-leaf-700) p-6 text-white shadow-raised">
            <div className="flex items-center gap-2 text-(--color-leaf-100)">
              <MoonStars size={18} weight="fill" />
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em]">Ayuno nocturno</p>
            </div>
            <h2 className="mt-2 text-2xl font-bold">Descansando</h2>
            <p className="mt-2 text-(--color-leaf-50)">
              Próxima toma: <strong>{nextSlot.label}</strong> a las {nextSlot.time}h
            </p>
          </section>
        ) : (
          currentSlot && (
            <NowCard
              slot={currentSlot}
              dayMenu={dayMenu}
              checked={isChecked(currentSlot.id)}
              onToggle={() => toggle(currentSlot.id)}
              month={currentMonth}
            />
          )
        )}

        <h2 className="mb-3 mt-2 text-[15px] font-semibold uppercase tracking-[0.06em] text-(--color-ink-soft)">
          Horario de hoy
        </h2>
        <ol className="flex flex-col gap-2.5 pb-6">
          {slots.map((slot) => {
            const content = slotContent(slot, dayMenu)
            const checked = isChecked(slot.id)
            const isCurrent = !fasting && currentSlot?.id === slot.id
            const slotSupplements = supplements.filter(
              (s) => s.slotId === slot.id && isSeasonalSupplementActive(s, currentMonth),
            )
            return (
              <li
                key={slot.id}
                className={`rounded-3xl border p-4 shadow-card transition-colors ${
                  isCurrent ? 'border-(--color-leaf-400) bg-(--color-leaf-50)' : 'border-transparent bg-white'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggle(slot.id)}
                    aria-label={checked ? 'Marcar como pendiente' : 'Marcar como hecho'}
                    aria-pressed={checked}
                    className={`tap mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-white active:scale-[0.88] ${
                      checked ? 'border-(--color-leaf-500) bg-(--color-leaf-500)' : 'border-(--color-cream-dark) bg-white'
                    }`}
                  >
                    {checked && <Check size={18} weight="bold" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[17px] font-semibold text-(--color-ink)">{slot.label}</span>
                      <span className="shrink-0 text-[14px] font-semibold text-(--color-ink-soft)">{slot.time}h</span>
                    </div>
                    {content ? (
                      <>
                        <p className="mt-1 text-[14px] leading-snug text-(--color-ink-soft)">{content.summary}</p>
                        <Link
                          to={`/recetas?id=${content.recipeId}`}
                          className="mt-1.5 inline-flex items-center gap-1 text-[14px] font-semibold text-(--color-leaf-600)"
                        >
                          Ver receta <ArrowRight size={14} weight="bold" />
                        </Link>
                      </>
                    ) : (
                      <p className="mt-1 text-[14px] leading-snug text-(--color-ink-soft)">{slot.description}</p>
                    )}
                    {slotSupplements.length > 0 && (
                      <ul className="mt-2.5 flex flex-col gap-1.5">
                        {slotSupplements.map((s) => (
                          <li
                            key={s.id}
                            className="flex items-center gap-2 rounded-xl bg-(--color-sun-100) px-2.5 py-1.5 text-[14px] font-semibold text-(--color-ink)"
                          >
                            <Pill size={16} weight="fill" className="shrink-0 text-(--color-sun-500)" />
                            {s.name} · {s.dose}
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
    <section className="animate-scale-in mb-7 rounded-[28px] bg-white p-6 shadow-raised">
      <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-(--color-leaf-600)">
        Ahora toca · {slot.time}h
      </p>
      <h2 className="mt-1.5 text-[26px] font-bold leading-tight text-(--color-ink)">{slot.label}</h2>
      {content ? (
        <>
          <p className="mt-2 leading-snug text-(--color-ink-soft)">{content.summary}</p>
          {recipe && (
            <Link
              to={`/recetas?id=${recipe.id}`}
              className="mt-2.5 inline-flex items-center gap-1 font-semibold text-(--color-leaf-600)"
            >
              Ver receta completa <ArrowRight size={16} weight="bold" />
            </Link>
          )}
        </>
      ) : (
        <p className="mt-2 leading-snug text-(--color-ink-soft)">{slot.description}</p>
      )}
      {slotSupplements.length > 0 && (
        <ul className="mt-3.5 flex flex-col gap-2">
          {slotSupplements.map((s) => (
            <li
              key={s.id}
              className="flex items-center gap-2.5 rounded-xl bg-(--color-sun-100) px-3 py-2.5 text-[15px] font-semibold text-(--color-ink)"
            >
              <Pill size={18} weight="fill" className="shrink-0 text-(--color-sun-500)" />
              {s.name} · {s.dose}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={onToggle}
        className={`tap mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-center text-[17px] font-bold active:scale-[0.98] ${
          checked ? 'bg-(--color-leaf-100) text-(--color-leaf-700)' : 'bg-(--color-leaf-500) text-white shadow-card'
        }`}
      >
        {checked ? (
          <>
            <Check size={20} weight="bold" /> Hecho
          </>
        ) : (
          'Marcar como hecho'
        )}
      </button>
    </section>
  )
}
