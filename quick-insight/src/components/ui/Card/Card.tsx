import React from 'react'
import { cn, type CardVariant } from '../types'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  children: React.ReactNode
}

const cardVariants = {
  default: 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl',
  elevated: 'bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg shadow-black/20',
  glass: 'bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-inner shadow-white/5'
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'transition-all duration-200',
        cardVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('p-4 pb-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('p-4 pt-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('p-4 pt-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}
