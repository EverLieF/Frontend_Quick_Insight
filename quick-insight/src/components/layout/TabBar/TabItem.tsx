'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface TabItemProps {
  /** Иконка таба */
  icon: LucideIcon;
  /** Подпись таба */
  label: string;
  /** Активен ли таб */
  isActive?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Дополнительные CSS классы */
  className?: string;
  /** ID таба для навигации */
  id: string;
}

export const TabItem = ({
  icon: Icon,
  label,
  isActive = false,
  onClick,
  className,
  id,
}: TabItemProps) => {
  return (
    <motion.button
      className={cn(
        'flex flex-col items-center justify-center gap-2.5 p-1.5 w-8 h-8',
        'transition-all duration-200 ease-in-out',
        'focus:outline-none',
        className
      )}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      aria-label={`Перейти к ${label}`}
      role="tab"
      aria-selected={isActive}
      id={`tab-${id}`}
      layout
    >
      {/* Иконка */}
      <motion.div
        className={cn(
          'relative flex items-center justify-center w-8 h-8',
          'transition-all duration-200 ease-in-out',
          isActive
            ? 'text-white'
            : 'text-white/50'
        )}
        animate={{
          scale: isActive ? 1.1 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <Icon size={20} />
      </motion.div>
    </motion.button>
  );
};
