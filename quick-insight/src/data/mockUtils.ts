import { NewsArticle, NewsFilters } from '@/types/news';
import { mockNews } from './mockNews';

/**
 * Утилиты для работы с моковыми данными
 */

/**
 * Фильтрация новостей по различным критериям
 */
export const filterNews = (filters: NewsFilters): NewsArticle[] => {
  let filteredNews = [...mockNews];

  // Фильтр по категории
  if (filters.category && filters.category !== 'all') {
    filteredNews = filteredNews.filter(article => article.category.id === filters.category);
  }

  // Фильтр по автору
  if (filters.author) {
    filteredNews = filteredNews.filter(article => article.author.id === filters.author);
  }

  // Фильтр по тегам
  if (filters.tags && filters.tags.length > 0) {
    filteredNews = filteredNews.filter(article => 
      article.tags.some(tag => filters.tags!.includes(tag.id))
    );
  }

  // Фильтр по дате (от)
  if (filters.dateFrom) {
    filteredNews = filteredNews.filter(article => 
      article.publishedAt >= filters.dateFrom!
    );
  }

  // Фильтр по дате (до)
  if (filters.dateTo) {
    filteredNews = filteredNews.filter(article => 
      article.publishedAt <= filters.dateTo!
    );
  }

  // Фильтр по поисковому запросу
  if (filters.search) {
    const searchQuery = filters.search.toLowerCase();
    filteredNews = filteredNews.filter(article => 
      article.title.toLowerCase().includes(searchQuery) ||
      article.excerpt.toLowerCase().includes(searchQuery) ||
      article.content.toLowerCase().includes(searchQuery) ||
      article.author.name.toLowerCase().includes(searchQuery)
    );
  }

  // Фильтр по статусу прочтения
  if (filters.isRead !== undefined) {
    filteredNews = filteredNews.filter(article => article.isRead === filters.isRead);
  }

  // Фильтр по избранному
  if (filters.isBookmarked !== undefined) {
    filteredNews = filteredNews.filter(article => article.isBookmarked === filters.isBookmarked);
  }

  // Сортировка
  if (filters.sortBy) {
    filteredNews.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (filters.sortBy) {
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
          return 0;
      }

      if (filters.sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }

  return filteredNews;
};

/**
 * Пагинация новостей
 */
export const paginateNews = (
  news: NewsArticle[], 
  page: number = 1, 
  limit: number = 10
): {
  data: NewsArticle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
} => {
  const total = news.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  
  const data = news.slice(offset, offset + limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
};

/**
 * Получить статистику новостей
 */
export const getNewsStats = () => {
  const totalArticles = mockNews.length;
  const totalViews = mockNews.reduce((sum, article) => sum + (article.views || 0), 0);
  const totalLikes = mockNews.reduce((sum, article) => sum + (article.likes || 0), 0);
  const totalComments = mockNews.reduce((sum, article) => sum + (article.comments || 0), 0);
  const averageReadTime = mockNews.reduce((sum, article) => sum + article.readTime, 0) / totalArticles;

  // Самая популярная категория
  const categoryStats = mockNews.reduce((acc, article) => {
    const categoryId = article.category.id;
    acc[categoryId] = (acc[categoryId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularCategoryId = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)[0]?.[0];

  const mostPopularCategory = mockNews.find(article => 
    article.category.id === mostPopularCategoryId
  )?.category;

  // Самый активный автор
  const authorStats = mockNews.reduce((acc, article) => {
    const authorId = article.author.id;
    acc[authorId] = (acc[authorId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostActiveAuthorId = Object.entries(authorStats)
    .sort(([,a], [,b]) => b - a)[0]?.[0];

  const mostActiveAuthor = mockNews.find(article => 
    article.author.id === mostActiveAuthorId
  )?.author;

  return {
    totalArticles,
    totalViews,
    totalLikes,
    totalComments,
    averageReadTime: Math.round(averageReadTime * 10) / 10,
    mostPopularCategory,
    mostActiveAuthor
  };
};

/**
 * Получить рекомендуемые новости (на основе категории и тегов)
 */
export const getRecommendedNews = (currentArticleId: string, limit: number = 5): NewsArticle[] => {
  const currentArticle = mockNews.find(article => article.id === currentArticleId);
  if (!currentArticle) return [];

  // Исключаем текущую статью
  const otherNews = mockNews.filter(article => article.id !== currentArticleId);

  // Сортируем по релевантности
  const scoredNews = otherNews.map(article => {
    let score = 0;

    // Бонус за ту же категорию
    if (article.category.id === currentArticle.category.id) {
      score += 3;
    }

    // Бонус за общие теги
    const commonTags = article.tags.filter(tag => 
      currentArticle.tags.some(currentTag => currentTag.id === tag.id)
    );
    score += commonTags.length * 2;

    // Бонус за популярность (просмотры)
    score += Math.log((article.views || 0) + 1) * 0.5;

    // Бонус за свежесть
    const daysDiff = (Date.now() - article.publishedAt.getTime()) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 7 - daysDiff) * 0.3;

    return { article, score };
  });

  // Сортируем по score и возвращаем топ
  return scoredNews
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
};

/**
 * Получить трендовые теги
 */
export const getTrendingTags = (limit: number = 10) => {
  const tagStats = mockNews.reduce((acc, article) => {
    article.tags.forEach(tag => {
      acc[tag.id] = (acc[tag.id] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(tagStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([tagId, count]) => ({
      tagId,
      count
    }));
};

/**
 * Симуляция задержки API
 */
export const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
