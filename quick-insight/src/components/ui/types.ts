import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Базовые типы для вариантов компонентов
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type CardVariant = 'default' | 'elevated' | 'glass'

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive'
export type BadgeSize = 'sm' | 'md' | 'lg'

export type SkeletonVariant = 'text' | 'rectangular' | 'circular'
