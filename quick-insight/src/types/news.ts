/**
 * Типы для новостей, категорий и авторов
 */

// Тип для автора новости
export interface NewsAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

// Тип для категории новостей
export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  description?: string;
  isActive: boolean;
}

// Тип для тегов новостей
export interface NewsTag {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

// Основной тип для статьи новости
export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: NewsAuthor;
  category: NewsCategory;
  tags: NewsTag[];
  publishedAt: Date;
  readTime: number; // в минутах
  imageUrl?: string;
  isRead: boolean;
  isBookmarked: boolean;
  views?: number;
  likes?: number;
  comments?: number;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  status: 'draft' | 'published' | 'archived';
  updatedAt: Date;
  createdAt: Date;
}

// Тип для краткой информации о статье (для списков)
export interface NewsArticleSummary {
  id: string;
  title: string;
  excerpt: string;
  author: Pick<NewsAuthor, 'id' | 'name' | 'avatar'>;
  category: Pick<NewsCategory, 'id' | 'name' | 'color' | 'icon'>;
  tags: Pick<NewsTag, 'id' | 'name' | 'color'>[];
  publishedAt: Date;
  readTime: number;
  imageUrl?: string;
  isRead: boolean;
  isBookmarked: boolean;
  views?: number;
  likes?: number;
  slug: string;
}

// Тип для фильтров новостей
export interface NewsFilters {
  category?: string;
  author?: string;
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
  isRead?: boolean;
  isBookmarked?: boolean;
  sortBy?: 'publishedAt' | 'views' | 'likes' | 'readTime';
  sortOrder?: 'asc' | 'desc';
}

// Тип для статистики новостей
export interface NewsStats {
  totalArticles: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  averageReadTime: number;
  mostPopularCategory: NewsCategory;
  mostActiveAuthor: NewsAuthor;
}
