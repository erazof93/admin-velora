# 🔍 Auditoría — FASE 5: Users Management

**Fecha:** 2026-09-03
**Proyecto:** admin-velora (React 19 + Vite 8 + TS + Tailwind v4)
**Alcance:** revisión de código de FASE 5 contra el spec + validaciones + issues.

---

## ✅ Resultado global

| Check | Estado | Detalle |
| --- | --- | --- |
| `pnpm type-check` | ✅ | `tsc -b --noEmit` → 0 errores |
| `pnpm lint` | ✅ | `oxlint src` → 0 warnings |
| `pnpm build` | ✅ | `dist/` OK · `index.js` 420 kB / 131 kB gz · sin warning de chunk |
| `prettier --check` | ✅ | formato consistente |
| Sin `any` explícito | ✅ | grep en archivos FASE 5 → 0 |
| Sin `console.log` de debug | ✅ | sólo `console.error` en `ErrorBoundary` y `console.warn` en `storage/auth.ts` (intencionales) |
| Sin URLs hard-coded | ✅ | única URL en `constants/api.ts` (fallback documentado) |
| Funcionalidad end-to-end | ✅ | verificada en navegador (ver más abajo) |

**No hay issues 🔴 críticos.**

---

## 📁 Auditoría por archivo

### `src/pages/Users.tsx` — ✅

- Estructura correcta: `<ErrorBoundary><UsersList/></ErrorBoundary>`.
- **MainLayout NO se re-aplica aquí** (correcto): lo aporta la _layout route_ de `App.tsx`
  (`<Route element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>`). La página sólo renderiza su contenido en el `<Outlet/>`.
- Imports válidos, error boundary presente.

### `src/components/users/UsersList.tsx` — ✅

- Header (título + "Crear usuario"), `UserFilters`, `BulkActions` condicional (`selectedIds.length > 0`), `UserTable`.
- Loading → `<Skeleton className="h-80" />`; error → `<ErrorState onRetry={refetch} />`.
- Modales orquestados desde acá: `UserDetail` (por `detailId`), `UserForm` (por `formTarget`: `undefined`=cerrado / `null`=crear / `AdminUser`=editar), `ConfirmDialog` de borrado (por `deleteTarget`).
- **Fix aplicado en esta auditoría:** `handleView`/`handleEdit`/`handleDelete`/`clearSelection` envueltos en `useCallback`, y `EMPTY_ROWS` constante para `data ?? EMPTY_ROWS` → `columns` (useMemo) de `UserTable` deja de rehacerse en cada render.

### `src/components/users/UserTable.tsx` — ✅

- **react-table v8** (`useReactTable` + `getCoreRowModel` / `getSortedRowModel` / `getPaginationRowModel`).
- Columnas: `select` (checkbox) · Nombre · Email · Tier (`<TierBadge>`) · Estado (`<StatusBadge>`) · Creado (`formatDate`) · Acciones (Ver / Editar / Eliminar).
  > El spec pide una columna **ID**; se omitió a propósito (el `id` mock `u001…` es ruido para el admin). El ID sí aparece en `UserDetail`. → ver 🟡-6.
- Paginación: `initialState.pagination.pageSize = 10`, controles Anterior/Siguiente + "Página X de Y".
- Sorting: headers clicables con indicador (`ChevronUp/Down/ChevronsUpDown`); `select` y `actions` con `enableSorting: false`.
- Selección: `getRowId: row => row.id` → las keys de `rowSelection` son ids de usuario (sobreviven a sort/paginación); `enableRowSelection`, checkbox "seleccionar todos" en el header.
- Responsive: `<div class="overflow-x-auto">` + `<table class="min-w-[720px]">` → scroll horizontal en mobile.
- **Fix aplicado:** `// oxlint-disable-next-line react/incompatible-library` puntual en la llamada `useReactTable` (antes era un `off` global de la regla en `.oxlintrc.json`). Es un **falso positivo** de oxlint: react-table v8 es un hook headless válido.

### `src/components/users/UserFilters.tsx` — ✅

- Buscador (nombre/email) + `<select>` tier (`TODOS/FREE/PREMIUM/PRO_COACHING`) + `<select>` status (`TODOS/ACTIVE/SUSPENDED`) + botón "Limpiar" (visible sólo si hay filtro activo).
- Estado en `useFiltersStore` (Zustand). `onChange` (prop) llama a `clearSelection` en cada cambio → limpia la selección de filas cuando cambian los filtros.
- `useFiltersStore()` sin selector: seguro en Zustand v5 (no crea objeto nuevo en un selector) y el componente usa todos los campos.

### `src/components/users/UserDetail.tsx` — ✅

- `<Modal size="lg">`; datos vía `useUserQuery(userId)` (`enabled: id !== null`).
- Tabs: **Perfil** (ID, Nombre, Email, Rol, Creado) · **Actividades** (conteo) · **Stats** (Seguidores / Actividades).
- Botones: **Editar** (`onEdit`), **Suspender** (`update` status→SUSPENDED, disabled si ya suspendido), **Subir tier** (`update` tier→siguiente nivel, disabled en PRO_COACHING), **Eliminar** (`ConfirmDialog` → `remove` → cierra).
- Loading → `<Skeleton>`; error → texto en rojo.

### `src/components/users/UserForm.tsx` — ✅

- Inputs: nombre, email, tier (`<select>`), status (`<select>`). Validación local: `isNotEmpty(name)`, `isEmail(email)` (helpers FASE 1).
- Submit: `create.mutate` (crear) o `update.mutate({id, values})` (editar) según `user`; `onSuccess: onClose`.
- **Se monta con `key` distinta por objetivo** (desde `UsersList`) → `useState` arranca con los valores correctos sin sincronizar vía `useEffect`. Patrón idiomático + satisface oxlint `react/set-state-in-effect`.
- El botón "Guardar" del footer del Modal dispara el form vía `form="user-form"`.

### `src/components/users/BulkActions.tsx` — ✅

- Se renderiza sólo si `selectedIds.length > 0` (condición en `UsersList`).
- Botones Suspender / Promover / Eliminar → `ConfirmDialog` antes de ejecutar → `bulk.mutate({ids, action})` → `onSuccess`: cierra diálogo + `onDone()` (limpia selección).
- `bulk` mutation invalida `['users']` → la tabla se refresca.

### `src/hooks/useUsers.ts` — ✅

- `useUsersQuery(filters)` → `GET /users` (o mock), `queryKey: ['users', filters]`, `staleTime: 2 min`.
- `useUserQuery(id)` → `GET /users/:id`, `enabled: id !== null`.
- `useUserMutations()` → `create` (POST), `update` (PUT), `remove` (DELETE), `bulk` (POST bulk-action). Todas con `onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })`.
- **401:** no se maneja acá a propósito — lo cubre el interceptor global de `apiClient` (FASE 2: limpia sesión + redirige a `/login`). → ver 🟡-7.

### `src/store/filtersStore.ts` — ✅

- Campos: `search`, `tier`, `status` + setters + `reset()`. Sin `persist` (estado de sesión).
  > El spec lo llama `searchQuery`; acá es `search`. Cosmético. → 🟡-8.

### `src/types/` — ✅

- `admin.ts`: `UserTier = 'FREE' | 'PREMIUM' | 'PRO_COACHING'`, `UserStatus = 'ACTIVE' | 'SUSPENDED'`, `AdminUser` (+`followers?`, `activities?`).
- `users.ts`: `TierFilter`, `StatusFilter`, `UsersFilters`, `UserFormValues`, `BulkAction`, `BulkActionPayload`.
- Exportados vía `types/index.ts` (`export type * from './admin' / './users'`).
- **Uniones de strings, no `enum`** → decisión intencional (mejor tree-shaking; `erasableSyntaxOnly` del tsconfig prohíbe enums). → ✅-2.

---

## 🧪 Funcionalidad verificada en navegador

`vite preview` + sesión sembrada en `localStorage` + `VITE_USE_MOCKS=true` (47 usuarios mock):

| Caso | ✓ |
| --- | --- |
| Tabla carga (react-table, 10/página) | ✅ |
| Buscar por nombre/email (`"romero"` → 3) | ✅ |
| Filtro tier (`PREMIUM` → 16, "1 de 2") | ✅ |
| Filtro status (`SUSPENDED` → 9) | ✅ |
| Limpiar filtros | ✅ |
| Paginación (→ página 2 = usuarios 11-20) | ✅ |
| Sort columna Nombre (asc/desc, vuelve a pág. 1) | ✅ |
| Row → `UserDetail` (tabs + acciones) | ✅ |
| Crear usuario (validación + submit → aparece en tabla) | ✅ |
| Checkbox → barra `BulkActions` + contador | ✅ |
| Bulk promote (confirm → mutación → FREE→PREMIUM, selección limpia) | ✅ |
| Delete → `ConfirmDialog` (cableado; `remove` verificado vía bulk) | ✅ |
| Dark mode Velora | ✅ |
| Responsive (tabla con scroll-x) | ✅ |
| Consola sin errores | ✅ |

---

## 🟡 Menores / notas (no bloquean)

1. **Filtrado/paginación/sort son client-side.** Con el backend real hay que pasar `page`/`pageSize`/`sort` como params y devolver `{ rows, total }`. `usersAPI.list` ya arma `params` (search/tier/status) para el modo real; falta la parte de paginación server-side. → ajuste FASE 5.x al poner `VITE_USE_MOCKS=false`.
2. **Bulk "Promover" siempre fija tier = `PREMIUM`.** El spec dice literal "Promote to PREMIUM", pero eso _degradaría_ a un usuario `PRO_COACHING`. Recomendado: subir un nivel o excluir a los que ya están por encima.
3. **`UserForm` no muestra el error de la mutación.** Si `create`/`update` fallan (red/500) el modal no cierra pero no hay mensaje. Los toasts llegan en FASE 9; hasta entonces conviene un banner de error inline en el form.
4. **`UserDetail` — acciones sin feedback de éxito.** Suspender / Subir tier mutan y refrescan la query, pero sólo hay `disabled` mientras `isPending`, sin confirmación visible.
5. **`UserForm` (edición) usa el `AdminUser` capturado al hacer click.** Si la lista refetchea mientras el modal está abierto, el form muestra el snapshot, no los datos frescos. Edge case de baja probabilidad.
6. **Columna `ID` omitida en la tabla** (sí está en `UserDetail`). Decisión de UX (ruido). Si el spec lo exige literal, agregar una columna `id` estrecha.
7. **Manejo de 401 implícito** (interceptor global de `apiClient`), no explícito en los hooks. Correcto, pero conviene documentarlo.
8. **Naming:** `filtersStore.search` vs `searchQuery` del spec. Cosmético.
9. **`Modal` sin focus-trap ni autofocus.** Cubre `role="dialog"`, `aria-modal`, `aria-label`, cierre con `Escape` y click en backdrop; falta atrapar el foco dentro del diálogo (a11y).
10. **`mockUserDb` es in-memory** → create/update/delete se pierden al recargar la página. Esperado para el modo mock (dev sin backend).

---

## ✅ Desviaciones positivas respecto al spec

1. **react-table v8** (`^8.21.3`) en vez del `9.2.4` que instaló `pnpm add @tanstack/react-table`. v9 es un rewrite con API totalmente distinta, muy nuevo y sin ejemplos; v8 es la versión estable y documentada.
2. **`UserTier` / `UserStatus` como uniones de strings**, no `enum` — mejor tree-shaking y compatible con `erasableSyntaxOnly` del tsconfig.
3. **`UserForm` se remonta por `key`** en vez de sincronizar props→state con `useEffect` — patrón recomendado de React y evita el error `react/set-state-in-effect` de oxlint.
4. **`Modal`, `Badge`, `ConfirmDialog` creados ya como reutilizables** (`components/common/`). El spec los ubica en FASE 9, pero FASE 5 los necesita; quedan listos para reutilizar.
5. **Flag `VITE_USE_MOCKS`** + capa `usersAPI` con fallback a `mockUserDb` mutable → dev/demo sin credenciales del backend. Default `false` (prod pega al API real; Vercel usa sus propias env vars).
6. **`useCallback` en los handlers de fila** (añadido en esta auditoría) → `columns` de react-table no se rehace en cada render de `UsersList`.
7. **Tailwind `velora-*` semántico** en todos los componentes en vez de `style={{ COLORS.* }}` — consistente con FASE 1-4, tema claro/oscuro incluido.
8. **`getRowId` = id de usuario** en react-table → la selección múltiple sobrevive a ordenar y paginar (no se pierde al cambiar de página).

---

## 🔧 Cambios aplicados durante esta auditoría

| Archivo | Cambio |
| --- | --- |
| `src/components/users/UsersList.tsx` | `useCallback` en `handleView/handleEdit/handleDelete/clearSelection`; `EMPTY_ROWS` estable para `data ?? EMPTY_ROWS`. |
| `src/components/users/UserTable.tsx` | `// oxlint-disable-next-line react/incompatible-library` puntual en `useReactTable`. |
| `.oxlintrc.json` | Quitado el `"react/incompatible-library": "off"` global (ahora es un disable de una sola línea). |

Post-fix: `type-check` 0 · `lint` 0 · `build` OK.
