import PageHeader from '../components/PageHeader'
import { supplements } from '../data/supplements'
import {
  generalRules,
  mealStructure,
  weeklyFrequency,
  portionEquivalences,
  portionNote,
  calciumTarget,
  calciumEquivalences,
  calciumInhibitors,
  cookingTips,
} from '../data/guidelines'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-bold text-(--color-leaf-700)">{title}</h2>
      {children}
    </section>
  )
}

export default function GuiaPage() {
  return (
    <div className="px-5">
      <PageHeader title="Guía" subtitle="Suplementos, raciones y normas de tu plan" />

      <Section title="💊 Suplementos">
        <ul className="flex flex-col gap-3">
          {supplements.map((s) => (
            <li key={s.id} className="rounded-xl bg-(--color-sun-100) p-3">
              <p className="font-bold text-(--color-ink)">{s.name}</p>
              <p className="text-sm text-(--color-ink-soft)">{s.brand}</p>
              <p className="mt-1 text-sm font-semibold text-(--color-ink)">{s.dose}</p>
              <p className="text-sm text-(--color-ink-soft)">{s.timing}</p>
              {s.duration && <p className="text-sm text-(--color-ink-soft)">Duración: {s.duration}</p>}
              {s.link && (
                <a href={s.link} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm font-semibold text-(--color-leaf-600) underline">
                  {s.linkLabel ?? s.link}
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="📋 Normas generales">
        <ul className="flex flex-col gap-2">
          {generalRules.map((rule, i) => (
            <li key={i} className="flex gap-2 text-(--color-ink-soft)">
              <span className="text-(--color-leaf-500)">•</span>
              {rule}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="🍽️ Estructura de comidas y cenas">
        <div className="flex flex-col gap-2 text-(--color-ink-soft)">
          <p><strong className="text-(--color-ink)">1º plato:</strong> {mealStructure.primerPlato}</p>
          <p><strong className="text-(--color-ink)">2º plato:</strong> {mealStructure.segundoPlato}</p>
          <p><strong className="text-(--color-ink)">Postre:</strong> {mealStructure.postre}</p>
          <p className="mt-1 rounded-lg bg-(--color-cream-dark) p-2 text-sm">{mealStructure.nota}</p>
        </div>
        <div className="mt-4">
          <p className="font-bold text-(--color-ink)">Frecuencia semanal — comidas</p>
          <ul className="mt-1 flex flex-col gap-2 text-(--color-ink-soft)">
            {weeklyFrequency.comidas.map((line, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-(--color-leaf-500)">•</span>
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-3 font-bold text-(--color-ink)">Frecuencia semanal — cenas</p>
          <ul className="mt-1 flex flex-col gap-2 text-(--color-ink-soft)">
            {weeklyFrequency.cenas.map((line, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-(--color-leaf-500)">•</span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="⚖️ Raciones (en crudo)">
        <ul className="flex flex-col gap-2">
          {portionEquivalences.map((p, i) => (
            <li key={i} className="border-b border-(--color-cream-dark) pb-2 last:border-0 last:pb-0">
              <p className="font-semibold text-(--color-ink)">
                {p.food}: <span className="font-bold text-(--color-leaf-600)">{p.amount}</span>
              </p>
              {p.note && <p className="text-sm text-(--color-ink-soft)">{p.note}</p>}
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-lg bg-(--color-cream-dark) p-2 text-sm text-(--color-ink-soft)">{portionNote}</p>
      </Section>

      <Section title="🦴 Calcio">
        <p className="mb-2 font-semibold text-(--color-ink)">{calciumTarget}</p>
        <ul className="flex flex-col gap-2">
          {calciumEquivalences.map((c, i) => (
            <li key={i} className="text-(--color-ink-soft)">
              <strong className="text-(--color-ink)">{c.food}</strong> — {c.ration}: {c.calcium}
            </li>
          ))}
        </ul>
        <p className="mt-3 font-semibold text-(--color-ink)">Alimentos que pueden reducir la absorción de calcio:</p>
        <ul className="mt-1 flex flex-col gap-1">
          {calciumInhibitors.map((c, i) => (
            <li key={i} className="flex gap-2 text-(--color-ink-soft)">
              <span className="text-(--color-clay-500)">•</span>
              {c}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="🔥 Consejos de cocina">
        <ul className="flex flex-col gap-2">
          {cookingTips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-(--color-ink-soft)">
              <span className="text-(--color-leaf-500)">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
