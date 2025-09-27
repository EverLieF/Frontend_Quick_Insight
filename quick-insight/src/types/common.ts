/**
 * Общие типы для приложения Quick Insight
 */

// Тип для статуса загрузки
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Тип для состояния ошибки
export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
  details?: Record<string, any>;
}

// Тип для состояния загрузки с данными
export interface LoadingStateWithData<T = any> {
  status: LoadingState;
  data?: T;
  error?: ErrorState;
}

// Тип для базового состояния компонента
export interface BaseComponentState {
  isLoading: boolean;
  error: ErrorState | null;
}

// Тип для уведомлений
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  isVisible: boolean;
  createdAt: Date;
}

// Тип для модальных окон
export interface ModalState {
  isOpen: boolean;
  type?: string;
  data?: any;
}

// Тип для навигации
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  isActive?: boolean;
  children?: NavigationItem[];
}

// Тип для темы
export type Theme = 'light' | 'dark' | 'system';

// Тип для настроек пользователя
export interface UserSettings {
  theme: Theme;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    showEmail: boolean;
    showProfile: boolean;
  };
}

// Тип для размеров экрана
export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Тип для breakpoints
export interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

// Тип для сортировки
export interface SortOption {
  value: string;
  label: string;
  direction: 'asc' | 'desc';
}

// Тип для фильтра
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  isSelected?: boolean;
}

// Тип для группировки фильтров
export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  type: 'single' | 'multiple' | 'range';
}

// Тип для поиска
export interface SearchState {
  query: string;
  isSearching: boolean;
  results: any[];
  totalResults: number;
  suggestions: string[];
}

// Тип для хлебных крошек
export interface Breadcrumb {
  label: string;
  href?: string;
  isActive?: boolean;
}

// Тип для вкладок
export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  icon?: string;
}

// Тип для аккордеона
export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  isOpen?: boolean;
  isDisabled?: boolean;
}

// Тип для шагов
export interface Step {
  id: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
}

// Тип для прогресса
export interface ProgressState {
  current: number;
  total: number;
  percentage: number;
  label?: string;
}

// Тип для статуса формы
export type FormStatus = 'idle' | 'validating' | 'submitting' | 'success' | 'error';

// Тип для состояния формы
export interface FormState<T = any> {
  status: FormStatus;
  data: T;
  errors: Record<string, string>;
  isDirty: boolean;
  isValid: boolean;
}

// Тип для валидации поля
export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

// Тип для конфигурации
export interface AppConfig {
  apiUrl: string;
  appName: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    darkMode: boolean;
    notifications: boolean;
    analytics: boolean;
  };
}

// Тип для метаданных страницы
export interface PageMetadata {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// Тип для аналитики
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: Date;
  userId?: string;
}

// Тип для кэша
export interface CacheItem<T = any> {
  key: string;
  data: T;
  expiresAt: Date;
  createdAt: Date;
}

// Тип для состояния кэша
export interface CacheState {
  items: Map<string, CacheItem>;
  isEnabled: boolean;
  maxSize: number;
  ttl: number;
}
