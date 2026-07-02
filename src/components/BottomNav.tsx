import { NavLink } from 'react-router-dom'
import {
  House,
  ForkKnife,
  MagnifyingGlass,
  ShoppingCartSimple,
  BookOpenText,
  ChatCircleDots,
  type Icon,
} from '@phosphor-icons/react'

interface NavItem {
  to: string
  label: string
  icon: Icon
}

const items: NavItem[] = [
  { to: '/', label: 'Hoy', icon: House },
  { to: '/recetas', label: 'Recetas', icon: ForkKnife },
  { to: '/comprobar', label: 'Comprobar', icon: MagnifyingGlass },
  { to: '/lista', label: 'Compra', icon: ShoppingCartSimple },
  { to: '/guia', label: 'Guía', icon: BookOpenText },
  { to: '/chat', label: 'Chat', icon: ChatCircleDots },
]

export default function BottomNav() {
  return (
    <nav
      className="glass-white fixed inset-x-0 bottom-0 z-20 border-t border-black/5"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-xl justify-between px-1">
        {items.map(({ to, label, icon: Glyph }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `tap flex flex-col items-center gap-1 pb-1.5 pt-2 text-[11px] font-semibold active:scale-[0.92] ${
                  isActive ? 'text-(--color-leaf-600)' : 'text-(--color-graphite-600)'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Glyph size={26} weight={isActive ? 'fill' : 'regular'} />
                  <span className="leading-none">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
