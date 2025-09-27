'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { SimpleNewsList } from '@/components/news/SimpleNewsList';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { TabBar } from '@/components/layout/TabBar';
import { Menu } from '@/components/layout/Menu';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { NewsListSkeleton } from '@/components/ui/Skeleton';
import { PullToRefreshIndicator } from '@/components/ui/PullToRefresh';
import { NetworkErrorDisplay } from '@/components/common/ErrorDisplay';
import { useNewsStore, useNewsSelectors } from '@/lib/store/newsStore';
import { useFilterStore } from '@/lib/store/filterStore';
import { useNavigation } from '@/lib/hooks/useNavigation';
import { usePullToRefresh } from '@/lib/hooks/usePullToRefresh';
import { useRetry } from '@/lib/hooks/useRetry';
import { logger } from '@/lib/utils/logger';

export default function Home() {
  const [activeTab, setActiveTab] = useState('news');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Navigation hook
  const { navigate, goBack } = useNavigation();

  // Store hooks
  const { 
    loadArticles, 
    loadCategories, 
    loadStats,
    markAsRead,
    toggleBookmark,
    getArticleById
  } = useNewsStore();

  // Retry hook for error handling
  const { executeWithRetry: retryLoadArticles } = useRetry(loadArticles, {
    maxAttempts: 3,
    delay: 1000,
  });

  // Pull to refresh hook
  const pullToRefresh = usePullToRefresh({
    onRefresh: async () => {
      await Promise.all([
        loadArticles(),
        loadCategories(),
        loadStats()
      ]);
    },
    enabled: true,
  });

  // Селекторы для получения данных
  const {
    currentPageArticles,
    loading,
    errors,
    stats
  } = useNewsSelectors();

  const { 
    activeFilters, 
    setFilter, 
    initializeFilters 
  } = useFilterStore();

  // Инициализация данных при монтировании
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Инициализируем фильтры
        initializeFilters();
        
        // Загружаем данные параллельно
        await Promise.all([
          loadCategories(),
          loadArticles(),
          loadStats()
        ]);
        
        setIsInitialized(true);
        logger.info('App initialized successfully');
      } catch (error) {
        logger.error('Ошибка инициализации приложения:', error);
      }
    };

    initializeApp();
  }, [initializeFilters, loadCategories, loadArticles, loadStats]);

  // Обработчики событий
  const handleBackClick = () => {
    logger.userAction('back_button_clicked');
    goBack();
  };

  const handleMenuClick = () => {
    logger.userAction('menu_button_clicked');
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setFilter('category', categoryId);
  };

  const handleArticleClick = (articleId: string) => {
    const article = getArticleById(articleId);
    if (article) {
      logger.userAction('article_clicked', { articleId, title: article.title });
      navigate(`/article/${articleId}`);
    }
  };

  const handleArticleRead = (articleId: string) => {
    markAsRead(articleId);
    logger.userAction('article_marked_as_read', { articleId });
  };

  const handleArticleBookmark = (articleId: string) => {
    toggleBookmark(articleId);
    logger.userAction('article_bookmark_toggled', { articleId });
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    logger.userAction('tab_changed', { tabId });
  };

  // Показываем загрузку если данные еще не загружены
  if (!isInitialized || loading.articles === 'loading') {
    return (
      <div className="min-h-screen bg-main-gradient">
        <div className="max-w-[375px] mx-auto min-h-screen bg-main-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-[#2E3247] via-[#00153E] to-black" />
          
          <Header
            onBackClick={handleBackClick}
            onMenuClick={handleMenuClick}
            showBackButton={true}
            showMenuButton={true}
          />

          <main className="relative z-10 px-4 pt-6 pb-6">
            <div className="mb-6">
              <div className="h-8 bg-white/20 rounded mb-4" />
              <div className="h-4 bg-white/15 rounded w-1/3" />
            </div>
            
            <NewsListSkeleton count={5} />
          </main>
        </div>
      </div>
    );
  }

  // Показываем ошибку если есть проблемы с загрузкой
  if (errors.articles?.hasError) {
    return (
      <div className="min-h-screen bg-main-gradient">
        <div className="max-w-[375px] mx-auto min-h-screen bg-main-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-[#2E3247] via-[#00153E] to-black" />
          
          <Header
            onBackClick={handleBackClick}
            onMenuClick={handleMenuClick}
            showBackButton={true}
            showMenuButton={true}
          />

          <main className="relative z-10 px-4 pt-6 pb-6">
            <NetworkErrorDisplay onRetry={retryLoadArticles} />
          </main>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-main-gradient">
        {/* Основной контейнер с фиксированными размерами для мобильного формата */}
        <div className="max-w-[375px] mx-auto min-h-screen bg-main-gradient relative overflow-hidden">
          {/* Градиентный фон */}
          <div className="absolute inset-0 bg-gradient-radial from-[#2E3247] via-[#00153E] to-black" />
        
        {/* Header */}
        <Header
          onBackClick={handleBackClick}
          onMenuClick={handleMenuClick}
          showBackButton={true}
          showMenuButton={true}
        />

        {/* Секция "Сегодня для вас" */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 px-4 pt-6 pb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white font-onest">
              Сегодня для вас
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-base font-medium text-transparent bg-gradient-to-r from-transparent via-blue-400 to-blue-400 bg-clip-text"
            >
              Прочитанное
            </motion.button>
          </div>
        </motion.section>

        {/* Основной контент */}
        <main 
          ref={pullToRefresh.setElementRef}
          className="relative z-10 px-4 pb-24"
        >

          {/* Фильтры категорий */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <CategoryFilter
              onCategoryChange={handleCategoryChange}
              initialCategory={activeFilters.category || 'all'}
              showAllOption={true}
              className="mb-4"
            />
          </motion.section>

          {/* Лента новостей */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <SimpleNewsList
              articles={currentPageArticles}
              loading={loading.articles === 'loading'}
              cardVariant="default"
              showStats={true}
              showAuthor={true}
              showCategory={true}
              showTags={true}
              showReadStatus={true}
              showBookmarkButton={true}
              showLikeButton={true}
              onArticleClick={(article) => handleArticleClick(article.id)}
              onBookmark={(article) => handleArticleBookmark(article.id)}
              onMarkAsRead={(article) => handleArticleRead(article.id)}
              className="space-y-3"
            />
          </motion.section>

          {/* Статистика (опционально) */}
          {stats && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 p-4 bg-card-gradient rounded-xl backdrop-blur-xl border border-white/10"
            >
              <h3 className="text-lg font-semibold text-white mb-3">Статистика</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{stats.totalArticles}</div>
                  <div className="text-white/60">Статей</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{stats.totalViews.toLocaleString()}</div>
                  <div className="text-white/60">Просмотров</div>
                </div>
              </div>
            </motion.section>
          )}
        </main>

        {/* TabBar */}
        <TabBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          visible={true}
        />

        {/* Дополнительные эффекты */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Градиентные границы */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
          
          {/* Эффект свечения */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
        </div>

        {/* Menu */}
        <Menu
          isOpen={isMenuOpen}
          onClose={handleMenuClose}
          onNavigate={handleNavigate}
        />

        {/* Pull to Refresh Indicator */}
        <PullToRefreshIndicator
          isPulling={pullToRefresh.isPulling}
          isRefreshing={pullToRefresh.isRefreshing}
          canRefresh={pullToRefresh.canRefresh}
          progress={pullToRefresh.progress}
        />
      </div>
    </ErrorBoundary>
  );
}
