'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export interface AnimatedCardProps {
  /** Содержимое карточки */
  children: React.ReactNode;
  /** Дополнительные CSS классы */
  className?: string;
  /** Анимация при наведении */
  hoverAnimation?: boolean;
  /** Анимация при нажатии */
  tapAnimation?: boolean;
  /** Анимация появления */
  appearAnimation?: boolean;
  /** Задержка анимации появления */
  appearDelay?: number;
  /** Эффект размытия фона */
  glassEffect?: boolean;
  /** Градиентная граница */
  gradientBorder?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Интерактивность */
  interactive?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  hoverAnimation = true,
  tapAnimation = true,
  appearAnimation = true,
  appearDelay = 0,
  glassEffect = true,
  gradientBorder = false,
  onClick,
  interactive = false,
}) => {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-xl',
        glassEffect && 'glass-effect',
        gradientBorder && 'border border-white/10',
        interactive && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      whileHover={hoverAnimation && interactive ? { 
        y: -4,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : {}}
      whileTap={tapAnimation && interactive ? { 
        scale: 0.98,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      } : {}}
      initial={appearAnimation ? { 
        opacity: 0, 
        y: 20,
        scale: 0.95
      } : {}}
      animate={appearAnimation ? { 
        opacity: 1, 
        y: 0,
        scale: 1
      } : {}}
      transition={appearAnimation ? { 
        duration: 0.4,
        delay: appearDelay,
        type: "spring",
        stiffness: 100,
        damping: 15
      } : {}}
      layout
    >
      {children}
      
      {/* Hover Effect Overlay */}
      {interactive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 pointer-events-none"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedCard;
