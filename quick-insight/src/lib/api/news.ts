/**
 * API функции для работы с новостями
 */

import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import { 
  GetNewsParams, 
  GetNewsResponse, 
  GetNewsByIdResponse, 
  SearchNewsParams, 
  SearchNewsResponse,
  MarkAsReadParams,
  ToggleBookmarkParams,
  GetNewsStatsResponse,
  PaginatedResponse
} from './types';
import { NewsArticle, NewsArticleSummary } from '@/types/news';
import { mockNews, getAllNews, getNewsById, getNewsBySlug, getNewsByCategory, getNewsByAuthor, getReadNews, getUnreadNews, getBookmarkedNews, getLatestNews, getPopularNews, searchNews } from '@/data/mockNews';

/**
 * Получить список новостей с пагинацией и фильтрацией
 */
export async function getNews(params: GetNewsParams = {}): Promise<GetNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockNews(params);
    }

    const response = await apiClient.get<GetNewsResponse>(API_ENDPOINTS.NEWS.LIST, params);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    throw error;
  }
}

/**
 * Получить новость по ID
 */
export async function getNewsById(id: string): Promise<GetNewsByIdResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      const news = getNewsById(id);
      if (!news) {
        throw new Error(`Новость с ID ${id} не найдена`);
      }
      return news;
    }

    const response = await apiClient.get<GetNewsByIdResponse>(API_ENDPOINTS.NEWS.BY_ID(id));
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении новости ${id}:`, error);
    throw error;
  }
}

/**
 * Получить новость по slug
 */
export async function getNewsBySlug(slug: string): Promise<GetNewsByIdResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      const news = getNewsBySlug(slug);
      if (!news) {
        throw new Error(`Новость со slug ${slug} не найдена`);
      }
      return news;
    }

    const response = await apiClient.get<GetNewsByIdResponse>(API_ENDPOINTS.NEWS.BY_SLUG(slug));
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении новости ${slug}:`, error);
    throw error;
  }
}

/**
 * Получить новости по категории
 */
export async function getNewsByCategory(categoryId: string, params: GetNewsParams = {}): Promise<GetNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockNewsByCategory(categoryId, params);
    }

    const response = await apiClient.get<GetNewsResponse>(
      API_ENDPOINTS.NEWS.BY_CATEGORY(categoryId), 
      params
    );
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении новостей категории ${categoryId}:`, error);
    throw error;
  }
}

/**
 * Получить новости по автору
 */
export async function getNewsByAuthor(authorId: string, params: GetNewsParams = {}): Promise<GetNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockNewsByAuthor(authorId, params);
    }

    const response = await apiClient.get<GetNewsResponse>(
      API_ENDPOINTS.NEWS.BY_AUTHOR(authorId), 
      params
    );
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении новостей автора ${authorId}:`, error);
    throw error;
  }
}

/**
 * Поиск новостей
 */
export async function searchNews(query: string, params: SearchNewsParams = {}): Promise<SearchNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockSearchNews(query, params);
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
 * Получить популярные новости
 */
export async function getPopularNews(params: GetNewsParams = {}): Promise<GetNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockPopularNews(params);
    }

    const response = await apiClient.get<GetNewsResponse>(API_ENDPOINTS.NEWS.POPULAR, params);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении популярных новостей:', error);
    throw error;
  }
}

/**
 * Получить последние новости
 */
export async function getLatestNews(params: GetNewsParams = {}): Promise<GetNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockLatestNews(params);
    }

    const response = await apiClient.get<GetNewsResponse>(API_ENDPOINTS.NEWS.LATEST, params);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении последних новостей:', error);
    throw error;
  }
}

/**
 * Получить прочитанные новости
 */
export async function getReadNews(params: GetNewsParams = {}): Promise<GetNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockReadNews(params);
    }

    const response = await apiClient.get<GetNewsResponse>(API_ENDPOINTS.NEWS.READ, params);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении прочитанных новостей:', error);
    throw error;
  }
}

/**
 * Получить непрочитанные новости
 */
export async function getUnreadNews(params: GetNewsParams = {}): Promise<GetNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockUnreadNews(params);
    }

    const response = await apiClient.get<GetNewsResponse>(API_ENDPOINTS.NEWS.UNREAD, params);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении непрочитанных новостей:', error);
    throw error;
  }
}

/**
 * Получить новости в избранном
 */
export async function getBookmarkedNews(params: GetNewsParams = {}): Promise<GetNewsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockBookmarkedNews(params);
    }

    const response = await apiClient.get<GetNewsResponse>(API_ENDPOINTS.NEWS.BOOKMARKED, params);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении новостей в избранном:', error);
    throw error;
  }
}

/**
 * Отметить новость как прочитанную
 */
export async function markNewsAsRead(id: string, params: MarkAsReadParams = {}): Promise<void> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      // В реальном приложении здесь будет обновление состояния
      console.log(`Отмечаем новость ${id} как прочитанную`);
      return;
    }

    await apiClient.post(API_ENDPOINTS.NEWS.MARK_AS_READ(id), params);
  } catch (error) {
    console.error(`Ошибка при отметке новости ${id} как прочитанной:`, error);
    throw error;
  }
}

/**
 * Добавить/удалить новость из избранного
 */
export async function toggleNewsBookmark(id: string, params: ToggleBookmarkParams): Promise<void> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      // В реальном приложении здесь будет обновление состояния
      console.log(`Переключаем избранное для новости ${id}:`, params.bookmarked);
      return;
    }

    await apiClient.post(API_ENDPOINTS.NEWS.TOGGLE_BOOKMARK(id), params);
  } catch (error) {
    console.error(`Ошибка при переключении избранного для новости ${id}:`, error);
    throw error;
  }
}

/**
 * Получить статистику новостей
 */
export async function getNewsStats(): Promise<GetNewsStatsResponse> {
  try {
    // Если используем моковые данные
    if (apiClient.getConfig().useMockData) {
      return getMockNewsStats();
    }

    const response = await apiClient.get<GetNewsStatsResponse>(API_ENDPOINTS.NEWS.STATS);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении статистики новостей:', error);
    throw error;
  }
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ МОКОВЫХ ДАННЫХ =====

/**
 * Получить моковые новости с пагинацией
 */
function getMockNews(params: GetNewsParams): GetNewsResponse {
  const { page = 1, limit = 20, category, author, tags, isRead, isBookmarked, sortBy = 'publishedAt', sortOrder = 'desc' } = params;
  
  let filteredNews = [...mockNews];

  // Фильтрация по категории
  if (category && category !== 'all') {
    filteredNews = filteredNews.filter(article => article.category.id === category);
  }

  // Фильтрация по автору
  if (author) {
    filteredNews = filteredNews.filter(article => article.author.id === author);
  }

  // Фильтрация по тегам
  if (tags && tags.length > 0) {
    filteredNews = filteredNews.filter(article => 
      tags.some(tagId => article.tags.some(tag => tag.id === tagId))
    );
  }

  // Фильтрация по статусу прочтения
  if (isRead !== undefined) {
    filteredNews = filteredNews.filter(article => article.isRead === isRead);
  }

  // Фильтрация по избранному
  if (isBookmarked !== undefined) {
    filteredNews = filteredNews.filter(article => article.isBookmarked === isBookmarked);
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
 * Получить моковые новости по категории
 */
function getMockNewsByCategory(categoryId: string, params: GetNewsParams): GetNewsResponse {
  const categoryNews = getNewsByCategory(categoryId);
  const mockNewsWithCategory = mockNews.filter(article => 
    categoryId === 'all' || article.category.id === categoryId
  );
  
  // Временно заменяем данные для демонстрации
  const originalMockNews = [...mockNews];
  mockNews.length = 0;
  mockNews.push(...mockNewsWithCategory);
  
  const result = getMockNews(params);
  
  // Восстанавливаем оригинальные данные
  mockNews.length = 0;
  mockNews.push(...originalMockNews);
  
  return result;
}

/**
 * Получить моковые новости по автору
 */
function getMockNewsByAuthor(authorId: string, params: GetNewsParams): GetNewsResponse {
  const authorNews = getNewsByAuthor(authorId);
  const mockNewsWithAuthor = mockNews.filter(article => article.author.id === authorId);
  
  // Временно заменяем данные для демонстрации
  const originalMockNews = [...mockNews];
  mockNews.length = 0;
  mockNews.push(...mockNewsWithAuthor);
  
  const result = getMockNews(params);
  
  // Восстанавливаем оригинальные данные
  mockNews.length = 0;
  mockNews.push(...originalMockNews);
  
  return result;
}

/**
 * Получить моковые результаты поиска
 */
function getMockSearchNews(query: string, params: SearchNewsParams): SearchNewsResponse {
  const searchResults = searchNews(query);
  const mockNewsWithSearch = searchResults;
  
  // Временно заменяем данные для демонстрации
  const originalMockNews = [...mockNews];
  mockNews.length = 0;
  mockNews.push(...mockNewsWithSearch);
  
  const result = getMockNews(params);
  
  // Восстанавливаем оригинальные данные
  mockNews.length = 0;
  mockNews.push(...originalMockNews);
  
  return result;
}

/**
 * Получить моковые популярные новости
 */
function getMockPopularNews(params: GetNewsParams): GetNewsResponse {
  const popularNews = getPopularNews(params.limit || 20);
  const mockNewsWithPopular = popularNews;
  
  // Временно заменяем данные для демонстрации
  const originalMockNews = [...mockNews];
  mockNews.length = 0;
  mockNews.push(...mockNewsWithPopular);
  
  const result = getMockNews(params);
  
  // Восстанавливаем оригинальные данные
  mockNews.length = 0;
  mockNews.push(...originalMockNews);
  
  return result;
}

/**
 * Получить моковые последние новости
 */
function getMockLatestNews(params: GetNewsParams): GetNewsResponse {
  const latestNews = getLatestNews(params.limit || 20);
  const mockNewsWithLatest = latestNews;
  
  // Временно заменяем данные для демонстрации
  const originalMockNews = [...mockNews];
  mockNews.length = 0;
  mockNews.push(...mockNewsWithLatest);
  
  const result = getMockNews(params);
  
  // Восстанавливаем оригинальные данные
  mockNews.length = 0;
  mockNews.push(...originalMockNews);
  
  return result;
}

/**
 * Получить моковые прочитанные новости
 */
function getMockReadNews(params: GetNewsParams): GetNewsResponse {
  const readNews = getReadNews();
  const mockNewsWithRead = readNews;
  
  // Временно заменяем данные для демонстрации
  const originalMockNews = [...mockNews];
  mockNews.length = 0;
  mockNews.push(...mockNewsWithRead);
  
  const result = getMockNews(params);
  
  // Восстанавливаем оригинальные данные
  mockNews.length = 0;
  mockNews.push(...originalMockNews);
  
  return result;
}

/**
 * Получить моковые непрочитанные новости
 */
function getMockUnreadNews(params: GetNewsParams): GetNewsResponse {
  const unreadNews = getUnreadNews();
  const mockNewsWithUnread = unreadNews;
  
  // Временно заменяем данные для демонстрации
  const originalMockNews = [...mockNews];
  mockNews.length = 0;
  mockNews.push(...mockNewsWithUnread);
  
  const result = getMockNews(params);
  
  // Восстанавливаем оригинальные данные
  mockNews.length = 0;
  mockNews.push(...originalMockNews);
  
  return result;
}

/**
 * Получить моковые новости в избранном
 */
function getMockBookmarkedNews(params: GetNewsParams): GetNewsResponse {
  const bookmarkedNews = getBookmarkedNews();
  const mockNewsWithBookmarked = bookmarkedNews;
  
  // Временно заменяем данные для демонстрации
  const originalMockNews = [...mockNews];
  mockNews.length = 0;
  mockNews.push(...mockNewsWithBookmarked);
  
  const result = getMockNews(params);
  
  // Восстанавливаем оригинальные данные
  mockNews.length = 0;
  mockNews.push(...originalMockNews);
  
  return result;
}

/**
 * Получить моковую статистику новостей
 */
function getMockNewsStats(): GetNewsStatsResponse {
  const totalArticles = mockNews.length;
  const totalViews = mockNews.reduce((sum, article) => sum + (article.views || 0), 0);
  const totalLikes = mockNews.reduce((sum, article) => sum + (article.likes || 0), 0);
  const totalComments = mockNews.reduce((sum, article) => sum + (article.comments || 0), 0);
  const averageReadTime = mockNews.reduce((sum, article) => sum + article.readTime, 0) / totalArticles;

  // Находим самую популярную категорию
  const categoryCounts = mockNews.reduce((acc, article) => {
    acc[article.category.id] = (acc[article.category.id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularCategoryId = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0];

  const mostPopularCategory = mockNews.find(article => 
    article.category.id === mostPopularCategoryId
  )?.category || mockNews[0].category;

  // Находим самого активного автора
  const authorCounts = mockNews.reduce((acc, article) => {
    acc[article.author.id] = (acc[article.author.id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostActiveAuthorId = Object.entries(authorCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0];

  const mostActiveAuthor = mockNews.find(article => 
    article.author.id === mostActiveAuthorId
  )?.author || mockNews[0].author;

  return {
    totalArticles,
    totalViews,
    totalLikes,
    totalComments,
    averageReadTime,
    mostPopularCategory,
    mostActiveAuthor,
  };
}
