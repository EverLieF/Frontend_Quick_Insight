/**
 * Кастомный хук для бесконечной прокрутки
 * Предоставляет функциональность для автоматической загрузки данных при достижении конца списка
 */

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Интерфейс для опций хука бесконечной прокрутки
 */
interface UseInfiniteScrollOptions {
  /** Функция для загрузки следующей страницы данных */
  loadMore: () => Promise<void>;
  /** Есть ли еще данные для загрузки */
  hasMore: boolean;
  /** Состояние загрузки */
  isLoading: boolean;
  /** Порог в пикселях от конца списка, при котором начинается загрузка */
  threshold?: number;
  /** Корневой элемент для наблюдения (по умолчанию window) */
  root?: Element | null;
  /** Задержка перед загрузкой следующей страницы в миллисекундах */
  debounceMs?: number;
  /** Включить/выключить автоматическую загрузку */
  enabled?: boolean;
}

/**
 * Интерфейс возвращаемых данных хука useInfiniteScroll
 */
interface UseInfiniteScrollReturn {
  /** Ref для элемента, который будет наблюдаться */
  sentinelRef: React.RefObject<HTMLElement>;
  /** Функция для принудительной загрузки следующей страницы */
  loadMore: () => Promise<void>;
  /** Состояние загрузки */
  isLoading: boolean;
  /** Есть ли еще данные для загрузки */
  hasMore: boolean;
  /** Ошибка загрузки */
  error: Error | null;
  /** Функция для сброса состояния */
  reset: () => void;
  /** Функция для повторной попытки загрузки */
  retry: () => Promise<void>;
}

/**
 * Хук для реализации бесконечной прокрутки
 * 
 * @param options - Опции для настройки поведения хука
 * @returns Объект с ref'ом, функциями и состояниями для бесконечной прокрутки
 * 
 * @example
 * ```tsx
 * const {
 *   sentinelRef,
 *   isLoading,
 *   hasMore,
 *   error,
 *   retry
 * } = useInfiniteScroll({
 *   loadMore: async () => {
 *     await loadNextPage();
 *   },
 *   hasMore: pagination.hasNext,
 *   isLoading: loading.articles === 'loading',
 *   threshold: 100,
 * });
 * 
 * return (
 *   <div>
 *     {articles.map(article => <ArticleCard key={article.id} article={article} />)}
 *     {hasMore && <div ref={sentinelRef}>Загрузка...</div>}
 *   </div>
 * );
 * ```
 */
export function useInfiniteScroll({
  loadMore,
  hasMore,
  isLoading,
  threshold = 100,
  root = null,
  debounceMs = 100,
  enabled = true,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn {
  const sentinelRef = useRef<HTMLElement>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver>();

  // Функция для загрузки следующей страницы с обработкой ошибок
  const handleLoadMore = useCallback(async () => {
    if (isLoading || isLoadingMore || !hasMore || !enabled) {
      return;
    }

    try {
      setIsLoadingMore(true);
      setError(null);
      await loadMore();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Ошибка загрузки данных'));
    } finally {
      setIsLoadingMore(false);
    }
  }, [loadMore, isLoading, isLoadingMore, hasMore, enabled]);

  // Функция для повторной попытки загрузки
  const retry = useCallback(async () => {
    setError(null);
    await handleLoadMore();
  }, [handleLoadMore]);

  // Функция для сброса состояния
  const reset = useCallback(() => {
    setError(null);
    setIsLoadingMore(false);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);

  // Обработчик пересечения элемента с порогом
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting && hasMore && !isLoading && !isLoadingMore && enabled) {
      // Дебаунс для предотвращения множественных вызовов
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      debounceTimeoutRef.current = setTimeout(() => {
        handleLoadMore();
      }, debounceMs);
    }
  }, [hasMore, isLoading, isLoadingMore, enabled, handleLoadMore, debounceMs]);

  // Настройка Intersection Observer
  useEffect(() => {
    if (!enabled || !sentinelRef.current) {
      return;
    }

    const options: IntersectionObserverInit = {
      root,
      rootMargin: `${threshold}px`,
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);
    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [enabled, threshold, root, handleIntersection]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    sentinelRef,
    loadMore: handleLoadMore,
    isLoading: isLoading || isLoadingMore,
    hasMore,
    error,
    reset,
    retry,
  };
}

/**
 * Хук для бесконечной прокрутки с виртуализацией
 * Оптимизирован для больших списков с виртуализацией
 * 
 * @param options - Опции для настройки поведения хука
 * @returns Объект с данными для виртуализированной бесконечной прокрутки
 * 
 * @example
 * ```tsx
 * const {
 *   sentinelRef,
 *   isLoading,
 *   hasMore,
 *   loadMore
 * } = useVirtualizedInfiniteScroll({
 *   loadMore: async () => {
 *     await loadNextPage();
 *   },
 *   hasMore: pagination.hasNext,
 *   isLoading: loading.articles === 'loading',
 *   itemHeight: 200,
 *   containerHeight: 600,
 * });
 * ```
 */
export function useVirtualizedInfiniteScroll({
  loadMore,
  hasMore,
  isLoading,
  itemHeight,
  containerHeight,
  threshold = 100,
  debounceMs = 100,
  enabled = true,
}: UseInfiniteScrollOptions & {
  itemHeight: number;
  containerHeight: number;
}): UseInfiniteScrollReturn & {
  visibleRange: { start: number; end: number };
  totalHeight: number;
  offsetY: number;
} {
  const [scrollTop, setScrollTop] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  
  const sentinelRef = useRef<HTMLElement>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver>();

  // Вычисляем видимый диапазон элементов
  const visibleRange = {
    start: Math.floor(scrollTop / itemHeight),
    end: Math.min(
      Math.ceil((scrollTop + containerHeight) / itemHeight),
      items.length
    ),
  };

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  // Функция для загрузки следующей страницы
  const handleLoadMore = useCallback(async () => {
    if (isLoading || isLoadingMore || !hasMore || !enabled) {
      return;
    }

    try {
      setIsLoadingMore(true);
      setError(null);
      await loadMore();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Ошибка загрузки данных'));
    } finally {
      setIsLoadingMore(false);
    }
  }, [loadMore, isLoading, isLoadingMore, hasMore, enabled]);

  // Функция для повторной попытки загрузки
  const retry = useCallback(async () => {
    setError(null);
    await handleLoadMore();
  }, [handleLoadMore]);

  // Функция для сброса состояния
  const reset = useCallback(() => {
    setError(null);
    setIsLoadingMore(false);
    setScrollTop(0);
    setItems([]);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);

  // Обработчик скролла
  const handleScroll = useCallback((event: Event) => {
    const target = event.target as HTMLElement;
    setScrollTop(target.scrollTop);
  }, []);

  // Обработчик пересечения элемента с порогом
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting && hasMore && !isLoading && !isLoadingMore && enabled) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      debounceTimeoutRef.current = setTimeout(() => {
        handleLoadMore();
      }, debounceMs);
    }
  }, [hasMore, isLoading, isLoadingMore, enabled, handleLoadMore, debounceMs]);

  // Настройка Intersection Observer
  useEffect(() => {
    if (!enabled || !sentinelRef.current) {
      return;
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);
    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [enabled, threshold, handleIntersection]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    sentinelRef,
    loadMore: handleLoadMore,
    isLoading: isLoading || isLoadingMore,
    hasMore,
    error,
    reset,
    retry,
    visibleRange,
    totalHeight,
    offsetY,
  };
}

/**
 * Хук для бесконечной прокрутки с pull-to-refresh
 * Добавляет функциональность обновления списка потягиванием вниз
 * 
 * @param options - Опции для настройки поведения хука
 * @returns Объект с данными для бесконечной прокрутки с pull-to-refresh
 * 
 * @example
 * ```tsx
 * const {
 *   sentinelRef,
 *   isLoading,
 *   hasMore,
 *   loadMore,
 *   isRefreshing,
 *   refresh
 * } = usePullToRefreshInfiniteScroll({
 *   loadMore: async () => {
 *     await loadNextPage();
 *   },
 *   refresh: async () => {
 *     await refreshData();
 *   },
 *   hasMore: pagination.hasNext,
 *   isLoading: loading.articles === 'loading',
 * });
 * ```
 */
export function usePullToRefreshInfiniteScroll({
  loadMore,
  refresh,
  hasMore,
  isLoading,
  threshold = 100,
  debounceMs = 100,
  enabled = true,
}: UseInfiniteScrollOptions & {
  refresh: () => Promise<void>;
}): UseInfiniteScrollReturn & {
  isRefreshing: boolean;
  refresh: () => Promise<void>;
  pullDistance: number;
  isPulling: boolean;
} {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const sentinelRef = useRef<HTMLElement>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver>();

  // Функция для обновления данных
  const handleRefresh = useCallback(async () => {
    if (isRefreshing || !enabled) {
      return;
    }

    try {
      setIsRefreshing(true);
      setError(null);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Ошибка обновления данных'));
    } finally {
      setIsRefreshing(false);
    }
  }, [refresh, isRefreshing, enabled]);

  // Функция для загрузки следующей страницы
  const handleLoadMore = useCallback(async () => {
    if (isLoading || isLoadingMore || !hasMore || !enabled) {
      return;
    }

    try {
      setIsLoadingMore(true);
      setError(null);
      await loadMore();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Ошибка загрузки данных'));
    } finally {
      setIsLoadingMore(false);
    }
  }, [loadMore, isLoading, isLoadingMore, hasMore, enabled]);

  // Функция для повторной попытки загрузки
  const retry = useCallback(async () => {
    setError(null);
    await handleLoadMore();
  }, [handleLoadMore]);

  // Функция для сброса состояния
  const reset = useCallback(() => {
    setError(null);
    setIsLoadingMore(false);
    setIsRefreshing(false);
    setPullDistance(0);
    setIsPulling(false);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);

  // Обработчики touch событий для pull-to-refresh
  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(event.touches[0].clientY);
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!isPulling) return;

    const currentY = event.touches[0].clientY;
    const distance = Math.max(0, currentY - startY);
    
    if (distance > 0 && window.scrollY === 0) {
      setPullDistance(distance);
      event.preventDefault();
    }
  }, [isPulling, startY]);

  const handleTouchEnd = useCallback(() => {
    if (isPulling && pullDistance > 100) {
      handleRefresh();
    }
    
    setIsPulling(false);
    setPullDistance(0);
  }, [isPulling, pullDistance, handleRefresh]);

  // Обработчик пересечения элемента с порогом
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting && hasMore && !isLoading && !isLoadingMore && enabled) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      debounceTimeoutRef.current = setTimeout(() => {
        handleLoadMore();
      }, debounceMs);
    }
  }, [hasMore, isLoading, isLoadingMore, enabled, handleLoadMore, debounceMs]);

  // Настройка Intersection Observer
  useEffect(() => {
    if (!enabled || !sentinelRef.current) {
      return;
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);
    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [enabled, threshold, handleIntersection]);

  // Настройка touch событий
  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    sentinelRef,
    loadMore: handleLoadMore,
    isLoading: isLoading || isLoadingMore,
    hasMore,
    error,
    reset,
    retry,
    isRefreshing,
    refresh: handleRefresh,
    pullDistance,
    isPulling,
  };
}
