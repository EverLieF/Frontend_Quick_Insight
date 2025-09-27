/**
 * Экспорт всех кастомных хуков
 * Централизованный экспорт для удобного импорта в компонентах
 */

// Хуки для работы с новостями
export {
  useNews,
  useNewsArticle,
  useNewsCategories,
  useNewsStats,
} from './useNews';

// Хуки для работы с фильтрами
export {
  useFilters,
  useSearch,
  useCategoryFilter,
  useTagFilter,
  useSortFilter,
  useSavedFilters,
} from './useFilters';

// Хуки для бесконечной прокрутки
export {
  useInfiniteScroll,
  useVirtualizedInfiniteScroll,
  usePullToRefreshInfiniteScroll,
} from './useInfiniteScroll';

// Хуки для дебаунса
export {
  useDebounce,
  useDebounceState,
  useDebouncedCallback,
  useDebouncedCallbackWithControls,
  useDebouncedSearch,
  useThrottledCallback,
} from './useDebounce';

// Типы для экспорта
export type {
  UseNewsReturn,
  UseFiltersReturn,
  UseInfiniteScrollOptions,
  UseInfiniteScrollReturn,
  UseDebounceOptions,
  UseDebounceReturn,
} from './useNews';

export type {
  UseInfiniteScrollOptions,
  UseInfiniteScrollReturn,
} from './useInfiniteScroll';

export type {
  UseDebounceOptions,
  UseDebounceReturn,
} from './useDebounce';
