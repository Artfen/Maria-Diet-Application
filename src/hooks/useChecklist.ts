import { useLocalStorage } from './useLocalStorage'

type ChecklistState = Record<string, string[]> // dateKey -> checked slot ids

export function todayDateKey(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export function useChecklist(dateKey: string) {
  const [state, setState] = useLocalStorage<ChecklistState>('maria-checklist', {})
  const checked = state[dateKey] ?? []

  function toggle(slotId: string) {
    const current = state[dateKey] ?? []
    const next = current.includes(slotId) ? current.filter((id) => id !== slotId) : [...current, slotId]
    setState({ ...state, [dateKey]: next })
  }

  function isChecked(slotId: string) {
    return checked.includes(slotId)
  }

  return { checked, toggle, isChecked }
}
