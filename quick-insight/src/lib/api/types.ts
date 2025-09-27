/**
 * Типы для API запросов и ответов
 */

import { 
  NewsArticle, 
  NewsArticleSummary, 
  NewsCategory, 
  NewsAuthor, 
  NewsTag, 
  NewsFilters, 
  NewsStats 
} from '@/types/news';

// ===== БАЗОВЫЕ ТИПЫ =====

// Тип для пагинации
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

// Тип для пагинированного ответа
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Тип для сортировки
export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Тип для поиска
export interface SearchParams {
  q?: string;
  type?: string;
  fields?: string[];
}

// ===== ТИПЫ ДЛЯ НОВОСТЕЙ =====

// Параметры запроса для получения списка новостей
export interface GetNewsParams extends PaginationParams, SortParams {
  category?: string;
  author?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  isRead?: boolean;
  isBookmarked?: boolean;
  status?: 'draft' | 'published' | 'archived';
}

// Параметры поиска новостей
export interface SearchNewsParams extends PaginationParams, SortParams, SearchParams {
  category?: string;
  author?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

// Ответ для получения списка новостей
export type GetNewsResponse = PaginatedResponse<NewsArticleSummary>;

// Ответ для получения одной новости
export type GetNewsByIdResponse = NewsArticle;

// Ответ для поиска новостей
export type SearchNewsResponse = PaginatedResponse<NewsArticleSummary>;

// Параметры для отметки новости как прочитанной
export interface MarkAsReadParams {
  readAt?: string;
}

// Параметры для добавления в избранное
export interface ToggleBookmarkParams {
  bookmarked: boolean;
}

// Ответ для статистики новостей
export type GetNewsStatsResponse = NewsStats;

// ===== ТИПЫ ДЛЯ КАТЕГОРИЙ =====

// Параметры запроса для получения категорий
export interface GetCategoriesParams extends PaginationParams, SortParams {
  active?: boolean;
}

// Ответ для получения списка категорий
export type GetCategoriesResponse = PaginatedResponse<NewsCategory>;

// Ответ для получения одной категории
export type GetCategoryByIdResponse = NewsCategory;

// ===== ТИПЫ ДЛЯ АВТОРОВ =====

// Параметры запроса для получения авторов
export interface GetAuthorsParams extends PaginationParams, SortParams {
  active?: boolean;
}

// Ответ для получения списка авторов
export type GetAuthorsResponse = PaginatedResponse<NewsAuthor>;

// Ответ для получения одного автора
export type GetAuthorByIdResponse = NewsAuthor;

// Статистика автора
export interface AuthorStats {
  totalArticles: number;
  totalViews: number;
  totalLikes: number;
  averageReadTime: number;
  mostPopularCategory: NewsCategory;
  lastArticleDate: string;
}

// Ответ для статистики автора
export type GetAuthorStatsResponse = AuthorStats;

// ===== ТИПЫ ДЛЯ ТЕГОВ =====

// Параметры запроса для получения тегов
export interface GetTagsParams extends PaginationParams, SortParams {
  popular?: boolean;
}

// Ответ для получения списка тегов
export type GetTagsResponse = PaginatedResponse<NewsTag>;

// Ответ для получения одного тега
export type GetTagByIdResponse = NewsTag;

// ===== ТИПЫ ДЛЯ ПОЛЬЗОВАТЕЛЕЙ =====

// Профиль пользователя
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  preferences: {
    categories: string[];
    notifications: boolean;
    theme: 'light' | 'dark' | 'auto';
    language: string;
  };
  stats: {
    articlesRead: number;
    articlesBookmarked: number;
    totalReadTime: number;
    joinDate: string;
  };
}

// Настройки пользователя
export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    newArticles: boolean;
    weeklyDigest: boolean;
  };
  privacy: {
    showReadHistory: boolean;
    showBookmarks: boolean;
    showStats: boolean;
  };
  reading: {
    fontSize: 'small' | 'medium' | 'large';
    lineHeight: 'tight' | 'normal' | 'loose';
    darkMode: boolean;
  };
}

// Ответ для получения профиля пользователя
export type GetUserProfileResponse = UserProfile;

// Ответ для получения настроек пользователя
export type GetUserSettingsResponse = UserSettings;

// Параметры для обновления профиля
export interface UpdateUserProfileParams {
  name?: string;
  bio?: string;
  avatar?: string;
}

// Параметры для обновления настроек
export interface UpdateUserSettingsParams {
  notifications?: Partial<UserSettings['notifications']>;
  privacy?: Partial<UserSettings['privacy']>;
  reading?: Partial<UserSettings['reading']>;
}

// История чтения
export interface ReadingHistoryItem {
  articleId: string;
  articleTitle: string;
  readAt: string;
  readTime: number;
  progress: number; // процент прочитанного
}

// Ответ для истории чтения
export type GetReadingHistoryResponse = PaginatedResponse<ReadingHistoryItem>;

// ===== ТИПЫ ДЛЯ АУТЕНТИФИКАЦИИ =====

// Параметры входа
export interface LoginParams {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Параметры регистрации
export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Параметры восстановления пароля
export interface ForgotPasswordParams {
  email: string;
}

// Параметры сброса пароля
export interface ResetPasswordParams {
  token: string;
  password: string;
  confirmPassword: string;
}

// Токен аутентификации
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

// Ответ для аутентификации
export interface AuthResponse {
  user: UserProfile;
  token: AuthToken;
}

// Ответ для входа
export type LoginResponse = AuthResponse;

// Ответ для регистрации
export type RegisterResponse = AuthResponse;

// Ответ для обновления токена
export type RefreshTokenResponse = AuthToken;

// ===== ТИПЫ ДЛЯ МЕДИА =====

// Параметры загрузки файла
export interface UploadFileParams {
  file: File;
  type: 'image' | 'document' | 'video';
  category?: string;
}

// Информация о загруженном файле
export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: string;
}

// Ответ для загрузки файла
export type UploadFileResponse = UploadedFile;

// ===== ТИПЫ ДЛЯ АНАЛИТИКИ =====

// Общая статистика
export interface AnalyticsOverview {
  totalArticles: number;
  totalUsers: number;
  totalViews: number;
  totalLikes: number;
  averageReadTime: number;
  growthRate: {
    articles: number;
    users: number;
    views: number;
  };
}

// Статистика по новостям
export interface NewsAnalytics {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
  totalLikes: number;
  averageReadTime: number;
  topCategories: Array<{
    category: NewsCategory;
    count: number;
  }>;
  topAuthors: Array<{
    author: NewsAuthor;
    count: number;
  }>;
}

// Статистика по пользователям
export interface UserAnalytics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  averageSessionTime: number;
  topCountries: Array<{
    country: string;
    count: number;
  }>;
  userGrowth: Array<{
    date: string;
    count: number;
  }>;
}

// Ответ для общей аналитики
export type GetAnalyticsOverviewResponse = AnalyticsOverview;

// Ответ для аналитики новостей
export type GetNewsAnalyticsResponse = NewsAnalytics;

// Ответ для аналитики пользователей
export type GetUserAnalyticsResponse = UserAnalytics;

// ===== ТИПЫ ДЛЯ СИСТЕМЫ =====

// Информация о здоровье системы
export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  uptime: number;
  services: {
    database: 'up' | 'down';
    cache: 'up' | 'down';
    storage: 'up' | 'down';
  };
  metrics: {
    memoryUsage: number;
    cpuUsage: number;
    diskUsage: number;
  };
}

// Информация о версии
export interface VersionInfo {
  version: string;
  build: string;
  commit: string;
  buildDate: string;
  environment: 'development' | 'staging' | 'production';
}

// Ответ для проверки здоровья
export type GetSystemHealthResponse = SystemHealth;

// Ответ для информации о версии
export type GetVersionInfoResponse = VersionInfo;

// ===== ОБЩИЕ ТИПЫ ОШИБОК =====

// Детали ошибки валидации
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Структура ошибки API
export interface ApiErrorResponse {
  message: string;
  code: string;
  status: number;
  details?: ValidationError[];
  timestamp: string;
  path: string;
}

// ===== ТИПЫ ДЛЯ КЭШИРОВАНИЯ =====

// Параметры кэширования
export interface CacheOptions {
  ttl?: number; // время жизни в миллисекундах
  key?: string; // ключ кэша
  tags?: string[]; // теги для инвалидации
}

// ===== ЭКСПОРТ ВСЕХ ТИПОВ =====

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
};
