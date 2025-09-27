'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsArticle } from '@/types/news';
import { NewsCard } from './NewsCard';
import { NewsCardSkeleton } from './NewsCard/NewsCardSkeleton';
import { cn } from '@/lib/utils/cn';

export interface SimpleNewsListProps {
  /** Статьи для отображения */
  articles: NewsArticle[];
  /** Состояние загрузки */
  loading?: boolean;
  /** Класс для стилизации контейнера */
  className?: string;
  /** Вариант отображения карточек */
  cardVariant?: 'default' | 'compact' | 'featured';
  /** Показывать ли статистику на карточках */
  showStats?: boolean;
  /** Показывать ли автора на карточках */
  showAuthor?: boolean;
  /** Показывать ли категорию на карточках */
  showCategory?: boolean;
  /** Показывать ли теги на карточках */
  showTags?: boolean;
  /** Показывать ли статус прочтения */
  showReadStatus?: boolean;
  /** Показывать ли кнопку закладки */
  showBookmarkButton?: boolean;
  /** Показывать ли кнопку лайка */
  showLikeButton?: boolean;
  /** Обработчик клика по карточке */
  onArticleClick?: (article: NewsArticle) => void;
  /** Обработчик добавления в закладки */
  onBookmark?: (article: NewsArticle) => void;
  /** Обработчик лайка */
  onLike?: (article: NewsArticle) => void;
  /** Обработчик отметки как прочитанной */
  onMarkAsRead?: (article: NewsArticle) => void;
}

export const SimpleNewsList: React.FC<SimpleNewsListProps> = ({
  articles,
  loading = false,
  className,
  cardVariant = 'default',
  showStats = true,
  showAuthor = true,
  showCategory = true,
  showTags = true,
  showReadStatus = true,
  showBookmarkButton = true,
  showLikeButton = false,
  onArticleClick,
  onBookmark,
  onLike,
  onMarkAsRead,
}) => {
  // Если загружается, показываем скелетоны
  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={`skeleton-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <NewsCardSkeleton variant={cardVariant} />
          </motion.div>
        ))}
      </div>
    );
  }

  // Если нет статей, показываем пустое состояние
  if (!articles || articles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn('text-center py-12', className)}
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
          <span className="text-2xl">📰</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Нет новостей</h3>
        <p className="text-white/60">Попробуйте изменить фильтры или обновить страницу</p>
      </motion.div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <AnimatePresence>
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <NewsCard
              article={article}
              variant={cardVariant}
              showStats={showStats}
              showAuthor={showAuthor}
              showCategory={showCategory}
              showTags={showTags}
              showReadStatus={showReadStatus}
              showBookmarkButton={showBookmarkButton}
              showLikeButton={showLikeButton}
              onClick={onArticleClick}
              onBookmark={onBookmark}
              onLike={onLike}
              onRead={onMarkAsRead}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
