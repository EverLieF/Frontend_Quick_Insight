/**
 * Design system constants for Quick Insight app
 */

export const DESIGN_TOKENS = {
  colors: {
    primary: '#56CDFF',
    background: {
      main: '#2E3247',
      secondary: '#00153E',
      card: 'rgba(65, 65, 65, 0.1)',
      dark: '#000714',
      modal: 'rgba(0, 0, 0, 0.3)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.5)',
      tertiary: 'rgba(60, 60, 67, 0.3)',
      accent: '#56CDFF',
    },
    border: {
      gradient: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(153, 153, 153, 1) 100%)',
      primary: 'rgba(255, 255, 255, 0.1)',
    },
    status: {
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '18px',
    '2xl': '24px',
    full: '9999px',
  },
  typography: {
    fontFamily: {
      primary: 'Onest, system-ui, -apple-system, sans-serif',
      system: 'SF Pro, system-ui, -apple-system, sans-serif',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glow: 'inset 0px 0px 14px 0px rgba(65, 190, 242, 0.75)',
    card: 'inset 0px 0px 20px 0px rgba(130, 130, 130, 0.05)',
  },
  blur: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

export const APP_CONFIG = {
  name: 'Quick Insight',
  description: 'Мини приложение для чтения новостей',
  version: '1.0.0',
  author: 'Quick Insight Team',
  url: 'https://quick-insight.app',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },
  features: {
    infiniteScroll: true,
    search: true,
    bookmarks: true,
    categories: true,
    darkMode: true,
  },
} as const;

export const NEWS_CATEGORIES = [
  { id: 'all', name: 'Все', slug: 'all', color: '#56CDFF', icon: 'newspaper' },
  { id: 'politics', name: 'Политика', slug: 'politics', color: '#FF6B6B', icon: 'landmark' },
  { id: 'science', name: 'Наука', slug: 'science', color: '#4ECDC4', icon: 'microscope' },
  { id: 'history', name: 'История', slug: 'history', color: '#45B7D1', icon: 'book-open' },
  { id: 'research', name: 'Исследования', slug: 'research', color: '#96CEB4', icon: 'search' },
  { id: 'finance', name: 'Финансы', slug: 'finance', color: '#FFEAA7', icon: 'trending-up' },
] as const;

export const TAB_NAVIGATION = [
  { id: 'news', name: 'Новости', icon: 'newspaper', path: '/' },
  { id: 'learning', name: 'Обучение', icon: 'book-open', path: '/learning' },
  { id: 'profile', name: 'Профиль', icon: 'user', path: '/profile' },
  { id: 'settings', name: 'Настройки', icon: 'settings', path: '/settings' },
] as const;

export const PAGINATION = {
  defaultLimit: 10,
  maxLimit: 50,
  infiniteScrollThreshold: 200,
} as const;

export const SEARCH = {
  debounceDelay: 300,
  minQueryLength: 2,
  maxResults: 20,
} as const;
