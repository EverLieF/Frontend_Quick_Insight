'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Menu } from 'lucide-react';

interface NavigationProps {
  onBackClick?: () => void;
  onMenuClick?: () => void;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  onBackClick,
  onMenuClick,
  showBackButton = true,
  showMenuButton = true,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`flex items-center justify-between px-6 py-4 ${className}`}
    >
      {/* Левая сторона - кнопка "Назад" */}
      <div className="flex items-center">
        {showBackButton && (
          <motion.button
            onClick={onBackClick}
            className="flex items-center gap-1 px-2 py-2 text-[#0A84FF] hover:text-[#0A84FF]/80 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="text-lg">􀆉</span>
            <span className="text-base font-normal">Назад</span>
          </motion.button>
        )}
      </div>

      {/* Центр - заголовок */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <h1 className="text-white font-semibold text-lg tracking-tight text-center">
          Quick Insight<br />
          Мини приложение
        </h1>
      </motion.div>

      {/* Правая сторона - кнопка меню */}
      <div className="flex items-center">
        {showMenuButton && (
          <motion.button
            onClick={onMenuClick}
            className="flex items-center justify-center w-8 h-8 text-[#0A84FF] hover:text-[#0A84FF]/80 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="text-lg">􀍡</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
