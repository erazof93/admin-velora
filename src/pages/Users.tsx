import { ErrorBoundary } from '@components/common/ErrorBoundary'
import { UsersList } from '@components/users'

export default function Users() {
  return (
    <ErrorBoundary>
      <UsersList />
    </ErrorBoundary>
  )
}
