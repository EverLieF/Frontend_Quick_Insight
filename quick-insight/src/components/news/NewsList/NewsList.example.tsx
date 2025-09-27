'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NewsList } from './NewsList';
import { NewsArticle } from '@/types/news';

/**
 * Пример использования компонента NewsList
 */
export const NewsListExample: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const handleArticleClick = (article: NewsArticle) => {
    console.log('Article clicked:', article);
    setSelectedArticle(article);
  };

  const handleBookmark = (article: NewsArticle) => {
    console.log('Article bookmarked:', article);
  };

  const handleLike = (article: NewsArticle) => {
    console.log('Article liked:', article);
  };

  const handleMarkAsRead = (article: NewsArticle) => {
    console.log('Article marked as read:', article);
  };

  const handleRefresh = () => {
    console.log('Refreshing articles...');
  };

  const handleError = (error: Error) => {
    console.error('NewsList error:', error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            NewsList Component
          </h1>
          <p className="text-white/70">
            Пример использования компонента списка новостей
          </p>
        </motion.div>

        {/* NewsList Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <NewsList
            cardVariant="default"
            showStats={true}
            showAuthor={true}
            showCategory={true}
            showTags={true}
            showReadStatus={true}
            showBookmarkButton={true}
            showLikeButton={false}
            itemsPerPage={6}
            enableInfiniteScroll={true}
            enablePullToRefresh={true}
            onArticleClick={handleArticleClick}
            onBookmark={handleBookmark}
            onLike={handleLike}
            onMarkAsRead={handleMarkAsRead}
            onRefresh={handleRefresh}
            onError={handleError}
          />
        </motion.div>

        {/* Selected Article Info */}
        {selectedArticle && (
          <motion.div
            className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              Выбранная статья:
            </h3>
            <p className="text-white/80">
              {selectedArticle.title}
            </p>
            <p className="text-white/60 text-sm mt-2">
              Автор: {selectedArticle.author.name} | 
              Категория: {selectedArticle.category.name} | 
              Время чтения: {selectedArticle.readTime} мин
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/**
 * Пример с компактными карточками
 */
export const NewsListCompactExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Компактный NewsList
          </h1>
          <p className="text-white/70">
            Пример с компактными карточками новостей
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <NewsList
            cardVariant="compact"
            showStats={false}
            showAuthor={false}
            showCategory={true}
            showTags={false}
            showReadStatus={true}
            showBookmarkButton={true}
            showLikeButton={false}
            itemsPerPage={10}
            enableInfiniteScroll={true}
            enablePullToRefresh={false}
          />
        </motion.div>
      </div>
    </div>
  );
};

/**
 * Пример с расширенными карточками
 */
export const NewsListFeaturedExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Расширенный NewsList
          </h1>
          <p className="text-white/70">
            Пример с расширенными карточками новостей
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <NewsList
            cardVariant="featured"
            showStats={true}
            showAuthor={true}
            showCategory={true}
            showTags={true}
            showReadStatus={true}
            showBookmarkButton={true}
            showLikeButton={true}
            itemsPerPage={4}
            enableInfiniteScroll={true}
            enablePullToRefresh={true}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default NewsListExample;
