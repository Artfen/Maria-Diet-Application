export type FoodStatus = 'permitido' | 'fodmap' | 'evitar'

export interface FoodGroup {
  id: string
  title: string
  status: FoodStatus
  /** short reason shown in the checker result */
  reason: string
  items: string[]
}

// ---- PERMITIDO: la "cesta de la compra" ----
export const allowedFoodGroups: FoodGroup[] = [
  {
    id: 'verduras',
    title: 'Verduras y hortalizas',
    status: 'permitido',
    reason: 'Permitido, forma parte de tu cesta de la compra.',
    items: [
      'Acelga', 'Espinacas', 'Brócoli (cabezas)', 'Pimiento rojo (cocinado)', 'Pimiento verde crudo (<300g)',
      'Calabacín', 'Calabaza', 'Berenjena', 'Judías verdes', 'Borraja', 'Cardo', 'Col china', 'Chirivía',
      'Brotes de bambú', 'Nabo', 'Rábano', 'Remolacha (<250mg)', 'Brotes verdes', 'Escarola', 'Lechuga',
      'Repollo blanco', 'Endivias', 'Rúcula', 'Canónigos', 'Kale', 'Bimi', 'Cogollos', 'Pepino', 'Tomate',
      'Zanahoria', 'Apio (<30g)', 'Parte verde de cebollino, cebolleta y puerro', 'Pepinillos (encurtido)',
    ],
  },
  {
    id: 'cereales',
    title: 'Tubérculos, harinas y cereales no integrales',
    status: 'permitido',
    reason: 'Permitido, forma parte de tu cesta de la compra.',
    items: [
      'Arroz', 'Quinoa', 'Trigo sarraceno', 'Maíz / maicena', 'Maíz en grano', 'Avena', 'Trigo espelta',
      'Tapioca', 'Sorgo', 'Mijo', 'Gofio', 'Patata', 'Batata', 'Boniato', 'Yuca', 'Chufa', 'Ñame',
      'Pasta (macarrones, espaguetis, fideos) de arroz, maíz, trigo sarraceno o espelta',
      'Picos o palillos de pan (arroz, maíz, trigo sarraceno, espelta)', 'Noodles de arroz', 'Cuscús de arroz',
      'Pan de masa madre y fermentación larga',
    ],
  },
  {
    id: 'frutas-permitidas',
    title: 'Frutas no maduras (bajas en fructosa)',
    status: 'permitido',
    reason: 'Permitido — combínala con un alimento rico en glucosa (pan, arroz, patata, pasta...) para sentarte mejor.',
    items: [
      'Plátano', 'Pomelo', 'Pitaya', 'Fresa (<70g)', 'Lima', 'Limón', 'Papaya', 'Mandarina', 'Naranja',
      'Kiwi', 'Maracuyá', 'Melón', 'Frambuesas', 'Arándanos', 'Piña', 'Níspero', 'Uvas', 'Coco',
    ],
  },
  {
    id: 'frutos-secos',
    title: 'Frutos secos y semillas',
    status: 'permitido',
    reason: 'Permitido, forma parte de tu cesta de la compra.',
    items: [
      'Castañas', 'Nueces', 'Cacahuetes', 'Piñones', 'Chufas', 'Pipas de girasol', 'Pipas de calabaza',
      'Cáñamo (no tan recomendable)', 'Lino (no tan recomendable)', 'Chía (no tan recomendable)', 'Sésamo (no tan recomendable)',
    ],
  },
  {
    id: 'edulcorantes-ok',
    title: 'Edulcorantes permitidos',
    status: 'permitido',
    reason: 'Permitido como edulcorante.',
    items: ['Dextrosa', 'Sirope de arroz', 'Sucralosa', 'Glucosa', 'Ésteres de esteviol (stevia)', 'Tagatosa'],
  },
  {
    id: 'grasas',
    title: 'Aceites, grasas y condimentos',
    status: 'permitido',
    reason: 'Permitido, forma parte de tu cesta de la compra.',
    items: [
      'Aceite de oliva virgen extra', 'Aceite de girasol', 'Aceite de coco', 'Aceitunas (25g/día)',
      'Especias suaves', 'Hierbas aromáticas', 'Sal', 'Vinagre', 'Mostaza pura', 'Mayonesa casera',
      'Salsa de soja (sin azúcar añadido)', 'Canela', 'Cacao puro', 'Aroma de vainilla / azahar / coco', 'Levadura',
    ],
  },
  {
    id: 'lacteos',
    title: 'Lácteos sin lactosa',
    status: 'permitido',
    reason: 'Permitido siempre que sea sin lactosa.',
    items: [
      'Queso fresco sin lactosa', 'Yogur natural sin lactosa', 'Kéfir', 'Leche semi o entera sin lactosa',
      'Bebida vegetal de arroz o coco enriquecida en calcio (sin azúcar añadido)',
    ],
  },
  {
    id: 'infusiones',
    title: 'Infusiones y bebidas',
    status: 'permitido',
    reason: 'Permitido.',
    items: [
      'Manzanilla', 'Roibos', 'Té verde', 'Tila', 'Comino', 'Orégano (infusión)', 'Jengibre', 'Laurel',
      'Tomillo', 'Cúrcuma', 'Anís estrellado', 'Café (según tolerancia)',
    ],
  },
  {
    id: 'proteina',
    title: 'Proteína animal y vegetal',
    status: 'permitido',
    reason: 'Permitido, forma parte de tu cesta de la compra.',
    items: [
      'Carne magra blanca', 'Carne magra roja', 'Pescado azul', 'Pescado blanco', 'Marisco (crustáceo, molusco)',
      'Huevo', 'Edamame', 'Tempeh', 'Tofu firme escurrido', 'Haba mungo verde',
    ],
  },
]

// ---- FODMAP: retirado temporalmente ----
export const fodmapFoodGroups: FoodGroup[] = [
  {
    id: 'oligosacaridos',
    title: 'Oligosacáridos (fructanos y galactanos)',
    status: 'fodmap',
    reason: 'Evitar por ahora: es un FODMAP (oligosacárido) retirado temporalmente de tu dieta.',
    items: [
      'Cebolla', 'Puerro (parte blanca)', 'Cebolleta (parte blanca)', 'Cebollino (bulbo)', 'Ajo', 'Brotes de ajo',
      'Chalota', 'Alcachofa', 'Espárrago', 'Col', 'Coles de Bruselas (>100g)', 'Coliflor (>200g)',
      'Troncos de brócoli', 'Repollo (lombarda)', 'Achicoria', 'Hinojo', 'Pistacho', 'Anacardo', 'Avellana',
      'Almendra', 'Lentejas', 'Garbanzos', 'Judías blancas', 'Judías rojas', 'Guisantes', 'Habas', 'Soja',
      'Altramuces', 'Caqui / persimón', 'Sandía', 'Granada', 'Chirimoya', 'Plátano muy maduro', 'Trigo',
      'Cebada', 'Centeno', 'Amaranto', 'Bulgur', 'Algarroba', 'Kombucha', 'Bebida de avena',
    ],
  },
  {
    id: 'disacaridos',
    title: 'Disacáridos (lactosa)',
    status: 'fodmap',
    reason: 'Evitar por ahora: contiene lactosa. Usa siempre la versión sin lactosa.',
    items: ['Queso con lactosa', 'Yogur con lactosa', 'Leche con lactosa'],
  },
  {
    id: 'monosacaridos',
    title: 'Monosacáridos (fructosa)',
    status: 'fodmap',
    reason: 'Evitar por ahora: es rico en fructosa libre.',
    items: [
      'Espárragos', 'Alcachofas', 'Pimiento amarillo', 'Naranja cruda', 'Pimiento rojo crudo', 'Manzana',
      'Pera', 'Sandía', 'Mango', 'Albaricoque', 'Zarzamora', 'Higo', 'Breva', 'Lichi',
      'Fruta enlatada en jugo natural', 'Dátil', 'Uvas pasas', 'Ciruelas pasas', 'Orejones', 'Alga nori',
      'Zumo de tomate', 'Puré de tomate', 'Mermelada',
    ],
  },
  {
    id: 'polioles',
    title: 'Polioles (manitol, xilitol, sorbitol, maltitol)',
    status: 'fodmap',
    reason: 'Evitar por ahora: contiene polioles fermentables.',
    items: [
      'Champiñones', 'Setas', 'Apio (>30g)', 'Manzana', 'Pera', 'Albaricoque', 'Sandía', 'Ciruela', 'Mora',
      'Cerezas', 'Nectarina', 'Melocotón', 'Paraguayo', 'Aguacate', 'Uvas pasas', 'Ciruelas pasas', 'Alga wakame',
    ],
  },
]

// ---- EVITAR SIEMPRE: procesados, ultraprocesados y azúcares ----
export const avoidFoodGroups: FoodGroup[] = [
  {
    id: 'ultraprocesados',
    title: 'Procesados y ultraprocesados',
    status: 'evitar',
    reason: 'Evitar siempre: ultraprocesado, rico en grasas saturadas, azúcar y/o sal.',
    items: [
      'Alcohol', 'Zumos envasados', 'Refrescos (con y sin gas)', 'Bollería y repostería industrial',
      'Galletas', 'Cereales azucarados', 'Magdalenas', 'Barritas de cereales', 'Cacao instantáneo azucarado (Colacao, Nesquik)',
      'Embutidos', 'Jamón de york / pavo procesado', 'Chopped', 'Mortadela', 'Salchichas',
      'Preparados cárnicos', 'Carne rellena', 'Patés', 'Sobrasada', 'Queso de untar', 'Quesitos',
      'Natillas', 'Flanes', 'Mantequilla', 'Margarina', 'Nata', 'Leche condensada', 'Helados', 'Batidos envasados',
      'Lasaña envasada', 'Empanada', 'Empanadilla', 'Pizza', 'Frituras', 'Nuggets', 'Pan de molde',
      'Pan semicocido (baguette, andaluzas...)', 'Palitos de mar', 'Gulas', 'Sándwiches envasados',
      'Snacks tipo Doritos', 'Chucherías', 'Chicles y caramelos sin azúcar', 'Alimentos "Light" o "0%"',
      'Alimentos elaborados con aceites refinados',
    ],
  },
  {
    id: 'azucares',
    title: 'Azúcares y edulcorantes no recomendados',
    status: 'evitar',
    reason: 'Evitar siempre.',
    items: [
      'Azúcar blanca (refinada)', 'Azúcar panela (sin refinar)', 'Miel', 'Agave', 'Fructosa (como edulcorante)',
      'Sorbitol (E-420)', 'Manitol', 'Xilitol', 'Eritritol', 'Maltitol', 'Sacarina', 'Aspartamo',
      'Acesulfamo K', 'Ciclamato monosódico',
    ],
  },
]

export const allFoodGroups: FoodGroup[] = [...allowedFoodGroups, ...fodmapFoodGroups, ...avoidFoodGroups]

export interface FoodIndexEntry {
  name: string
  status: FoodStatus
  groupTitle: string
  reason: string
}

const COMBINING_DIACRITICS = /[̀-ͯ]/g

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(COMBINING_DIACRITICS, '').trim()
}

export const foodIndex: FoodIndexEntry[] = allFoodGroups.flatMap((group) =>
  group.items.map((item) => ({
    name: item,
    status: group.status,
    groupTitle: group.title,
    reason: group.reason,
  })),
)

export function searchFoods(query: string): FoodIndexEntry[] {
  const q = normalize(query)
  if (!q) return []
  return foodIndex.filter((entry) => normalize(entry.name).includes(q))
}
