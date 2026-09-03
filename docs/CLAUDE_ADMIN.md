# 🎛️ CLAUDE.md - Admin Velora (React + Vite)

**Tu guía maestra para trabajar el panel administrativo módulo por módulo.**

---

## 📋 ÍNDICE RÁPIDO

1. [Visión General](#visión-general)
2. [Árbol del Proyecto](#árbol-del-proyecto)
3. [Módulos a Implementar](#módulos-a-implementar)
4. [Flujo de Trabajo](#flujo-de-trabajo)
5. [Agentes & Skills](#agentes--skills)
6. [Checklist de Desarrollo](#checklist-de-desarrollo)

---

## 🎯 VISIÓN GENERAL

**Velora Admin Dashboard**: Panel administrativo profesional para gestionar:
- Usuarios (FREE, PREMIUM, PRO COACHING)
- Atletas y Coaches
- Revenue tracking
- Content moderation
- System health monitoring
- Analytics

```
ADMIN FINAL
    │
    ├─ 📊 Dashboard (stats, revenue, health)
    ├─ 👥 Users Management (list, filter, moderate, delete)
    ├─ 💰 Revenue Tracking (MRR, tiers, charts)
    ├─ 📝 Content Moderation (comments, reports, flags)
    ├─ 🏥 System Health (db status, uptime, metrics)
    ├─ 📈 Analytics (charts, trends, KPIs)
    └─ ⚙️ Settings (config, integrations)

Conectado a:
└─ 🏃 Backend NestJS (42 endpoints)
   └─ 📱 Athletes/Coaches usando API
```

---

## 📁 ÁRBOL DEL PROYECTO

```
admin-velora/
│
├── 📚 DOCUMENTACIÓN/
│   ├── CLAUDE.md                          ← Estás aquí (hub central)
│   ├── README.md                          ← Inicio rápido
│   ├── ESTRUCTURA.md                      ← Explicación de carpetas
│   ├── ROADMAP.md                         ← Fases de desarrollo
│   │
│   └── docs/
│       ├── PROYECTO_VELORA_ADMIN.md      ← Contexto y visión
│       ├── ARQUITECTURA.md                ← Cómo funciona todo
│       ├── REACT_VITE_CONCEPTS.md         ← Conceptos React/Vite
│       │
│       ├── guias/
│       │   ├── SETUP.md                   ← Instalación paso a paso
│       │   ├── DESARROLLO.md              ← Cómo desarrollar
│       │   ├── COMPONENTES.md             ← Estándares de componentes
│       │   └── TROUBLESHOOTING.md         ← Solucionar problemas
│       │
│       └── api/
│           ├── DASHBOARD.md               ← Endpoints usados
│           ├── USERS.md                   ← User management
│           ├── REVENUE.md                 ← Revenue tracking
│           ├── MODERATION.md              ← Content moderation
│           └── HEALTH.md                  ← System health
│
├── 🔧 CONFIGURACIÓN/
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── 💻 src/
│   ├── main.tsx                           ← Entry point
│   ├── App.tsx                            ← Root component
│   ├── index.css                          ← Tailwind + globals
│   │
│   ├── pages/                             ← Route pages
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Users.tsx
│   │   ├── Revenue.tsx
│   │   ├── Moderation.tsx
│   │   ├── Health.tsx
│   │   └── Analytics.tsx
│   │
│   ├── components/                        ← Componentes reutilizables
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Table.tsx
│   │   ├── dashboard/
│   │   │   ├── StatsGrid.tsx
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── HealthStatus.tsx
│   │   │   └── UserActivityChart.tsx
│   │   ├── users/
│   │   │   ├── UsersList.tsx
│   │   │   ├── UserDetail.tsx
│   │   │   ├── UserFilters.tsx
│   │   │   └── BulkActions.tsx
│   │   ├── revenue/
│   │   │   ├── RevenueOverview.tsx
│   │   │   ├── TieredChart.tsx
│   │   │   ├── MRRCalculator.tsx
│   │   │   └── TopCoaches.tsx
│   │   ├── moderation/
│   │   │   ├── FlaggedContent.tsx
│   │   │   ├── CommentReview.tsx
│   │   │   ├── UserReports.tsx
│   │   │   └── ActionButtons.tsx
│   │   └── layout/
│   │       ├── MainLayout.tsx
│   │       └── AuthLayout.tsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts                  ← Axios instance
│   │   │   ├── endpoints.ts               ← API routes
│   │   │   └── hooks.ts                   ← Query hooks
│   │   ├── utils/
│   │   │   ├── format.ts
│   │   │   ├── validation.ts
│   │   │   └── helpers.ts
│   │   └── storage/
│   │       └── auth.ts
│   │
│   ├── store/                             ← Zustand stores
│   │   ├── authStore.ts
│   │   ├── dashboardStore.ts
│   │   ├── uiStore.ts
│   │   └── filtersStore.ts
│   │
│   ├── hooks/                             ← Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useDashboard.ts
│   │   ├── useUsers.ts
│   │   ├── useRevenue.ts
│   │   └── useModeration.ts
│   │
│   ├── types/
│   │   ├── index.ts                       ← TypeScript interfaces
│   │   ├── api.ts
│   │   ├── admin.ts
│   │   └── forms.ts
│   │
│   ├── constants/
│   │   ├── colors.ts                      ← Paleta Velora
│   │   ├── api.ts                         ← API config
│   │   ├── routes.ts                      ← Rutas
│   │   └── messages.ts                    ← Mensajes I18n
│   │
│   └── styles/
│       ├── globals.css
│       ├── animations.css
│       └── components.css
│
├── design/                                ← Assets de diseño
│   ├── color-palette.md
│   ├── figma-link.md
│   └── screens/
│
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   └── icons/
│
└── 🧪 tests/ (futuro)
    ├── unit/
    └── e2e/
```

---

## 🎬 MÓDULOS A IMPLEMENTAR (EN ORDEN)

### 🔴 MÓDULO 1: Setup & Auth
**Prioridad:** 🔴 CRÍTICA  
**Tiempo estimado:** 2-3 horas  
**Dependencias:** Vite, React, Zustand  

**Qué implementar:**
- ✅ Estructura Vite + TypeScript
- ✅ Tailwind CSS + dark mode
- ✅ Zustand auth store
- ✅ Login page (email + password)
- ✅ Token storage (localStorage)
- ✅ Route guards (ProtectedRoute)
- ✅ API client con interceptor

**Archivos a crear:**
```
src/
├── pages/Login.tsx
├── components/auth/
│   ├── LoginForm.tsx
│   └── AuthLayout.tsx
├── store/authStore.ts
├── lib/api/client.ts
├── hooks/useAuth.ts
├── types/index.ts
└── constants/routes.ts
```

**Skills asociado:**
- 🔧 SKILL_AUTH_ADMIN - Setup auth profesional

---

### 🟡 MÓDULO 2: Layout & Navigation
**Prioridad:** 🟡 ALTA  
**Tiempo estimado:** 2-3 horas  
**Dependencias:** Módulo 1  

**Qué implementar:**
- ✅ MainLayout (Header + Sidebar)
- ✅ Sidebar navegación (collapse/expand)
- ✅ Header con user menu
- ✅ Breadcrumbs
- ✅ Mobile responsive
- ✅ Dark mode toggle
- ✅ Logout button

**Archivos a crear:**
```
src/components/
├── layout/
│   ├── MainLayout.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── UserMenu.tsx
│   └── Breadcrumbs.tsx
└── common/
    └── ThemeToggle.tsx
```

**Skills asociado:**
- 🔧 SKILL_LAYOUT - Crear layout profesional

---

### 🟡 MÓDULO 3: Dashboard
**Prioridad:** 🟡 ALTA  
**Tiempo estimado:** 3-4 horas  
**Dependencias:** Módulos 1, 2  

**Qué implementar:**
- ✅ Stats grid (total users, coaches, revenue, health)
- ✅ Revenue chart (MRR, tiers breakdown)
- ✅ User activity chart
- ✅ System health status
- ✅ Top coaches leaderboard
- ✅ Recent activities feed
- ✅ Real-time data refresh

**Archivos a crear:**
```
src/
├── pages/Dashboard.tsx
├── components/dashboard/
│   ├── StatsGrid.tsx
│   ├── RevenueChart.tsx
│   ├── ActivityChart.tsx
│   ├── HealthStatus.tsx
│   ├── TopCoaches.tsx
│   └── RecentActivity.tsx
├── hooks/useDashboard.ts
└── store/dashboardStore.ts
```

**Skills asociado:**
- 🔧 SKILL_DASHBOARD - Crear dashboard con charts

---

### 🟡 MÓDULO 4: Users Management
**Prioridad:** 🟡 ALTA  
**Tiempo estimado:** 4-5 horas  
**Dependencias:** Módulos 1-3  

**Qué implementar:**
- ✅ Users list with pagination
- ✅ Filters (tier, status, search)
- ✅ User detail modal
- ✅ Edit user info
- ✅ Delete user (soft delete)
- ✅ Bulk actions (ban, promote, etc)
- ✅ User stats (activities, followers)

**Archivos a crear:**
```
src/
├── pages/Users.tsx
├── components/users/
│   ├── UsersList.tsx
│   ├── UserFilters.tsx
│   ├── UserDetail.tsx
│   ├── BulkActions.tsx
│   └── UserForm.tsx
├── hooks/useUsers.ts
└── store/filtersStore.ts
```

**Skills asociado:**
- 🔧 SKILL_USERS_ADMIN - Crear CRUD usuarios

---

### 🟡 MÓDULO 5: Revenue Tracking
**Prioridad:** 🟡 MEDIA  
**Tiempo estimado:** 3-4 horas  
**Dependencias:** Módulos 1-3  

**Qué implementar:**
- ✅ Revenue overview (total, MRR, growth)
- ✅ Tiered breakdown (FREE, PREMIUM, PRO)
- ✅ Revenue chart by tier
- ✅ Top earning coaches
- ✅ Churn rate calculator
- ✅ Projection model
- ✅ Export to CSV

**Archivos a crear:**
```
src/
├── pages/Revenue.tsx
├── components/revenue/
│   ├── RevenueOverview.tsx
│   ├── TieredChart.tsx
│   ├── MRRCalculator.tsx
│   ├── TopCoaches.tsx
│   ├── ChurnAnalysis.tsx
│   └── ExportButton.tsx
└── hooks/useRevenue.ts
```

**Skills asociado:**
- 🔧 SKILL_REVENUE - Crear analytics de ingresos

---

### 🟡 MÓDULO 6: Content Moderation
**Prioridad:** 🟡 MEDIA  
**Tiempo estimado:** 3 horas  
**Dependencias:** Módulos 1-3  

**Qué implementar:**
- ✅ Flagged comments list
- ✅ User reports dashboard
- ✅ Review modal (context + decision)
- ✅ Approve/Reject/Delete actions
- ✅ Ban user from comments
- ✅ Moderation history
- ✅ Filters por severity

**Archivos a crear:**
```
src/
├── pages/Moderation.tsx
├── components/moderation/
│   ├── FlaggedContent.tsx
│   ├── CommentReview.tsx
│   ├── UserReports.tsx
│   ├── ModerationActions.tsx
│   └── History.tsx
└── hooks/useModeration.ts
```

**Skills asociado:**
- 🔧 SKILL_MODERATION - Crear panel de moderación

---

### 🟡 MÓDULO 7: System Health
**Prioridad:** 🟡 MEDIA  
**Tiempo estimado:** 2 horas  
**Dependencias:** Módulos 1-3  

**Qué implementar:**
- ✅ Database status (connected/down)
- ✅ API response time graph
- ✅ Uptime percentage
- ✅ Error rate chart
- ✅ Last health check timestamp
- ✅ Auto-refresh every 30s
- ✅ Alert notifications

**Archivos a crear:**
```
src/
├── pages/Health.tsx
├── components/health/
│   ├── DbStatus.tsx
│   ├── ResponseTimeChart.tsx
│   ├── UptimeWidget.tsx
│   └── ErrorRateChart.tsx
└── hooks/useHealth.ts
```

**Skills asociado:**
- 🔧 SKILL_HEALTH - Crear monitoring dashboard

---

### 🟡 MÓDULO 8: Components Library
**Prioridad:** 🟡 MEDIA  
**Tiempo estimado:** 3-4 horas  
**Dependencias:** Módulos 1-2  

**Qué implementar:**
- ✅ Reusable Button variants
- ✅ Card components
- ✅ Modal dialog
- ✅ Data Table
- ✅ Form inputs
- ✅ Badges/Pills
- ✅ Loaders/Skeletons
- ✅ Alerts/Toast notifications

**Archivos a crear:**
```
src/components/common/
├── Button.tsx (variants: primary, secondary, danger, ghost)
├── Card.tsx
├── Modal.tsx
├── Table.tsx
├── Input.tsx
├── Badge.tsx
├── Loader.tsx
├── Toast.tsx
└── Alert.tsx
```

**Skills asociado:**
- 🔧 SKILL_COMPONENTS - Crear component library

---

### 🟡 MÓDULO 9: Analytics & Reporting
**Prioridad:** 🟡 BAJA  
**Tiempo estimado:** 4-5 horas  
**Dependencias:** Módulos 1-3  

**Qué implementar:**
- ✅ Custom date range picker
- ✅ User growth chart
- ✅ Retention analysis
- ✅ Engagement metrics
- ✅ Export reports (PDF, CSV)
- ✅ Comparison (week vs week)
- ✅ Predictions

**Archivos a crear:**
```
src/
├── pages/Analytics.tsx
├── components/analytics/
│   ├── DateRangePicker.tsx
│   ├── GrowthChart.tsx
│   ├── RetentionChart.tsx
│   ├── EngagementMetrics.tsx
│   └── ExportReport.tsx
└── hooks/useAnalytics.ts
```

**Skills asociado:**
- 🔧 SKILL_ANALYTICS - Crear analytics avanzado

---

### 🟡 MÓDULO 10: Testing & Polish
**Prioridad:** 🟡 BAJA  
**Tiempo estimado:** 3-4 horas  
**Dependencias:** Módulos 1-9  

**Qué implementar:**
- ✅ Unit tests (React Testing Library)
- ✅ E2E tests (Cypress)
- ✅ Accessibility audit
- ✅ Performance optimization
- ✅ Error boundaries
- ✅ Loading states
- ✅ Empty states

**Skills asociado:**
- 🧪 SKILL_TESTING - Testing profesional

---

## 🔄 FLUJO DE TRABAJO

### **Proceso para implementar CADA módulo:**

```
1️⃣  LEER DOCUMENTACIÓN
    ├─ Entender requirements en docs/
    ├─ Ver design en design/screens/
    └─ Revisar tipos en types/

2️⃣  CREAR ESTRUCTURA
    ├─ Crear componentes necesarios
    ├─ Crear hooks necesarios
    ├─ Crear stores si es necesario
    └─ Crear types TypeScript

3️⃣  IMPLEMENTAR LÓGICA
    ├─ Crear API calls en lib/api/hooks.ts
    ├─ Crear Zustand stores
    ├─ Implementar componentes
    └─ Conectar datos a UI

4️⃣  ESTILOS & RESPONSIVO
    ├─ Tailwind CSS classes
    ├─ Dark mode compatible
    ├─ Mobile responsive
    └─ Hover/active states

5️⃣  MANEJO DE ERRORES
    ├─ Try/catch en API calls
    ├─ Toast notifications
    ├─ Retry logic
    └─ Loading states

6️⃣  TESTING LOCAL
    ├─ pnpm dev
    ├─ Verificar funcionalidad
    ├─ Check responsivo (DevTools)
    └─ Check dark mode

7️⃣  COMPONENTES REUTILIZABLES
    ├─ Extraer a common/ si es reutilizable
    ├─ Documentar props
    ├─ Crear variants
    └─ Agregar a Storybook (futuro)

8️⃣  VALIDACIÓN
    ├─ Lint: pnpm lint
    ├─ Type check: pnpm type-check
    ├─ Build: pnpm build
    ├─ OK? → siguiente módulo
    └─ Error? → fix y retest
```

---

## 🔧 AGENTES & SKILLS

### **¿Qué son?**
Skills = Procesos documentados para hacer cada tarea.  
Agentes = Yo (Claude) siguiendo el skill.

### **Cómo funcionan:**

```
Tú: "Crea el módulo de users"
    ↓
Yo: Uso SKILL_USERS_ADMIN
    ├─ Leo docs/api/USERS.md
    ├─ Creo estructura
    ├─ Implemento código
    ├─ Agrego styling
    └─ Valido todo
    ↓
Resultado: Módulo users funcional
```

### **Skills Disponibles:**

```
🔴 SKILL_AUTH_ADMIN
   Implementar login + auth flow
   Incluye: Zustand store, JWT handling, localStorage
   Tiempo: 2-3 horas

🟡 SKILL_LAYOUT
   Crear layout profesional (header, sidebar)
   Incluye: Responsive, dark mode, navigation
   Tiempo: 2-3 horas

🟡 SKILL_DASHBOARD
   Implementar dashboard con stats y charts
   Incluye: Recharts, real-time data, cards
   Tiempo: 3-4 horas

🟡 SKILL_USERS_ADMIN
   Implementar CRUD usuarios
   Incluye: Tabla, filters, modals, bulk actions
   Tiempo: 4-5 horas

🟡 SKILL_REVENUE
   Crear analytics de ingresos
   Incluye: Charts, tiers breakdown, MRR calculator
   Tiempo: 3-4 horas

🟡 SKILL_MODERATION
   Panel de contenido moderación
   Incluye: Flagged content, review flow, actions
   Tiempo: 3 horas

🟡 SKILL_HEALTH
   Monitoring dashboard (db, API, uptime)
   Incluye: Charts, real-time, alerts
   Tiempo: 2 horas

🟡 SKILL_COMPONENTS
   Component library reutilizable
   Incluye: Button, Card, Modal, Table, etc
   Tiempo: 3-4 horas

🟡 SKILL_ANALYTICS
   Analytics avanzado con reportes
   Incluye: Charts, date range, export
   Tiempo: 4-5 horas

🧪 SKILL_TESTING
   Tests unitarios y E2E
   Incluye: React Testing Library, Cypress
   Tiempo: 3-4 horas
```

### **Cómo pedir que use un skill:**

```
Opción 1 (Explícita):
"Usa SKILL_USERS_ADMIN para crear el módulo de usuarios"

Opción 2 (Implícita):
"Implementa la gestión de usuarios"
→ Yo detecto que necesito SKILL_USERS_ADMIN y lo uso automáticamente

Opción 3 (Con detalles):
"Crea users admin pero sin bulk actions por ahora"
→ Yo adapto SKILL_USERS_ADMIN a tus necesidades
```

---

## 📊 CHECKLIST DE DESARROLLO

### **FASE 1: Setup (🟢 COMPLETADO)**
```
✅ Vite + React + TypeScript configurado
✅ Tailwind CSS + dark mode
✅ Zustand instalado
✅ React Query instalado
✅ Documentación base
✅ .env.local configurado
✅ API client listo
```

### **FASE 2: Auth (🔴 PRÓXIMO)**
```
⬜ Crear Login page
⬜ Zustand authStore
⬜ Token storage
⬜ Protected routes
⬜ API auth endpoint connection
⬜ Error handling
⬜ Logout functionality
```

### **FASE 3: Layout (🟡 DESPUÉS)**
```
⬜ Header component
⬜ Sidebar navigation
⬜ MainLayout wrapper
⬜ Responsive design
⬜ Dark mode toggle
⬜ User menu dropdown
⬜ Breadcrumbs
```

### **FASE 4: Dashboard**
```
⬜ Stats grid component
⬜ Revenue chart (Recharts)
⬜ Activity chart
⬜ Health status widget
⬜ Top coaches list
⬜ Recent activity feed
```

### **FASE 5: Users Management**
```
⬜ Users table
⬜ Filters (tier, status, search)
⬜ Pagination
⬜ User detail modal
⬜ Edit form
⬜ Delete action
⬜ Bulk actions
```

### **FASE 6: Revenue Tracking**
```
⬜ Revenue overview
⬜ Tiered breakdown chart
⬜ MRR calculator
⬜ Top coaches leaderboard
⬜ Churn analysis
⬜ Export to CSV
```

### **FASE 7: Content Moderation**
```
⬜ Flagged content list
⬜ Review modal
⬜ Approve/Reject actions
⬜ Ban user option
⬜ History tracking
⬜ Severity filters
```

### **FASE 8: System Health**
```
⬜ DB status widget
⬜ API response time graph
⬜ Uptime percentage
⬜ Error rate chart
⬜ Auto-refresh
⬜ Alert notifications
```

### **FASE 9: Component Library**
```
⬜ Button variants
⬜ Card components
⬜ Modal dialog
⬜ Data table
⬜ Form inputs
⬜ Badges/pills
⬜ Loaders/skeletons
⬜ Toast notifications
```

### **FASE 10: Testing & Deploy**
```
⬜ Unit tests
⬜ E2E tests
⬜ Build optimization
⬜ Production build
⬜ Deploy a production
⬜ Monitoring setup
```

---

## 🎯 CÓMO USAR ESTE DOCUMENTO

### **Estás en SETUP:**
```
1. Lee CLAUDE.md (este documento) ✅
2. Lee docs/guias/SETUP.md
3. Ejecuta pnpm dev
4. Valida en http://localhost:3000
```

### **Listo para Auth:**
```
1. Lee docs/api/AUTH.md
2. Di: "Crea el módulo auth" (o "Usa SKILL_AUTH_ADMIN")
3. Yo creo todo automáticamente
4. Valida login en http://localhost:3000/login
```

### **Después de cada módulo:**
```
1. Lint: pnpm lint ✅
2. Type check: pnpm type-check ✅
3. Código limpio ✅
4. → Siguiente módulo
```

---

## 📞 PREGUNTAS FRECUENTES

**P: ¿Por dónde empiezo?**
R: Por FASE 2 (Auth). Es la más crítica.

**P: ¿Cuánto tiempo en total?**
R: ~30-40 horas de desarrollo (3-4 semanas working full-time)

**P: ¿Necesito saber React?**
R: No, vamos aprendiendo. Los skills tienen instrucciones paso a paso.

**P: ¿Puedo saltarme modules?**
R: No recomendado. Auth es base para todo.

**P: ¿Cómo cambio requirement?**
R: Dime qué cambiar en cualquier momento. Adaptamos.

---

## 🎬 PRÓXIMO PASO

👉 **Lee:** `docs/guias/SETUP.md`

👉 **Luego:** `docs/api/AUTH.md`

👉 **Finalmente:** Di "Crea el módulo auth"

---

**¡Estamos listos para construir Velora Admin!** 🚀

Version: 1.0  
Última actualización: 2026-09-03
Tech: React 19 + Vite + TypeScript + Tailwind + Zustand
