'use client';

import { motion } from 'framer-motion';
import { 
  Newspaper, 
  BookOpen, 
  User, 
  Settings,
  LucideIcon 
} from 'lucide-react';
import { TabItem, TabItemProps } from './TabItem';
import { cn } from '@/lib/utils/cn';

export interface Tab {
  /** Уникальный ID таба */
  id: string;
  /** Иконка таба */
  icon: LucideIcon;
  /** Подпись таба */
  label: string;
  /** Дополнительные данные таба */
  data?: unknown;
}

export interface TabBarProps {
  /** Массив табов */
  tabs?: Tab[];
  /** Активный таб */
  activeTab?: string;
  /** Обработчик смены таба */
  onTabChange?: (tabId: string) => void;
  /** Дополнительные CSS классы */
  className?: string;
  /** Показать ли TabBar */
  visible?: boolean;
}

// Дефолтные табы
const defaultTabs: Tab[] = [
  {
    id: 'news',
    icon: Newspaper,
    label: 'Инсайты',
  },
  {
    id: 'learning',
    icon: BookOpen,
    label: 'Обучение',
  },
  {
    id: 'profile',
    icon: User,
    label: 'Профиль',
  },
  {
    id: 'settings',
    icon: Settings,
    label: 'Настройки',
  },
];

export const TabBar = ({
  tabs = defaultTabs,
  activeTab = 'news',
  onTabChange,
  className,
  visible = true,
}: TabBarProps) => {
  const handleTabClick = (tabId: string) => {
    onTabChange?.(tabId);
  };

  if (!visible) {
    return null;
  }

  return (
    <motion.div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-[#02050A] rounded-t-[16px]',
        'shadow-[0px_-4px_10.1px_0px_rgba(1,68,112,0.1)]',
        'safe-area-pb',
        className
      )}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Контейнер табов */}
      <motion.div 
        className="flex items-center justify-center gap-16 px-10 py-0 bg-[#000714]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-16"
        >
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.id}
              className="flex flex-col items-center justify-center gap-2.5 p-1.5 w-8 h-8"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }
                },
              }}
              layout
            >
              <TabItem
                id={tab.id}
                icon={tab.icon}
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="group"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Gesture bar */}
      <motion.div
        className="flex justify-center pt-2.5 pb-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="w-27 h-1 bg-white/30 rounded-xl" />
      </motion.div>
    </motion.div>
  );
};

// Экспорт типов для удобства использования
export type { TabBarProps, TabItemProps };
export { TabItem };
