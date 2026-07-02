import { mealSchedule } from '../src/data/mealSchedule.js'
import { supplements } from '../src/data/supplements.js'
import { weekMenu } from '../src/data/weekMenu.js'
import { allowedFoodGroups, fodmapFoodGroups, avoidFoodGroups } from '../src/data/foods.js'
import { recipes } from '../src/data/recipes.js'
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
} from '../src/data/guidelines.js'

function buildDietContext(): string {
  const sections: string[] = []

  sections.push(
    '## HORARIO DIARIO\n' +
      mealSchedule
        .map((s) => `- ${s.time} — ${s.label}: ${s.description ?? '(ver menú de 7 días)'}`)
        .join('\n'),
  )

  sections.push(
    '## SUPLEMENTOS\n' +
      supplements
        .map(
          (s) =>
            `- ${s.name} (${s.brand}): ${s.dose}. ${s.timing}` +
            (s.seasonal ? ` (solo de octubre a junio, meses ${s.seasonal.fromMonth}-${s.seasonal.toMonth})` : '') +
            (s.duration ? ` Duración: ${s.duration}.` : ''),
        )
        .join('\n'),
  )

  sections.push(
    '## MENÚ ROTATIVO DE 7 DÍAS (comida y cena)\n' +
      weekMenu
        .map((d) => `### ${d.dayName}\nComida: ${d.comida.summary}\nCena: ${d.cena.summary}`)
        .join('\n\n'),
  )

  sections.push(
    '## RECETAS DISPONIBLES\n' +
      recipes
        .map(
          (r) =>
            `### ${r.title} (${r.mealType})\nIngredientes: ${r.ingredients.join(', ')}\nPreparación: ${r.steps.join(' ')}` +
            (r.portionNote ? `\nNota de ración: ${r.portionNote}` : ''),
        )
        .join('\n\n'),
  )

  sections.push(
    '## ALIMENTOS PERMITIDOS (cesta de la compra)\n' +
      allowedFoodGroups.map((g) => `- ${g.title}: ${g.items.join(', ')}`).join('\n'),
  )

  sections.push(
    '## ALIMENTOS A EVITAR POR AHORA (FODMAP, temporal)\n' +
      fodmapFoodGroups.map((g) => `- ${g.title}: ${g.items.join(', ')}`).join('\n'),
  )

  sections.push(
    '## ALIMENTOS A EVITAR SIEMPRE (ultraprocesados y azúcares)\n' +
      avoidFoodGroups.map((g) => `- ${g.title}: ${g.items.join(', ')}`).join('\n'),
  )

  sections.push(
    '## NORMAS GENERALES\n' + generalRules.map((r) => `- ${r}`).join('\n'),
  )

  sections.push(
    '## ESTRUCTURA DE COMIDAS\n' +
      `1º plato: ${mealStructure.primerPlato}\n2º plato: ${mealStructure.segundoPlato}\nPostre: ${mealStructure.postre}\nNota: ${mealStructure.nota}\n\n` +
      `Frecuencia semanal comidas:\n${weeklyFrequency.comidas.map((l) => `- ${l}`).join('\n')}\n\n` +
      `Frecuencia semanal cenas:\n${weeklyFrequency.cenas.map((l) => `- ${l}`).join('\n')}`,
  )

  sections.push(
    '## RACIONES (en crudo)\n' +
      portionEquivalences.map((p) => `- ${p.food}: ${p.amount}${p.note ? ` (${p.note})` : ''}`).join('\n') +
      `\n${portionNote}`,
  )

  sections.push(
    '## CALCIO\n' +
      `${calciumTarget}\n` +
      calciumEquivalences.map((c) => `- ${c.food}: ${c.ration} = ${c.calcium}`).join('\n') +
      `\nReduce la absorción de calcio: ${calciumInhibitors.join(', ')}.`,
  )

  sections.push('## CONSEJOS DE COCINA\n' + cookingTips.map((t) => `- ${t}`).join('\n'))

  return sections.join('\n\n')
}

export const DIET_CONTEXT = buildDietContext()

export const SYSTEM_PROMPT = `Eres el asistente de la app "Dieta de Maria", que ayuda a Maria Torvisco a seguir el plan de alimentación personalizado que le recetó su nutricionista (Clínica Neogenia, Madrid). Es un plan bajo en FODMAPs.

REGLAS ESTRICTAS:
- Basa TODAS tus respuestas únicamente en el plan de alimentación que aparece más abajo. Es tu única fuente de verdad. No inventes reglas, alimentos ni recomendaciones que no estén en él.
- Si te preguntan si un alimento está permitido, compáralo con las listas de "alimentos permitidos", "a evitar por ahora (FODMAP)" y "a evitar siempre" del plan.
- Si te piden una receta o idea de comida, usa las recetas y el menú de 7 días del plan.
- Si te preguntan por horarios o suplementos, usa exactamente los datos del plan (dosis, horas, temporada).
- Si la pregunta trata de algo que el plan NO cubre (otras dietas, medicamentos no mencionados, síntomas médicos, diagnósticos, cambios en el tratamiento, etc.), dilo con amabilidad y recomienda que lo consulte con su nutricionista o médico. No des consejo médico por tu cuenta ni sustituyas a un profesional.
- Responde siempre en español, con frases cortas, cálidas y muy fáciles de entender. Maria es una persona mayor; evita tecnicismos y listas largas salvo que ayuden a la claridad.
- Sé breve: 2-4 frases en la mayoría de los casos, salvo que te pidan una receta completa.
- Si el usuario te envía una FOTO de un menú de restaurante o de un plato de comida: léela con atención, identifica los platos o alimentos que aparezcan y, comparándolos con el plan, di cuáles encajan bien, cuáles es mejor evitar por ahora y cómo se podría pedir un plato modificado para que encaje (por ejemplo, sin ajo ni cebolla, a la plancha en vez de frito, la salsa aparte). Termina siempre con una recomendación clara y sencilla de qué pedir. Si la foto no se ve bien o no parece comida ni un menú, pídele con amabilidad otra foto.

PLAN DE ALIMENTACIÓN COMPLETO:

${DIET_CONTEXT}`
