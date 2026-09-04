import { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Skeleton } from '@components/common/Skeleton'
import { useUIStore } from '@store/uiStore'
import { cn } from '@lib/utils/helpers'
import { Breadcrumbs } from './Breadcrumbs'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const MainLayout = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const expanded = useUIStore((s) => s.sidebarOpen)

  return (
    <div className="min-h-screen bg-velora-bg text-velora-text">
      <Sidebar mobileOpen={mobileNavOpen} onMobileClose={() => setMobileNavOpen(false)} />

      <div
        className={cn(
          'flex min-h-screen flex-col transition-[padding] duration-200',
          expanded ? 'md:pl-60' : 'md:pl-16',
        )}
      >
        <Header onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex-1 px-4 py-6 md:px-8">
          <Breadcrumbs />
          <div className="mt-4 animate-velora-fade-in">
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
