export type MealType = 'desayuno' | 'comida' | 'merienda' | 'cena'

export interface Recipe {
  id: string
  title: string
  mealType: MealType
  /** true if this dish is one of the 7 fixed comida/cena from the plan */
  fromWeekMenu?: boolean
  servings: string
  ingredients: string[]
  steps: string[]
  portionNote?: string
}

export const recipes: Recipe[] = [
  // ---- Comidas y cenas del plan semanal de 7 días ----
  {
    id: 'comida-salmon-espinacas',
    title: 'Espinacas rehogadas con salmón al horno',
    mealType: 'comida',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: [
      '200g de espinacas frescas',
      '170g de salmón (ración de pescado azul)',
      '1 cucharada de postre de aceite de oliva virgen extra',
      'Parte verde de un cebollino (opcional, en vez de ajo)',
      'Limón, sal',
      '60g de pan de espelta o trigo sarraceno',
      '1 pieza de fruta fresca no madura',
    ],
    steps: [
      'Rehoga las espinacas en una sartén con un poco de aceite y agua hasta que reduzcan, salpimenta.',
      'Coloca el salmón en una bandeja de horno con una cucharada de postre de aceite, un chorrito de limón y sal.',
      'Hornea a 180ºC durante 12-15 minutos hasta que esté hecho.',
      'Sirve con las espinacas, el pan y la fruta de postre.',
    ],
    portionNote: '170g de pescado azul en crudo · 60g de pan · fruta pequeña si la verdura es cocinada.',
  },
  {
    id: 'cena-pollo-canonigos',
    title: 'Ensalada templada de canónigos y pollo a la plancha',
    mealType: 'cena',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: [
      '80g de canónigos', '1 zanahoria en tiras', '170g de pechuga de pollo', '1 cucharada de postre de aceite de oliva',
      'Vinagre, sal', '60g de pan',
    ],
    steps: [
      'Cocina la pechuga de pollo a la plancha con una cucharada de postre de aceite, macerada antes con limón si quieres que no se pegue.',
      'Corta el pollo en tiras y sirve templado sobre los canónigos y la zanahoria.',
      'Aliña con aceite y vinagre. Acompaña con el pan.',
    ],
    portionNote: '170g de carne blanca en crudo (máx. 1 vez por semana) · 60g de pan. Al llevar verdura cruda no necesitas fruta de postre.',
  },
  {
    id: 'comida-dorada-acelgas',
    title: 'Acelgas salteadas con dorada al horno',
    mealType: 'comida',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: ['200g de acelgas', '170g de dorada (pescado blanco)', 'Aceite de oliva virgen extra', 'Limón, sal', '60g de pan', '1 pieza de fruta fresca'],
    steps: [
      'Saltea las acelgas troceadas en una sartén con un poco de aceite y agua hasta que estén tiernas.',
      'Coloca la dorada en una bandeja con una cucharada de postre de aceite, limón y sal.',
      'Hornea a 180ºC 15-18 minutos.',
      'Sirve con las acelgas, el pan y la fruta de postre.',
    ],
    portionNote: '170g de pescado blanco en crudo · 60g de pan.',
  },
  {
    id: 'cena-tortilla-cogollos',
    title: 'Cogollos con tiras de pimiento rojo y montadito de tortilla francesa',
    mealType: 'cena',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: ['2 cogollos', '1/2 pimiento rojo cocinado en tiras', '2 huevos', 'Aceite de oliva', 'Sal', '60g de pan'],
    steps: [
      'Bate los huevos y cuaja una tortilla francesa fina en la sartén con muy poco aceite.',
      'Coloca la tortilla sobre una rodaja de pan a modo de montadito.',
      'Sirve con los cogollos y las tiras de pimiento rojo aliñados con aceite.',
    ],
    portionNote: '170g de huevo (2-3 unidades) · 60g de pan.',
  },
  {
    id: 'comida-caprese-pinones',
    title: 'Ensalada caprese con piñones tostados',
    mealType: 'comida',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: ['2 tomates', '80g de mozzarella sin lactosa', '25g de piñones', 'Aceite de oliva virgen extra', 'Orégano, sal', '60g de pan'],
    steps: [
      'Corta el tomate y la mozzarella en rodajas y alterna en el plato.',
      'Tuesta los piñones un par de minutos en una sartén sin aceite, vigilando que no se quemen.',
      'Aliña con aceite de oliva, orégano y sal. Reparte los piñones por encima.',
      'Acompaña con el pan.',
    ],
    portionNote: '80g de queso fresco/mozzarella sin lactosa · 25g de frutos secos · 60g de pan.',
  },
  {
    id: 'cena-judias-atun',
    title: 'Judías verdes aliñadas con atún',
    mealType: 'cena',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: ['250g de judías verdes', '170g de atún fresco o en conserva (al natural)', 'Aceite de oliva virgen extra', 'Vinagre, sal', '60g de pan', '1 pieza de fruta fresca'],
    steps: [
      'Cuece las judías verdes al vapor o en agua hasta que estén tiernas y escurre bien.',
      'Deja templar y añade el atún desmenuzado.',
      'Aliña con aceite, vinagre y sal.',
      'Sirve con el pan y la fruta de postre.',
    ],
    portionNote: '170g de pescado azul en crudo (o conserva equivalente) · 60g de pan.',
  },
  {
    id: 'comida-pasta-mejillones',
    title: 'Canónigos con edamame y pasta salteada con mejillones y piñones',
    mealType: 'comida',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: ['60g de canónigos', '1 zanahoria en tiras', '30g de edamame', '60g de pasta de arroz o maíz', '150g de mejillones al natural o al vapor', '15g de piñones', 'Especias suaves, aceite de oliva'],
    steps: [
      'Cuece la pasta según el envase, cuela y reserva (si sobra, enfríala 24h en la nevera para el almidón resistente).',
      'Saltea la pasta con un poco de aceite, especias suaves y los piñones.',
      'Añade los mejillones ya cocidos y saltea 2 minutos más.',
      'Sirve acompañado de los canónigos, la zanahoria y el edamame aliñados aparte.',
    ],
    portionNote: '60g de pasta como ración · sin pan este día.',
  },
  {
    id: 'cena-revuelto-verduras',
    title: 'Revuelto de verduras con huevo',
    mealType: 'cena',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: ['Tomates cherry', '1/2 calabacín', '1/2 pimiento verde', '2 huevos', 'Aceite de oliva virgen extra', 'Sal', '60g de pan', '1 pieza de fruta fresca'],
    steps: [
      'Saltea el calabacín y el pimiento verde troceados con un poco de aceite hasta que estén tiernos.',
      'Añade los tomates cherry partidos por la mitad y saltea 2 minutos más.',
      'Bate los huevos, añádelos a la sartén y cuaja el revuelto removiendo suavemente.',
      'Sirve con el pan y la fruta de postre.',
    ],
    portionNote: '170g de huevo (2-3 unidades) · 60g de pan.',
  },
  {
    id: 'comida-brocheta-pollo',
    title: 'Ensalada de endivias y pepino con brocheta de pollo',
    mealType: 'comida',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: ['2 endivias', '1/2 pepino', '1 zanahoria en tiras', '170g de pechuga de pollo en dados', 'Aceite de oliva, limón', 'Sal', '60g de pan', '1 pieza de fruta fresca'],
    steps: [
      'Marina los dados de pollo con limón, aceite y sal unos minutos.',
      'Ensarta en brochetas y cocina a la plancha hasta que estén dorados y hechos por dentro.',
      'Sirve sobre la ensalada de endivias, pepino y zanahoria.',
      'Acompaña con el pan y la fruta de postre.',
    ],
    portionNote: '170g de carne blanca en crudo (máx. 1 vez por semana) · 60g de pan.',
  },
  {
    id: 'cena-lenguado-berenjena',
    title: 'Berenjenas a la plancha con lenguado',
    mealType: 'cena',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: ['1 berenjena', '170g de lenguado', 'Aceite de oliva virgen extra', 'Limón, sal', '60g de pan', '1 pieza de fruta fresca'],
    steps: [
      'Corta la berenjena en rodajas o tiras y cocina a la plancha con un poco de aceite hasta que estén tiernas.',
      'Cocina el lenguado a la plancha con una cucharada de postre de aceite, vuelta y vuelta.',
      'Añade un chorrito de limón al servir.',
      'Acompaña con el pan y la fruta de postre.',
    ],
    portionNote: '170g de pescado blanco en crudo · 60g de pan.',
  },
  {
    id: 'comida-ensalada-patata-atun',
    title: 'Ensalada de patata cocida con atún y naranja',
    mealType: 'comida',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: ['150g de patata cocida (ración)', '2 endivias', 'Tomate sin piel en tacos', '1/2 pepino', '1 naranja', '15g de piñones', '1 lata de atún al natural', 'Aceite de oliva, sal'],
    steps: [
      'Cuece la patata con piel, deja enfriar y pela (mejor si se guarda 24h en la nevera para el almidón resistente).',
      'Corta la patata, el tomate pelado y el pepino en tacos. Pela y trocea la naranja.',
      'Mezcla todo con las endivias, el atún escurrido y los piñones.',
      'Aliña con aceite de oliva y sal. No lleva pan este día.',
    ],
    portionNote: '150g de patata como ración · sin pan este día.',
  },
  {
    id: 'cena-pure-calabaza-huevo',
    title: 'Puré de calabaza con huevo poché',
    mealType: 'cena',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: ['300g de calabaza', 'Semillas de calabaza, lino o chía (opcional)', '2 huevos', 'Aceite de oliva virgen extra', 'Sal', '60g de pan', '1 pieza de fruta fresca'],
    steps: [
      'Cuece la calabaza en agua o al vapor hasta que esté tierna y tritura con un poco de aceite y sal.',
      'Escalfa los huevos en agua caliente con un chorrito de vinagre (huevo poché) o haz una tortilla francesa.',
      'Sirve el puré con el huevo por encima y las semillas si quieres.',
      'Acompaña con el pan y la fruta de postre.',
    ],
    portionNote: '170g de huevo (2-3 unidades) · 60g de pan.',
  },
  {
    id: 'comida-quinoa-tahini',
    title: 'Ensalada de canónigos, rúcula y quinoa con vinagreta de tahini',
    mealType: 'comida',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: ['60g de canónigos y rúcula', '1 zanahoria en tiras', '25g de nueces', '60g de quinoa cocida', '1 cucharada de tahini', 'Aceite de oliva virgen extra', 'Limón, sal'],
    steps: [
      'Cuece la quinoa según el envase, escurre y deja templar.',
      'Prepara la vinagreta mezclando el tahini, aceite de oliva, limón y sal.',
      'Mezcla los canónigos, la rúcula, la zanahoria, las nueces y la quinoa.',
      'Aliña con la vinagreta de tahini justo antes de servir. No lleva pan este día.',
    ],
    portionNote: '60g de quinoa como ración · 25g de frutos secos · sin pan este día.',
  },
  {
    id: 'cena-gazpacho-lenguado',
    title: 'Gazpacho casero (sin ajo ni cebolla) con lenguado a la plancha',
    mealType: 'cena',
    fromWeekMenu: true,
    servings: '1 persona',
    ingredients: ['4 tomates maduros', '1/2 pepino', '1/2 pimiento verde', 'Aceite de oliva virgen extra', 'Vinagre, sal', '170g de lenguado', '60g de pan', '1 pieza de fruta fresca'],
    steps: [
      'Tritura el tomate, el pepino y el pimiento verde con aceite, vinagre y sal (sin ajo ni cebolla) hasta que quede fino.',
      'Cuela si prefieres una textura más ligera y enfría en la nevera.',
      'Cocina el lenguado a la plancha con una cucharada de postre de aceite.',
      'Sirve el gazpacho bien frío con el lenguado, el pan y la fruta de postre.',
    ],
    portionNote: '170g de pescado blanco en crudo · 60g de pan.',
  },

  // ---- Recetas adicionales para variar ----
  {
    id: 'desayuno-tostada-espelta-tomate',
    title: 'Tostada de espelta con tomate y queso fresco',
    mealType: 'desayuno',
    servings: '1 persona',
    ingredients: ['60g de pan de espelta', '1 tomate rallado', '100g de queso fresco sin lactosa', 'Aceite de oliva virgen extra', 'Sal'],
    steps: [
      'Tuesta el pan de espelta.',
      'Unta con el tomate rallado y un chorrito de aceite.',
      'Añade el queso fresco por encima y una pizca de sal.',
    ],
    portionNote: '60g de pan · 100g de queso fresco sin lactosa.',
  },
  {
    id: 'desayuno-revuelto-salmon-ahumado',
    title: 'Revuelto de huevo con salmón ahumado',
    mealType: 'desayuno',
    servings: '1 persona',
    ingredients: ['2 huevos', '50g de salmón ahumado', 'Aceite de oliva virgen extra', 'Cebollino (parte verde)', '60g de pan de trigo sarraceno'],
    steps: [
      'Bate los huevos y cuájalos suavemente en una sartén con un poco de aceite.',
      'Añade el salmón ahumado troceado al final para que se caliente sin cocinarse en exceso.',
      'Espolvorea con cebollino picado (parte verde) y sirve con el pan tostado.',
    ],
    portionNote: '60g de pan.',
  },
  {
    id: 'merienda-bizcocho-zanahoria',
    title: 'Bizcocho casero de zanahoria',
    mealType: 'merienda',
    servings: '6-8 porciones',
    ingredients: [
      '3 huevos', '150g de harina de arroz o trigo sarraceno', '2 zanahorias ralladas', '80ml de aceite de oliva suave o de girasol',
      'Edulcorante al gusto (eritritol no recomendado; usar sirope de arroz o stevia)', '1 sobre de levadura', 'Canela',
    ],
    steps: [
      'Precalienta el horno a 180ºC.',
      'Bate los huevos con el aceite y el edulcorante. Añade la zanahoria rallada.',
      'Incorpora la harina, la levadura y la canela con movimientos envolventes.',
      'Vierte en un molde y hornea 35-40 minutos hasta que al pinchar salga limpio.',
    ],
    portionNote: 'Corta en porciones pequeñas; combina con una infusión o café.',
  },
  {
    id: 'merienda-arroz-con-leche',
    title: 'Arroz con leche casero sin lactosa',
    mealType: 'merienda',
    servings: '2-3 porciones',
    ingredients: ['60g de arroz', '500ml de leche sin lactosa (o bebida de arroz enriquecida en calcio)', 'Canela en rama', 'Piel de limón', 'Edulcorante al gusto'],
    steps: [
      'Cuece el arroz en agua unos 5 minutos y escurre.',
      'Añade la leche, la canela en rama y la piel de limón, y cuece a fuego suave removiendo hasta que espese (20-25 min).',
      'Retira la canela y la piel de limón, endulza al gusto y deja enfriar.',
      'Sirve espolvoreado con canela molida.',
    ],
    portionNote: '60g de arroz como ración.',
  },
  {
    id: 'merienda-yogur-cereales-maiz',
    title: 'Yogur con cereales de maíz y chocolate negro',
    mealType: 'merienda',
    servings: '1 persona',
    ingredients: ['125g de yogur natural sin lactosa', '20g de cereales de maíz (sin azúcar añadido)', 'Unas onzas de chocolate negro (>85%) o cacao puro', 'Canela (opcional)'],
    steps: [
      'Vierte el yogur en un bol.',
      'Añade los cereales de maíz y el chocolate negro troceado justo antes de comer para que no se ablanden.',
      'Espolvorea con canela si te gusta.',
    ],
    portionNote: '125g de yogur natural sin azúcar.',
  },
  {
    id: 'comida-quinoa-gambas',
    title: 'Quinoa salteada con verduras y gambas',
    mealType: 'comida',
    servings: '1 persona',
    ingredients: ['60g de quinoa', '170g de gambas peladas', '1/2 calabacín', '1/2 pimiento rojo', 'Zanahoria en tiras', 'Aceite de oliva virgen extra', 'Sal, limón'],
    steps: [
      'Cuece la quinoa según el envase y reserva.',
      'Saltea las verduras troceadas en una sartén con un poco de aceite hasta que estén tiernas.',
      'Añade las gambas y saltea 2-3 minutos hasta que cambien de color.',
      'Incorpora la quinoa, mezcla bien y añade un chorrito de limón antes de servir.',
    ],
    portionNote: '60g de quinoa como ración · 170g de marisco en crudo.',
  },
  {
    id: 'comida-merluza-horno-patata',
    title: 'Merluza al horno con patata y zanahoria',
    mealType: 'comida',
    servings: '1 persona',
    ingredients: ['170g de merluza', '150g de patata (ración)', '1 zanahoria', 'Aceite de oliva virgen extra', 'Limón, sal', 'Perejil'],
    steps: [
      'Corta la patata y la zanahoria en rodajas finas y colócalas en la base de una bandeja de horno con un poco de aceite.',
      'Hornea 15 minutos a 190ºC hasta que empiecen a ablandarse.',
      'Coloca la merluza encima, macerada con limón y perejil, con una cucharada de postre de aceite.',
      'Hornea 12-15 minutos más hasta que el pescado esté hecho.',
    ],
    portionNote: '170g de pescado blanco en crudo · 150g de patata como ración.',
  },
  {
    id: 'cena-crema-calabacin-pollo',
    title: 'Crema de calabacín con pollo a la plancha',
    mealType: 'cena',
    servings: '1 persona',
    ingredients: ['2 calabacines', '1 patata pequeña (guarnición)', 'Caldo de verduras (sin cebolla ni ajo) o agua', 'Aceite de oliva virgen extra', '170g de pechuga de pollo', 'Sal'],
    steps: [
      'Cuece el calabacín troceado y la patata en agua o caldo hasta que estén tiernos.',
      'Tritura con un chorrito de aceite y sal hasta obtener una crema fina.',
      'Cocina la pechuga de pollo a la plancha con una cucharada de postre de aceite.',
      'Sirve la crema caliente acompañada del pollo troceado por encima.',
    ],
    portionNote: '170g de carne blanca en crudo (recuerda que solo se recomienda 1 vez por semana en la ración grande).',
  },
  {
    id: 'cena-tortilla-calabacin',
    title: 'Tortilla de calabacín con ensalada de tomate y pepino',
    mealType: 'cena',
    servings: '1 persona',
    ingredients: ['1 calabacín', '2-3 huevos', 'Aceite de oliva virgen extra', 'Sal', 'Tomate y pepino para la ensalada', '60g de pan'],
    steps: [
      'Corta el calabacín en láminas finas y saltea con un poco de aceite hasta que esté tierno.',
      'Bate los huevos, mezcla con el calabacín y cuaja la tortilla en la sartén por ambos lados.',
      'Prepara una ensalada sencilla de tomate y pepino aliñada con aceite y sal.',
      'Sirve la tortilla con la ensalada y el pan.',
    ],
    portionNote: '170g de huevo (2-3 unidades) · 60g de pan.',
  },
  {
    id: 'comida-arroz-caldoso-pescado',
    title: 'Arroz caldoso con pescado blanco',
    mealType: 'comida',
    servings: '1 persona',
    ingredients: ['60g de arroz', '170g de pescado blanco (rape, merluza...)', 'Caldo de pescado (sin cebolla ni ajo)', 'Zanahoria, pimiento rojo', 'Aceite de oliva virgen extra', 'Sal, pimentón suave'],
    steps: [
      'Sofríe la zanahoria y el pimiento troceados en un poco de aceite.',
      'Añade el arroz y remueve un minuto, luego cubre con el caldo caliente.',
      'Cuece a fuego medio 15-18 minutos, dejándolo caldoso.',
      'Añade el pescado en trozos los últimos 5 minutos de cocción para que se haga sin deshacerse.',
    ],
    portionNote: '60g de arroz como ración · 170g de pescado blanco en crudo.',
  },
  {
    id: 'cena-pavo-boniato-judias',
    title: 'Pavo a la plancha con puré de boniato y judías verdes',
    mealType: 'cena',
    servings: '1 persona',
    ingredients: ['170g de pechuga de pavo (o 90g de fiambre de pavo >95%)', '100g de boniato (guarnición)', '150g de judías verdes', 'Aceite de oliva virgen extra', 'Sal'],
    steps: [
      'Cuece el boniato hasta que esté tierno y tritúralo con un chorrito de aceite y sal.',
      'Cuece las judías verdes al vapor.',
      'Cocina el pavo a la plancha con una cucharada de postre de aceite.',
      'Sirve el pavo con el puré de boniato y las judías verdes.',
    ],
    portionNote: '170g de carne blanca en crudo (o 90g de fiambre de pavo) · 100g de boniato como guarnición.',
  },
  {
    id: 'comida-ensalada-arroz-atun',
    title: 'Ensalada fría de arroz con atún, maíz y zanahoria',
    mealType: 'comida',
    servings: '1 persona',
    ingredients: ['60g de arroz', '1 lata de atún al natural', 'Maíz en grano', 'Zanahoria rallada', 'Tomate en tacos', 'Aceite de oliva virgen extra', 'Vinagre, sal'],
    steps: [
      'Cuece el arroz, escurre y déjalo enfriar en la nevera al menos unas horas (idealmente 24h, así se forma almidón resistente).',
      'Mezcla el arroz frío con el atún escurrido, el maíz, la zanahoria y el tomate.',
      'Aliña con aceite, vinagre y sal.',
      'Sirve fría, ideal para llevar o los días de más calor.',
    ],
    portionNote: '60g de arroz como ración.',
  },
]

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id)
}

export function getRecipesByMealType(mealType: MealType): Recipe[] {
  return recipes.filter((r) => r.mealType === mealType)
}
