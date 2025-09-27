'use client';

import React, { useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, AlertCircle, BookOpen } from 'lucide-react';
import { NewsArticle } from '@/types/news';
import { NewsCard } from '../NewsCard';
import { NewsCardSkeleton } from '../NewsCard/NewsCardSkeleton';
import { useNewsStore, useNewsSelectors } from '@/lib/store/newsStore';
import { useFilterStore, useFilterSelectors } from '@/lib/store/filterStore';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { cn } from '@/lib/utils/cn';

export interface NewsListProps {
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
  /** Количество элементов на странице */
  itemsPerPage?: number;
  /** Включить бесконечную прокрутку */
  enableInfiniteScroll?: boolean;
  /** Включить pull-to-refresh */
  enablePullToRefresh?: boolean;
  /** Обработчик клика по карточке */
  onArticleClick?: (article: NewsArticle) => void;
  /** Обработчик добавления в закладки */
  onBookmark?: (article: NewsArticle) => void;
  /** Обработчик лайка */
  onLike?: (article: NewsArticle) => void;
  /** Обработчик отметки как прочитанной */
  onMarkAsRead?: (article: NewsArticle) => void;
  /** Обработчик обновления списка */
  onRefresh?: () => void;
  /** Обработчик ошибки */
  onError?: (error: Error) => void;
}

export const NewsList: React.FC<NewsListProps> = ({
  className,
  cardVariant = 'default',
  showStats = true,
  showAuthor = true,
  showCategory = true,
  showTags = true,
  showReadStatus = true,
  showBookmarkButton = true,
  showLikeButton = false,
  itemsPerPage = 12,
  enableInfiniteScroll = true,
  enablePullToRefresh = true, // eslint-disable-line @typescript-eslint/no-unused-vars
  onArticleClick,
  onBookmark,
  onLike,
  onMarkAsRead,
  onRefresh,
  onError,
}) => {
  // Store hooks
  const {
    currentPageArticles,
    loading,
    errors,
    pagination,
    filters,
  } = useNewsSelectors();

  const {
    loadArticles,
    setPage,
    setItemsPerPage,
    markAsRead,
    toggleBookmark,
    applyFilters,
  } = useNewsStore();

  const {
    activeFilters,
    clearSearch,
  } = useFilterSelectors();

  const {
    setFilters,
  } = useFilterStore();

  // Debounced search
  const debouncedSearchQuery = useDebounce(activeFilters.search || '', 300);

  // Memoized articles for current page
  const displayedArticles = useMemo(() => {
    return currentPageArticles;
  }, [currentPageArticles]);

  // Check if there are more pages to load
  const hasMore = useMemo(() => {
    return pagination.currentPage < pagination.totalPages;
  }, [pagination.currentPage, pagination.totalPages]);

  // Loading state
  const isLoading = loading.articles === 'loading';
  const hasError = errors.articles?.hasError || false;
  const errorMessage = errors.articles?.message || '';

  // Load more function for infinite scroll
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    
    try {
      const nextPage = pagination.currentPage + 1;
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more articles:', error);
      if (onError) {
        onError(error instanceof Error ? error : new Error('Ошибка загрузки статей'));
      }
    }
  }, [hasMore, isLoading, pagination.currentPage, setPage, onError]);

  // Refresh function
  const handleRefresh = useCallback(async () => {
    try {
      await loadArticles();
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error refreshing articles:', error);
      if (onError) {
        onError(error instanceof Error ? error : new Error('Ошибка обновления статей'));
      }
    }
  }, [loadArticles, onRefresh, onError]);

  // Infinite scroll hook
  const {
    sentinelRef,
    isLoading: isLoadingMore,
    error: infiniteScrollError,
    retry: retryInfiniteScroll,
  } = useInfiniteScroll({
    loadMore,
    hasMore,
    isLoading,
    threshold: 200,
    enabled: enableInfiniteScroll,
  });

  // Handle article click
  const handleArticleClick = useCallback((article: NewsArticle) => {
    if (onArticleClick) {
      onArticleClick(article);
    }
    
    // Mark as read if not already read
    if (!article.isRead && onMarkAsRead) {
      onMarkAsRead(article);
    } else if (!article.isRead) {
      markAsRead(article.id);
    }
  }, [onArticleClick, onMarkAsRead, markAsRead]);

  // Handle bookmark
  const handleBookmark = useCallback((article: NewsArticle) => {
    if (onBookmark) {
      onBookmark(article);
    } else {
      toggleBookmark(article.id);
    }
  }, [onBookmark, toggleBookmark]);

  // Handle like
  const handleLike = useCallback((article: NewsArticle) => {
    if (onLike) {
      onLike(article);
    }
  }, [onLike]);

  // Apply search filter when debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery !== (filters.search || '')) {
      setFilters({ search: debouncedSearchQuery || undefined });
    }
  }, [debouncedSearchQuery, filters.search, setFilters]);

  // Set items per page
  useEffect(() => {
    setItemsPerPage(itemsPerPage);
  }, [itemsPerPage, setItemsPerPage]);

  // Load articles on mount
  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [activeFilters, applyFilters]);

  // Handle infinite scroll error
  useEffect(() => {
    if (infiniteScrollError && onError) {
      onError(infiniteScrollError);
    }
  }, [infiniteScrollError, onError]);

  // Empty state
  const renderEmptyState = () => (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
        <BookOpen className="w-8 h-8 text-white/50" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        {activeFilters.search ? 'Ничего не найдено' : 'Нет новостей'}
      </h3>
      <p className="text-white/60 mb-6 max-w-sm">
        {activeFilters.search 
          ? `По запросу "${activeFilters.search}" ничего не найдено. Попробуйте изменить поисковый запрос.`
          : 'В данный момент нет доступных новостей. Попробуйте обновить страницу.'
        }
      </p>
      <div className="flex gap-3">
        {activeFilters.search && (
          <motion.button
            className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
            onClick={() => clearSearch()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Очистить поиск
          </motion.button>
        )}
        <motion.button
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          onClick={handleRefresh}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Обновить
        </motion.button>
      </div>
    </motion.div>
  );

  // Error state
  const renderErrorState = () => (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        Ошибка загрузки
      </h3>
      <p className="text-white/60 mb-6 max-w-sm">
        {errorMessage || 'Произошла ошибка при загрузке новостей. Попробуйте обновить страницу.'}
      </p>
      <motion.button
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        onClick={handleRefresh}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Попробовать снова
      </motion.button>
    </motion.div>
  );

  // Loading state
  const renderLoadingState = () => (
    <div className="space-y-4">
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <NewsCardSkeleton key={index} variant={cardVariant} />
      ))}
    </div>
  );

  // Infinite scroll error
  const renderInfiniteScrollError = () => (
    <motion.div
      className="flex flex-col items-center justify-center py-8 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6 text-red-500" />
      </div>
      <p className="text-white/60 mb-4 text-sm">
        Ошибка загрузки дополнительных статей
      </p>
      <motion.button
        className="px-3 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm"
        onClick={retryInfiniteScroll}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Попробовать снова
      </motion.button>
    </motion.div>
  );

  // Loading more indicator
  const renderLoadingMore = () => (
    <motion.div
      className="flex items-center justify-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 text-white/60">
        <RefreshCw className="w-5 h-5 animate-spin" />
        <span className="text-sm">Загрузка...</span>
      </div>
    </motion.div>
  );

  return (
    <div className={cn('w-full', className)}>
      {/* Articles List */}
      <AnimatePresence mode="wait">
        {isLoading && !displayedArticles.length ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderLoadingState()}
          </motion.div>
        ) : hasError ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderErrorState()}
          </motion.div>
        ) : displayedArticles.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderEmptyState()}
          </motion.div>
        ) : (
          <motion.div
            key="articles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {displayedArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      y: 30,
                      scale: 0.95,
                    },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      },
                    },
                  }}
                  layout
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
                    onClick={handleArticleClick}
                    onBookmark={handleBookmark}
                    onLike={handleLike}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Infinite Scroll Sentinel */}
      {enableInfiniteScroll && displayedArticles.length > 0 && (
        <div ref={sentinelRef} className="w-full h-1" />
      )}

      {/* Loading More Indicator */}
      {isLoadingMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderLoadingMore()}
        </motion.div>
      )}

      {/* Infinite Scroll Error */}
      {infiniteScrollError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderInfiniteScrollError()}
        </motion.div>
      )}

      {/* End of List Indicator */}
      {!hasMore && displayedArticles.length > 0 && !isLoading && (
        <motion.div
          className="flex items-center justify-center py-8 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white/20 rounded-full" />
            <span className="text-sm">Все статьи загружены</span>
            <div className="w-2 h-2 bg-white/20 rounded-full" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NewsList;
