import { Pill, ClipboardText, ForkKnife, Scales, Bone, CookingPot, ArrowSquareOut, type Icon } from '@phosphor-icons/react'
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

function Section({ title, icon: Glyph, children }: { title: string; icon: Icon; children: React.ReactNode }) {
  return (
    <section className="mb-4 rounded-3xl bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-(--color-leaf-50) text-(--color-leaf-600)">
          <Glyph size={20} weight="fill" />
        </span>
        <h2 className="text-[19px] font-bold text-(--color-ink)">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Bullet({ children, tone = 'leaf' }: { children: React.ReactNode; tone?: 'leaf' | 'clay' }) {
  return (
    <li className="flex gap-2.5 leading-snug text-(--color-ink-soft)">
      <span
        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
          tone === 'clay' ? 'bg-(--color-clay-500)' : 'bg-(--color-leaf-400)'
        }`}
      />
      {children}
    </li>
  )
}

export default function GuiaPage() {
  return (
    <div className="px-5">
      <PageHeader title="Guía" subtitle="Suplementos, raciones y normas de tu plan" />

      <Section title="Suplementos" icon={Pill}>
        <ul className="flex flex-col gap-2.5">
          {supplements.map((s) => (
            <li key={s.id} className="rounded-2xl bg-(--color-sun-100) p-3.5">
              <p className="text-[16px] font-bold text-(--color-ink)">{s.name}</p>
              <p className="text-[14px] text-(--color-ink-soft)">{s.brand}</p>
              <p className="mt-1 text-[14px] font-semibold text-(--color-ink)">{s.dose}</p>
              <p className="text-[14px] text-(--color-ink-soft)">{s.timing}</p>
              {s.duration && <p className="text-[14px] text-(--color-ink-soft)">Duración: {s.duration}</p>}
              {s.link && (
                <a
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1 text-[14px] font-semibold text-(--color-leaf-600)"
                >
                  {s.linkLabel ?? s.link} <ArrowSquareOut size={14} weight="bold" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Normas generales" icon={ClipboardText}>
        <ul className="flex flex-col gap-2.5">
          {generalRules.map((rule, i) => (
            <Bullet key={i}>{rule}</Bullet>
          ))}
        </ul>
      </Section>

      <Section title="Estructura de comidas y cenas" icon={ForkKnife}>
        <div className="flex flex-col gap-2 leading-snug text-(--color-ink-soft)">
          <p>
            <strong className="text-(--color-ink)">1º plato:</strong> {mealStructure.primerPlato}
          </p>
          <p>
            <strong className="text-(--color-ink)">2º plato:</strong> {mealStructure.segundoPlato}
          </p>
          <p>
            <strong className="text-(--color-ink)">Postre:</strong> {mealStructure.postre}
          </p>
          <p className="mt-1 rounded-xl bg-(--color-cream) p-3 text-[14px]">{mealStructure.nota}</p>
        </div>
        <div className="mt-4">
          <p className="text-[15px] font-bold text-(--color-ink)">Frecuencia semanal · comidas</p>
          <ul className="mt-2 flex flex-col gap-2">
            {weeklyFrequency.comidas.map((line, i) => (
              <Bullet key={i}>{line}</Bullet>
            ))}
          </ul>
          <p className="mt-4 text-[15px] font-bold text-(--color-ink)">Frecuencia semanal · cenas</p>
          <ul className="mt-2 flex flex-col gap-2">
            {weeklyFrequency.cenas.map((line, i) => (
              <Bullet key={i}>{line}</Bullet>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="Raciones (en crudo)" icon={Scales}>
        <ul className="flex flex-col gap-2.5">
          {portionEquivalences.map((p, i) => (
            <li key={i} className="border-b border-(--color-cream-dark) pb-2.5 last:border-0 last:pb-0">
              <p className="font-semibold text-(--color-ink)">
                {p.food}: <span className="font-bold text-(--color-leaf-600)">{p.amount}</span>
              </p>
              {p.note && <p className="text-[14px] text-(--color-ink-soft)">{p.note}</p>}
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-xl bg-(--color-cream) p-3 text-[14px] text-(--color-ink-soft)">{portionNote}</p>
      </Section>

      <Section title="Calcio" icon={Bone}>
        <p className="mb-2.5 font-semibold text-(--color-ink)">{calciumTarget}</p>
        <ul className="flex flex-col gap-2 leading-snug">
          {calciumEquivalences.map((c, i) => (
            <li key={i} className="text-(--color-ink-soft)">
              <strong className="text-(--color-ink)">{c.food}</strong> · {c.ration}: {c.calcium}
            </li>
          ))}
        </ul>
        <p className="mt-3.5 font-semibold text-(--color-ink)">Alimentos que pueden reducir la absorción de calcio:</p>
        <ul className="mt-2 flex flex-col gap-2">
          {calciumInhibitors.map((c, i) => (
            <Bullet key={i} tone="clay">
              {c}
            </Bullet>
          ))}
        </ul>
      </Section>

      <Section title="Consejos de cocina" icon={CookingPot}>
        <ul className="flex flex-col gap-2.5">
          {cookingTips.map((tip, i) => (
            <Bullet key={i}>{tip}</Bullet>
          ))}
        </ul>
      </Section>
    </div>
  )
}
