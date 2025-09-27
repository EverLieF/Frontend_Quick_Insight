/**
 * API функции для работы с категориями
 */

import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import { 
  GetCategoriesParams, 
  GetCategoriesResponse, 
  GetCategoryByIdResponse
} from './types';
import { NewsCategory } from '@/types/news';
import { mockCategories, getCategoryById, getCategoryBySlug, getActiveCategories, getFilterCategories } from '@/data/mockCategories';

/**
 * Получить список категорий
 */
export async function getCategories(params: GetCategoriesParams = {}): Promise<GetCategoriesResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockCategories(params);
    }

    const response = await apiClient.get<GetCategoriesResponse>(API_ENDPOINTS.CATEGORIES.LIST, params);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    throw error;
  }
}

/**
 * Получить категорию по ID
 */
export async function getCategoryById(id: string): Promise<GetCategoryByIdResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      const category = getCategoryById(id);
      if (!category) {
        throw new Error(`Категория с ID ${id} не найдена`);
      }
      return category;
    }

    const response = await apiClient.get<GetCategoryByIdResponse>(API_ENDPOINTS.CATEGORIES.BY_ID(id));
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении категории ${id}:`, error);
    throw error;
  }
}

/**
 * Получить категорию по slug
 */
export async function getCategoryBySlug(slug: string): Promise<GetCategoryByIdResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      const category = getCategoryBySlug(slug);
      if (!category) {
        throw new Error(`Категория со slug ${slug} не найдена`);
      }
      return category;
    }

    const response = await apiClient.get<GetCategoryByIdResponse>(API_ENDPOINTS.CATEGORIES.BY_SLUG(slug));
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении категории ${slug}:`, error);
    throw error;
  }
}

/**
 * Получить активные категории
 */
export async function getActiveCategories(): Promise<GetCategoriesResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockActiveCategories();
    }

    const response = await apiClient.get<GetCategoriesResponse>(API_ENDPOINTS.CATEGORIES.ACTIVE);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении активных категорий:', error);
    throw error;
  }
}

/**
 * Получить категории для фильтрации
 */
export async function getFilterCategories(): Promise<GetCategoriesResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockFilterCategories();
    }

    const response = await apiClient.get<GetCategoriesResponse>(API_ENDPOINTS.CATEGORIES.FILTER);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении категорий для фильтрации:', error);
    throw error;
  }
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ МОКОВЫХ ДАННЫХ =====

/**
 * Получить моковые категории с пагинацией
 */
function getMockCategories(params: GetCategoriesParams): GetCategoriesResponse {
  const { page = 1, limit = 20, active, sortBy = 'name', sortOrder = 'asc' } = params;
  
  let filteredCategories = [...mockCategories];

  // Фильтрация по активности
  if (active !== undefined) {
    filteredCategories = filteredCategories.filter(category => category.isActive === active);
  }

  // Сортировка
  filteredCategories.sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'id':
        aValue = a.id;
        bValue = b.id;
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Пагинация
  const offset = (page - 1) * limit;
  const paginatedCategories = filteredCategories.slice(offset, offset + limit);

  return {
    data: paginatedCategories,
    pagination: {
      page,
      limit,
      total: filteredCategories.length,
      totalPages: Math.ceil(filteredCategories.length / limit),
      hasNext: offset + limit < filteredCategories.length,
      hasPrev: page > 1,
    },
  };
}

/**
 * Получить моковые активные категории
 */
function getMockActiveCategories(): GetCategoriesResponse {
  const activeCategories = getActiveCategories();
  
  return {
    data: activeCategories,
    pagination: {
      page: 1,
      limit: activeCategories.length,
      total: activeCategories.length,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    },
  };
}

/**
 * Получить моковые категории для фильтрации
 */
function getMockFilterCategories(): GetCategoriesResponse {
  const filterCategories = getFilterCategories();
  
  return {
    data: filterCategories,
    pagination: {
      page: 1,
      limit: filterCategories.length,
      total: filterCategories.length,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    },
  };
}
