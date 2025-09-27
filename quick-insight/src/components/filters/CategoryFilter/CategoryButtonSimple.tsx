'use client';

import React from 'react';
import { NewsCategory } from '@/types/news';
import { cn } from '@/lib/utils/cn';

interface CategoryButtonSimpleProps {
  category: NewsCategory;
  isActive: boolean;
  onClick: (categoryId: string) => void;
  className?: string;
}

export const CategoryButtonSimple: React.FC<CategoryButtonSimpleProps> = ({
  category,
  isActive,
  onClick,
  className,
}) => {
  const handleClick = () => {
    onClick(category.id);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        // Базовые стили
        'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-blue-400/50',
        'min-w-fit whitespace-nowrap',
        'transform hover:scale-105 active:scale-95',
        
        // Активное состояние
        isActive
          ? [
              'bg-gradient-to-r from-blue-500/20 to-cyan-500/20',
              'text-white border border-blue-400/30',
              'shadow-lg shadow-blue-500/25',
              'backdrop-blur-sm',
            ]
          : [
              'bg-white/5 text-white/70 border border-white/10',
              'hover:bg-white/10 hover:text-white hover:border-white/20',
              'backdrop-blur-sm',
            ],
        
        className
      )}
    >
      {/* Эффект свечения для активной кнопки */}
      {isActive && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-sm -z-10" />
      )}
      
      {/* Иконка категории */}
      {category.icon && (
        <span className="mr-2 text-base">
          {category.icon}
        </span>
      )}
      
      {/* Название категории */}
      <span className="relative z-10">
        {category.name}
      </span>
      
      {/* Дополнительный эффект свечения */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(45deg, ${category.color}20, transparent)`,
            boxShadow: `inset 0 0 20px ${category.color}40`,
          }}
        />
      )}
    </button>
  );
};

export default CategoryButtonSimple;
