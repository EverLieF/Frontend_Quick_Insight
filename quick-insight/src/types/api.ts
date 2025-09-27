/**
 * Типы для API ответов и пагинации
 */

// Базовый тип для API ответа
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// Тип для ошибки API
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string;
}

// Тип для ответа с ошибкой
export interface ApiErrorResponse {
  success: false;
  error: ApiError;
  timestamp: string;
}

// Тип для пагинации
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Тип для пагинированного ответа
export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
  message?: string;
  timestamp: string;
}

// Тип для параметров пагинации
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Тип для поисковых параметров
export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, any>;
}

// Тип для ответа с метаданными
export interface ApiResponseWithMeta<T = any, M = any> {
  success: boolean;
  data: T;
  meta: M;
  message?: string;
  timestamp: string;
}

// Тип для статуса операции
export type OperationStatus = 'idle' | 'pending' | 'success' | 'error';

// Тип для результата операции
export interface OperationResult<T = any> {
  status: OperationStatus;
  data?: T;
  error?: ApiError;
  message?: string;
}

// Тип для запроса с токеном авторизации
export interface AuthenticatedRequest {
  headers: {
    Authorization: string;
  };
}

// Тип для ответа с токеном
export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
  message?: string;
  timestamp: string;
}

// Тип для валидации ошибок
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Тип для ответа с ошибками валидации
export interface ValidationErrorResponse {
  success: false;
  errors: ValidationError[];
  message: string;
  timestamp: string;
}

// Тип для загрузки файлов
export interface FileUploadResponse {
  success: boolean;
  data: {
    url: string;
    filename: string;
    size: number;
    mimeType: string;
  };
  message?: string;
  timestamp: string;
}

// Тип для параметров загрузки файла
export interface FileUploadParams {
  file: File;
  folder?: string;
  maxSize?: number;
  allowedTypes?: string[];
}
