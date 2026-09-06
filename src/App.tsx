import { lazy } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@components/auth/ProtectedRoute'
import { ToastProvider } from '@components/common/Toast'
import { MainLayout } from '@components/layout'
import { ROUTES } from '@constants/routes'
import { useTheme } from '@hooks/useTheme'
import { queryClient } from '@lib/queryClient'
import AdminManagement from '@pages/AdminManagement'
import Dashboard from '@pages/Dashboard'
import Login from '@pages/Login'
import Placeholder from '@pages/Placeholder'
import Users from '@pages/Users'

// Páginas pesadas → chunk propio (Recharts / tablas fuera del bundle inicial).
const Revenue = lazy(() => import('@pages/Revenue'))
const Moderation = lazy(() => import('@pages/Moderation'))
const Coaches = lazy(() => import('@pages/Coaches'))
const Health = lazy(() => import('@pages/Health'))

function App() {
  // Aplica el tema Velora (dark por defecto) sobre <html>.
  useTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />

            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.USERS} element={<Users />} />
              <Route path={ROUTES.REVENUE} element={<Revenue />} />
              <Route path={ROUTES.MODERATION} element={<Moderation />} />
              <Route path={ROUTES.COACHES} element={<Coaches />} />
              <Route path={ROUTES.HEALTH} element={<Health />} />
              <Route path={ROUTES.ANALYTICS} element={<Placeholder title="Analytics" />} />

              <Route
                path={ROUTES.ADMIN_CREATE}
                element={
                  <ProtectedRoute requiredRole="SUPERADMIN">
                    <AdminManagement />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
            <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  )
}

export default App
