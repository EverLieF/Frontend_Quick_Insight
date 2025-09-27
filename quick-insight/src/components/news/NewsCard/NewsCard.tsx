'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Eye, 
  Heart, 
  MessageCircle, 
  User,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { NewsArticle } from '@/types/news';
import { formatNewsDate } from '@/lib/utils/date';
import { cn } from '@/lib/utils/cn';

export interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
  onRead?: (article: NewsArticle) => void;
  onBookmark?: (article: NewsArticle) => void;
  onLike?: (article: NewsArticle) => void;
  onClick?: (article: NewsArticle) => void;
  showStats?: boolean;
  showAuthor?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  showReadStatus?: boolean;
  showBookmarkButton?: boolean;
  showLikeButton?: boolean;
  isInteractive?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  variant = 'default',
  className,
  onRead,
  onBookmark,
  onLike,
  onClick,
  showStats = true,
  showAuthor = true,
  showCategory = true,
  showTags = true,
  showReadStatus = true,
  showBookmarkButton = true,
  showLikeButton = false,
  isInteractive = true,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
    if (onRead && !article.isRead) {
      onRead(article);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    if (onBookmark) {
      onBookmark({ ...article, isBookmarked: newBookmarkState });
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    if (onLike) {
      onLike(article);
    }
  };

  const cardVariants = {
    default: {
      padding: 'p-4',
      imageHeight: 'h-48',
      contentSpacing: 'space-y-3',
      titleSize: 'text-base',
      excerptSize: 'text-sm',
      tagSize: 'text-xs',
    },
    compact: {
      padding: 'p-3',
      imageHeight: 'h-32',
      contentSpacing: 'space-y-2',
      titleSize: 'text-sm',
      excerptSize: 'text-xs',
      tagSize: 'text-xs',
    },
    featured: {
      padding: 'p-6',
      imageHeight: 'h-64',
      contentSpacing: 'space-y-4',
      titleSize: 'text-lg',
      excerptSize: 'text-base',
      tagSize: 'text-sm',
    },
  };

  const currentVariant = cardVariants[variant];

  return (
    <motion.article
      className={cn(
        'group relative overflow-hidden rounded-xl',
        'bg-gradient-to-br from-[rgba(65,65,65,0.1)] to-[rgba(65,65,65,0.05)]',
        'border border-gradient-to-b from-white to-[rgba(153,153,153,1)]',
        'backdrop-blur-[60px] shadow-[inset_0px_0px_20px_0px_rgba(130,130,130,0.05)]',
        'transition-all duration-300 ease-out',
        isInteractive && 'cursor-pointer',
        article.isRead && 'opacity-75',
        'p-3',
        className
      )}
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={isInteractive ? { 
        y: -2,
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : {}}
      whileTap={isInteractive ? { 
        scale: 0.99,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      layout
    >

      {/* Content */}
      <motion.div 
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Title */}
        <motion.h3 
          className="font-bold text-base leading-tight text-white"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {article.title || 'Америка будет снова великой'}
        </motion.h3>

        {/* Excerpt */}
        <motion.p 
          className="text-white text-sm leading-relaxed h-[54px] overflow-hidden"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {article.excerpt || 'Недавно Дональд Трамп объявил о своем намерении запустить новую инициативу по восстановлению экономики США, которая включает в себя создание миллионов рабочих мест в сфере технологий и устойчивого развития. Он подчеркнул, что это поможет вернуть Америке ее былую славу и укрепить позиции на мировой арене.'}
        </motion.p>


        {/* Tags */}
        <motion.div 
          className="flex gap-1.5 h-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <motion.span
            className="px-4 py-1 rounded-[21px] text-xs font-medium text-white bg-black/40 backdrop-blur-[4px]"
            initial={{ opacity: 0, scale: 0.8, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.6 }}
          >
            Политика
          </motion.span>
          <motion.span
            className="px-4 py-1 rounded-[21px] text-xs font-medium text-white bg-black/40 backdrop-blur-[4px]"
            initial={{ opacity: 0, scale: 0.8, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.7 }}
          >
            Финансы
          </motion.span>
        </motion.div>

      </motion.div>

    </motion.article>
  );
};

export default NewsCard;
