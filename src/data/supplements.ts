export interface Supplement {
  id: string
  name: string
  brand: string
  dose: string
  timing: string
  /** which meal-slot this pairs with, for showing inline on the Hoy screen */
  slotId: string
  seasonal?: { fromMonth: number; toMonth: number } // 1-12, inclusive, both ends included
  duration?: string
  notes?: string
  link?: string
  linkLabel?: string
}

export const supplements: Supplement[] = [
  {
    id: 'lentinan',
    name: 'Lentinan (extracto puro de Shiitake)',
    brand: 'Hifas da Terra',
    dose: '20 gotas disueltas en agua',
    timing: 'En ayunas. Deja actuar el líquido en la boca alrededor de 1 minuto antes de tragar.',
    slotId: 'ayunas',
    duration: '2-3 meses',
    link: 'https://www.hifasdaterra.com',
    linkLabel: 'hifasdaterra.com (código RSA10)',
  },
  {
    id: 'mico-leo',
    name: 'Mico-Leo (extracto puro de melena de león)',
    brand: 'Hifas da Terra',
    dose: '2-0-0 (2 por la mañana)',
    timing: 'Por la mañana.',
    slotId: 'desayuno',
    link: 'https://www.hifasdaterra.com',
    linkLabel: 'hifasdaterra.com (código RSA10)',
  },
  {
    id: 'vitamina-d3-k2',
    name: 'Vitamina D3 + K2',
    brand: 'IVB Wellness',
    dose: '0-0-1 (1 por la noche)',
    timing: 'Por la noche, solo de octubre a junio (ambos incluidos).',
    slotId: 'cena',
    seasonal: { fromMonth: 10, toMonth: 6 },
    link: 'https://ivbwellness.com?sca_ref=7388622.78ey9SO0pQV6qAF',
    linkLabel: 'ivbwellness.com (código IVBPAST25-RAQUELSANTOSALFONSO)',
  },
  {
    id: 'omega-3',
    name: 'Omega 3 (EPA)',
    brand: 'IVB Wellness',
    dose: '2 cápsulas',
    timing: 'Después de comer (el bote de línea roja).',
    slotId: 'comida',
    link: 'https://ivbwellness.com?sca_ref=7388622.78ey9SO0pQV6qAF',
    linkLabel: 'ivbwellness.com (código IVBPAST25-RAQUELSANTOSALFONSO)',
  },
  {
    id: 'magnesio-total',
    name: 'Magnesio Total',
    brand: 'IVB Wellness',
    dose: '0-0-2 (2 por la noche)',
    timing: 'Por la noche. Uso anual.',
    slotId: 'cena',
    link: 'https://ivbwellness.com?sca_ref=7388622.78ey9SO0pQV6qAF',
    linkLabel: 'ivbwellness.com (código IVBPAST25-RAQUELSANTOSALFONSO)',
  },
]

/** true if a seasonal supplement is active for the given month (1-12) */
export function isSeasonalSupplementActive(supplement: Supplement, month: number): boolean {
  if (!supplement.seasonal) return true
  const { fromMonth, toMonth } = supplement.seasonal
  if (fromMonth <= toMonth) {
    return month >= fromMonth && month <= toMonth
  }
  // wraps around the year, e.g. Oct(10) -> Jun(6)
  return month >= fromMonth || month <= toMonth
}
