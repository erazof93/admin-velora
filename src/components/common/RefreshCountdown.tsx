import { useEffect, useState } from 'react'

interface RefreshCountdownProps {
  /** Segundos del ciclo de auto-refresh. Remontar con `key` para reiniciarlo. */
  seconds: number
  label?: string
}

function formatCountdown(total: number): string {
  if (total < 60) return `${total}s`
  const minutes = Math.floor(total / 60)
  const rest = total % 60
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

export const RefreshCountdown = ({ seconds, label = 'Auto-refresh en' }: RefreshCountdownProps) => {
  const [left, setLeft] = useState(seconds)

  useEffect(() => {
    const id = setInterval(() => {
      setLeft((value) => (value <= 1 ? seconds : value - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [seconds])

  return (
    <span>
      {label} {formatCountdown(left)}
    </span>
  )
}
