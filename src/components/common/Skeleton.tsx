import type { SkeletonProps } from '@/types/components'
import { cn } from '@lib/utils/helpers'

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn('animate-velora-pulse rounded-md bg-velora-surface-2', className)} />
)
