interface PageHeaderProps {
  title: string
  subtitle?: string
  eyebrow?: string
}

export default function PageHeader({ title, subtitle, eyebrow }: PageHeaderProps) {
  return (
    <header
      className="glass sticky top-0 z-10 px-5 pb-4"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1.75rem)' }}
    >
      {eyebrow && (
        <p className="mb-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-(--color-leaf-600)">{eyebrow}</p>
      )}
      <h1 className="text-[32px] font-bold leading-[1.08] text-(--color-ink)">{title}</h1>
      {subtitle && <p className="mt-1.5 text-[15px] leading-snug text-(--color-ink-soft)">{subtitle}</p>}
    </header>
  )
}
