/**
 * Экспорт всех Zustand stores для приложения Quick Insight
 * 
 * Этот файл предоставляет централизованный доступ ко всем stores:
 * - newsStore - управление новостями, статьями, загрузкой и пагинацией
 * - filterStore - управление фильтрами, поиском и сортировкой
 * - uiStore - управление UI состоянием, темами, модалками и настройками
 */

// Экспорт основного store для новостей
export {
  useNewsStore,
  useNewsSelectors,
  useNewsLoading,
  useNewsErrors,
  useNewsPagination,
  useNewsFilters,
  useNewsStats,
} from './newsStore';

// Экспорт store для фильтров
export {
  useFilterStore,
  useFilterSelectors,
  useActiveFilters,
  useFilterUI,
  useSearchHistory,
  useSavedFilters,
  useHasActiveFilters,
  useActiveFiltersCount,
  useFilterSummary,
} from './filterStore';

// Экспорт store для UI
export {
  useUIStore,
  useUISelectors,
  useTheme,
  useUserSettings,
  useScreenSize,
  useModals,
  useNotifications,
  useNavigation,
  usePageMetadata,
  useGlobalLoading,
  useGlobalError,
  useGlobalSuccess,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
} from './uiStore';

// Типы для экспорта (для использования в компонентах)
export type {
  NewsArticle,
  NewsArticleSummary,
  NewsFilters,
  NewsStats,
  NewsCategory,
  NewsTag,
} from '@/types/news';

export type {
  Theme,
  UserSettings,
  ModalState,
  Notification,
  ScreenSize,
  Breakpoints,
  NavigationItem,
  Breadcrumb,
  Tab,
  AccordionItem,
  Step,
  ProgressState,
  FormStatus,
  FormState,
  PageMetadata,
  AnalyticsEvent,
  FilterOption,
  FilterGroup,
  SortOption,
} from '@/types/common';

/**
 * Утилиты для работы со stores
 */

// Функция для инициализации всех stores
export const initializeStores = async () => {
  const { useNewsStore } = await import('./newsStore');
  const { useFilterStore } = await import('./filterStore');
  const { useUIStore } = await import('./uiStore');
  
  // Инициализация фильтров
  useFilterStore.getState().initializeFilters();
  
  // Загрузка начальных данных
  await Promise.all([
    useNewsStore.getState().loadArticles(),
    useNewsStore.getState().loadCategories(),
    useFilterStore.getState().initializeFilters(),
  ]);
};

// Функция для сброса всех stores
export const resetAllStores = () => {
  const { useNewsStore } = require('./newsStore');
  const { useFilterStore } = require('./filterStore');
  const { useUIStore } = require('./uiStore');
  
  useNewsStore.getState().reset();
  useFilterStore.getState().resetFilters();
  useUIStore.getState().reset();
};

// Функция для получения состояния всех stores
export const getAllStoresState = () => {
  const { useNewsStore } = require('./newsStore');
  const { useFilterStore } = require('./filterStore');
  const { useUIStore } = require('./uiStore');
  
  return {
    news: useNewsStore.getState(),
    filters: useFilterStore.getState(),
    ui: useUIStore.getState(),
  };
};

// Функция для подписки на изменения во всех stores
export const subscribeToAllStores = (callback: (state: any) => void) => {
  const { useNewsStore } = require('./newsStore');
  const { useFilterStore } = require('./filterStore');
  const { useUIStore } = require('./uiStore');
  
  const unsubscribeNews = useNewsStore.subscribe(callback);
  const unsubscribeFilters = useFilterStore.subscribe(callback);
  const unsubscribeUI = useUIStore.subscribe(callback);
  
  return () => {
    unsubscribeNews();
    unsubscribeFilters();
    unsubscribeUI();
  };
};

/**
 * Хуки для комбинированного использования stores
 */

// Хук для получения состояния загрузки из всех stores
export const useGlobalLoading = () => {
  const newsLoading = useNewsStore((state) => state.loading);
  const uiGlobalLoading = useUIStore((state) => state.globalLoading);
  
  return {
    news: newsLoading,
    global: uiGlobalLoading,
    isLoading: Object.values(newsLoading).some(status => status === 'loading') || uiGlobalLoading,
  };
};

// Хук для получения ошибок из всех stores
export const useGlobalErrors = () => {
  const newsErrors = useNewsStore((state) => state.errors);
  const uiGlobalError = useUIStore((state) => state.globalError);
  
  return {
    news: newsErrors,
    global: uiGlobalError,
    hasErrors: Object.values(newsErrors).some(error => error?.hasError) || !!uiGlobalError,
  };
};

// Хук для получения активных фильтров и их применения к новостям
export const useFilteredNews = () => {
  const { currentPageArticles, pagination } = useNewsSelectors();
  const { activeFilters } = useFilterSelectors();
  
  return {
    articles: currentPageArticles,
    pagination,
    filters: activeFilters,
    hasActiveFilters: Object.values(activeFilters).some(value => 
      value !== undefined && value !== null && 
      (Array.isArray(value) ? value.length > 0 : true)
    ),
  };
};

// Хук для управления темой с учетом настроек пользователя
export const useThemeManager = () => {
  const theme = useTheme();
  const userSettings = useUserSettings();
  const { setTheme, toggleTheme } = useUIStore();
  
  return {
    currentTheme: theme,
    userTheme: userSettings.theme,
    setTheme,
    toggleTheme,
    isDarkMode: theme === 'dark' || (theme === 'system' && userSettings.theme === 'dark'),
    isLightMode: theme === 'light' || (theme === 'system' && userSettings.theme === 'light'),
  };
};

// Хук для управления уведомлениями с интеграцией новостей
export const useNotificationManager = () => {
  const { addNotification, removeNotification, clearNotifications } = useUIStore();
  const { markAsRead, markAsUnread } = useNewsStore();
  
  const showSuccess = (message: string, title = 'Успех') => {
    addNotification({
      type: 'success',
      title,
      message,
      duration: 3000,
    });
  };
  
  const showError = (message: string, title = 'Ошибка') => {
    addNotification({
      type: 'error',
      title,
      message,
      duration: 5000,
    });
  };
  
  const showInfo = (message: string, title = 'Информация') => {
    addNotification({
      type: 'info',
      title,
      message,
      duration: 4000,
    });
  };
  
  const showWarning = (message: string, title = 'Предупреждение') => {
    addNotification({
      type: 'warning',
      title,
      message,
      duration: 4000,
    });
  };
  
  return {
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};

/**
 * Константы для stores
 */
export const STORE_KEYS = {
  NEWS: 'news-store',
  FILTERS: 'filter-store',
  UI: 'ui-store',
} as const;

export const STORE_NAMES = {
  NEWS: 'News Store',
  FILTERS: 'Filter Store',
  UI: 'UI Store',
} as const;

/**
 * Типы для комбинированных хуков
 */
export interface GlobalLoadingState {
  news: {
    articles: string;
    categories: string;
    stats: string;
  };
  global: boolean;
  isLoading: boolean;
}

export interface GlobalErrorState {
  news: {
    articles: any;
    categories: any;
    stats: any;
  };
  global: string | null;
  hasErrors: boolean;
}

export interface FilteredNewsState {
  articles: any[];
  pagination: any;
  filters: any;
  hasActiveFilters: boolean;
}

export interface ThemeManagerState {
  currentTheme: string;
  userTheme: string;
  setTheme: (theme: any) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  isLightMode: boolean;
}

export interface NotificationManagerState {
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
}
