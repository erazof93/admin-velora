# 🎯 CLI WORKFLOW - Cómo vamos a trabajar Admin Velora

## Resumen del proceso:

```
1. TÚ ejecutas comandos CLI que YO indico
2. YO te doy prompts exactos para cada módulo
3. SUB AGENTE audita el código
4. SUB AGENTE actualiza ROADMAP (CLAUDE.md)
5. Siguiente módulo
```

---

## FASE 2: AUTH - EJEMPLO COMPLETO

### PASO 1: Yo te doy el comando CLI
```bash
# Crear carpetas
mkdir -p src/{pages,components/auth,store,lib/api,lib/storage,hooks,types,constants}

# Crear archivos
touch src/pages/Login.tsx
touch src/components/auth/LoginForm.tsx
touch src/components/auth/AuthLayout.tsx
touch src/components/auth/ProtectedRoute.tsx
touch src/store/authStore.ts
touch src/lib/api/client.ts
touch src/lib/api/endpoints.ts
touch src/lib/api/hooks.ts
touch src/lib/storage/auth.ts
touch src/hooks/useAuth.ts
touch src/types/index.ts
touch src/constants/routes.ts
touch src/constants/api.ts
```

### PASO 2: Yo te doy el contenido (prompts)
```typescript
// src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // ... implementación
}));
```

### PASO 3: TÚ copias/pegas en archivos
```bash
# Opción A: Manual
# - Abres archivo src/store/authStore.ts
# - Pegas el contenido que te doy
# - Guardas

# Opción B: Automatizado (si uso Claude Code)
# - Yo ejecuto comandos que crean el archivo directamente
```

### PASO 4: TÚ ejecutas validaciones
```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Dev server
pnpm dev

# Verificar en http://localhost:3000/login
```

### PASO 5: SUB AGENTE audita
- ✅ TypeScript sin errores
- ✅ Componentes React válidos
- ✅ Zustand store correcto
- ✅ API client configurado
- ✅ Tailwind CSS aplicado
- ✅ Dark mode compatible
- ✅ No hay console.log de debug
- ✅ Imports/exports correctos

### PASO 6: SUB AGENTE actualiza CLAUDE.md
```
ROADMAP:
  FASE 2: Auth
  ✅ Login page creada
  ✅ Zustand authStore implementado
  ✅ API client conectado
  ✅ Token storage funcional
  ✅ Protected routes working
  ✅ Styling dark mode: HECHO
  ✅ Type check: 0 errores
  ✅ Lint: 0 warnings
  
  Progreso: 100% ✅
  Tiempo empleado: 5 horas
  
  PRÓXIMO: FASE 3 - Layout Module
```

---

## ESTRUCTURA DE COMANDOS

### Cuando sea **componente React:**

```bash
# Crear el archivo
touch src/components/[grupo]/[Nombre].tsx

# Luego yo te paso el código TypeScript/React
```

### Cuando sea **Zustand Store:**

```bash
# Crear archivo
touch src/store/[nombreStore].ts

# Yo te paso el store con tipos TS
```

### Cuando sea **Custom Hook:**

```bash
# Crear archivo
touch src/hooks/use[Nombre].ts

# Yo te paso el hook implementado
```

### Cuando sea **API Client:**

```bash
# Crear archivo
touch src/lib/api/[archivo].ts

# Yo te paso axios client + interceptors
```

### Cuando sea **Testing:**

```bash
pnpm test
# o para watch mode:
pnpm test:watch

# Todos los tests deben pasar ✅
```

### Cuando sea **Lint & Format:**

```bash
# Check linting
pnpm lint

# Fix issues
pnpm lint --fix

# Format code
pnpm format

# Type check
pnpm type-check
```

### Cuando sea **Build & Preview:**

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview

# Start dev server
pnpm dev
```

---

## FORMATO DE PROMPTS QUE TE VOY A DAR

Cuando te diga "Crea el módulo auth", te voy a dar:

```
═══════════════════════════════════════════════════════════════
🔴 FASE 2 - MODULO: AUTH
═══════════════════════════════════════════════════════════════

PASO 1️⃣: Crear estructura con CLI
───────────────────────────────────────
mkdir -p src/{pages,components/auth,store,lib/api,hooks,types,constants}
touch src/pages/Login.tsx
touch src/store/authStore.ts
... (más archivos)

PASO 2️⃣: Copiar código a archivos
───────────────────────────────────────
Archivo: src/store/authStore.ts
Contenido:
[CÓDIGO TYPESCRIPT AQUÍ]

Archivo: src/pages/Login.tsx
Contenido:
[CÓDIGO REACT AQUÍ]

... (más archivos)

PASO 3️⃣: Validar código
───────────────────────────────────────
pnpm type-check      ← Debe salir sin errores
pnpm lint            ← Debe salir sin warnings
pnpm dev             ← Debe compilar sin errores

PASO 4️⃣: Verificar en navegador
───────────────────────────────────────
http://localhost:3000/login
- ¿Se ve la form?
- ¿Se ven los inputs?
- ¿Funciona el login?
- ¿Dark mode aplica?

PASO 5️⃣: Reporte
───────────────────────────────────────
Cuando funcione todo, responde:
"Auth module listo - pnpm type-check: 0 errors, pnpm lint: 0 warnings"

═══════════════════════════════════════════════════════════════
```

---

## SUB AGENTE - CHECKLIST DE AUDITORÍA

Cuando termines, el **SUB AGENTE** debe revisar:

```
✅ TYPESCRIPT
  □ type-check sin errores
  □ Todos los tipos definidos
  □ Imports sin errores
  □ Exports correctos

✅ REACT
  □ Componentes válidos
  □ Hooks usados correctamente
  □ No hay warnings de React
  □ Props tipadas

✅ ZUSTAND
  □ Store creado correctamente
  □ Tipos genéricos correctos
  □ State y setters funcionan
  □ Persistencia si es necesario

✅ TAILWIND CSS
  □ Clases Tailwind aplicadas
  □ Dark mode compatible
  □ Responsive design
  □ Colores Velora usados

✅ LINTING
  □ pnpm lint: 0 warnings
  □ No hay console.log de debug
  □ Código formateado (prettier)

✅ FUNCIONALIDAD
  □ Componente renderiza
  □ Sin errores en console
  □ Datos se actualizan correctamente
  □ Store persiste correctamente

✅ INTEGRACIÓN
  □ Componente integrado en App.tsx
  □ No hay conflictos con otros módulos
  □ Build sin errores: pnpm build

✅ DOCUMENTACIÓN
  □ Tipos documentados
  □ Funciones con JSDoc
  □ README actualizado (si aplica)
```

Si TODO pasa → ✅ APROBADO
Si algo falla → ❌ RECHAZADO (requiere fix)

---

## SUB AGENTE - ACTUALIZACIÓN DE ROADMAP

Después de auditar, **SUB AGENTE** actualiza CLAUDE.md:

```markdown
## 🔴 FASE 2: Autenticación (Auth) - COMPLETADA ✅

**Tiempo empleado:** 5 horas
**Type check:** 0 errores ✅
**Lint:** 0 warnings ✅
**Funcionalidad:** 100% ✅

### Tareas Completadas:
- ✅ Login page creada (src/pages/Login.tsx)
- ✅ LoginForm component
- ✅ AuthLayout wrapper
- ✅ ProtectedRoute guard
- ✅ Zustand auth store con tipos
- ✅ API client con axios
- ✅ Token storage (localStorage)
- ✅ API endpoints enum
- ✅ useAuth custom hook
- ✅ Tailwind styling + dark mode

### Componentes Implementados:
- LoginForm: email, password, submit button
- AuthLayout: centered, branded layout
- ProtectedRoute: redirect si no auth

### Stores Implementados:
- authStore: token, user, isAuthenticated, login, logout

### Endpoints Consumidos:
- POST /api/v1/auth/login

### Próximo Módulo:
🟡 FASE 3: Layout Module (Estimado: 5 horas)

### Comandos Ejecutados:
```bash
pnpm type-check      # ✅ 0 errores
pnpm lint            # ✅ 0 warnings
pnpm dev             # ✅ Corriendo en :3000
pnpm build           # ✅ Build exitoso
```

**Status:** Listo para FASE 3 ✅
```

---

## VENTAJAS DE ESTE SISTEMA

✅ **CLI-first** - Usamos comandos reales (pnpm, vite, tsx)
✅ **Código completo** - Copiar/pegar listo (no pseudocódigo)
✅ **Validación automática** - Lint + type check cada módulo
✅ **Auditoría integrada** - SUB AGENTE verifica calidad
✅ **Documentación viva** - ROADMAP siempre actualizado
✅ **Escalable** - Funciona para 5, 50 o 500 módulos
✅ **Profesional** - Parece equipo real de desarrollo

---

## CUANDO ESTÉS LISTO

Avísame:

```
"Admin Velora setup completado. Listo para FASE 2 con CLI workflow."
```

Entonces empezamos con:

```
"Ejecuta estos comandos:"

mkdir -p src/{pages,components/auth,store,lib/api,hooks,types,constants}
pnpm type-check
pnpm dev

Y luego te paso el código del módulo auth completo.
```

---

## ESQUEMA DE TRABAJO TÍPICO

```
SEMANA 1 (FASE 2-3)
│
├─ Lunes: Auth
│  ├─ Yo te paso comandos CLI
│  ├─ Tú creas estructura
│  ├─ Yo te paso código
│  ├─ Tú copias/pegas
│  ├─ Yo audito
│  └─ ✅ Auth listo
│
└─ Martes: Layout
   ├─ Yo te paso comandos CLI
   ├─ Tú creas estructura
   ├─ Yo te paso código
   ├─ Tú copias/pegas
   ├─ Yo audito
   └─ ✅ Layout listo

SEMANA 2 (FASE 4-5)
│
├─ Dashboard (3 días)
├─ Users management (4 días)
└─ Total: 7 días

SEMANA 3-4 (FASE 6-9)
│
├─ Revenue (3 días)
├─ Moderation (2 días)
├─ Health (2 días)
├─ Components (3 días)
└─ Total: 10 días

SEMANA 5-7 (FASE 10)
│
├─ Testing
├─ Optimization
├─ Build & Deploy
└─ Production
```

---

**¡Estamos listos para trabajar profesionalmente!** 🚀

Version: 1.0
Tech: React 19 + Vite + TypeScript + Tailwind + Zustand + pnpm
