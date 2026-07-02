import { mealSchedule, type MealSlot } from '../data/mealSchedule'

export function minutesFromTime(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function minutesFromDate(date: Date): number {
  return date.getHours() * 60 + date.getMinutes()
}

const FASTING_BUFFER_MINUTES = 180 // how long after cena the fasting window starts

export interface ScheduleStatus {
  fasting: boolean
  currentSlot: MealSlot | null
  nextSlot: MealSlot
}

export function getScheduleStatus(now: Date): ScheduleStatus {
  const nowMinutes = minutesFromDate(now)
  const sorted = [...mealSchedule].sort((a, b) => minutesFromTime(a.time) - minutesFromTime(b.time))
  const firstSlot = sorted[0]
  const lastSlot = sorted[sorted.length - 1]
  const fastingStart = minutesFromTime(lastSlot.time) + FASTING_BUFFER_MINUTES

  const inFasting = nowMinutes >= fastingStart || nowMinutes < minutesFromTime(firstSlot.time)
  if (inFasting) {
    return { fasting: true, currentSlot: null, nextSlot: firstSlot }
  }

  let current: MealSlot = firstSlot
  let next: MealSlot = sorted[1] ?? firstSlot
  for (let i = 0; i < sorted.length; i++) {
    if (minutesFromTime(sorted[i].time) <= nowMinutes) {
      current = sorted[i]
      next = sorted[i + 1] ?? firstSlot
    }
  }

  return { fasting: false, currentSlot: current, nextSlot: next }
}

export function orderedSlots(): MealSlot[] {
  return [...mealSchedule].sort((a, b) => minutesFromTime(a.time) - minutesFromTime(b.time))
}
