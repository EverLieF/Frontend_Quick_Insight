/**
 * Кастомный хук для работы с фильтрами
 * Интегрируется с Zustand store и предоставляет удобный API для работы с фильтрами
 */

import { useCallback, useEffect, useMemo } from 'react';
import { useFilterStore } from '@/lib/store/filterStore';
import { NewsFilters } from '@/types/news';
import { FilterOption, FilterGroup, SortOption } from '@/types/common';

/**
 * Интерфейс возвращаемых данных хука useFilters
 */
interface UseFiltersReturn {
  // Активные фильтры
  activeFilters: NewsFilters;
  
  // Доступные опции фильтров
  filterOptions: {
    categories: FilterOption[];
    authors: FilterOption[];
    tags: FilterOption[];
    sortOptions: SortOption[];
  };
  
  // Группы фильтров для UI
  filterGroups: FilterGroup[];
  
  // Состояние UI
  ui: {
    isFiltersOpen: boolean;
    isSearchOpen: boolean;
    searchQuery: string;
    searchSuggestions: string[];
    selectedFiltersCount: number;
  };
  
  // История поиска
  searchHistory: string[];
  
  // Сохраненные фильтры
  savedFilters: {
    name: string;
    filters: NewsFilters;
    createdAt: Date;
  }[];
  
  // Действия
  actions: {
    setFilter: <K extends keyof NewsFilters>(key: K, value: NewsFilters[K]) => void;
    setFilters: (filters: Partial<NewsFilters>) => void;
    clearFilter: (key: keyof NewsFilters) => void;
    clearAllFilters: () => void;
    resetFilters: () => void;
    setSearchQuery: (query: string) => void;
    clearSearch: () => void;
    addToSearchHistory: (query: string) => void;
    clearSearchHistory: () => void;
    toggleFiltersOpen: () => void;
    toggleSearchOpen: () => void;
    setFiltersOpen: (isOpen: boolean) => void;
    setSearchOpen: (isOpen: boolean) => void;
    saveFilter: (name: string, filters: NewsFilters) => void;
    loadSavedFilter: (name: string) => void;
    deleteSavedFilter: (name: string) => void;
    initializeFilters: () => void;
  };
  
  // Вычисляемые значения
  computed: {
    hasActiveFilters: boolean;
    activeFiltersCount: number;
    filterSummary: string;
    hasSearchQuery: boolean;
    hasSearchHistory: boolean;
    hasSavedFilters: boolean;
  };
}

/**
 * Хук для работы с фильтрами
 * 
 * @param options - Опции для настройки поведения хука
 * @returns Объект с фильтрами, состояниями и действиями
 * 
 * @example
 * ```tsx
 * const {
 *   activeFilters,
 *   actions: { setFilter, clearAllFilters },
 *   computed: { hasActiveFilters, filterSummary }
 * } = useFilters();
 * 
 * const handleCategoryChange = (categoryId: string) => {
 *   setFilter('category', categoryId);
 * };
 * ```
 */
export function useFilters(options: {
  autoInitialize?: boolean;
  initialFilters?: Partial<NewsFilters>;
} = {}): UseFiltersReturn {
  const { autoInitialize = true, initialFilters } = options;
  
  // Получаем состояние и действия из store
  const store = useFilterStore();
  
  // Вычисляемые значения
  const computed = useMemo(() => ({
    hasActiveFilters: store.hasActiveFilters(),
    activeFiltersCount: store.getActiveFiltersCount(),
    filterSummary: store.getFilterSummary(),
    hasSearchQuery: Boolean(store.ui.searchQuery),
    hasSearchHistory: store.searchHistory.length > 0,
    hasSavedFilters: store.savedFilters.length > 0,
  }), [store]);
  
  // Действия
  const actions = useMemo(() => ({
    setFilter: store.setFilter,
    setFilters: store.setFilters,
    clearFilter: store.clearFilter,
    clearAllFilters: store.clearAllFilters,
    resetFilters: store.resetFilters,
    setSearchQuery: store.setSearchQuery,
    clearSearch: store.clearSearch,
    addToSearchHistory: store.addToSearchHistory,
    clearSearchHistory: store.clearSearchHistory,
    toggleFiltersOpen: store.toggleFiltersOpen,
    toggleSearchOpen: store.toggleSearchOpen,
    setFiltersOpen: store.setFiltersOpen,
    setSearchOpen: store.setSearchOpen,
    saveFilter: store.saveFilter,
    loadSavedFilter: store.loadSavedFilter,
    deleteSavedFilter: store.deleteSavedFilter,
    initializeFilters: store.initializeFilters,
  }), [store]);
  
  // Автоматическая инициализация
  useEffect(() => {
    if (autoInitialize) {
      actions.initializeFilters();
    }
  }, [autoInitialize, actions]);
  
  // Применение начальных фильтров
  useEffect(() => {
    if (initialFilters) {
      actions.setFilters(initialFilters);
    }
  }, [initialFilters, actions]);
  
  return {
    activeFilters: store.activeFilters,
    filterOptions: store.filterOptions,
    filterGroups: store.filterGroups,
    ui: store.ui,
    searchHistory: store.searchHistory,
    savedFilters: store.savedFilters,
    actions,
    computed,
  };
}

/**
 * Хук для работы с поиском
 * 
 * @param options - Опции для настройки поведения хука
 * @returns Объект с поиском и действиями
 * 
 * @example
 * ```tsx
 * const { searchQuery, setSearchQuery, clearSearch, searchHistory } = useSearch();
 * ```
 */
export function useSearch(options: {
  debounceMs?: number;
  autoAddToHistory?: boolean;
} = {}): {
  searchQuery: string;
  searchHistory: string[];
  actions: {
    setSearchQuery: (query: string) => void;
    clearSearch: () => void;
    addToSearchHistory: (query: string) => void;
    clearSearchHistory: () => void;
  };
  computed: {
    hasSearchQuery: boolean;
    hasSearchHistory: boolean;
  };
} {
  const { autoAddToHistory = true } = options;
  
  const store = useFilterStore();
  
  const computed = useMemo(() => ({
    hasSearchQuery: Boolean(store.ui.searchQuery),
    hasSearchHistory: store.searchHistory.length > 0,
  }), [store.ui.searchQuery, store.searchHistory]);
  
  const actions = useMemo(() => ({
    setSearchQuery: (query: string) => {
      store.setSearchQuery(query);
      if (autoAddToHistory && query.trim()) {
        store.addToSearchHistory(query);
      }
    },
    clearSearch: store.clearSearch,
    addToSearchHistory: store.addToSearchHistory,
    clearSearchHistory: store.clearSearchHistory,
  }), [store, autoAddToHistory]);
  
  return {
    searchQuery: store.ui.searchQuery,
    searchHistory: store.searchHistory,
    actions,
    computed,
  };
}

/**
 * Хук для работы с категориями фильтров
 * 
 * @returns Объект с категориями и действиями
 * 
 * @example
 * ```tsx
 * const { categories, setCategory, clearCategory } = useCategoryFilter();
 * ```
 */
export function useCategoryFilter() {
  const store = useFilterStore();
  
  const actions = useMemo(() => ({
    setCategory: (categoryId: string) => 
      store.setFilter('category', categoryId),
    clearCategory: () => 
      store.clearFilter('category'),
  }), [store]);
  
  return {
    categories: store.filterOptions.categories,
    selectedCategory: store.activeFilters.category,
    actions,
  };
}

/**
 * Хук для работы с тегами фильтров
 * 
 * @returns Объект с тегами и действиями
 * 
 * @example
 * ```tsx
 * const { tags, selectedTags, addTag, removeTag, clearTags } = useTagFilter();
 * ```
 */
export function useTagFilter() {
  const store = useFilterStore();
  
  const actions = useMemo(() => ({
    addTag: (tagId: string) => {
      const currentTags = store.activeFilters.tags || [];
      if (!currentTags.includes(tagId)) {
        store.setFilter('tags', [...currentTags, tagId]);
      }
    },
    removeTag: (tagId: string) => {
      const currentTags = store.activeFilters.tags || [];
      store.setFilter('tags', currentTags.filter(id => id !== tagId));
    },
    toggleTag: (tagId: string) => {
      const currentTags = store.activeFilters.tags || [];
      if (currentTags.includes(tagId)) {
        actions.removeTag(tagId);
      } else {
        actions.addTag(tagId);
      }
    },
    clearTags: () => 
      store.setFilter('tags', []),
  }), [store]);
  
  return {
    tags: store.filterOptions.tags,
    selectedTags: store.activeFilters.tags || [],
    actions,
  };
}

/**
 * Хук для работы с сортировкой
 * 
 * @returns Объект с сортировкой и действиями
 * 
 * @example
 * ```tsx
 * const { sortOptions, currentSort, setSort } = useSortFilter();
 * ```
 */
export function useSortFilter() {
  const store = useFilterStore();
  
  const currentSort = useMemo(() => ({
    sortBy: store.activeFilters.sortBy,
    sortOrder: store.activeFilters.sortOrder,
  }), [store.activeFilters.sortBy, store.activeFilters.sortOrder]);
  
  const actions = useMemo(() => ({
    setSortBy: (sortBy: string) => 
      store.setFilter('sortBy', sortBy),
    setSortOrder: (sortOrder: 'asc' | 'desc') => 
      store.setFilter('sortOrder', sortOrder),
    setSort: (sortBy: string, sortOrder: 'asc' | 'desc') => {
      store.setFilters({ sortBy, sortOrder });
    },
  }), [store]);
  
  return {
    sortOptions: store.filterOptions.sortOptions,
    currentSort,
    actions,
  };
}

/**
 * Хук для работы с сохраненными фильтрами
 * 
 * @returns Объект с сохраненными фильтрами и действиями
 * 
 * @example
 * ```tsx
 * const { savedFilters, saveCurrentFilters, loadSavedFilters } = useSavedFilters();
 * ```
 */
export function useSavedFilters() {
  const store = useFilterStore();
  
  const actions = useMemo(() => ({
    saveCurrentFilters: (name: string) => 
      store.saveFilter(name, store.activeFilters),
    loadSavedFilters: store.loadSavedFilter,
    deleteSavedFilters: store.deleteSavedFilter,
  }), [store]);
  
  return {
    savedFilters: store.savedFilters,
    actions,
  };
}
