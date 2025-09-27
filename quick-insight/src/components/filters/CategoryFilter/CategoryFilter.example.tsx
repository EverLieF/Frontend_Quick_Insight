'use client';

import React from 'react';
import { CategoryFilter, ActiveCategoryFilter, FullCategoryFilter } from './index';

/**
 * Пример использования CategoryFilter компонента
 */
export const CategoryFilterExample: React.FC = () => {
  const handleCategoryChange = (categoryId: string | null) => {
    console.log('Selected category:', categoryId);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">CategoryFilter Examples</h2>
        
        {/* Полный фильтр с опцией "Все" */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white/80">Full Category Filter (with "All" option)</h3>
          <FullCategoryFilter
            onCategoryChange={handleCategoryChange}
            className="bg-white/5 p-4 rounded-lg"
          />
        </div>
        
        {/* Активный фильтр без опции "Все" */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white/80">Active Category Filter (without "All" option)</h3>
          <ActiveCategoryFilter
            onCategoryChange={handleCategoryChange}
            className="bg-white/5 p-4 rounded-lg"
          />
        </div>
        
        {/* Базовый фильтр */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white/80">Basic Category Filter</h3>
          <CategoryFilter
            showAllOption={true}
            onCategoryChange={handleCategoryChange}
            initialCategory="politics"
            className="bg-white/5 p-4 rounded-lg"
          />
        </div>
        
        {/* Фильтр с начальной категорией */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white/80">Category Filter with Initial Category</h3>
          <CategoryFilter
            showAllOption={false}
            onCategoryChange={handleCategoryChange}
            initialCategory="science"
            className="bg-white/5 p-4 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterExample;
