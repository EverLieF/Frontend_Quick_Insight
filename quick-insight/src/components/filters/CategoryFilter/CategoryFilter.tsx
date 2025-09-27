'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFilterStore } from '@/lib/store/filterStore';
import { getActiveCategories } from '@/data/mockCategories';
import { CategoryButton } from './CategoryButton';
import { cn } from '@/lib/utils/cn';

interface CategoryFilterProps {
  className?: string;
  showAllOption?: boolean;
  onCategoryChange?: (categoryId: string | null) => void;
  initialCategory?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  className,
  showAllOption = true,
  onCategoryChange,
  initialCategory = 'all',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLDivElement>(null);
  
  // Получаем состояние из store
  const { activeFilters, setFilter } = useFilterStore();
  const currentCategory = activeFilters.category || initialCategory;
  
  // Получаем категории для отображения
  const categories = showAllOption 
    ? getActiveCategories() 
    : getActiveCategories().filter(cat => cat.id !== 'all');
  
  // Обработчик изменения категории
  const handleCategoryChange = (categoryId: string) => {
    const newCategory = categoryId === 'all' ? undefined : categoryId;
    setFilter('category', newCategory);
    onCategoryChange?.(newCategory || 'all');
  };
  
  // Прокрутка к активной кнопке
  const scrollToActiveButton = () => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeButtonRef.current;
      
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      
      const scrollLeft = button.offsetLeft - (containerRect.width / 2) + (buttonRect.width / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };
  
  // Прокрутка к активной кнопке при изменении категории
  useEffect(() => {
    const timer = setTimeout(scrollToActiveButton, 100);
    return () => clearTimeout(timer);
  }, [currentCategory]);
  
  // Инициализация фильтров при первом рендере
  useEffect(() => {
    if (!activeFilters.category && initialCategory !== 'all') {
      setFilter('category', initialCategory);
    }
  }, [activeFilters.category, initialCategory, setFilter]);
  
  return (
    <motion.div 
      className={cn('w-full', className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Контейнер с горизонтальным скроллом */}
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="flex gap-2"
        >
          {categories.map((category, index) => {
            const isActive = currentCategory === category.id || 
                           (currentCategory === undefined && category.id === 'all');
            
            return (
              <motion.div
                key={category.id}
                ref={isActive ? (el) => { if (el) activeButtonRef.current = el; } : undefined}
                variants={{
                  hidden: { opacity: 0, x: -30, scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 120,
                      damping: 15,
                    }
                  },
                }}
                layout
              >
                <CategoryButton
                  category={category}
                  isActive={isActive}
                  onClick={handleCategoryChange}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Компонент для отображения только активных категорий (без "Все")
export const ActiveCategoryFilter: React.FC<Omit<CategoryFilterProps, 'showAllOption'>> = (props) => {
  return <CategoryFilter {...props} showAllOption={false} />;
};

// Компонент для отображения всех категорий включая "Все"
export const FullCategoryFilter: React.FC<CategoryFilterProps> = (props) => {
  return <CategoryFilter {...props} showAllOption={true} />;
};

export default CategoryFilter;
