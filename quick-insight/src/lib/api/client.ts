/**
 * Базовый HTTP клиент для API запросов
 */

// Типы для HTTP методов
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Типы для HTTP заголовков
export interface HttpHeaders {
  [key: string]: string;
}

// Типы для конфигурации запроса
export interface RequestConfig {
  method: HttpMethod;
  url: string;
  headers?: HttpHeaders;
  body?: any;
  timeout?: number;
  params?: Record<string, any>;
}

// Типы для ответа API
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: HttpHeaders;
}

// Типы для ошибок API
export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
  data?: any;
}

// Конфигурация клиента
export interface ClientConfig {
  baseURL: string;
  timeout: number;
  headers: HttpHeaders;
  useMockData: boolean;
}

// Класс для HTTP клиента
export class HttpClient {
  private config: ClientConfig;

  constructor(config: Partial<ClientConfig> = {}) {
    this.config = {
      baseURL: config.baseURL || 'http://localhost:3000/api', // [[memory:8781571]]
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...config.headers,
      },
      useMockData: config.useMockData ?? true, // По умолчанию используем моковые данные
    };
  }

  /**
   * Выполнить HTTP запрос
   */
  private async request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    const { method, url, headers = {}, body, timeout, params } = config;
    
    // Если используем моковые данные, возвращаем заглушку
    if (this.config.useMockData) {
      return this.mockRequest<T>(config);
    }

    // Формируем полный URL
    const fullUrl = this.buildUrl(url, params);
    
    // Объединяем заголовки
    const requestHeaders = {
      ...this.config.headers,
      ...headers,
    };

    // Создаем AbortController для таймаута
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout || this.config.timeout);

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Проверяем статус ответа
      if (!response.ok) {
        throw new ApiError(
          `HTTP Error: ${response.status} ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      // Парсим JSON ответ
      const data = await response.json();
      
      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: this.parseHeaders(response.headers),
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout');
      }
      
      throw new ApiError(`Network error: ${error.message}`);
    }
  }

  /**
   * Моковый запрос для разработки
   */
  private async mockRequest<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    // Имитируем задержку сети
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    // Возвращаем успешный ответ
    return {
      data: {} as T,
      status: 200,
      statusText: 'OK',
      headers: {},
    };
  }

  /**
   * Построить URL с параметрами
   */
  private buildUrl(url: string, params?: Record<string, any>): string {
    const fullUrl = url.startsWith('http') ? url : `${this.config.baseURL}${url}`;
    
    if (!params) {
      return fullUrl;
    }

    const urlObj = new URL(fullUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });

    return urlObj.toString();
  }

  /**
   * Парсить заголовки ответа
   */
  private parseHeaders(headers: Headers): HttpHeaders {
    const result: HttpHeaders = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  /**
   * GET запрос
   */
  async get<T>(url: string, params?: Record<string, any>, headers?: HttpHeaders): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'GET',
      url,
      headers,
      params,
    });
  }

  /**
   * POST запрос
   */
  async post<T>(url: string, body?: any, headers?: HttpHeaders): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'POST',
      url,
      headers,
      body,
    });
  }

  /**
   * PUT запрос
   */
  async put<T>(url: string, body?: any, headers?: HttpHeaders): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PUT',
      url,
      headers,
      body,
    });
  }

  /**
   * DELETE запрос
   */
  async delete<T>(url: string, headers?: HttpHeaders): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'DELETE',
      url,
      headers,
    });
  }

  /**
   * PATCH запрос
   */
  async patch<T>(url: string, body?: any, headers?: HttpHeaders): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PATCH',
      url,
      headers,
      body,
    });
  }

  /**
   * Обновить конфигурацию клиента
   */
  updateConfig(config: Partial<ClientConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  /**
   * Получить текущую конфигурацию
   */
  getConfig(): ClientConfig {
    return { ...this.config };
  }
}

// Класс для ошибок API
export class ApiError extends Error {
  public status?: number;
  public statusText?: string;
  public data?: any;

  constructor(message: string, status?: number, statusText?: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

// Создаем экземпляр клиента по умолчанию
export const apiClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  useMockData: process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
});

// Экспортируем типы для использования в других модулях
export type { HttpMethod, HttpHeaders, RequestConfig, ApiResponse, ApiError, ClientConfig };
