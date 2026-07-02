export const generalRules: string[] = [
  'Reparte las comidas en distintas tomas al día, en volúmenes pequeños, y no dejes pasar más de 3 horas entre toma y toma desde que te levantas.',
  'Mastica bien los alimentos y come despacio para hacer mejor la digestión.',
  'No tomes agua ni líquidos justo antes, durante o justo después de las comidas y las cenas — mejor sorbos pequeños a lo largo del día.',
  'Aprende a gestionar el estrés y practica técnicas de relajación.',
  'La cocción del arroz, la pasta y las patatas debe ser prolongada, y conviene mantenerlos 24 horas en la nevera después de cocerlos (así se forma almidón resistente, un prebiótico).',
  'Deja 10-12 horas de ayuno nocturno.',
  'Las verduras y frutas ricas en fructosa te sentarán mejor si las combinas, en la misma comida, con alimentos ricos en glucosa: maíz, patata, pasta, arroz, pan, avena, trigo sarraceno, espelta o boniato.',
]

export const mealStructure = {
  primerPlato: 'Verdura cocinada o cruda (incluye sopas, cremas o gazpacho).',
  segundoPlato:
    'Proteína animal (carne, pescado, huevo) y/o proteína vegetal (frutos secos, edamame) + hidratos de carbono (pasta, patata, arroz, pan).',
  postre: 'Fruta fresca.',
  nota:
    'Si tomas verdura cruda en la comida o cena no hace falta tomar fruta de postre. Si tomas verdura cocinada, la fruta debe ser una ración pequeña y no madura (máximo 100g).',
}

export const weeklyFrequency = {
  comidas: [
    '3 días a la semana: verdura cocinada o cruda + pasta / quinoa / patata / arroz (de segundo plato) + frutos secos + 50g de proteína animal. Los frutos secos, tomados de postre, combinan con el segundo plato y aportan una proteína vegetal de alta calidad, más saludable que la animal.',
    '4 días a la semana: verdura cocinada o cruda + carne / pescado / lácteo / huevo + pan + fruta.',
  ],
  cenas: [
    'Verdura cocinada o cruda + carne / pescado / queso / huevo (sin repetir lo del mediodía) + pan + fruta.',
  ],
}

export interface PortionEquivalence {
  food: string
  amount: string
  note?: string
}

export const portionEquivalences: PortionEquivalence[] = [
  { food: 'Carne blanca', amount: '170g en crudo', note: '1 vez a la semana, o 90g de fiambre de pavo/pollo (>95-99% carne, sin azúcar añadido)' },
  { food: 'Carne roja', amount: '160g en crudo', note: '1 vez a la semana, o 60g de fiambre de jamón serrano' },
  { food: 'Pescado blanco, azul, crustáceo o marisco', amount: '170g en crudo', note: '3-4 veces a la semana' },
  { food: 'Huevo', amount: '170g', note: '3-4 veces a la semana' },
  { food: 'Yogur natural sin azúcar', amount: '125g', note: '2-3 raciones al día de lácteos en total, incluyendo queso y leche' },
  { food: 'Queso fresco', amount: '80g' },
  { food: 'Queso semicurado', amount: '40g' },
  { food: 'Frutos secos', amount: '25g', note: 'sin sal' },
  { food: 'Arroz, quinoa o pasta', amount: '60g de ración, o 50g / 40g de guarnición', note: 'según lo tomes en la comida o en la cena' },
  { food: 'Pan', amount: '60g', note: 'equivale a 60g de picos o 60g de biscotes' },
  { food: 'Patata', amount: '150g de ración, o 100g / 50g de guarnición', note: 'según lo tomes en la comida o en la cena' },
]

export const portionNote =
  'Por la noche es cuando menos hidratos de carbono necesita el cuerpo, porque te vas a dormir — modera la ración en la cena.'

export const calciumTarget = 'Debes tomar alrededor de 900mg de calcio al día.'

export interface CalciumEquivalence {
  food: string
  ration: string
  calcium: string
}

export const calciumEquivalences: CalciumEquivalence[] = [
  { food: 'Leche', ration: '250ml = 1 vaso / 1 taza', calcium: '300mg de calcio' },
  { food: 'Bebida vegetal de avena con calcio (Hacendado)', ration: '250ml', calcium: '300mg de calcio' },
  { food: 'Yogur', ration: '250ml = 2 unidades (1 unidad = 180mg)', calcium: '360mg de calcio' },
]

export const calciumInhibitors: string[] = [
  'Café y té',
  'Alimentos con mucha fibra insoluble: harinas y cereales integrales',
  'Alimentos ricos en grasa saturada de cadena larga (todo lo procesado)',
  'Frutas con taninos: granada, uva, membrillo, caqui, manzana verde, grosella, arándano, fresa y nueces',
]

export const cookingTips: string[] = [
  'No utilices más de 3-5 cucharadas soperas de aceite de oliva al día.',
  'El pescado y/o la carne puedes hacerlos a la plancha con 1 cucharada de postre de aceite.',
  'Para que no se pegue, macera antes con limón y perejil.',
  'Para guisos, añade menos aceite en la sartén o cazuela y usa agua para cocer el alimento.',
  'También puedes hacerlo al horno: en la bandeja pon una cucharada de postre de aceite, el pescado o carne macerado y verduras permitidas por encima.',
  'Otra opción es hervido: pocha las verduras con poco aceite, añade el pescado con agua y deja cocer hasta que esté hecho.',
  'También puedes cocinarlo a la brasa o a la parrilla.',
]
