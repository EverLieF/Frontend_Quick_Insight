'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, X, Filter, Clock, TrendingUp } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { SimpleNewsList } from '@/components/news/SimpleNewsList';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useNewsStore } from '@/lib/store/newsStore';
import { useFilterStore } from '@/lib/hooks/useFilters';
import { useNavigation } from '@/lib/hooks/useNavigation';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { logger } from '@/lib/utils/logger';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState([
    'Искусственный интеллект',
    'Климат',
    'Технологии',
    'Наука',
    'Космос'
  ]);
  
  const { navigate, goBack } = useNavigation();
  const { searchNews } = useNewsStore();
  const { activeFilters, setFilter } = useFilterStore();
  
  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }, [recentSearches]);

  // Perform search
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchQuery.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = searchNews(debouncedSearchQuery, activeFilters);
        setSearchResults(results);
        logger.userAction('search_performed', { 
          query: debouncedSearchQuery, 
          resultsCount: results.length 
        });
      } catch (error) {
        logger.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchQuery, activeFilters, searchNews]);

  const handleBackClick = () => {
    logger.userAction('search_page_back_clicked');
    goBack();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery.trim());
      logger.userAction('search_submitted', { query: searchQuery });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    logger.userAction('search_cleared');
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    saveRecentSearch(query);
    logger.userAction('recent_search_clicked', { query });
  };

  const handlePopularSearchClick = (query: string) => {
    setSearchQuery(query);
    saveRecentSearch(query);
    logger.userAction('popular_search_clicked', { query });
  };

  const handleArticleClick = (articleId: string) => {
    logger.userAction('search_article_clicked', { articleId });
    navigate(`/article/${articleId}`);
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setFilter('category', categoryId);
    logger.userAction('search_category_changed', { categoryId });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    logger.userAction('search_filters_toggled', { show: !showFilters });
  };

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
            title="Поиск"
          />

          {/* Основной контент */}
          <main className="relative z-10 px-4 pb-6">
            {/* Поисковая строка */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Поиск статей..."
                    className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all"
                  />
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={handleClearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X className="w-4 h-4 text-white/60" />
                    </motion.button>
                  )}
                </div>
              </form>

              {/* Панель управления */}
              <div className="flex items-center gap-3 mt-4">
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
              </div>
            </motion.section>

            {/* Фильтры */}
            <AnimatePresence>
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
            </AnimatePresence>

            {/* Результаты поиска */}
            {searchQuery && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                {isSearching ? (
                  <div className="text-center py-8">
                    <motion.div 
                      className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full mx-auto mb-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-white/60">Поиск...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Найдено {searchResults.length} статей
                    </h3>
                    <SimpleNewsList
                      articles={searchResults}
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
                      className="space-y-3"
                    />
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-6 h-6 text-white/40" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Ничего не найдено
                    </h3>
                    <p className="text-white/60">
                      Попробуйте изменить поисковый запрос
                    </p>
                  </div>
                )}
              </motion.section>
            )}

            {/* Недавние поиски */}
            {!searchQuery && recentSearches.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-white/60" />
                  <h3 className="text-lg font-semibold text-white">Недавние поиски</h3>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((query, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRecentSearchClick(query)}
                      className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <span className="text-white/80">{query}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Популярные поиски */}
            {!searchQuery && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-white/60" />
                  <h3 className="text-lg font-semibold text-white">Популярные темы</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((query, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePopularSearchClick(query)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/80 rounded-full transition-colors"
                    >
                      {query}
                    </motion.button>
                  ))}
                </div>
              </motion.section>
            )}
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
