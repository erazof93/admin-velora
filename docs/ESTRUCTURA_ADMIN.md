# 📁 ESTRUCTURA COMPLETA DEL PROYECTO - ADMIN VELORA

Árbol visual de todas las carpetas y archivos.

---

## 🌳 ÁRBOL PRINCIPAL

```
admin-velora/
│
├── 📚 DOCUMENTACIÓN/
│   ├── CLAUDE.md                          ⭐ HUB CENTRAL
│   ├── README.md                          ← Inicio rápido
│   ├── ESTRUCTURA.md                      ← Este documento
│   ├── ROADMAP.md                         ← Fases de desarrollo
│   │
│   └── docs/
│       ├── README.md                      ← Índice de docs
│       ├── PROYECTO_VELORA_ADMIN.md      ← Visión del admin
│       ├── ARQUITECTURA.md                ← Cómo funciona
│       ├── REACT_VITE_CONCEPTS.md         ← Conceptos React/Vite
│       │
│       ├── guias/
│       │   ├── README.md
│       │   ├── SETUP.md                   ← Instalación
│       │   ├── DESARROLLO.md              ← Cómo codificar
│       │   ├── COMPONENTES.md             ← Estándares
│       │   └── TROUBLESHOOTING.md         ← Problemas
│       │
│       └── api/
│           ├── README.md
│           ├── AUTH.md                    ← Auth endpoints
│           ├── USERS.md                   ← User endpoints
│           ├── REVENUE.md                 ← Revenue endpoints
│           ├── MODERATION.md              ← Moderation endpoints
│           ├── HEALTH.md                  ← Health endpoints
│           └── DASHBOARD.md               ← Dashboard endpoints
│
├── 🔧 CONFIGURACIÓN/
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   ├── .env.local
│   ├── .gitignore
│   └── index.html
│
├── 💻 src/
│   ├── main.tsx                           ← Entry point
│   ├── App.tsx                            ← Root component
│   ├── vite-env.d.ts                      ← Type defs
│   ├── index.css                          ← Tailwind + globals
│   │
│   ├── pages/                             ← Route pages
│   │   ├── Login.tsx                      ← Login page
│   │   ├── Dashboard.tsx                  ← Main dashboard
│   │   ├── Users.tsx                      ← User management
│   │   ├── Revenue.tsx                    ← Revenue tracking
│   │   ├── Moderation.tsx                 ← Content moderation
│   │   ├── Health.tsx                     ← System health
│   │   └── Analytics.tsx                  ← Advanced analytics
│   │
│   ├── components/                        ← React components
│   │   ├── common/
│   │   │   ├── Button.tsx                 (variants: primary, secondary, danger)
│   │   │   ├── Card.tsx                   (container)
│   │   │   ├── Modal.tsx                  (dialog)
│   │   │   ├── Table.tsx                  (data table)
│   │   │   ├── Input.tsx                  (form input)
│   │   │   ├── Select.tsx                 (dropdown)
│   │   │   ├── Badge.tsx                  (pills/tags)
│   │   │   ├── Loader.tsx                 (spinner)
│   │   │   ├── Skeleton.tsx                (placeholder)
│   │   │   ├── Toast.tsx                  (notifications)
│   │   │   ├── Alert.tsx                  (alerts)
│   │   │   ├── Dropdown.tsx               (menu)
│   │   │   └── Pagination.tsx             (paging)
│   │   │
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx             ← Main wrapper
│   │   │   ├── AuthLayout.tsx             ← Auth wrapper
│   │   │   ├── Header.tsx                 ← Top bar
│   │   │   ├── Sidebar.tsx                ← Left navigation
│   │   │   ├── Navigation.tsx             ← Nav items
│   │   │   ├── UserMenu.tsx               ← User dropdown
│   │   │   ├── Breadcrumbs.tsx            ← Breadcrumbs
│   │   │   └── ThemeToggle.tsx            ← Dark/light toggle
│   │   │
│   │   ├── dashboard/
│   │   │   ├── StatsGrid.tsx              ← 4 stat cards
│   │   │   ├── RevenueChart.tsx           ← Bar chart (Recharts)
│   │   │   ├── ActivityChart.tsx          ← Line chart (Recharts)
│   │   │   ├── HealthStatus.tsx           ← DB/API status
│   │   │   ├── TopCoaches.tsx             ← Leaderboard
│   │   │   └── RecentActivity.tsx         ← Activity feed
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx              ← Email + password
│   │   │   └── ProtectedRoute.tsx         ← Route guard
│   │   │
│   │   ├── users/
│   │   │   ├── UsersList.tsx              ← Table wrapper
│   │   │   ├── UserTable.tsx              ← Data table
│   │   │   ├── UserFilters.tsx            ← Filter bar
│   │   │   ├── UserDetail.tsx             ← Modal
│   │   │   ├── UserForm.tsx               ← Edit form
│   │   │   └── BulkActions.tsx            ← Multi-select
│   │   │
│   │   ├── revenue/
│   │   │   ├── RevenueOverview.tsx        ← KPI cards
│   │   │   ├── TieredChart.tsx            ← Stacked bar
│   │   │   ├── TierBreakdown.tsx          ← Pie chart
│   │   │   ├── TopCoaches.tsx             ← Top earners
│   │   │   ├── MRRCalculator.tsx          ← MRR widget
│   │   │   ├── ChurnAnalysis.tsx          ← Churn chart
│   │   │   └── ExportButton.tsx           ← CSV export
│   │   │
│   │   ├── moderation/
│   │   │   ├── FlaggedContent.tsx         ← Content list
│   │   │   ├── CommentReview.tsx          ← Review modal
│   │   │   ├── UserReports.tsx            ← Reports list
│   │   │   ├── ModerationActions.tsx      ← Action buttons
│   │   │   ├── History.tsx                ← Action history
│   │   │   └── Stats.tsx                  ← Stats cards
│   │   │
│   │   └── health/
│   │       ├── DbStatus.tsx               ← DB indicator
│   │       ├── ResponseTimeChart.tsx      ← Time graph
│   │       ├── UptimeWidget.tsx           ← Uptime %
│   │       ├── ErrorRateChart.tsx         ← Error chart
│   │       └── Metrics.tsx                ← P50, P95, P99
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts                  ← Axios instance
│   │   │   ├── endpoints.ts               ← API routes enum
│   │   │   └── hooks.ts                   ← Query hooks
│   │   │
│   │   ├── utils/
│   │   │   ├── format.ts                  ← Format utilities
│   │   │   ├── validation.ts              ← Validators
│   │   │   └── helpers.ts                 ← Helper functions
│   │   │
│   │   └── storage/
│   │       └── auth.ts                    ← Token management
│   │
│   ├── store/                             ← Zustand stores
│   │   ├── authStore.ts                   ← Auth state
│   │   ├── dashboardStore.ts              ← Dashboard data
│   │   ├── uiStore.ts                     ← UI state
│   │   └── filtersStore.ts                ← Filter state
│   │
│   ├── hooks/                             ← Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useDashboard.ts
│   │   ├── useUsers.ts
│   │   ├── useRevenue.ts
│   │   ├── useModeration.ts
│   │   ├── useHealth.ts
│   │   └── useAsync.ts (custom)
│   │
│   ├── types/
│   │   ├── index.ts                       ← Main types
│   │   ├── api.ts                         ← API response types
│   │   ├── admin.ts                       ← Admin domain types
│   │   └── forms.ts                       ← Form types
│   │
│   ├── constants/
│   │   ├── colors.ts                      ← Paleta Velora
│   │   ├── api.ts                         ← API config
│   │   ├── routes.ts                      ← App routes
│   │   └── messages.ts                    ← Error/success messages
│   │
│   └── styles/
│       ├── globals.css                    ← Global styles
│       ├── animations.css                 ← Transitions
│       └── components.css                 ← Component styles
│
├── design/                                ← Design assets
│   ├── color-palette.md
│   ├── figma-link.md
│   ├── screens/
│   │   ├── admin/
│   │   │   ├── dashboard.png
│   │   │   ├── users.png
│   │   │   ├── revenue.png
│   │   │   └── moderation.png
│   │   └── auth/
│   │       └── login.png
│   ├── components/
│   │   ├── buttons.png
│   │   ├── cards.png
│   │   └── tables.png
│   └── brand/
│       ├── typography.md
│       └── spacing.md
│
├── public/
│   ├── logo.svg                           ← Velora logo
│   ├── favicon.ico
│   ├── logo-dark.svg
│   └── icons/
│       ├── dashboard.svg
│       ├── users.svg
│       ├── revenue.svg
│       ├── moderation.svg
│       └── health.svg
│
└── 🧪 tests/ (Futuro)
    ├── unit/
    │   ├── components/
    │   ├── hooks/
    │   └── utils/
    └── e2e/
        ├── auth.cy.ts
        ├── dashboard.cy.ts
        └── users.cy.ts
```

---

## 📊 ESTADÍSTICAS

```
Carpetas principales:        10
Subcarpetas:                 30+
Componentes:                 35+
Páginas:                     7
Hooks:                       6+
Stores:                      4
TypeScript types:            4+
Funciones utilitarias:       10+
Documentos:                  15+
```

---

## 🎯 MAPEO: CARPETA → RESPONSABILIDAD

| Carpeta | Qué es | Quién edita |
|---------|--------|------------|
| pages/ | Páginas principales (rutas) | Dev + Claude |
| components/ | Componentes React reutilizables | Dev + Claude |
| lib/ | Lógica de API y utilities | Dev + Claude |
| store/ | Estado global (Zustand) | Dev + Claude |
| hooks/ | Custom React hooks | Dev + Claude |
| types/ | TypeScript interfaces | Dev + Claude |
| constants/ | Constantes y configuración | Dev |
| styles/ | CSS global y animations | Dev |
| design/ | Assets de diseño | Designer |
| public/ | Archivos estáticos | Designer |

---

## 🔄 CICLO DE DESARROLLO

```
1. Editar código en src/
   └─ Components, hooks, stores, pages

2. pnpm dev
   └─ Recarga automática (Vite HMR)

3. Desarrollo local
   └─ http://localhost:3000

4. Lint & type check
   ├─ pnpm lint
   └─ pnpm type-check

5. Build & preview
   ├─ pnpm build
   └─ pnpm preview

6. Deploy
   └─ Push a production
```

---

## 📂 NIVELES DE PROFUNDIDAD

### **Nivel 1: Raíz (LO QUE VES)**
```
├── docs/
├── src/
├── design/
├── public/
├── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### **Nivel 2: Primeras carpetas**
```
src/
├── pages/          (7 rutas)
├── components/     (4 grupos)
├── lib/            (api, utils, storage)
├── store/          (4 stores)
├── hooks/          (6 custom hooks)
├── types/          (4 archivos)
├── constants/      (4 archivos)
└── styles/         (3 archivos)
```

### **Nivel 3: Componentes**
```
components/common/
├── Button.tsx      (variants)
├── Card.tsx        (reusable)
├── Modal.tsx       (dialog)
├── Table.tsx       (data table)
├── Input.tsx       (form input)
└── Toast.tsx       (notifications)
```

---

## 🎬 CÓMO NAVEGAR

### **Si buscas documentación:**
```
cd docs/
├─ guias/     (tutoriales)
├─ api/       (endpoints)
└─ deployment/ (producción)
```

### **Si buscas código:**
```
cd src/
├─ pages/      (páginas principales)
├─ components/ (React components)
├─ lib/        (lógica)
├─ hooks/      (custom hooks)
├─ store/      (estado)
└─ types/      (TypeScript)
```

### **Si buscas configuración:**
```
Raíz:
├─ vite.config.ts
├─ tsconfig.json
├─ tailwind.config.ts
├─ package.json
└─ .env.local
```

### **Si buscas diseño:**
```
cd design/
├─ color-palette.md
├─ screens/         (mockups)
├─ components/      (component designs)
└─ brand/          (guidelines)
```

---

## 🚀 CRECIMIENTO DEL PROYECTO

### **Hoy (FASE 1)**
```
✅ Setup completado
✅ Vite + React configurado
✅ Documentación base

src/
├── App.tsx
├── main.tsx
├── components/
└── (preparado para módulos)
```

### **En 1 semana (FASE 2)**
```
✅ Auth implementado
✅ Login page funcional

src/
├── pages/Login.tsx
├── store/authStore.ts
└── lib/api/client.ts
```

### **En 2 semanas (FASES 3-4)**
```
✅ Layout + Dashboard
✅ Navegación funcional
✅ Stats y charts

src/
├── pages/Dashboard.tsx
├── components/layout/
└── components/dashboard/
```

### **En 4-5 semanas (FASES 5-9)**
```
✅ Todos los módulos
✅ Todas las páginas
✅ Component library

src/
├── components/ (35+ componentes)
├── pages/ (7 páginas)
├── hooks/ (6+ hooks)
└── store/ (4 stores)
```

### **En 7.5 semanas (FASES 10)**
```
✅ Tests completos
✅ Build optimizado
✅ Deploy producción

tests/
├── unit/ (30+ tests)
└── e2e/ (20+ tests)
```

---

## 💡 TIPS DE NAVEGACIÓN

### **¿Dónde debo codificar?**
→ En `src/` - pages para rutas, components para UI, lib para lógica

### **¿Dónde está la documentación?**
→ En `docs/` - busca por tema

### **¿Dónde está la configuración?**
→ En raíz: `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`

### **¿Dónde están los tests?**
→ En `tests/` o archivos `.test.ts` junto al código

### **¿Dónde están los colores?**
→ En `src/constants/colors.ts` (paleta Velora)

### **¿Dónde está el estado global?**
→ En `src/store/` (Zustand stores)

### **¿Dónde están los custom hooks?**
→ En `src/hooks/` (useAuth, useDashboard, etc)

---

## 🎯 FLUJO TÍPICO

```
1. Necesito agregar una página
   ↓
2. Leo docs/api/ para entender datos
   ↓
3. Creo archivo en src/pages/
   ↓
4. Creo components necesarios en src/components/
   ↓
5. Creo hook en src/hooks/
   ↓
6. Conectado con API en lib/api/
   ↓
7. Agrego tipos en src/types/
   ↓
8. Styling con Tailwind
   ↓
9. pnpm lint
   ↓
10. pnpm type-check
    ↓
11. Test en http://localhost:3000
    ↓
12. Commit
```

---

## 🎨 DISEÑO & COMPONENTES

```
src/components/common/        ← Base components (reutilizables)
├─ Button (4 variants)
├─ Card (flexible)
├─ Modal (dialog)
├─ Table (data table)
├─ Input (form)
└─ Toast (notifications)

src/components/dashboard/     ← Dashboard specifics
├─ StatsGrid
├─ RevenueChart
├─ ActivityChart
└─ HealthStatus

src/components/users/         ← Users management
├─ UsersList
├─ UserFilters
├─ UserDetail
└─ BulkActions

Patrón: common/ son generales, específicas en carpeta del módulo
```

---

## 📋 CHECKLIST DE NAVEGACIÓN

```
✅ Encontrar página → src/pages/[NombrePage].tsx
✅ Encontrar componente → src/components/[grupo]/[NombreComponent].tsx
✅ Encontrar API call → src/lib/api/hooks.ts o client.ts
✅ Encontrar tipo TS → src/types/[archivo].ts
✅ Encontrar constante → src/constants/
✅ Encontrar store → src/store/[nombreStore].ts
✅ Encontrar custom hook → src/hooks/use[Nombre].ts
✅ Encontrar doc → docs/[carpeta]/[archivo].md
```

---

Última actualización: 2026-09-03
