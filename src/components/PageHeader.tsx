interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-(--color-cream)/92 px-5 pb-4 pt-7 backdrop-blur-md">
      <h1 className="text-[28px] font-bold leading-tight text-(--color-ink)">{title}</h1>
      {subtitle && <p className="mt-1 text-(--color-ink-soft)">{subtitle}</p>}
    </header>
  )
}
