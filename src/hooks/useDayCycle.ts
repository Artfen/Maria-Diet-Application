import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface DayCycleState {
  day: number // 1-7
  lastDate: string // YYYY-MM-DD, local date of the last time `day` was set
}

function todayKey(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function wrapDay(day: number): number {
  return ((day - 1) % 7 + 7) % 7 + 1
}

export function useDayCycle() {
  const [state, setState] = useLocalStorage<DayCycleState>('maria-day-cycle', {
    day: 1,
    lastDate: todayKey(),
  })

  useEffect(() => {
    const today = todayKey()
    if (today !== state.lastDate) {
      const daysElapsed = Math.max(
        1,
        Math.round((new Date(today).getTime() - new Date(state.lastDate).getTime()) / 86_400_000),
      )
      setState({ day: wrapDay(state.day + daysElapsed), lastDate: today })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setDay(day: number) {
    setState({ day: wrapDay(day), lastDate: todayKey() })
  }

  return { day: state.day, setDay }
}
