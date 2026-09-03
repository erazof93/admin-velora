# Velora Admin

Panel administrativo de Velora. React + Vite + TypeScript + Tailwind CSS v4, desplegado en **Vercel**.

## Stack

| Área      | Herramienta                                  |
| --------- | -------------------------------------------- |
| UI        | React 19, react-router-dom 7                 |
| Build     | Vite 8                                       |
| Estilos   | Tailwind CSS v4 (`@tailwindcss/vite`)        |
| Estado    | Zustand 5                                    |
| Data      | TanStack Query 5 + Axios                     |
| Iconos    | lucide-react                                 |
| Charts    | Recharts 3                                   |
| Calidad   | oxlint, Prettier, `tsc` strict               |
| Package   | pnpm                                         |

## Requisitos

- Node `>=20.19` (ver `.nvmrc`)
- pnpm

## Puesta en marcha

```bash
pnpm install
cp .env.example .env.local   # ajusta VITE_API_URL
pnpm dev                      # http://localhost:3000
```

## Scripts

| Script             | Acción                                  |
| ------------------ | --------------------------------------- |
| `pnpm dev`         | Servidor de desarrollo (puerto 3000)   |
| `pnpm build`       | `tsc -b` + `vite build` → `dist/`      |
| `pnpm preview`     | Sirve el build de producción           |
| `pnpm lint`        | oxlint sobre `src/`                     |
| `pnpm type-check`  | Chequeo de tipos sin emitir            |
| `pnpm format`      | Formatea con Prettier                   |

## Variables de entorno

| Variable        | Descripción                                  |
| --------------- | -------------------------------------------- |
| `VITE_API_URL`  | URL base del backend NestJS (con `/api/v1`) |
| `VITE_APP_NAME` | Nombre visible de la app (opcional)         |

En Vercel se configuran en **Project Settings → Environment Variables**.

## Deploy en Vercel

`vercel.json` ya define todo:

- **Install:** `pnpm install`
- **Build:** `pnpm build`
- **Output:** `dist`
- **Rewrites:** todo a `/index.html` (SPA con react-router)

Solo falta añadir `VITE_API_URL` en el dashboard de Vercel.

## Estructura

```
src/
├── pages/         Rutas (Home + futuras: Login, Dashboard…)
├── components/    common · layout · dashboard · auth · users · revenue · moderation · health
├── lib/
│   ├── api/       client (axios) · endpoints · hooks (React Query)
│   ├── storage/   token JWT en localStorage
│   ├── utils/     format · validation · helpers
│   └── queryClient.ts
├── store/         Zustand (uiStore: tema, sidebar)
├── hooks/         useTheme · useAsync
├── types/         api · admin · forms
├── constants/     routes · api · colors · messages
└── styles/        animations.css
```

Alias configurados: `@`, `@components`, `@pages`, `@lib`, `@store`, `@hooks`, `@types`, `@constants`.

## Roadmap

Ver `docs/ROADMAP_ADMIN.md`. **Siguiente: FASE 2 — Auth Module.**
