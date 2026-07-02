interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-(--color-cream)/95 px-5 pb-3 pt-6 backdrop-blur">
      <h1 className="text-2xl font-bold text-(--color-leaf-700)">{title}</h1>
      {subtitle && <p className="mt-0.5 text-(--color-ink-soft)">{subtitle}</p>}
    </header>
  )
}
