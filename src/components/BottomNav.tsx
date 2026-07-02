import { NavLink } from 'react-router-dom'

interface NavItem {
  to: string
  label: string
  icon: React.ReactNode
}

const items: NavItem[] = [
  {
    to: '/',
    label: 'Hoy',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z" />
      </svg>
    ),
  },
  {
    to: '/recetas',
    label: 'Recetas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4Z" />
        <path d="M18 20a2 2 0 0 0 2-2V6" />
        <path d="M8 8h6M8 12h6" />
      </svg>
    ),
  },
  {
    to: '/comprobar',
    label: '¿Puedo comerlo?',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    to: '/lista',
    label: 'Compra',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="20" r="1.3" />
        <circle cx="18" cy="20" r="1.3" />
        <path d="M2 3h2l2.2 12.1a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 7H6" />
      </svg>
    ),
  },
  {
    to: '/guia',
    label: 'Guía',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6" />
        <circle cx="12" cy="7.5" r="0.1" fill="currentColor" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-(--color-cream-dark) bg-white/95 backdrop-blur">
      <ul className="mx-auto flex max-w-xl justify-between px-1">
        {items.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2 text-xs font-semibold transition-colors ${
                  isActive ? 'text-(--color-leaf-600)' : 'text-(--color-ink-soft)'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`grid h-11 w-11 place-items-center rounded-2xl ${isActive ? 'bg-(--color-leaf-100)' : ''}`}>
                    <span className="h-6 w-6">{item.icon}</span>
                  </span>
                  <span className="leading-tight text-center">{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
