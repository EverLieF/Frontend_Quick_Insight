'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { NewsCategory } from '@/types/news';
import { cn } from '@/lib/utils/cn';

interface CategoryButtonProps {
  category: NewsCategory;
  isActive: boolean;
  onClick: (categoryId: string) => void;
  className?: string;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isActive,
  onClick,
  className,
}) => {
  const handleClick = () => {
    onClick(category.id);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        // Базовые стили
        'relative px-4 py-1 rounded-[21px] text-xs font-medium transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-blue-400/50',
        'min-w-fit whitespace-nowrap h-7 flex items-center justify-center',
        
        // Активное состояние
        isActive
          ? [
              'bg-black/40 text-[#56CDFF]',
              'shadow-[inset_0px_0px_14px_0px_rgba(65,190,242,0.75)]',
              'backdrop-blur-[4px]',
            ]
          : [
              'bg-black/40 text-white',
              'hover:bg-black/50',
              'backdrop-blur-[4px]',
            ],
        
        className
      )}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      {/* Название категории */}
      <span className="relative z-10">
        {category.name}
      </span>
    </motion.button>
  );
};

export default CategoryButton;
