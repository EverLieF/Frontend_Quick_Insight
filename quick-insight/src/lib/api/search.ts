/**
 * API функции для поиска
 */

import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import { 
  SearchNewsParams, 
  SearchNewsResponse,
  GetNewsParams,
  GetNewsResponse
} from './types';
import { NewsArticle, NewsArticleSummary } from '@/types/news';
import { mockNews, searchNews } from '@/data/mockNews';
import { mockCategories } from '@/data/mockCategories';

/**
 * Поиск новостей по тексту
 */
export async function searchNewsByText(query: string, params: SearchNewsParams = {}): Promise<SearchNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockSearchResults(query, params);
    }

    const searchParams = { ...params, q: query };
    const response = await apiClient.get<SearchNewsResponse>(
      API_ENDPOINTS.NEWS.SEARCH, 
      searchParams
    );
    return response.data;
  } catch (error) {
    console.error(`Ошибка при поиске новостей "${query}":`, error);
    throw error;
  }
}

/**
 * Поиск новостей по категории
 */
export async function searchNewsByCategory(categoryId: string, params: GetNewsParams = {}): Promise<GetNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockSearchByCategory(categoryId, params);
    }

    const response = await apiClient.get<GetNewsResponse>(
      API_ENDPOINTS.NEWS.BY_CATEGORY(categoryId), 
      params
    );
    return response.data;
  } catch (error) {
    console.error(`Ошибка при поиске новостей по категории ${categoryId}:`, error);
    throw error;
  }
}

/**
 * Поиск новостей по тегам
 */
export async function searchNewsByTags(tagIds: string[], params: GetNewsParams = {}): Promise<GetNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockSearchByTags(tagIds, params);
    }

    const searchParams = { ...params, tags: tagIds };
    const response = await apiClient.get<GetNewsResponse>(
      API_ENDPOINTS.NEWS.SEARCH, 
      searchParams
    );
    return response.data;
  } catch (error) {
    console.error(`Ошибка при поиске новостей по тегам ${tagIds.join(', ')}:`, error);
    throw error;
  }
}

/**
 * Поиск новостей по автору
 */
export async function searchNewsByAuthor(authorId: string, params: GetNewsParams = {}): Promise<GetNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockSearchByAuthor(authorId, params);
    }

    const response = await apiClient.get<GetNewsResponse>(
      API_ENDPOINTS.NEWS.BY_AUTHOR(authorId), 
      params
    );
    return response.data;
  } catch (error) {
    console.error(`Ошибка при поиске новостей по автору ${authorId}:`, error);
    throw error;
  }
}

/**
 * Поиск новостей по дате
 */
export async function searchNewsByDate(
  dateFrom: string, 
  dateTo: string, 
  params: GetNewsParams = {}
): Promise<GetNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockSearchByDate(dateFrom, dateTo, params);
    }

    const searchParams = { ...params, dateFrom, dateTo };
    const response = await apiClient.get<GetNewsResponse>(
      API_ENDPOINTS.NEWS.SEARCH, 
      searchParams
    );
    return response.data;
  } catch (error) {
    console.error(`Ошибка при поиске новостей по дате ${dateFrom} - ${dateTo}:`, error);
    throw error;
  }
}

/**
 * Комплексный поиск новостей
 */
export async function searchNewsAdvanced(params: SearchNewsParams): Promise<SearchNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockAdvancedSearch(params);
    }

    const response = await apiClient.get<SearchNewsResponse>(
      API_ENDPOINTS.NEWS.SEARCH, 
      params
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при комплексном поиске новостей:', error);
    throw error;
  }
}

/**
 * Получить предложения для автодополнения поиска
 */
export async function getSearchSuggestions(query: string, limit: number = 10): Promise<string[]> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockSearchSuggestions(query, limit);
    }

    const response = await apiClient.get<string[]>(
      `${API_ENDPOINTS.NEWS.SEARCH}/suggestions`, 
      { q: query, limit }
    );
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении предложений поиска для "${query}":`, error);
    throw error;
  }
}

/**
 * Получить популярные поисковые запросы
 */
export async function getPopularSearchQueries(limit: number = 10): Promise<string[]> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockPopularSearchQueries(limit);
    }

    const response = await apiClient.get<string[]>(
      `${API_ENDPOINTS.NEWS.SEARCH}/popular`, 
      { limit }
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении популярных поисковых запросов:', error);
    throw error;
  }
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ МОКОВЫХ ДАННЫХ =====

/**
 * Получить моковые результаты поиска
 */
function getMockSearchResults(query: string, params: SearchNewsParams): SearchNewsResponse {
  const { page = 1, limit = 20, sortBy = 'publishedAt', sortOrder = 'desc' } = params;
  
  // Выполняем поиск по моковым данным
  const searchResults = searchNews(query);
  
  // Применяем дополнительные фильтры
  let filteredResults = [...searchResults];

  // Фильтрация по категории
  if (params.category && params.category !== 'all') {
    filteredResults = filteredResults.filter(article => article.category.id === params.category);
  }

  // Фильтрация по автору
  if (params.author) {
    filteredResults = filteredResults.filter(article => article.author.id === params.author);
  }

  // Фильтрация по тегам
  if (params.tags && params.tags.length > 0) {
    filteredResults = filteredResults.filter(article => 
      params.tags!.some(tagId => article.tags.some(tag => tag.id === tagId))
    );
  }

  // Фильтрация по дате
  if (params.dateFrom) {
    const dateFrom = new Date(params.dateFrom);
    filteredResults = filteredResults.filter(article => article.publishedAt >= dateFrom);
  }

  if (params.dateTo) {
    const dateTo = new Date(params.dateTo);
    filteredResults = filteredResults.filter(article => article.publishedAt <= dateTo);
  }

  // Сортировка
  filteredResults.sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
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

    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  // Пагинация
  const offset = (page - 1) * limit;
  const paginatedResults = filteredResults.slice(offset, offset + limit);

  // Преобразуем в NewsArticleSummary
  const newsSummaries: NewsArticleSummary[] = paginatedResults.map(article => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    author: {
      id: article.author.id,
      name: article.author.name,
      avatar: article.author.avatar,
    },
    category: {
      id: article.category.id,
      name: article.category.name,
      color: article.category.color,
      icon: article.category.icon,
    },
    tags: article.tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    })),
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    imageUrl: article.imageUrl,
    isRead: article.isRead,
    isBookmarked: article.isBookmarked,
    views: article.views,
    likes: article.likes,
    slug: article.slug,
  }));

  return {
    data: newsSummaries,
    pagination: {
      page,
      limit,
      total: filteredResults.length,
      totalPages: Math.ceil(filteredResults.length / limit),
      hasNext: offset + limit < filteredResults.length,
      hasPrev: page > 1,
    },
  };
}

/**
 * Получить моковые результаты поиска по категории
 */
function getMockSearchByCategory(categoryId: string, params: GetNewsParams): GetNewsResponse {
  const { page = 1, limit = 20, sortBy = 'publishedAt', sortOrder = 'desc' } = params;
  
  let filteredNews = mockNews.filter(article => 
    categoryId === 'all' || article.category.id === categoryId
  );

  // Сортировка
  filteredNews.sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
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

    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  // Пагинация
  const offset = (page - 1) * limit;
  const paginatedNews = filteredNews.slice(offset, offset + limit);

  // Преобразуем в NewsArticleSummary
  const newsSummaries: NewsArticleSummary[] = paginatedNews.map(article => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    author: {
      id: article.author.id,
      name: article.author.name,
      avatar: article.author.avatar,
    },
    category: {
      id: article.category.id,
      name: article.category.name,
      color: article.category.color,
      icon: article.category.icon,
    },
    tags: article.tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    })),
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    imageUrl: article.imageUrl,
    isRead: article.isRead,
    isBookmarked: article.isBookmarked,
    views: article.views,
    likes: article.likes,
    slug: article.slug,
  }));

  return {
    data: newsSummaries,
    pagination: {
      page,
      limit,
      total: filteredNews.length,
      totalPages: Math.ceil(filteredNews.length / limit),
      hasNext: offset + limit < filteredNews.length,
      hasPrev: page > 1,
    },
  };
}

/**
 * Получить моковые результаты поиска по тегам
 */
function getMockSearchByTags(tagIds: string[], params: GetNewsParams): GetNewsResponse {
  const { page = 1, limit = 20, sortBy = 'publishedAt', sortOrder = 'desc' } = params;
  
  let filteredNews = mockNews.filter(article => 
    tagIds.some(tagId => article.tags.some(tag => tag.id === tagId))
  );

  // Сортировка
  filteredNews.sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
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

    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  // Пагинация
  const offset = (page - 1) * limit;
  const paginatedNews = filteredNews.slice(offset, offset + limit);

  // Преобразуем в NewsArticleSummary
  const newsSummaries: NewsArticleSummary[] = paginatedNews.map(article => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    author: {
      id: article.author.id,
      name: article.author.name,
      avatar: article.author.avatar,
    },
    category: {
      id: article.category.id,
      name: article.category.name,
      color: article.category.color,
      icon: article.category.icon,
    },
    tags: article.tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    })),
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    imageUrl: article.imageUrl,
    isRead: article.isRead,
    isBookmarked: article.isBookmarked,
    views: article.views,
    likes: article.likes,
    slug: article.slug,
  }));

  return {
    data: newsSummaries,
    pagination: {
      page,
      limit,
      total: filteredNews.length,
      totalPages: Math.ceil(filteredNews.length / limit),
      hasNext: offset + limit < filteredNews.length,
      hasPrev: page > 1,
    },
  };
}

/**
 * Получить моковые результаты поиска по автору
 */
function getMockSearchByAuthor(authorId: string, params: GetNewsParams): GetNewsResponse {
  const { page = 1, limit = 20, sortBy = 'publishedAt', sortOrder = 'desc' } = params;
  
  let filteredNews = mockNews.filter(article => article.author.id === authorId);

  // Сортировка
  filteredNews.sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
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

    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  // Пагинация
  const offset = (page - 1) * limit;
  const paginatedNews = filteredNews.slice(offset, offset + limit);

  // Преобразуем в NewsArticleSummary
  const newsSummaries: NewsArticleSummary[] = paginatedNews.map(article => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    author: {
      id: article.author.id,
      name: article.author.name,
      avatar: article.author.avatar,
    },
    category: {
      id: article.category.id,
      name: article.category.name,
      color: article.category.color,
      icon: article.category.icon,
    },
    tags: article.tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    })),
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    imageUrl: article.imageUrl,
    isRead: article.isRead,
    isBookmarked: article.isBookmarked,
    views: article.views,
    likes: article.likes,
    slug: article.slug,
  }));

  return {
    data: newsSummaries,
    pagination: {
      page,
      limit,
      total: filteredNews.length,
      totalPages: Math.ceil(filteredNews.length / limit),
      hasNext: offset + limit < filteredNews.length,
      hasPrev: page > 1,
    },
  };
}

/**
 * Получить моковые результаты поиска по дате
 */
function getMockSearchByDate(dateFrom: string, dateTo: string, params: GetNewsParams): GetNewsResponse {
  const { page = 1, limit = 20, sortBy = 'publishedAt', sortOrder = 'desc' } = params;
  
  const fromDate = new Date(dateFrom);
  const toDate = new Date(dateTo);
  
  let filteredNews = mockNews.filter(article => 
    article.publishedAt >= fromDate && article.publishedAt <= toDate
  );

  // Сортировка
  filteredNews.sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
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

    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  // Пагинация
  const offset = (page - 1) * limit;
  const paginatedNews = filteredNews.slice(offset, offset + limit);

  // Преобразуем в NewsArticleSummary
  const newsSummaries: NewsArticleSummary[] = paginatedNews.map(article => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    author: {
      id: article.author.id,
      name: article.author.name,
      avatar: article.author.avatar,
    },
    category: {
      id: article.category.id,
      name: article.category.name,
      color: article.category.color,
      icon: article.category.icon,
    },
    tags: article.tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    })),
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    imageUrl: article.imageUrl,
    isRead: article.isRead,
    isBookmarked: article.isBookmarked,
    views: article.views,
    likes: article.likes,
    slug: article.slug,
  }));

  return {
    data: newsSummaries,
    pagination: {
      page,
      limit,
      total: filteredNews.length,
      totalPages: Math.ceil(filteredNews.length / limit),
      hasNext: offset + limit < filteredNews.length,
      hasPrev: page > 1,
    },
  };
}

/**
 * Получить моковые результаты комплексного поиска
 */
function getMockAdvancedSearch(params: SearchNewsParams): SearchNewsResponse {
  const { q, page = 1, limit = 20, sortBy = 'publishedAt', sortOrder = 'desc' } = params;
  
  let filteredNews = [...mockNews];

  // Поиск по тексту
  if (q) {
    const query = q.toLowerCase();
    filteredNews = filteredNews.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query)
    );
  }

  // Фильтрация по категории
  if (params.category && params.category !== 'all') {
    filteredNews = filteredNews.filter(article => article.category.id === params.category);
  }

  // Фильтрация по автору
  if (params.author) {
    filteredNews = filteredNews.filter(article => article.author.id === params.author);
  }

  // Фильтрация по тегам
  if (params.tags && params.tags.length > 0) {
    filteredNews = filteredNews.filter(article => 
      params.tags!.some(tagId => article.tags.some(tag => tag.id === tagId))
    );
  }

  // Фильтрация по дате
  if (params.dateFrom) {
    const dateFrom = new Date(params.dateFrom);
    filteredNews = filteredNews.filter(article => article.publishedAt >= dateFrom);
  }

  if (params.dateTo) {
    const dateTo = new Date(params.dateTo);
    filteredNews = filteredNews.filter(article => article.publishedAt <= dateTo);
  }

  // Сортировка
  filteredNews.sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
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

    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  // Пагинация
  const offset = (page - 1) * limit;
  const paginatedNews = filteredNews.slice(offset, offset + limit);

  // Преобразуем в NewsArticleSummary
  const newsSummaries: NewsArticleSummary[] = paginatedNews.map(article => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    author: {
      id: article.author.id,
      name: article.author.name,
      avatar: article.author.avatar,
    },
    category: {
      id: article.category.id,
      name: article.category.name,
      color: article.category.color,
      icon: article.category.icon,
    },
    tags: article.tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    })),
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    imageUrl: article.imageUrl,
    isRead: article.isRead,
    isBookmarked: article.isBookmarked,
    views: article.views,
    likes: article.likes,
    slug: article.slug,
  }));

  return {
    data: newsSummaries,
    pagination: {
      page,
      limit,
      total: filteredNews.length,
      totalPages: Math.ceil(filteredNews.length / limit),
      hasNext: offset + limit < filteredNews.length,
      hasPrev: page > 1,
    },
  };
}

/**
 * Получить моковые предложения для автодополнения
 */
function getMockSearchSuggestions(query: string, limit: number): string[] {
  const suggestions: string[] = [];
  const queryLower = query.toLowerCase();

  // Предложения из заголовков новостей
  mockNews.forEach(article => {
    const words = article.title.toLowerCase().split(' ');
    words.forEach(word => {
      if (word.startsWith(queryLower) && word.length > queryLower.length) {
        if (!suggestions.includes(word)) {
          suggestions.push(word);
        }
      }
    });
  });

  // Предложения из категорий
  mockCategories.forEach(category => {
    if (category.name.toLowerCase().startsWith(queryLower)) {
      if (!suggestions.includes(category.name)) {
        suggestions.push(category.name);
      }
    }
  });

  return suggestions.slice(0, limit);
}

/**
 * Получить моковые популярные поисковые запросы
 */
function getMockPopularSearchQueries(limit: number): string[] {
  return [
    'политика',
    'наука',
    'технологии',
    'экономика',
    'криптовалюты',
    'искусственный интеллект',
    'космос',
    'климат',
    'здоровье',
    'образование'
  ].slice(0, limit);
}
