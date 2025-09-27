'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, BookOpen, Heart, Search, User, LogOut } from 'lucide-react';
import { logger } from '@/lib/utils/logger';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'profile',
    label: 'Профиль',
    icon: User,
    path: '/profile',
  },
  {
    id: 'bookmarks',
    label: 'Избранное',
    icon: Heart,
    path: '/bookmarks',
  },
  {
    id: 'read',
    label: 'Прочитанное',
    icon: BookOpen,
    path: '/read',
  },
  {
    id: 'search',
    label: 'Поиск',
    icon: Search,
    path: '/search',
  },
  {
    id: 'settings',
    label: 'Настройки',
    icon: Settings,
    path: '/settings',
  },
];

export function Menu({ isOpen, onClose, onNavigate }: MenuProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Закрытие меню по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleItemClick = (item: MenuItem) => {
    logger.userAction('menu_item_clicked', { itemId: item.id, path: item.path });
    setSelectedItem(item.id);
    
    // Небольшая задержка для анимации
    setTimeout(() => {
      onNavigate(item.path);
      onClose();
    }, 150);
  };

  const handleLogout = () => {
    logger.userAction('logout_clicked');
    // TODO: Implement logout logic
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-card-gradient backdrop-blur-xl border-l border-white/10 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Меню</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = selectedItem === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-500/20 border border-blue-400/30'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-blue-500/30' : 'bg-white/10'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isSelected ? 'text-blue-400' : 'text-white/70'
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-medium ${
                        isSelected ? 'text-blue-400' : 'text-white'
                      }`}>
                        {item.label}
                      </div>
                    </div>
                    {item.badge && (
                      <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                        {item.badge}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors"
              >
                <div className="p-2 rounded-lg bg-red-500/20">
                  <LogOut className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-red-400">Выйти</div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
