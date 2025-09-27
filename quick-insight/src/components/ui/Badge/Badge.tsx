import React from 'react'
import { cn, type BadgeVariant, type BadgeSize } from '../types'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  children: React.ReactNode
}

const badgeVariants = {
  default: 'bg-[#56CDFF] text-white shadow-sm shadow-[#56CDFF]/25',
  secondary: 'bg-white/10 text-white/90 border border-white/20',
  outline: 'border border-[#56CDFF] text-[#56CDFF] bg-transparent',
  destructive: 'bg-red-500/20 text-red-400 border border-red-500/30'
}

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs rounded-md',
  md: 'px-3 py-1 text-sm rounded-lg',
  lg: 'px-4 py-1.5 text-base rounded-lg'
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium transition-all duration-200',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
