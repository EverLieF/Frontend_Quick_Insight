import React from 'react'
import { cn, type SkeletonVariant } from '../types'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  className?: string
}

const skeletonVariants = {
  text: 'h-4 w-full',
  rectangular: 'w-full',
  circular: 'rounded-full'
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
  ...props
}) => {
  const style: React.CSSProperties = {}
  
  if (width) {
    style.width = typeof width === 'number' ? `${width}px` : width
  }
  
  if (height) {
    style.height = typeof height === 'number' ? `${height}px` : height
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-white/10 rounded-md',
        skeletonVariants[variant],
        className
      )}
      style={style}
      {...props}
    />
  )
}

// Предустановленные скелетоны для часто используемых элементов
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          className={index === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  )
}

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('p-4 space-y-3', className)}>
      <Skeleton variant="rectangular" height={200} className="rounded-xl" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-6 w-4/5" />
        <SkeletonText lines={3} />
      </div>
      <div className="flex gap-2">
        <Skeleton variant="rectangular" height={24} width={60} className="rounded-full" />
        <Skeleton variant="rectangular" height={24} width={80} className="rounded-full" />
      </div>
    </div>
  )
}

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className
}) => {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  )
}
