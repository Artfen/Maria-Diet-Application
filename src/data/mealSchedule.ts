export interface MealSlot {
  id: string
  time: string // HH:MM 24h
  label: string
  /** Generic description shown when the slot isn't tied to the 7-day comida/cena rotation */
  description?: string
  /** true if this slot's content comes from the weekMenu rotation instead of `description` */
  fromWeekMenu?: boolean
}

export const mealSchedule: MealSlot[] = [
  {
    id: 'ayunas',
    time: '07:00',
    label: 'En ayunas',
    description:
      'Agua caliente templada. Si las heces están duras, añade un chorreón de aceite de oliva; si están normales o sueltas, solo el agua templada.',
  },
  {
    id: 'desayuno',
    time: '07:30',
    label: 'Desayuno',
    description:
      'Café con leche sin lactosa + 60g de pan NO integral (espelta, maíz o trigo sarraceno) pintado con aceite de oliva virgen extra y tomate (opcional) + 100g de queso fresco sin lactosa. También puedes añadir: atún, melva, salmón, huevo, 30g de crema de cacahuete, o 70g de fiambre de pavo o pollo (no de bar, >90% carne, sin azúcar añadido, bajo en sal — máximo 2 veces por semana).',
  },
  {
    id: 'media-manana-1',
    time: '10:30',
    label: 'Media mañana',
    description: 'Una pieza de fruta (NO zumo) + 5g de picos de pan.',
  },
  {
    id: 'media-manana-2',
    time: '13:30',
    label: '2ª media mañana',
    description:
      'Elige una opción: 25g de frutos secos · altramuces · 30g de edamame. Si tienes comida de trabajo, esta toma no siempre encajará por horario.',
  },
  {
    id: 'comida',
    time: '16:00',
    label: 'Comida',
    fromWeekMenu: true,
  },
  {
    id: 'merienda',
    time: '19:00',
    label: 'Merienda',
    description:
      'Elige una opción: yogur natural sin lactosa o kéfir + cereales de maíz sin azúcar añadido (puedes añadir aromas, chocolate negro o canela) · yogur o kéfir + 1 pieza de fruta · picos de maíz o pan de espelta con algo que no hayas tomado en el desayuno · arroz con leche casero sin lactosa (con edulcorante y canela) · bizcocho casero (harinas permitidas, huevo, fruta, cacao puro) con edulcorante.',
  },
  {
    id: 'cena',
    time: '21:30',
    label: 'Cena',
    fromWeekMenu: true,
    description: 'No cenar más tarde de esta hora para poder cumplir el ayuno nocturno.',
  },
]
