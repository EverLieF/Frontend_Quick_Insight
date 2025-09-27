'use client';

import { Suspense, lazy, ComponentType } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Компонент для обертки ленивых компонентов
export function LazyWrapper({ children, fallback }: LazyWrapperProps) {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback || <DefaultFallback />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

// Дефолтный fallback компонент
function DefaultFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );
}

// Хук для создания ленивых компонентов с оберткой
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunc);
  
  return function WrappedLazyComponent(props: React.ComponentProps<T>) {
    return (
      <LazyWrapper fallback={fallback}>
        <LazyComponent {...props} />
      </LazyWrapper>
    );
  };
}

// Предустановленные ленивые компоненты
export const LazyNewsList = createLazyComponent(
  () => import('@/components/news/NewsList'),
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-card-gradient backdrop-blur-2xl rounded-xl p-4 animate-pulse">
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-600 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

export const LazyCategoryFilter = createLazyComponent(
  () => import('@/components/filters/CategoryFilter'),
  <div className="flex space-x-2 overflow-x-auto pb-2">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-8 bg-gray-600 rounded-full w-20 animate-pulse flex-shrink-0"></div>
    ))}
  </div>
);

export const LazyTabBar = createLazyComponent(
  () => import('@/components/layout/TabBar'),
  <div className="fixed bottom-0 left-0 right-0 bg-card-gradient backdrop-blur-2xl border-t border-gray-700">
    <div className="flex justify-around py-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col items-center space-y-1">
          <div className="w-6 h-6 bg-gray-600 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-600 rounded w-12 animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);
