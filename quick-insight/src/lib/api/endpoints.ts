/**
 * Константы эндпоинтов API
 */

// Базовые эндпоинты
export const API_ENDPOINTS = {
  // Новости
  NEWS: {
    // Получить все новости
    LIST: '/news',
    // Получить новость по ID
    BY_ID: (id: string) => `/news/${id}`,
    // Получить новость по slug
    BY_SLUG: (slug: string) => `/news/slug/${slug}`,
    // Получить новости по категории
    BY_CATEGORY: (categoryId: string) => `/news/category/${categoryId}`,
    // Получить новости по автору
    BY_AUTHOR: (authorId: string) => `/news/author/${authorId}`,
    // Поиск новостей
    SEARCH: '/news/search',
    // Получить популярные новости
    POPULAR: '/news/popular',
    // Получить последние новости
    LATEST: '/news/latest',
    // Получить прочитанные новости
    READ: '/news/read',
    // Получить непрочитанные новости
    UNREAD: '/news/unread',
    // Получить новости в избранном
    BOOKMARKED: '/news/bookmarked',
    // Отметить новость как прочитанную
    MARK_AS_READ: (id: string) => `/news/${id}/read`,
    // Добавить/удалить из избранного
    TOGGLE_BOOKMARK: (id: string) => `/news/${id}/bookmark`,
    // Получить статистику новостей
    STATS: '/news/stats',
  },

  // Категории
  CATEGORIES: {
    // Получить все категории
    LIST: '/categories',
    // Получить категорию по ID
    BY_ID: (id: string) => `/categories/${id}`,
    // Получить категорию по slug
    BY_SLUG: (slug: string) => `/categories/slug/${slug}`,
    // Получить активные категории
    ACTIVE: '/categories/active',
    // Получить категории для фильтрации
    FILTER: '/categories/filter',
  },

  // Авторы
  AUTHORS: {
    // Получить всех авторов
    LIST: '/authors',
    // Получить автора по ID
    BY_ID: (id: string) => `/authors/${id}`,
    // Получить автора по email
    BY_EMAIL: (email: string) => `/authors/email/${email}`,
    // Получить статистику автора
    STATS: (id: string) => `/authors/${id}/stats`,
  },

  // Теги
  TAGS: {
    // Получить все теги
    LIST: '/tags',
    // Получить тег по ID
    BY_ID: (id: string) => `/tags/${id}`,
    // Получить тег по slug
    BY_SLUG: (slug: string) => `/tags/slug/${slug}`,
    // Получить популярные теги
    POPULAR: '/tags/popular',
  },

  // Пользователи
  USERS: {
    // Получить профиль пользователя
    PROFILE: '/users/profile',
    // Обновить профиль
    UPDATE_PROFILE: '/users/profile',
    // Получить настройки пользователя
    SETTINGS: '/users/settings',
    // Обновить настройки
    UPDATE_SETTINGS: '/users/settings',
    // Получить историю чтения
    READING_HISTORY: '/users/reading-history',
    // Получить избранные статьи
    FAVORITES: '/users/favorites',
    // Получить статистику пользователя
    STATS: '/users/stats',
  },

  // Аутентификация
  AUTH: {
    // Вход
    LOGIN: '/auth/login',
    // Выход
    LOGOUT: '/auth/logout',
    // Регистрация
    REGISTER: '/auth/register',
    // Обновить токен
    REFRESH: '/auth/refresh',
    // Восстановление пароля
    FORGOT_PASSWORD: '/auth/forgot-password',
    // Сброс пароля
    RESET_PASSWORD: '/auth/reset-password',
    // Подтверждение email
    VERIFY_EMAIL: '/auth/verify-email',
    // Получить текущего пользователя
    ME: '/auth/me',
  },

  // Файлы и медиа
  MEDIA: {
    // Загрузить изображение
    UPLOAD_IMAGE: '/media/upload/image',
    // Загрузить файл
    UPLOAD_FILE: '/media/upload/file',
    // Получить файл по ID
    BY_ID: (id: string) => `/media/${id}`,
    // Удалить файл
    DELETE: (id: string) => `/media/${id}`,
  },

  // Аналитика
  ANALYTICS: {
    // Получить общую статистику
    OVERVIEW: '/analytics/overview',
    // Получить статистику по новостям
    NEWS_STATS: '/analytics/news',
    // Получить статистику по пользователям
    USER_STATS: '/analytics/users',
    // Получить статистику по категориям
    CATEGORY_STATS: '/analytics/categories',
    // Получить статистику по авторам
    AUTHOR_STATS: '/analytics/authors',
  },

  // Система
  SYSTEM: {
    // Проверка здоровья API
    HEALTH: '/health',
    // Получить информацию о версии
    VERSION: '/version',
    // Получить метрики системы
    METRICS: '/metrics',
  },
} as const;

// Параметры запросов
export const API_PARAMS = {
  // Пагинация
  PAGINATION: {
    PAGE: 'page',
    LIMIT: 'limit',
    OFFSET: 'offset',
  },
  
  // Сортировка
  SORTING: {
    SORT_BY: 'sortBy',
    SORT_ORDER: 'sortOrder',
  },
  
  // Фильтрация
  FILTERS: {
    CATEGORY: 'category',
    AUTHOR: 'author',
    TAGS: 'tags',
    DATE_FROM: 'dateFrom',
    DATE_TO: 'dateTo',
    SEARCH: 'search',
    IS_READ: 'isRead',
    IS_BOOKMARKED: 'isBookmarked',
    STATUS: 'status',
  },
  
  // Поиск
  SEARCH: {
    QUERY: 'q',
    TYPE: 'type',
    FIELDS: 'fields',
  },
} as const;

// Значения по умолчанию
export const API_DEFAULTS = {
  // Пагинация
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Таймауты
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  
  // Сортировка
  DEFAULT_SORT_BY: 'publishedAt',
  DEFAULT_SORT_ORDER: 'desc',
  
  // Кэширование
  CACHE_TTL: 300000, // 5 минут
} as const;

// Коды статусов HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Типы контента
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
  TEXT: 'text/plain',
  HTML: 'text/html',
} as const;

// Экспортируем все константы
export default API_ENDPOINTS;
