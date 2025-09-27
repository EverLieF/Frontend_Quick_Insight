'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Filter, Search } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { SimpleNewsList } from '@/components/news/SimpleNewsList';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useNewsStore, useNewsSelectors } from '@/lib/store/newsStore';
import { useFilterStore } from '@/lib/store/filterStore';
import { useNavigation } from '@/lib/hooks/useNavigation';
import { logger } from '@/lib/utils/logger';

export default function ReadArticlesPage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const { navigate, goBack } = useNavigation();
  const { 
    loadArticles, 
    loadCategories,
    getReadArticles,
    markAsRead,
    toggleBookmark,
    getArticleById
  } = useNewsStore();

  const { 
    activeFilters, 
    setFilter, 
    initializeFilters 
  } = useFilterStore();

  const {
    loading,
    errors
  } = useNewsSelectors();

  // Получаем прочитанные статьи
  const readArticles = getReadArticles();

  useEffect(() => {
    const initializePage = async () => {
      try {
        initializeFilters();
        await Promise.all([
          loadCategories(),
          loadArticles()
        ]);
        setIsInitialized(true);
        logger.info('Read articles page initialized');
      } catch (error) {
        logger.error('Error initializing read articles page:', error);
      }
    };

    initializePage();
  }, [initializeFilters, loadCategories, loadArticles]);

  const handleBackClick = () => {
    logger.userAction('read_page_back_clicked');
    goBack();
  };

  const handleArticleClick = (articleId: string) => {
    const article = getArticleById(articleId);
    if (article) {
      logger.userAction('read_article_clicked', { articleId, title: article.title });
      navigate(`/article/${articleId}`);
    }
  };

  const handleArticleRead = (articleId: string) => {
    markAsRead(articleId);
    logger.userAction('read_article_marked_as_read', { articleId });
  };

  const handleArticleBookmark = (articleId: string) => {
    toggleBookmark(articleId);
    logger.userAction('read_article_bookmark_toggled', { articleId });
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setFilter('category', categoryId);
    logger.userAction('read_page_category_changed', { categoryId });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    logger.userAction('read_page_filters_toggled', { show: !showFilters });
  };

  if (!isInitialized || loading.articles === 'loading') {
    return (
      <div className="min-h-screen bg-main-gradient flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="text-white/70 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Загрузка прочитанных статей...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (errors.articles?.hasError) {
    return (
      <div className="min-h-screen bg-main-gradient flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="text-red-400 text-2xl">⚠️</span>
          </motion.div>
          <motion.h2 
            className="text-xl font-semibold text-white mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Ошибка загрузки
          </motion.h2>
          <motion.p 
            className="text-white/70 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {errors.articles.message}
          </motion.p>
          <motion.button
            onClick={() => loadArticles()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            Попробовать снова
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-main-gradient">
        <div className="max-w-[375px] mx-auto min-h-screen bg-main-gradient relative overflow-hidden">
          {/* Градиентный фон */}
          <div className="absolute inset-0 bg-gradient-radial from-[#2E3247] via-[#00153E] to-black" />

          {/* Header */}
          <Header
            onBackClick={handleBackClick}
            onMenuClick={() => {}}
            showBackButton={true}
            showMenuButton={false}
            title="Прочитанное"
          />

          {/* Основной контент */}
          <main className="relative z-10 px-4 pb-6">
            {/* Статистика */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <div className="p-4 bg-card-gradient rounded-xl backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <BookOpen className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Прочитанные статьи</h2>
                    <p className="text-white/60 text-sm">
                      {readArticles.length} из {readArticles.length} статей
                    </p>
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </motion.section>

            {/* Панель управления */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleFilters}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    showFilters 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Фильтры</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/search')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm font-medium">Поиск</span>
                </motion.button>
              </div>
            </motion.section>

            {/* Фильтры */}
            {showFilters && (
              <motion.section
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <CategoryFilter
                  onCategoryChange={handleCategoryChange}
                  initialCategory={activeFilters.category || 'all'}
                  showAllOption={true}
                  className="mb-4"
                />
              </motion.section>
            )}

            {/* Список прочитанных статей */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {readArticles.length === 0 ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <BookOpen className="w-8 h-8 text-white/40" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Пока нет прочитанных статей
                  </h3>
                  <p className="text-white/60 mb-6">
                    Статьи, которые вы прочитаете, будут отображаться здесь
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Читать новости
                  </motion.button>
                </div>
              ) : (
                <SimpleNewsList
                  articles={readArticles}
                  loading={false}
                  cardVariant="compact"
                  showStats={true}
                  showAuthor={true}
                  showCategory={true}
                  showTags={false}
                  showReadStatus={true}
                  showBookmarkButton={true}
                  showLikeButton={false}
                  onArticleClick={(article) => handleArticleClick(article.id)}
                  onBookmark={(article) => handleArticleBookmark(article.id)}
                  onMarkAsRead={(article) => handleArticleRead(article.id)}
                  className="space-y-3"
                />
              )}
            </motion.section>
          </main>

          {/* Дополнительные эффекты */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
