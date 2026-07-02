export interface DayMenu {
  day: number // 1-7
  dayName: string
  comida: { summary: string; recipeId: string }
  cena: { summary: string; recipeId: string }
}

export const weekMenu: DayMenu[] = [
  {
    day: 1,
    dayName: 'Primer día',
    comida: { summary: 'Espinacas rehogadas + salmón al horno + pan + fruta fresca', recipeId: 'comida-salmon-espinacas' },
    cena: { summary: 'Ensalada templada de canónigos y tiras de zanahoria + pollo a la plancha + pan', recipeId: 'cena-pollo-canonigos' },
  },
  {
    day: 2,
    dayName: 'Segundo día',
    comida: { summary: 'Acelgas salteadas + dorada al horno + pan + fruta fresca', recipeId: 'comida-dorada-acelgas' },
    cena: { summary: 'Cogollos con tiras de pimiento rojo + montadito de tortilla francesa', recipeId: 'cena-tortilla-cogollos' },
  },
  {
    day: 3,
    dayName: 'Tercer día',
    comida: { summary: 'Ensalada caprese (tomate + mozzarella sin lactosa) + piñones tostados + pan', recipeId: 'comida-caprese-pinones' },
    cena: { summary: 'Judías verdes aliñadas con atún + pan + fruta fresca', recipeId: 'cena-judias-atun' },
  },
  {
    day: 4,
    dayName: 'Cuarto día',
    comida: { summary: 'Canónigos con tiras de zanahoria y edamame + pasta salteada con especias, piñones y mejillones (sin pan)', recipeId: 'comida-pasta-mejillones' },
    cena: { summary: 'Revuelto de verduras (tomate cherry, calabacín, pimiento verde) con huevo + pan + fruta fresca', recipeId: 'cena-revuelto-verduras' },
  },
  {
    day: 5,
    dayName: 'Quinto día',
    comida: { summary: 'Ensalada de endivias y pepino con tiras de zanahoria + brocheta de pollo + pan', recipeId: 'comida-brocheta-pollo' },
    cena: { summary: 'Berenjenas salteadas o a la plancha + lenguado a la plancha + pan + fruta fresca', recipeId: 'cena-lenguado-berenjena' },
  },
  {
    day: 6,
    dayName: 'Sexto día',
    comida: { summary: 'Ensalada de patata cocida, endivias, tomate, pepino, naranja, piñones y atún (sin pan)', recipeId: 'comida-ensalada-patata-atun' },
    cena: { summary: 'Puré de calabaza + huevo poché o tortilla francesa + pan + fruta fresca', recipeId: 'cena-pure-calabaza-huevo' },
  },
  {
    day: 7,
    dayName: 'Séptimo día',
    comida: { summary: 'Ensalada de canónigos y rúcula con zanahoria, nueces y quinoa, vinagreta de tahini (sin pan)', recipeId: 'comida-quinoa-tahini' },
    cena: { summary: 'Gazpacho casero (sin ajo ni cebolla) + lenguado a la plancha + pan + fruta fresca', recipeId: 'cena-gazpacho-lenguado' },
  },
]

export function getDayMenu(day: number): DayMenu {
  const normalized = ((day - 1) % 7 + 7) % 7 + 1
  return weekMenu.find((d) => d.day === normalized) ?? weekMenu[0]
}
