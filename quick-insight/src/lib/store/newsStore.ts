import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useMemo } from 'react';
import { 
  NewsArticle, 
  NewsArticleSummary, 
  NewsFilters, 
  NewsStats,
  NewsCategory,
  NewsTag 
} from '@/types/news';
import { LoadingState, ErrorState } from '@/types/common';
import { 
  mockNews, 
  getAllNews, 
  getNewsByCategory, 
  getNewsByAuthor, 
  getReadNews, 
  getBookmarkedNews, 
  getUnreadNews, 
  getLatestNews, 
  getPopularNews, 
  searchNews,
  getNewsById,
  getNewsBySlug,
  getAllTags 
} from '@/data/mockNews';
import { mockCategories } from '@/data/mockCategories';

// Интерфейс состояния для новостей
interface NewsState {
  // Данные
  articles: NewsArticle[];
  filteredArticles: NewsArticle[];
  categories: NewsCategory[];
  tags: NewsTag[];
  stats: NewsStats | null;
  
  // Состояние загрузки
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
  };
  
  // Фильтры
  filters: NewsFilters;
  
  // Выбранная статья
  selectedArticle: NewsArticle | null;
  
  // Избранные и прочитанные
  bookmarkedIds: Set<string>;
  readIds: Set<string>;
}

// Интерфейс действий
interface NewsActions {
  // Загрузка данных
  loadArticles: () => Promise<void>;
  loadCategories: () => Promise<void>;
  loadStats: () => Promise<void>;
  
  // Работа с фильтрами
  setFilters: (filters: Partial<NewsFilters>) => void;
  clearFilters: () => void;
  applyFilters: () => void;
  
  // Пагинация
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  
  // Работа со статьями
  getArticleById: (id: string) => NewsArticle | undefined;
  getArticleBySlug: (slug: string) => NewsArticle | undefined;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  toggleBookmark: (id: string) => void;
  
  // Поиск
  searchArticles: (query: string) => void;
  
  // Сброс состояния
  reset: () => void;
}

// Начальное состояние
const initialState: NewsState = {
  articles: [],
  filteredArticles: [],
  categories: [],
  tags: [],
  stats: null,
  
  loading: {
    articles: 'idle',
    categories: 'idle',
    stats: 'idle',
  },
  
  errors: {
    articles: null,
    categories: null,
    stats: null,
  },
  
  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 12,
    totalItems: 0,
  },
  
  filters: {
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
  },
  
  selectedArticle: null,
  bookmarkedIds: new Set(),
  readIds: new Set(),
};

// Создание store
export const useNewsStore = create<NewsState & NewsActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Загрузка статей
        loadArticles: async () => {
          set((state) => ({
            loading: { ...state.loading, articles: 'loading' },
            errors: { ...state.errors, articles: null },
          }));
          
          try {
            // Имитация задержки API
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const articles = getAllNews();
            const tags = getAllTags();
            
            set((state) => ({
              articles,
              tags,
              filteredArticles: articles,
              loading: { ...state.loading, articles: 'success' },
              pagination: {
                ...state.pagination,
                totalItems: articles.length,
                totalPages: Math.ceil(articles.length / state.pagination.itemsPerPage),
              },
            }));
            
            // Применяем текущие фильтры
            get().applyFilters();
          } catch (error) {
            set((state) => ({
              loading: { ...state.loading, articles: 'error' },
              errors: {
                ...state.errors,
                articles: {
                  hasError: true,
                  message: error instanceof Error ? error.message : 'Ошибка загрузки статей',
                },
              },
            }));
          }
        },
        
        // Загрузка категорий
        loadCategories: async () => {
          set((state) => ({
            loading: { ...state.loading, categories: 'loading' },
            errors: { ...state.errors, categories: null },
          }));
          
          try {
            // Имитация задержки API
            await new Promise(resolve => setTimeout(resolve, 300));
            
            set((state) => ({
              categories: mockCategories,
              loading: { ...state.loading, categories: 'success' },
            }));
          } catch (error) {
            set((state) => ({
              loading: { ...state.loading, categories: 'error' },
              errors: {
                ...state.errors,
                categories: {
                  hasError: true,
                  message: error instanceof Error ? error.message : 'Ошибка загрузки категорий',
                },
              },
            }));
          }
        },
        
        // Загрузка статистики
        loadStats: async () => {
          set((state) => ({
            loading: { ...state.loading, stats: 'loading' },
            errors: { ...state.errors, stats: null },
          }));
          
          try {
            // Имитация задержки API
            await new Promise(resolve => setTimeout(resolve, 400));
            
            const articles = get().articles;
            const totalViews = articles.reduce((sum, article) => sum + (article.views || 0), 0);
            const totalLikes = articles.reduce((sum, article) => sum + (article.likes || 0), 0);
            const totalComments = articles.reduce((sum, article) => sum + (article.comments || 0), 0);
            const averageReadTime = articles.reduce((sum, article) => sum + article.readTime, 0) / articles.length;
            
            // Находим самую популярную категорию
            const categoryStats = articles.reduce((acc, article) => {
              acc[article.category.id] = (acc[article.category.id] || 0) + 1;
              return acc;
            }, {} as Record<string, number>);
            
            const mostPopularCategoryId = Object.entries(categoryStats)
              .sort(([,a], [,b]) => b - a)[0]?.[0];
            
            const mostPopularCategory = mockCategories.find(cat => cat.id === mostPopularCategoryId) || mockCategories[0];
            
            // Находим самого активного автора
            const authorStats = articles.reduce((acc, article) => {
              acc[article.author.id] = (acc[article.author.id] || 0) + 1;
              return acc;
            }, {} as Record<string, number>);
            
            const mostActiveAuthorId = Object.entries(authorStats)
              .sort(([,a], [,b]) => b - a)[0]?.[0];
            
            const mostActiveAuthor = articles.find(article => article.author.id === mostActiveAuthorId)?.author || articles[0]?.author;
            
            const stats: NewsStats = {
              totalArticles: articles.length,
              totalViews,
              totalLikes,
              totalComments,
              averageReadTime: Math.round(averageReadTime * 10) / 10,
              mostPopularCategory,
              mostActiveAuthor,
            };
            
            set((state) => ({
              stats,
              loading: { ...state.loading, stats: 'success' },
            }));
          } catch (error) {
            set((state) => ({
              loading: { ...state.loading, stats: 'error' },
              errors: {
                ...state.errors,
                stats: {
                  hasError: true,
                  message: error instanceof Error ? error.message : 'Ошибка загрузки статистики',
                },
              },
            }));
          }
        },
        
        // Установка фильтров
        setFilters: (newFilters) => {
          set((state) => ({
            filters: { ...state.filters, ...newFilters },
            pagination: { ...state.pagination, currentPage: 1 },
          }));
          get().applyFilters();
        },
        
        // Очистка фильтров
        clearFilters: () => {
          set((state) => ({
            filters: initialState.filters,
            pagination: { ...state.pagination, currentPage: 1 },
          }));
          get().applyFilters();
        },
        
        // Применение фильтров
        applyFilters: () => {
          const { articles, filters, pagination } = get();
          let filtered = [...articles];
          
          // Фильтр по категории
          if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter(article => article.category.id === filters.category);
          }
          
          // Фильтр по автору
          if (filters.author) {
            filtered = filtered.filter(article => article.author.id === filters.author);
          }
          
          // Фильтр по тегам
          if (filters.tags && filters.tags.length > 0) {
            filtered = filtered.filter(article => 
              filters.tags!.some(tagId => 
                article.tags.some(tag => tag.id === tagId)
              )
            );
          }
          
          // Фильтр по дате
          if (filters.dateFrom) {
            filtered = filtered.filter(article => 
              article.publishedAt >= filters.dateFrom!
            );
          }
          
          if (filters.dateTo) {
            filtered = filtered.filter(article => 
              article.publishedAt <= filters.dateTo!
            );
          }
          
          // Фильтр по поиску
          if (filters.search) {
            const query = filters.search.toLowerCase();
            filtered = filtered.filter(article => 
              article.title.toLowerCase().includes(query) ||
              article.excerpt.toLowerCase().includes(query) ||
              article.content.toLowerCase().includes(query)
            );
          }
          
          // Фильтр по прочитанным
          if (filters.isRead !== undefined) {
            filtered = filtered.filter(article => article.isRead === filters.isRead);
          }
          
          // Фильтр по избранным
          if (filters.isBookmarked !== undefined) {
            filtered = filtered.filter(article => article.isBookmarked === filters.isBookmarked);
          }
          
          // Сортировка
          if (filters.sortBy) {
            filtered.sort((a, b) => {
              let aValue: any, bValue: any;
              
              switch (filters.sortBy) {
                case 'publishedAt':
                  aValue = a.publishedAt.getTime();
                  bValue = b.publishedAt.getTime();
                  break;
                case 'views':
                  aValue = a.views || 0;
                  bValue = b.views || 0;
                  break;
                case 'likes':
                  aValue = a.likes || 0;
                  bValue = b.likes || 0;
                  break;
                case 'readTime':
                  aValue = a.readTime;
                  bValue = b.readTime;
                  break;
                default:
                  aValue = a.publishedAt.getTime();
                  bValue = b.publishedAt.getTime();
              }
              
              if (filters.sortOrder === 'asc') {
                return aValue - bValue;
              } else {
                return bValue - aValue;
              }
            });
          }
          
          // Обновление пагинации
          const totalPages = Math.ceil(filtered.length / pagination.itemsPerPage);
          const currentPage = Math.min(pagination.currentPage, totalPages || 1);
          
          set({
            filteredArticles: filtered,
            pagination: {
              ...pagination,
              totalItems: filtered.length,
              totalPages,
              currentPage,
            },
          });
        },
        
        // Установка страницы
        setPage: (page) => {
          set((state) => ({
            pagination: { ...state.pagination, currentPage: page },
          }));
        },
        
        // Установка количества элементов на странице
        setItemsPerPage: (itemsPerPage) => {
          set((state) => ({
            pagination: { 
              ...state.pagination, 
              itemsPerPage,
              currentPage: 1,
              totalPages: Math.ceil(state.pagination.totalItems / itemsPerPage),
            },
          }));
        },
        
        // Получение статьи по ID
        getArticleById: (id) => {
          return get().articles.find(article => article.id === id);
        },
        
        // Получение статьи по slug
        getArticleBySlug: (slug) => {
          return get().articles.find(article => article.slug === slug);
        },
        
        // Отметить как прочитанную
        markAsRead: (id) => {
          set((state) => {
            const readIds = new Set(state.readIds);
            readIds.add(id);
            
            const articles = state.articles.map(article => 
              article.id === id ? { ...article, isRead: true } : article
            );
            
            const filteredArticles = state.filteredArticles.map(article => 
              article.id === id ? { ...article, isRead: true } : article
            );
            
            return {
              articles,
              filteredArticles,
              readIds,
            };
          });
        },
        
        // Отметить как непрочитанную
        markAsUnread: (id) => {
          set((state) => {
            const readIds = new Set(state.readIds);
            readIds.delete(id);
            
            const articles = state.articles.map(article => 
              article.id === id ? { ...article, isRead: false } : article
            );
            
            const filteredArticles = state.filteredArticles.map(article => 
              article.id === id ? { ...article, isRead: false } : article
            );
            
            return {
              articles,
              filteredArticles,
              readIds,
            };
          });
        },
        
        // Переключить закладку
        toggleBookmark: (id) => {
          set((state) => {
            const bookmarkedIds = new Set(state.bookmarkedIds);
            const article = state.articles.find(a => a.id === id);
            
            if (article?.isBookmarked) {
              bookmarkedIds.delete(id);
            } else {
              bookmarkedIds.add(id);
            }
            
            const articles = state.articles.map(article => 
              article.id === id ? { ...article, isBookmarked: !article.isBookmarked } : article
            );
            
            const filteredArticles = state.filteredArticles.map(article => 
              article.id === id ? { ...article, isBookmarked: !article.isBookmarked } : article
            );
            
            return {
              articles,
              filteredArticles,
              bookmarkedIds,
            };
          });
        },
        
        // Поиск статей
        searchArticles: (query) => {
          get().setFilters({ search: query });
        },
        
        // Сброс состояния
        reset: () => {
          set(initialState);
        },
      }),
      {
        name: 'news-store',
        partialize: (state) => ({
          bookmarkedIds: state.bookmarkedIds,
          readIds: state.readIds,
          filters: state.filters,
          pagination: {
            itemsPerPage: state.pagination.itemsPerPage,
          },
        }),
      }
    ),
    {
      name: 'news-store',
    }
  )
);

// Селекторы для удобного использования
export const useNewsSelectors = () => {
  const articles = useNewsStore((state) => state.articles);
  const filteredArticles = useNewsStore((state) => state.filteredArticles);
  const categories = useNewsStore((state) => state.categories);
  const tags = useNewsStore((state) => state.tags);
  const stats = useNewsStore((state) => state.stats);
  const loading = useNewsStore((state) => state.loading);
  const errors = useNewsStore((state) => state.errors);
  const pagination = useNewsStore((state) => state.pagination);
  const filters = useNewsStore((state) => state.filters);
  
  // Получение статей для текущей страницы с кэшированием
  const currentPageArticles = useMemo(() => {
    const { currentPage, itemsPerPage } = pagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  }, [filteredArticles, pagination.currentPage, pagination.itemsPerPage]);
  
  // Получение избранных статей с кэшированием
  const bookmarkedArticles = useMemo(() => 
    articles.filter(article => article.isBookmarked),
    [articles]
  );
  
  // Получение прочитанных статей с кэшированием
  const readArticles = useMemo(() => 
    articles.filter(article => article.isRead),
    [articles]
  );
  
  // Получение непрочитанных статей с кэшированием
  const unreadArticles = useMemo(() => 
    articles.filter(article => !article.isRead),
    [articles]
  );
  
  return {
    articles,
    filteredArticles,
    currentPageArticles,
    categories,
    tags,
    stats,
    loading,
    errors,
    pagination,
    filters,
    bookmarkedArticles,
    readArticles,
    unreadArticles,
  };
};

// Хуки для отдельных частей состояния
export const useNewsLoading = () => useNewsStore((state) => state.loading);
export const useNewsErrors = () => useNewsStore((state) => state.errors);
export const useNewsPagination = () => useNewsStore((state) => state.pagination);
export const useNewsFilters = () => useNewsStore((state) => state.filters);
export const useNewsStats = () => useNewsStore((state) => state.stats);
