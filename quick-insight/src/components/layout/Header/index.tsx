'use client';

import { motion } from 'framer-motion';
import { StatusBar } from './StatusBar';
import { Navigation } from './Navigation';

export interface HeaderProps {
  onBackClick?: () => void;
  onMenuClick?: () => void;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onBackClick,
  onMenuClick,
  showBackButton = true,
  showMenuButton = true,
  className = '',
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`relative w-full ${className}`}
    >
      {/* Основной контейнер */}
      <div className="relative">
        {/* Статус-бар */}
        <StatusBar />
        
        {/* Навигация */}
        <Navigation
          onBackClick={onBackClick}
          onMenuClick={onMenuClick}
          showBackButton={showBackButton}
          showMenuButton={showMenuButton}
        />
        
        {/* Grabber (полоска для перетаскивания) */}
        <motion.div
          className="flex justify-center pb-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="w-9 h-1 bg-white/30 rounded-full" />
        </motion.div>
      </div>
    </motion.header>
  );
};

// Экспорт отдельных компонентов для переиспользования
export { StatusBar } from './StatusBar';
export { Navigation } from './Navigation';
