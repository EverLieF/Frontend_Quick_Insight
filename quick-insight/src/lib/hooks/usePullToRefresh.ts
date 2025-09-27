import { useState, useCallback, useRef, useEffect } from 'react';
import { logger } from '@/lib/utils/logger';

export interface PullToRefreshOptions {
  threshold?: number;
  resistance?: number;
  onRefresh: () => Promise<void>;
  enabled?: boolean;
}

export interface PullToRefreshState {
  isPulling: boolean;
  isRefreshing: boolean;
  pullDistance: number;
  canRefresh: boolean;
}

/**
 * Хук для реализации pull-to-refresh функциональности
 */
export function usePullToRefresh({
  threshold = 80,
  resistance = 0.5,
  onRefresh,
  enabled = true,
}: PullToRefreshOptions) {
  const [state, setState] = useState<PullToRefreshState>({
    isPulling: false,
    isRefreshing: false,
    pullDistance: 0,
    canRefresh: false,
  });

  const startY = useRef(0);
  const currentY = useRef(0);
  const elementRef = useRef<HTMLElement | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!enabled || state.isRefreshing) return;

    const element = elementRef.current;
    if (!element) return;

    // Проверяем, что мы в самом верху страницы
    if (element.scrollTop > 0) return;

    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;

    setState(prev => ({
      ...prev,
      isPulling: true,
    }));

    logger.debug('Pull to refresh started');
  }, [enabled, state.isRefreshing]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!enabled || !state.isPulling || state.isRefreshing) return;

    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;

    if (deltaY > 0) {
      // Применяем сопротивление
      const pullDistance = Math.min(deltaY * resistance, threshold * 1.5);
      const canRefresh = pullDistance >= threshold;

      setState(prev => ({
        ...prev,
        pullDistance,
        canRefresh,
      }));

      // Предотвращаем скролл страницы
      if (pullDistance > 0) {
        e.preventDefault();
      }
    }
  }, [enabled, state.isPulling, state.isRefreshing, resistance, threshold]);

  const handleTouchEnd = useCallback(async () => {
    if (!enabled || !state.isPulling || state.isRefreshing) return;

    const { canRefresh, pullDistance } = state;

    setState(prev => ({
      ...prev,
      isPulling: false,
      pullDistance: 0,
    }));

    if (canRefresh && pullDistance >= threshold) {
      setState(prev => ({
        ...prev,
        isRefreshing: true,
      }));

      logger.userAction('pull_to_refresh_triggered');

      try {
        await onRefresh();
        logger.info('Pull to refresh completed successfully');
      } catch (error) {
        logger.error('Pull to refresh failed:', error);
      } finally {
        setState(prev => ({
          ...prev,
          isRefreshing: false,
        }));
      }
    }
  }, [enabled, state.isPulling, state.isRefreshing, state.canRefresh, state.pullDistance, threshold, onRefresh]);

  // Привязываем обработчики событий
  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const setElementRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
  }, []);

  return {
    ...state,
    setElementRef,
    progress: Math.min(state.pullDistance / threshold, 1),
  };
}

/**
 * Хук для простого pull-to-refresh без сложной логики
 */
export function useSimplePullToRefresh(onRefresh: () => Promise<void>, enabled: boolean = true) {
  return usePullToRefresh({
    threshold: 60,
    resistance: 0.6,
    onRefresh,
    enabled,
  });
}
