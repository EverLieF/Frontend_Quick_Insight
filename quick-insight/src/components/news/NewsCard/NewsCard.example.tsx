'use client';

import React, { useState } from 'react';
import { NewsCard, NewsCardSkeleton } from './index';
import { mockNews } from '@/data/mockNews';
import { NewsArticle } from '@/types/news';

/**
 * Пример использования NewsCard компонента
 */
export const NewsCardExample: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // Получаем несколько статей для демонстрации
  const featuredArticle = mockNews[0]; // Первая статья как featured
  const regularArticles = mockNews.slice(1, 4); // Следующие 3 статьи
  const compactArticles = mockNews.slice(4, 7); // Еще 3 статьи для compact варианта

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    console.log('Article clicked:', article.title);
  };

  const handleBookmark = (article: NewsArticle) => {
    const newBookmarked = new Set(bookmarkedArticles);
    if (newBookmarked.has(article.id)) {
      newBookmarked.delete(article.id);
    } else {
      newBookmarked.add(article.id);
    }
    setBookmarkedArticles(newBookmarked);
    console.log('Bookmark toggled:', article.title);
  };

  const handleLike = (article: NewsArticle) => {
    const newLiked = new Set(likedArticles);
    if (newLiked.has(article.id)) {
      newLiked.delete(article.id);
    } else {
      newLiked.add(article.id);
    }
    setLikedArticles(newLiked);
    console.log('Like toggled:', article.title);
  };

  const handleRead = (article: NewsArticle) => {
    console.log('Article marked as read:', article.title);
  };

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-main to-background-secondary p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">NewsCard Component Examples</h1>
          <p className="text-white/70">
            Демонстрация различных вариантов и состояний NewsCard компонента
          </p>
          <button
            onClick={toggleLoading}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            {isLoading ? 'Показать контент' : 'Показать загрузку'}
          </button>
        </div>

        {/* Featured Article */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Featured Article</h2>
          {isLoading ? (
            <NewsCardSkeleton variant="featured" />
          ) : (
            <NewsCard
              article={featuredArticle}
              variant="featured"
              onRead={handleRead}
              onBookmark={handleBookmark}
              onLike={handleLike}
              onClick={handleArticleClick}
              showLikeButton={true}
            />
          )}
        </section>

        {/* Regular Articles Grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Regular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <NewsCardSkeleton key={index} variant="default" />
              ))
            ) : (
              regularArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  variant="default"
                  onRead={handleRead}
                  onBookmark={handleBookmark}
                  onLike={handleLike}
                  onClick={handleArticleClick}
                  showLikeButton={true}
                />
              ))
            )}
          </div>
        </section>

        {/* Compact Articles */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Compact Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <NewsCardSkeleton key={index} variant="compact" />
              ))
            ) : (
              compactArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  variant="compact"
                  onRead={handleRead}
                  onBookmark={handleBookmark}
                  onClick={handleArticleClick}
                />
              ))
            )}
          </div>
        </section>

        {/* Different States */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Different States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Read Article */}
            <NewsCard
              article={{ ...mockNews[0], isRead: true }}
              variant="default"
              onRead={handleRead}
              onBookmark={handleBookmark}
              onClick={handleArticleClick}
            />
            
            {/* Bookmarked Article */}
            <NewsCard
              article={{ ...mockNews[1], isBookmarked: true }}
              variant="default"
              onRead={handleRead}
              onBookmark={handleBookmark}
              onClick={handleArticleClick}
            />
          </div>
        </section>

        {/* Minimal Variants */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Minimal Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NewsCard
              article={mockNews[2]}
              variant="default"
              showStats={false}
              showAuthor={false}
              showTags={false}
              onRead={handleRead}
              onClick={handleArticleClick}
            />
            
            <NewsCard
              article={mockNews[3]}
              variant="default"
              showBookmarkButton={false}
              showLikeButton={false}
              onRead={handleRead}
              onClick={handleArticleClick}
            />
          </div>
        </section>

        {/* Selected Article Info */}
        {selectedArticle && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Selected Article</h2>
            <div className="p-6 glass-effect rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">
                {selectedArticle.title}
              </h3>
              <p className="text-white/70 mb-4">{selectedArticle.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-white/50">
                <span>Автор: {selectedArticle.author.name}</span>
                <span>Категория: {selectedArticle.category.name}</span>
                <span>Время чтения: {selectedArticle.readTime} мин</span>
                <span>Просмотры: {selectedArticle.views?.toLocaleString()}</span>
              </div>
            </div>
          </section>
        )}

        {/* Stats */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 glass-effect rounded-xl border border-white/10 text-center">
              <div className="text-2xl font-bold text-primary">{bookmarkedArticles.size}</div>
              <div className="text-sm text-white/70">В избранном</div>
            </div>
            <div className="p-4 glass-effect rounded-xl border border-white/10 text-center">
              <div className="text-2xl font-bold text-primary">{likedArticles.size}</div>
              <div className="text-sm text-white/70">Понравилось</div>
            </div>
            <div className="p-4 glass-effect rounded-xl border border-white/10 text-center">
              <div className="text-2xl font-bold text-primary">{mockNews.length}</div>
              <div className="text-sm text-white/70">Всего статей</div>
            </div>
            <div className="p-4 glass-effect rounded-xl border border-white/10 text-center">
              <div className="text-2xl font-bold text-primary">
                {mockNews.filter(article => article.isRead).length}
              </div>
              <div className="text-sm text-white/70">Прочитано</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsCardExample;
