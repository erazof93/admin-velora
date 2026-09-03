# 🗺️ ROADMAP - Velora Admin Fases de Desarrollo

Plan detallado de las 10 fases para llevar el admin a producción.

---

## 📅 TIMELINE

```
Fase 1:  Setup        (0.5 semanas) ✅ COMPLETADO
Fase 2:  Auth         (1 semana)    🔴 PRÓXIMO
Fase 3:  Layout       (0.75 sem)    🟡
Fase 4:  Dashboard    (1 semana)    🟡
Fase 5:  Users        (1 semana)    🟡
Fase 6:  Revenue      (0.75 sem)    🟡
Fase 7:  Moderation   (0.5 semana)  🟡
Fase 8:  Health       (0.5 semana)  🟡
Fase 9:  Components   (0.75 sem)    🟡
Fase 10: Testing      (1 semana)    🟡
─────────────────────────────────
Total:   ~7.5 semanas (45-50 horas)
```

---

## 🟢 FASE 1: SETUP - COMPLETADO ✅

**Estado:** ✅ LISTO  
**Tiempo:** 0.5 semanas  
**Responsabilidad:** Setup inicial

### ✅ Tareas Completadas

```
✅ Vite + React + TypeScript configurado
✅ Tailwind CSS + dark mode (Velora theme)
✅ Zustand instalado
✅ React Query instalado
✅ Oxlint configurado
✅ Prettier configurado
✅ .env.local creado
✅ API client structure preparado
✅ Alias paths configurados (@components, @lib, etc)
✅ Proyecto listo para desarrollo
```

### 📁 Archivos creados

```
vite.config.ts          ✅
tsconfig.json           ✅
tailwind.config.ts      ✅
.env.local              ✅
package.json            ✅
src/main.tsx            ✅
src/App.tsx             ✅
src/index.css           ✅
```

### 🎯 Resultado

Admin listo en `http://localhost:3000`

---

## 🔴 FASE 2: AUTENTICACIÓN - PRÓXIMO 🎯

**Estado:** 🔴 PRÓXIMO (EMPIEZA HOY)  
**Tiempo:** 1 semana  
**Dependencias:** Fase 1  
**Prioridad:** CRÍTICA  

### 🎯 Objetivos

```
[ ] Crear página Login
[ ] Zustand auth store (token, user, isAuthenticated)
[ ] Conectar a endpoint /auth/login del backend
[ ] Guardar token en localStorage
[ ] Crear ProtectedRoute component
[ ] Logout functionality
[ ] Error handling (email/password incorrectos)
[ ] Redirect a dashboard después de login
[ ] TypeScript interfaces para auth
```

### 📁 Archivos a crear

```
src/
├── pages/
│   └── Login.tsx
├── components/
│   └── auth/
│       ├── LoginForm.tsx
│       └── AuthLayout.tsx
├── store/
│   └── authStore.ts
├── hooks/
│   └── useAuth.ts
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   ├── endpoints.ts
│   │   └── hooks.ts
│   └── storage/
│       └── auth.ts
├── types/
│   └── index.ts
└── constants/
    ├── routes.ts
    └── api.ts
```

### 📚 Documentación

```
docs/api/AUTH.md            ← Endpoints exactos
docs/guias/DESARROLLO.md    ← Cómo hacer auth
docs/ARQUITECTURA.md        ← Flujo de autenticación
```

### 🔑 Endpoints consumidos

```
POST /api/v1/auth/login        ← Login
POST /api/v1/auth/logout       ← Logout
POST /api/v1/auth/refresh-token ← Refresh JWT
GET  /api/v1/auth/me           ← Get user actual
```

### 🧪 Validaciones

```
✅ Email válido (formato)
✅ Password no vacío
✅ Error response handling
❌ Email no registrado → error
❌ Password incorrecto → error
✅ Token storage
✅ Redirect a login si no autenticado
```

### ⏱️ Desglose de tiempo

```
LoginForm component      : 1 hora
Auth store (Zustand)     : 1 hora
API client setup         : 30 min
ProtectedRoute           : 30 min
Error handling           : 1 hora
Styling dark mode        : 1 hora
─────────────────────────────
Total estimado           : ~5.5 horas
```

---

## 🟡 FASE 3: LAYOUT - DESPUÉS

**Estado:** 🟡 NO EMPEZADO  
**Tiempo:** 0.75 semanas  
**Dependencias:** Fase 2 (Auth)  
**Prioridad:** ALTA  

### 🎯 Objetivos

```
[ ] Header component (logo, user menu, logout)
[ ] Sidebar navigation (collapse/expand)
[ ] MainLayout wrapper
[ ] Responsive design (mobile, tablet, desktop)
[ ] Dark mode toggle
[ ] Active route highlight
[ ] Breadcrumbs component
[ ] Mobile hamburger menu
[ ] Smooth transitions
```

### 📁 Archivos a crear

```
src/components/
├── layout/
│   ├── MainLayout.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Navigation.tsx
│   ├── UserMenu.tsx
│   └── Breadcrumbs.tsx
└── common/
    └── ThemeToggle.tsx
```

### ⏱️ Desglose de tiempo

```
Header component        : 1.5 horas
Sidebar component       : 1.5 horas
MainLayout wrapper      : 1 hora
Responsive design       : 1 hora
─────────────────────────────
Total estimado          : ~5 horas
```

---

## 🟡 FASE 4: DASHBOARD - DESPUÉS

**Estado:** 🟡 NO EMPEZADO  
**Tiempo:** 1 semana  
**Dependencias:** Fases 2, 3  
**Prioridad:** ALTA  

### 🎯 Objetivos

```
[ ] Stats grid (total users, coaches, premium, MRR)
[ ] Revenue chart (Recharts - tiered breakdown)
[ ] User activity chart (line chart)
[ ] System health status (db, api, uptime)
[ ] Top coaches leaderboard
[ ] Recent activities feed
[ ] Real-time data (refresh cada 30s)
[ ] Error boundaries
[ ] Loading skeletons
```

### 📁 Archivos a crear

```
src/
├── pages/
│   └── Dashboard.tsx
├── components/
│   └── dashboard/
│       ├── StatsGrid.tsx
│       ├── RevenueChart.tsx
│       ├── ActivityChart.tsx
│       ├── HealthStatus.tsx
│       ├── TopCoaches.tsx
│       └── RecentActivity.tsx
└── hooks/
    └── useDashboard.ts
```

### 📊 API Endpoints

```
GET /api/v1/stats                (dashboard stats)
GET /api/v1/revenue              (revenue data)
GET /api/v1/users/activity       (activity chart)
GET /api/v1/health               (system health)
GET /api/v1/coach/top            (top coaches)
```

### ⏱️ Desglose de tiempo

```
Stats grid              : 1 hora
Revenue chart           : 1.5 horas
Activity chart          : 1.5 horas
Health status           : 1 hora
Top coaches             : 1 hora
Styling + responsive    : 1.5 horas
─────────────────────────────
Total estimado          : ~7.5 horas
```

---

## 🟡 FASE 5: USERS MANAGEMENT - DESPUÉS

**Estado:** 🟡 NO EMPEZADO  
**Tiempo:** 1 semana  
**Dependencias:** Fases 2-4  
**Prioridad:** ALTA  

### 🎯 Objetivos

```
[ ] Users table con pagination
[ ] Filters (tier: FREE/PREMIUM/PRO, status, search)
[ ] Columnas: name, email, tier, status, created date
[ ] User detail modal
[ ] Edit user form
[ ] Delete user (soft delete)
[ ] Bulk actions (ban, promote tier, etc)
[ ] User stats (activities, followers)
[ ] Sorting por columnas
```

### 📁 Archivos a crear

```
src/
├── pages/
│   └── Users.tsx
├── components/
│   └── users/
│       ├── UsersList.tsx
│       ├── UserTable.tsx
│       ├── UserFilters.tsx
│       ├── UserDetail.tsx
│       ├── UserForm.tsx
│       └── BulkActions.tsx
├── hooks/
│   └── useUsers.ts
└── store/
    └── filtersStore.ts
```

### 📊 API Endpoints

```
GET  /api/v1/users                (list with filters)
GET  /api/v1/users/:id            (user detail)
PUT  /api/v1/users/:id            (update user)
DELETE /api/v1/users/:id          (soft delete)
GET  /api/v1/users/:id/activities (user activities)
POST /api/v1/users/bulk-action    (bulk operations)
```

### ⏱️ Desglose de tiempo

```
Users table            : 2 horas
Filters + search       : 1.5 horas
User detail modal      : 1.5 horas
Edit form              : 1 hora
Bulk actions           : 1.5 horas
Styling + responsive   : 1.5 horas
─────────────────────────────
Total estimado         : ~9 horas
```

---

## 🟡 FASE 6: REVENUE TRACKING - DESPUÉS

**Estado:** 🟡 NO EMPEZADO  
**Tiempo:** 0.75 semanas  
**Dependencias:** Fases 2-4  
**Prioridad:** MEDIA  

### 🎯 Objetivos

```
[ ] Revenue overview (total MRR, growth %, growth $)
[ ] Tiered breakdown (FREE: 0, PREMIUM: $9.99, PRO: $199)
[ ] Revenue chart by tier (stacked bar)
[ ] Top earning coaches leaderboard
[ ] Churn rate calculator
[ ] Lifetime value (LTV) estimate
[ ] Projection model
[ ] Export to CSV
```

### 📁 Archivos a crear

```
src/
├── pages/
│   └── Revenue.tsx
├── components/
│   └── revenue/
│       ├── RevenueOverview.tsx
│       ├── TieredChart.tsx
│       ├── TierBreakdown.tsx
│       ├── TopCoaches.tsx
│       ├── MRRCalculator.tsx
│       ├── ChurnAnalysis.tsx
│       └── ExportButton.tsx
└── hooks/
    └── useRevenue.ts
```

### ⏱️ Desglose de tiempo

```
Revenue components     : 2 horas
Charts (Recharts)      : 1.5 horas
Calculations           : 1 hora
Export CSV             : 1 hora
Styling                : 1 hora
─────────────────────────────
Total estimado         : ~6.5 horas
```

---

## 🟡 FASE 7: CONTENT MODERATION - DESPUÉS

**Estado:** 🟡 NO EMPEZADO  
**Tiempo:** 0.5 semanas  
**Dependencias:** Fases 2-4  
**Prioridad:** MEDIA  

### 🎯 Objetivos

```
[ ] Flagged comments list
[ ] User reports dashboard
[ ] Review modal (comment + context)
[ ] Approve/Reject/Delete actions
[ ] Ban user from platform
[ ] Moderation history
[ ] Filters por severity
[ ] Statistics (reported today, approved, rejected)
```

### 📁 Archivos a crear

```
src/
├── pages/
│   └── Moderation.tsx
├── components/
│   └── moderation/
│       ├── FlaggedContent.tsx
│       ├── CommentReview.tsx
│       ├── UserReports.tsx
│       ├── ModerationActions.tsx
│       ├── History.tsx
│       └── Stats.tsx
└── hooks/
    └── useModeration.ts
```

### ⏱️ Desglose de tiempo

```
Flagged content list   : 1.5 horas
Review modal           : 1 hora
Actions handling       : 1 hora
Styling               : 1 hora
─────────────────────────────
Total estimado        : ~4.5 horas
```

---

## 🟡 FASE 8: SYSTEM HEALTH - DESPUÉS

**Estado:** 🟡 NO EMPEZADO  
**Tiempo:** 0.5 semanas  
**Dependencias:** Fases 2-3  
**Prioridad:** MEDIA  

### 🎯 Objetivos

```
[ ] Database status (connected/down)
[ ] API response time graph (real-time)
[ ] Uptime percentage (last 7 days)
[ ] Error rate chart
[ ] Last health check timestamp
[ ] Auto-refresh every 30s
[ ] Alert notifications (red when down)
[ ] Metrics: p50, p95, p99 response time
```

### 📁 Archivos a crear

```
src/
├── pages/
│   └── Health.tsx
├── components/
│   └── health/
│       ├── DbStatus.tsx
│       ├── ResponseTimeChart.tsx
│       ├── UptimeWidget.tsx
│       ├── ErrorRateChart.tsx
│       └── Metrics.tsx
└── hooks/
    └── useHealth.ts
```

### ⏱️ Desglose de tiempo

```
Health components      : 1.5 horas
Charts (Recharts)      : 1 hora
Auto-refresh logic     : 1 hora
Alerts                 : 1 hora
─────────────────────────────
Total estimado        : ~4.5 horas
```

---

## 🟡 FASE 9: COMPONENTS LIBRARY - DESPUÉS

**Estado:** 🟡 NO EMPEZADO  
**Tiempo:** 0.75 semanas  
**Dependencias:** Fases 1-3  
**Prioridad:** MEDIA  

### 🎯 Objetivos

```
[ ] Button variants (primary, secondary, danger, ghost)
[ ] Card component
[ ] Modal dialog
[ ] Data table (sortable, filterable)
[ ] Form inputs (text, email, password, select)
[ ] Badges/pills
[ ] Loaders/skeletons
[ ] Toast notifications
[ ] Alerts
[ ] Dropdowns
```

### 📁 Archivos a crear

```
src/components/common/
├── Button.tsx
├── Card.tsx
├── Modal.tsx
├── Table.tsx
├── Input.tsx
├── Select.tsx
├── Badge.tsx
├── Loader.tsx
├── Skeleton.tsx
├── Toast.tsx
├── Alert.tsx
├── Dropdown.tsx
└── Pagination.tsx
```

### ⏱️ Desglose de tiempo

```
Buttons                : 1 hora
Cards, modals, inputs  : 2 horas
Table component        : 1.5 horas
Notifications          : 1 hora
Styling + exports      : 1.5 horas
─────────────────────────────
Total estimado         : ~7 horas
```

---

## 🟡 FASE 10: TESTING & DEPLOY - DESPUÉS

**Estado:** 🟡 NO EMPEZADO  
**Tiempo:** 1 semana  
**Dependencias:** Fases 2-9  
**Prioridad:** ALTA  

### 🎯 Objetivos

```
[ ] Unit tests (React Testing Library)
[ ] E2E tests (Cypress)
[ ] Coverage >80%
[ ] Error boundaries
[ ] Performance optimization
[ ] Build optimization (tree-shaking, splitting)
[ ] Production build
[ ] Deploy a hosting
[ ] Monitoring setup
[ ] CI/CD pipeline
```

### ⏱️ Desglose de tiempo

```
Unit tests             : 2 horas
E2E tests              : 2 horas
Optimization           : 1.5 horas
Build & deploy         : 1.5 horas
Monitoring             : 1 hora
─────────────────────────────
Total estimado         : ~8 horas
```

---

## 📊 RESUMEN POR FASE

| Fase | Nombre | Tiempo | Estado | Horas |
|------|--------|--------|--------|-------|
| 1 | Setup | 0.5 sem | ✅ Hecho | - |
| 2 | Auth | 1 sem | 🔴 HOY | 5.5h |
| 3 | Layout | 0.75 sem | 🟡 Después | 5h |
| 4 | Dashboard | 1 sem | 🟡 Después | 7.5h |
| 5 | Users | 1 sem | 🟡 Después | 9h |
| 6 | Revenue | 0.75 sem | 🟡 Después | 6.5h |
| 7 | Moderation | 0.5 sem | 🟡 Después | 4.5h |
| 8 | Health | 0.5 sem | 🟡 Después | 4.5h |
| 9 | Components | 0.75 sem | 🟡 Después | 7h |
| 10 | Testing | 1 sem | 🟡 Después | 8h |

**TOTAL: ~7.5 semanas, 45-50 horas**

---

## 📈 PROGRESO VISUAL

```
FASE 1 (Setup)       ████████████████████ 100% ✅
FASE 2 (Auth)        ░░░░░░░░░░░░░░░░░░░░   0% 🔴
FASE 3 (Layout)      ░░░░░░░░░░░░░░░░░░░░   0% 🟡
FASE 4 (Dashboard)   ░░░░░░░░░░░░░░░░░░░░   0% 🟡
FASE 5 (Users)       ░░░░░░░░░░░░░░░░░░░░   0% 🟡
FASE 6 (Revenue)     ░░░░░░░░░░░░░░░░░░░░   0% 🟡
FASE 7 (Moderation)  ░░░░░░░░░░░░░░░░░░░░   0% 🟡
FASE 8 (Health)      ░░░░░░░░░░░░░░░░░░░░   0% 🟡
FASE 9 (Components)  ░░░░░░░░░░░░░░░░░░░░   0% 🟡
FASE 10 (Testing)    ░░░░░░░░░░░░░░░░░░░░   0% 🟡
─────────────────────────────────────────────────
TOTAL PROYECTO       ██░░░░░░░░░░░░░░░░░░  10% 🚀
```

---

## 🎯 HITO IMPORTANTE

```
✅ FASE 1 (Hoy)     → Admin configurado
🔴 FASE 2 (Esta semana) → Auth funcional
🟡 FASE 3-4 (2 semanas) → Admin usable
🟡 FASE 5-9 (3-4 semanas) → Todas features
🟡 FASE 10 (Última semana) → Tests + Deploy
```

---

## 💡 NOTAS

- Cada fase se construye sobre la anterior
- Los tiempos son **estimaciones** (pueden variar)
- Fase 2 (Auth) es **crítica** - no saltar
- Puedes hacer múltiples fases en paralelo si tienes ayuda
- Skills de Claude automatizan la mayoría del trabajo

---

## 🎬 PRÓXIMO PASO

**Empieza FASE 2:**

```
1. Lee docs/api/AUTH.md
2. Lee docs/guias/DESARROLLO.md
3. Di: "Crea el módulo auth"
4. Yo genero estructura
5. Tú completas la lógica
6. Tests verdes ✅
7. → FASE 3
```

---

Última actualización: 2026-09-03
