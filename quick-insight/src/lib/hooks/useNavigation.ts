import { useCallback } from 'react';
import { logger } from '@/lib/utils/logger';

export interface NavigationOptions {
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
}

export interface NavigationState {
  canGoBack: boolean;
  currentPath: string;
  history: string[];
}

/**
 * Хук для навигации в приложении
 * Обеспечивает единообразную навигацию с логированием
 */
export function useNavigation() {
  const navigate = useCallback((path: string, options: NavigationOptions = {}) => {
    try {
      logger.navigation(window.location.pathname, path);
      
      if (options.replace) {
        window.history.replaceState(null, '', path);
      } else {
        window.history.pushState(null, '', path);
      }
      
      // Прокрутка в начало страницы если нужно
      if (options.scroll !== false) {
        window.scrollTo(0, 0);
      }
      
      // Диспатч события для обновления состояния приложения
      window.dispatchEvent(new PopStateEvent('popstate'));
      
    } catch (error) {
      logger.error('Navigation error:', error);
    }
  }, []);

  const goBack = useCallback(() => {
    try {
      logger.userAction('navigation_back');
      window.history.back();
    } catch (error) {
      logger.error('Go back error:', error);
    }
  }, []);

  const goForward = useCallback(() => {
    try {
      logger.userAction('navigation_forward');
      window.history.forward();
    } catch (error) {
      logger.error('Go forward error:', error);
    }
  }, []);

  const canGoBack = useCallback(() => {
    return window.history.length > 1;
  }, []);

  const getCurrentPath = useCallback(() => {
    return window.location.pathname;
  }, []);

  return {
    navigate,
    goBack,
    goForward,
    canGoBack: canGoBack(),
    currentPath: getCurrentPath(),
  };
}

/**
 * Хук для работы с историей навигации
 */
export function useNavigationHistory() {
  const getHistory = useCallback(() => {
    // В реальном приложении здесь можно использовать более сложную логику
    // для отслеживания истории навигации
    return [];
  }, []);

  const clearHistory = useCallback(() => {
    // Очистка истории навигации
    logger.userAction('navigation_history_cleared');
  }, []);

  return {
    getHistory,
    clearHistory,
  };
}
