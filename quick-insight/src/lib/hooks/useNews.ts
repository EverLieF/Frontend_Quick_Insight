/**
 * Кастомный хук для работы с новостями
 * Интегрируется с Zustand store и предоставляет удобный API для работы с новостями
 */

import { useCallback, useEffect, useMemo } from 'react';
import { useNewsStore } from '@/lib/store/newsStore';
import { NewsArticle, NewsFilters, NewsCategory, NewsTag } from '@/types/news';
import { LoadingState, ErrorState } from '@/types/common';

/**
 * Интерфейс возвращаемых данных хука useNews
 */
interface UseNewsReturn {
  // Данные
  articles: NewsArticle[];
  filteredArticles: NewsArticle[];
  currentPageArticles: NewsArticle[];
  categories: NewsCategory[];
  tags: NewsTag[];
  stats: any;
  
  // Состояния загрузки
  loading: {
    articles: LoadingState;
    categories: LoadingState;
    stats: LoadingState;
  };
  
  // Ошибки
  errors: {
    articles: ErrorState | null;
    categories: ErrorState | null;
    stats: ErrorState | null;
  };
  
  // Пагинация
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  
  // Фильтры
  filters: NewsFilters;
  
  // Действия
  actions: {
    loadArticles: () => Promise<void>;
    loadCategories: () => Promise<void>;
    loadStats: () => Promise<void>;
    setFilters: (filters: Partial<NewsFilters>) => void;
    clearFilters: () => void;
    setPage: (page: number) => void;
    setItemsPerPage: (itemsPerPage: number) => void;
    getArticleById: (id: string) => NewsArticle | undefined;
    getArticleBySlug: (slug: string) => NewsArticle | undefined;
    markAsRead: (id: string) => void;
    markAsUnread: (id: string) => void;
    toggleBookmark: (id: string) => void;
    searchArticles: (query: string) => void;
    refresh: () => Promise<void>;
    reset: () => void;
  };
  
  // Вычисляемые значения
  computed: {
    hasArticles: boolean;
    hasFilteredArticles: boolean;
    isLoading: boolean;
    hasError: boolean;
    isEmpty: boolean;
    isFiltered: boolean;
    bookmarkedArticles: NewsArticle[];
    readArticles: NewsArticle[];
    unreadArticles: NewsArticle[];
  };
}

/**
 * Хук для работы с новостями
 * 
 * @param options - Опции для настройки поведения хука
 * @returns Объект с данными, состояниями и действиями для работы с новостями
 * 
 * @example
 * ```tsx
 * const {
 *   articles,
 *   loading,
 *   actions: { loadArticles, setFilters },
 *   computed: { isLoading, hasError }
 * } = useNews();
 * 
 * useEffect(() => {
 *   loadArticles();
 * }, []);
 * ```
 */
export function useNews(options: {
  autoLoad?: boolean;
  initialFilters?: Partial<NewsFilters>;
} = {}): UseNewsReturn {
  const { autoLoad = true, initialFilters } = options;
  
  // Получаем состояние и действия из store
  const store = useNewsStore();
  
  // Вычисляемые значения для пагинации
  const pagination = useMemo(() => ({
    ...store.pagination,
    hasNext: store.pagination.currentPage < store.pagination.totalPages,
    hasPrev: store.pagination.currentPage > 1,
  }), [store.pagination]);
  
  // Вычисляемые значения
  const computed = useMemo(() => ({
    hasArticles: store.articles.length > 0,
    hasFilteredArticles: store.filteredArticles.length > 0,
    isLoading: Object.values(store.loading).some(state => state === 'loading'),
    hasError: Object.values(store.errors).some(error => error?.hasError),
    isEmpty: store.filteredArticles.length === 0 && !Object.values(store.loading).some(state => state === 'loading'),
    isFiltered: JSON.stringify(store.filters) !== JSON.stringify({
      category: undefined,
      author: undefined,
      tags: [],
      dateFrom: undefined,
      dateTo: undefined,
      search: undefined,
      isRead: undefined,
      isBookmarked: undefined,
      sortBy: 'publishedAt',
      sortOrder: 'desc',
    }),
    bookmarkedArticles: store.articles.filter(article => article.isBookmarked),
    readArticles: store.articles.filter(article => article.isRead),
    unreadArticles: store.articles.filter(article => !article.isRead),
  }), [store.articles, store.filteredArticles, store.loading, store.errors, store.filters]);
  
  // Действия с дополнительной логикой
  const actions = useMemo(() => ({
    loadArticles: store.loadArticles,
    loadCategories: store.loadCategories,
    loadStats: store.loadStats,
    setFilters: store.setFilters,
    clearFilters: store.clearFilters,
    setPage: store.setPage,
    setItemsPerPage: store.setItemsPerPage,
    getArticleById: store.getArticleById,
    getArticleBySlug: store.getArticleBySlug,
    markAsRead: store.markAsRead,
    markAsUnread: store.markAsUnread,
    toggleBookmark: store.toggleBookmark,
    searchArticles: store.searchArticles,
    refresh: async () => {
      await Promise.all([
        store.loadArticles(),
        store.loadCategories(),
        store.loadStats(),
      ]);
    },
    reset: store.reset,
  }), [store]);
  
  // Автоматическая загрузка при монтировании
  useEffect(() => {
    if (autoLoad) {
      actions.loadArticles();
      actions.loadCategories();
      actions.loadStats();
    }
  }, [autoLoad, actions]);
  
  // Применение начальных фильтров
  useEffect(() => {
    if (initialFilters) {
      actions.setFilters(initialFilters);
    }
  }, [initialFilters, actions]);
  
  return {
    articles: store.articles,
    filteredArticles: store.filteredArticles,
    currentPageArticles: store.filteredArticles.slice(
      (store.pagination.currentPage - 1) * store.pagination.itemsPerPage,
      store.pagination.currentPage * store.pagination.itemsPerPage
    ),
    categories: store.categories,
    tags: store.tags,
    stats: store.stats,
    loading: store.loading,
    errors: store.errors,
    pagination,
    filters: store.filters,
    actions,
    computed,
  };
}

/**
 * Хук для работы с отдельной статьей
 * 
 * @param id - ID статьи
 * @returns Объект с данными статьи и действиями
 * 
 * @example
 * ```tsx
 * const { article, loading, markAsRead, toggleBookmark } = useNewsArticle('article-id');
 * ```
 */
export function useNewsArticle(id: string) {
  const store = useNewsStore();
  
  const article = useMemo(() => 
    store.getArticleById(id), 
    [store, id]
  );
  
  const loading = useMemo(() => 
    store.loading.articles === 'loading', 
    [store.loading.articles]
  );
  
  const error = useMemo(() => 
    store.errors.articles, 
    [store.errors.articles]
  );
  
  const actions = useMemo(() => ({
    markAsRead: () => store.markAsRead(id),
    markAsUnread: () => store.markAsUnread(id),
    toggleBookmark: () => store.toggleBookmark(id),
  }), [store, id]);
  
  return {
    article,
    loading,
    error,
    actions,
  };
}

/**
 * Хук для работы с категориями новостей
 * 
 * @returns Объект с категориями и действиями
 * 
 * @example
 * ```tsx
 * const { categories, loading, setCategoryFilter } = useNewsCategories();
 * ```
 */
export function useNewsCategories() {
  const store = useNewsStore();
  
  const loading = useMemo(() => 
    store.loading.categories === 'loading', 
    [store.loading.categories]
  );
  
  const error = useMemo(() => 
    store.errors.categories, 
    [store.errors.categories]
  );
  
  const actions = useMemo(() => ({
    loadCategories: store.loadCategories,
    setCategoryFilter: (categoryId: string) => 
      store.setFilters({ category: categoryId }),
    clearCategoryFilter: () => 
      store.setFilters({ category: undefined }),
  }), [store]);
  
  return {
    categories: store.categories,
    loading,
    error,
    actions,
  };
}

/**
 * Хук для работы со статистикой новостей
 * 
 * @returns Объект со статистикой и действиями
 * 
 * @example
 * ```tsx
 * const { stats, loading, refresh } = useNewsStats();
 * ```
 */
export function useNewsStats() {
  const store = useNewsStore();
  
  const loading = useMemo(() => 
    store.loading.stats === 'loading', 
    [store.loading.stats]
  );
  
  const error = useMemo(() => 
    store.errors.stats, 
    [store.errors.stats]
  );
  
  const actions = useMemo(() => ({
    loadStats: store.loadStats,
    refresh: store.loadStats,
  }), [store]);
  
  return {
    stats: store.stats,
    loading,
    error,
    actions,
  };
}
