import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@components/auth/ProtectedRoute'
import { ROUTES } from '@constants/routes'
import { useTheme } from '@hooks/useTheme'
import { queryClient } from '@lib/queryClient'
import Dashboard from '@pages/Dashboard'
import Login from '@pages/Login'

function App() {
  // Aplica el tema Velora (dark por defecto) sobre <html>.
  useTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />

          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
