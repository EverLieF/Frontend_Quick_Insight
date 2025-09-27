/**
 * Главный экспорт API клиента
 */

// Экспортируем базовый клиент
export { 
  apiClient, 
  HttpClient, 
  ApiError,
  type HttpMethod,
  type HttpHeaders,
  type RequestConfig,
  type ApiResponse,
  type ApiError as ApiErrorType,
  type ClientConfig
} from './client';

// Экспортируем эндпоинты
export { 
  API_ENDPOINTS,
  API_PARAMS,
  API_DEFAULTS,
  HTTP_STATUS,
  CONTENT_TYPES
} from './endpoints';

// Экспортируем все типы
export type {
  // Базовые типы
  PaginationParams,
  PaginatedResponse,
  SortParams,
  SearchParams,
  
  // Новости
  GetNewsParams,
  SearchNewsParams,
  GetNewsResponse,
  GetNewsByIdResponse,
  SearchNewsResponse,
  MarkAsReadParams,
  ToggleBookmarkParams,
  GetNewsStatsResponse,
  
  // Категории
  GetCategoriesParams,
  GetCategoriesResponse,
  GetCategoryByIdResponse,
  
  // Авторы
  GetAuthorsParams,
  GetAuthorsResponse,
  GetAuthorByIdResponse,
  AuthorStats,
  GetAuthorStatsResponse,
  
  // Теги
  GetTagsParams,
  GetTagsResponse,
  GetTagByIdResponse,
  
  // Пользователи
  UserProfile,
  UserSettings,
  GetUserProfileResponse,
  GetUserSettingsResponse,
  UpdateUserProfileParams,
  UpdateUserSettingsParams,
  ReadingHistoryItem,
  GetReadingHistoryResponse,
  
  // Аутентификация
  LoginParams,
  RegisterParams,
  ForgotPasswordParams,
  ResetPasswordParams,
  AuthToken,
  AuthResponse,
  LoginResponse,
  RegisterResponse,
  RefreshTokenResponse,
  
  // Медиа
  UploadFileParams,
  UploadedFile,
  UploadFileResponse,
  
  // Аналитика
  AnalyticsOverview,
  NewsAnalytics,
  UserAnalytics,
  GetAnalyticsOverviewResponse,
  GetNewsAnalyticsResponse,
  GetUserAnalyticsResponse,
  
  // Система
  SystemHealth,
  VersionInfo,
  GetSystemHealthResponse,
  GetVersionInfoResponse,
  
  // Ошибки
  ValidationError,
  ApiErrorResponse,
  
  // Кэширование
  CacheOptions,
} from './types';

// Экспортируем функции для работы с новостями
export {
  getNews,
  getNewsById,
  getNewsBySlug,
  getNewsByCategory,
  getNewsByAuthor,
  searchNews,
  getPopularNews,
  getLatestNews,
  getReadNews,
  getUnreadNews,
  getBookmarkedNews,
  markNewsAsRead,
  toggleNewsBookmark,
  getNewsStats,
} from './news';

// Экспортируем функции для работы с категориями
export {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  getActiveCategories,
  getFilterCategories,
} from './categories';

// Экспортируем функции для поиска
export {
  searchNewsByText,
  searchNewsByCategory,
  searchNewsByTags,
  searchNewsByAuthor,
  searchNewsByDate,
  searchNewsAdvanced,
  getSearchSuggestions,
  getPopularSearchQueries,
} from './search';

// Экспортируем конфигурацию по умолчанию
export const defaultApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  useMockData: process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Утилиты для работы с API
export const apiUtils = {
  /**
   * Создать новый экземпляр HTTP клиента
   */
  createClient: (config?: Partial<import('./client').ClientConfig>) => {
    const { HttpClient } = require('./client');
    return new HttpClient({ ...defaultApiConfig, ...config });
  },

  /**
   * Проверить, является ли ошибка ошибкой API
   */
  isApiError: (error: any): error is import('./client').ApiError => {
    return error instanceof Error && error.name === 'ApiError';
  },

  /**
   * Получить сообщение об ошибке
   */
  getErrorMessage: (error: any): string => {
    if (apiUtils.isApiError(error)) {
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'Произошла неизвестная ошибка';
  },

  /**
   * Создать параметры пагинации
   */
  createPaginationParams: (page: number = 1, limit: number = 20) => ({
    page,
    limit,
  }),

  /**
   * Создать параметры сортировки
   */
  createSortParams: (sortBy: string = 'publishedAt', sortOrder: 'asc' | 'desc' = 'desc') => ({
    sortBy,
    sortOrder,
  }),

  /**
   * Создать параметры поиска
   */
  createSearchParams: (query: string, fields?: string[]) => ({
    q: query,
    fields,
  }),

  /**
   * Форматировать дату для API
   */
  formatDateForApi: (date: Date): string => {
    return date.toISOString().split('T')[0];
  },

  /**
   * Парсить дату из API
   */
  parseDateFromApi: (dateString: string): Date => {
    return new Date(dateString);
  },

  /**
   * Создать URL с параметрами
   */
  buildUrlWithParams: (baseUrl: string, params: Record<string, any>): string => {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
    return url.toString();
  },

  /**
   * Задержка для имитации сетевого запроса
   */
  delay: (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Повторить запрос с экспоненциальной задержкой
   */
  retryWithBackoff: async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> => {
    let lastError: any;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          throw error;
        }
        
        const delay = baseDelay * Math.pow(2, attempt);
        await apiUtils.delay(delay);
      }
    }
    
    throw lastError;
  },
};

// Экспортируем все по умолчанию
export default {
  apiClient,
  API_ENDPOINTS,
  apiUtils,
  defaultApiConfig,
};
