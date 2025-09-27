'use client';

import React, { useEffect, useRef } from 'react';
import { useFilterStore } from '@/lib/store/filterStore';
import { getActiveCategories } from '@/data/mockCategories';
import { CategoryButtonSimple } from './CategoryButtonSimple';
import { cn } from '@/lib/utils/cn';

interface CategoryFilterSimpleProps {
  className?: string;
  showAllOption?: boolean;
  onCategoryChange?: (categoryId: string | null) => void;
  initialCategory?: string;
}

export const CategoryFilterSimple: React.FC<CategoryFilterSimpleProps> = ({
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
    <div className={cn('w-full', className)}>
      {/* Контейнер с горизонтальным скроллом */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {categories.map((category, index) => {
          const isActive = currentCategory === category.id || 
                         (currentCategory === undefined && category.id === 'all');
          
          return (
            <div
              key={category.id}
              ref={isActive ? activeButtonRef : undefined}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <CategoryButtonSimple
                category={category}
                isActive={isActive}
                onClick={handleCategoryChange}
              />
            </div>
          );
        })}
      </div>
      
      {/* Индикатор скролла */}
      <div className="flex justify-center mt-2">
        <div className="h-1 w-8 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterSimple;
