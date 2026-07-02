# Dieta de Maria

PWA en español con el plan de alimentación personalizado de Maria Torvisco (bajo en FODMAPs), pensada para consultarse a diario: horario de comidas, suplementos, recetas, un comprobador de alimentos permitidos y una lista de la compra.

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Estructura

- `src/data/` — contenido del plan (horario, suplementos, menú de 7 días, alimentos permitidos/FODMAP, recetas, normas), transcrito del PDF original de la nutricionista.
- `src/pages/` — las 5 pantallas: Hoy, Recetas, ¿Puedo comerlo?, Lista de la compra, Guía.
- `src/hooks/` — estado persistido en `localStorage` (día del ciclo, casillas marcadas, lista de la compra).

Despliegue: Vercel (proyecto estático, sin backend).
