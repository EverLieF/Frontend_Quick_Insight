import React from 'react'
import { motion } from 'framer-motion'
import { cn, type ButtonVariant, type ButtonSize } from '../types'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  loading?: boolean
  disabled?: boolean
  /** Анимация при наведении */
  hoverAnimation?: boolean
  /** Анимация при нажатии */
  tapAnimation?: boolean
  /** Анимация появления */
  appearAnimation?: boolean
}

const buttonVariants = {
  primary: 'bg-gradient-to-r from-[#56CDFF] to-[#3B82F6] text-white shadow-lg shadow-[#56CDFF]/25 hover:shadow-[#56CDFF]/40 transition-all duration-200 active:scale-95',
  secondary: 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-200 active:scale-95',
  ghost: 'text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-95'
}

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-base rounded-xl',
  lg: 'px-6 py-3 text-lg rounded-xl'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  disabled = false,
  hoverAnimation = true,
  tapAnimation = true,
  appearAnimation = true,
  className,
  ...props
}) => {
  const MotionButton = motion.button

  return (
    <MotionButton
      className={cn(
        'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-[#56CDFF]/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={disabled || loading}
      whileHover={hoverAnimation && !disabled ? { 
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : {}}
      whileTap={tapAnimation && !disabled ? { 
        scale: 0.95,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      } : {}}
      initial={appearAnimation ? { opacity: 0, y: 10 } : {}}
      animate={appearAnimation ? { opacity: 1, y: 0 } : {}}
      transition={appearAnimation ? { 
        duration: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 15
      } : {}}
      {...props}
    >
      {loading && (
        <motion.svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </motion.svg>
      )}
      <motion.span
        initial={appearAnimation ? { opacity: 0 } : {}}
        animate={appearAnimation ? { opacity: 1 } : {}}
        transition={appearAnimation ? { duration: 0.2, delay: 0.1 } : {}}
      >
        {children}
      </motion.span>
    </MotionButton>
  )
}
