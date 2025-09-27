'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark, Heart, Eye, Clock, User, Tag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useNewsStore } from '@/lib/store/newsStore';
import { useNavigation } from '@/lib/hooks/useNavigation';
import { logger } from '@/lib/utils/logger';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const { getArticleById, markAsRead, toggleBookmark } = useNewsStore();
  const { navigate, goBack } = useNavigation();
  
  const article = getArticleById(articleId);

  useEffect(() => {
    if (article) {
      setIsLoading(false);
      markAsRead(articleId);
      logger.userAction('article_viewed', { articleId, title: article.title });
    } else {
      setIsLoading(false);
      logger.warn('Article not found:', articleId);
    }
  }, [article, articleId, markAsRead]);

  const handleBackClick = () => {
    logger.userAction('article_back_clicked');
    goBack();
  };

  const handleShare = () => {
    logger.userAction('article_shared', { articleId });
    if (navigator.share && article) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback для браузеров без поддержки Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleBookmark = () => {
    toggleBookmark(articleId);
    setIsBookmarked(!isBookmarked);
    logger.userAction('article_bookmark_toggled', { articleId });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    logger.userAction('article_liked', { articleId, liked: !isLiked });
  };

  if (isLoading) {
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
            Загрузка статьи...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!article) {
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
            <span className="text-red-400 text-2xl">📄</span>
          </motion.div>
          <motion.h2 
            className="text-xl font-semibold text-white mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Статья не найдена
          </motion.h2>
          <motion.p 
            className="text-white/70 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            К сожалению, запрашиваемая статья не найдена или была удалена.
          </motion.p>
          <motion.button
            onClick={handleBackClick}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            Вернуться назад
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
            title="Статья"
          />

          {/* Основной контент */}
          <main className="relative z-10 px-4 pb-6">
            {/* Метаинформация */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              {/* Категория */}
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-medium">
                  {article.category.name}
                </span>
              </div>

              {/* Заголовок */}
              <h1 className="text-2xl font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Метаданные */}
              <div className="flex items-center gap-4 text-white/60 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{article.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {formatDistanceToNow(new Date(article.publishedAt), { 
                      addSuffix: true, 
                      locale: ru 
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{article.views.toLocaleString()}</span>
                </div>
              </div>

              {/* Действия */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`p-3 rounded-xl transition-colors ${
                    isLiked 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookmark}
                  className={`p-3 rounded-xl transition-colors ${
                    isBookmarked 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="p-3 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Изображение */}
            {article.imageUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </motion.div>
            )}

            {/* Содержимое статьи */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-invert max-w-none"
            >
              <div className="text-white/90 leading-relaxed space-y-4">
                {/* Здесь должен быть полный контент статьи */}
                <p className="text-lg font-medium text-white mb-4">
                  {article.excerpt}
                </p>
                
                {/* Заглушка для полного контента */}
                <div className="space-y-4">
                  <p>
                    Это детальная страница статьи. Здесь будет отображаться полный контент статьи, 
                    включая все параграфы, изображения, цитаты и другие элементы.
                  </p>
                  <p>
                    В реальном приложении здесь будет загружаться полный текст статьи из API 
                    или из базы данных. Сейчас отображается только краткое описание.
                  </p>
                  <p>
                    Статья была опубликована {formatDistanceToNow(new Date(article.publishedAt), { 
                      addSuffix: true, 
                      locale: ru 
                    })} и уже прочитана {article.views.toLocaleString()} раз.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Теги */}
            {article.tags && article.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <h3 className="text-lg font-semibold text-white mb-3">Теги</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 bg-white/10 text-white/70 text-sm rounded-full"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </motion.div>
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
