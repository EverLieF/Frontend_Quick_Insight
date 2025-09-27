import { NewsCategory } from '@/types/news';

/**
 * Моковые данные категорий новостей
 */
export const mockCategories: NewsCategory[] = [
  {
    id: 'all',
    name: 'Все',
    slug: 'all',
    color: '#56CDFF',
    icon: '📰',
    description: 'Все новости',
    isActive: true,
  },
  {
    id: 'politics',
    name: 'Политика',
    slug: 'politics',
    color: '#FF6B6B',
    icon: '🏛️',
    description: 'Политические новости и аналитика',
    isActive: true,
  },
  {
    id: 'science',
    name: 'Наука',
    slug: 'science',
    color: '#4ECDC4',
    icon: '🔬',
    description: 'Научные открытия и исследования',
    isActive: true,
  },
  {
    id: 'history',
    name: 'История',
    slug: 'history',
    color: '#45B7D1',
    icon: '📚',
    description: 'Исторические события и факты',
    isActive: true,
  },
  {
    id: 'research',
    name: 'Исследования',
    slug: 'research',
    color: '#96CEB4',
    icon: '🔍',
    description: 'Аналитические исследования и отчеты',
    isActive: true,
  },
  {
    id: 'finance',
    name: 'Финансы',
    slug: 'finance',
    color: '#FFEAA7',
    icon: '💰',
    description: 'Финансовые новости и рынки',
    isActive: true,
  },
];

/**
 * Получить категорию по ID
 */
export const getCategoryById = (id: string): NewsCategory | undefined => {
  return mockCategories.find(category => category.id === id);
};

/**
 * Получить категорию по slug
 */
export const getCategoryBySlug = (slug: string): NewsCategory | undefined => {
  return mockCategories.find(category => category.slug === slug);
};

/**
 * Получить все активные категории
 */
export const getActiveCategories = (): NewsCategory[] => {
  return mockCategories.filter(category => category.isActive);
};

/**
 * Получить категории для фильтрации (исключая "Все")
 */
export const getFilterCategories = (): NewsCategory[] => {
  return mockCategories.filter(category => category.id !== 'all' && category.isActive);
};
