'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface ModalProps {
  /** Открыт ли модал */
  isOpen: boolean;
  /** Функция закрытия модала */
  onClose: () => void;
  /** Заголовок модала */
  title?: string;
  /** Содержимое модала */
  children: React.ReactNode;
  /** Дополнительные CSS классы */
  className?: string;
  /** Размер модала */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Показывать ли кнопку закрытия */
  showCloseButton?: boolean;
  /** Закрывать ли при клике на backdrop */
  closeOnBackdropClick?: boolean;
  /** Закрывать ли при нажатии Escape */
  closeOnEscape?: boolean;
  /** Показывать ли backdrop */
  showBackdrop?: boolean;
  /** Анимация появления */
  animation?: 'fade' | 'slide' | 'scale' | 'slideUp';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4',
};

const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: '-50%', y: '-50%', scale: 0.9 },
    animate: { opacity: 1, x: '-50%', y: '-50%', scale: 1 },
    exit: { opacity: 0, x: '-50%', y: '-50%', scale: 0.9 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  slideUp: {
    initial: { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '100%' },
  },
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showBackdrop = true,
  animation = 'scale',
}) => {
  // Закрытие по Escape
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isOpen, onClose]);

  // Блокировка скролла
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const currentAnimation = animationVariants[animation];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          {showBackdrop && (
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleBackdropClick}
            />
          )}

          {/* Modal Content */}
          <motion.div
            className={cn(
              'relative w-full mx-4 bg-gray-900/95 backdrop-blur-xl',
              'border border-white/10 rounded-2xl shadow-2xl',
              'glass-effect',
              sizeClasses[size],
              className
            )}
            variants={currentAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.3,
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <motion.div
                className="flex items-center justify-between p-6 border-b border-white/10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {title && (
                  <motion.h2
                    className="text-xl font-semibold text-white"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                  >
                    {title}
                  </motion.h2>
                )}

                {showCloseButton && (
                  <motion.button
                    className="p-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                  >
                    <X size={20} />
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Content */}
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
