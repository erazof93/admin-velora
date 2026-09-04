import type { UseQueryResult } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import type { ReportedUser } from '@/types/moderation'
import { ReportedUserBadge } from '@components/common/Badge'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { ROUTES } from '@constants/routes'

interface UserReportsProps {
  query: UseQueryResult<ReportedUser[], Error>
}

export const UserReports = ({ query }: UserReportsProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return (
      <ErrorState message="No se pudieron cargar los reportes." onRetry={() => void refetch()} />
    )
  }

  const rows = data ? [...data].sort((a, b) => b.reportsCount - a.reportsCount) : []

  return (
    <Card className="h-full">
      <h2 className="mb-4 text-sm font-medium text-velora-muted">Usuarios reportados</h2>
      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead className="border-b border-velora-border text-xs uppercase text-velora-muted">
              <tr>
                <th className="px-2 py-2 font-medium">Usuario</th>
                <th className="px-2 py-2 text-right font-medium">Reportes</th>
                <th className="px-2 py-2 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-velora-border/60 transition-colors last:border-0 hover:bg-velora-surface-2/50"
                >
                  <td className="px-2 py-2.5">
                    <Link
                      to={`${ROUTES.USERS}?user=${user.id}`}
                      className="text-velora-text transition-colors hover:text-velora-primary"
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td className="px-2 py-2.5 text-right text-velora-text">{user.reportsCount}</td>
                  <td className="px-2 py-2.5">
                    <ReportedUserBadge status={user.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
