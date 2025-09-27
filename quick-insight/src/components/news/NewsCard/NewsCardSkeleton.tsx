'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export interface NewsCardSkeletonProps {
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
  showImage?: boolean;
  showAuthor?: boolean;
  showTags?: boolean;
  showStats?: boolean;
  showBookmarkButton?: boolean;
}

export const NewsCardSkeleton: React.FC<NewsCardSkeletonProps> = ({
  variant = 'default',
  className,
  showImage = true,
  showAuthor = true,
  showTags = true,
  showStats = true,
  showBookmarkButton = true,
}) => {
  const cardVariants = {
    default: {
      padding: 'p-4',
      imageHeight: 'h-48',
      contentSpacing: 'space-y-3',
      titleLines: 2,
      excerptLines: 3,
      tagCount: 3,
    },
    compact: {
      padding: 'p-3',
      imageHeight: 'h-32',
      contentSpacing: 'space-y-2',
      titleLines: 1,
      excerptLines: 2,
      tagCount: 2,
    },
    featured: {
      padding: 'p-6',
      imageHeight: 'h-64',
      contentSpacing: 'space-y-4',
      titleLines: 2,
      excerptLines: 4,
      tagCount: 4,
    },
  };

  const currentVariant = cardVariants[variant];

  const SkeletonLine = ({ 
    width, 
    height = 'h-4', 
    className: lineClassName 
  }: { 
    width: string; 
    height?: string; 
    className?: string; 
  }) => (
    <motion.div
      className={cn(
        'bg-white/10 rounded animate-pulse',
        height,
        width,
        lineClassName
      )}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );

  const SkeletonTag = () => (
    <motion.div
      className="h-6 w-16 bg-white/10 rounded-full animate-pulse"
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: Math.random() * 0.5,
      }}
    />
  );

  return (
    <motion.article
      className={cn(
        'relative overflow-hidden rounded-xl',
        'glass-effect border border-white/10',
        currentVariant.padding,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      {/* Bookmark Button Skeleton */}
      {showBookmarkButton && (
        <div className="absolute top-3 left-3 z-10">
          <motion.div
            className="w-8 h-8 bg-white/10 rounded-full animate-pulse"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      )}

      {/* Image Skeleton */}
      {showImage && (
        <div className={cn(
          'relative overflow-hidden rounded-lg mb-4',
          currentVariant.imageHeight
        )}>
          <motion.div
            className="w-full h-full bg-white/10 animate-pulse"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Category Badge Skeleton */}
          <div className="absolute top-3 right-3">
            <motion.div
              className="h-6 w-20 bg-white/10 rounded-full animate-pulse"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.2,
              }}
            />
          </div>
        </div>
      )}

      {/* Content Skeleton */}
      <div className={cn('flex flex-col', currentVariant.contentSpacing)}>
        {/* Title Skeleton */}
        <div className="space-y-2">
          {Array.from({ length: currentVariant.titleLines }).map((_, index) => (
            <SkeletonLine
              key={index}
              width={index === currentVariant.titleLines - 1 ? 'w-3/4' : 'w-full'}
              height="h-5"
            />
          ))}
        </div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2">
          {Array.from({ length: currentVariant.excerptLines }).map((_, index) => (
            <SkeletonLine
              key={index}
              width={index === currentVariant.excerptLines - 1 ? 'w-2/3' : 'w-full'}
              height="h-4"
            />
          ))}
        </div>

        {/* Author and Date Skeleton */}
        {showAuthor && (
          <div className="flex items-center gap-2">
            <SkeletonLine width="w-4" height="h-4" />
            <SkeletonLine width="w-24" height="h-3" />
            <SkeletonLine width="w-1" height="h-3" />
            <SkeletonLine width="w-4" height="h-4" />
            <SkeletonLine width="w-16" height="h-3" />
          </div>
        )}

        {/* Tags Skeleton */}
        {showTags && (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: currentVariant.tagCount }).map((_, index) => (
              <SkeletonTag key={index} />
            ))}
          </div>
        )}

        {/* Stats Skeleton */}
        {showStats && (
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <SkeletonLine width="w-4" height="h-4" />
                <SkeletonLine width="w-8" height="h-3" />
              </div>
              <div className="flex items-center gap-1">
                <SkeletonLine width="w-4" height="h-4" />
                <SkeletonLine width="w-12" height="h-3" />
              </div>
              <div className="flex items-center gap-1">
                <SkeletonLine width="w-4" height="h-4" />
                <SkeletonLine width="w-6" height="h-3" />
              </div>
            </div>
            <SkeletonLine width="w-4" height="h-4" />
          </div>
        )}
      </div>

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.article>
  );
};

export default NewsCardSkeleton;
