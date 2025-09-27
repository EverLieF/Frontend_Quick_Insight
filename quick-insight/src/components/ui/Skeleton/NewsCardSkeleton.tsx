'use client';

import { motion } from 'framer-motion';

interface NewsCardSkeletonProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export function NewsCardSkeleton({ variant = 'default', className = '' }: NewsCardSkeletonProps) {
  const isCompact = variant === 'compact';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-4 bg-card-gradient rounded-xl backdrop-blur-xl border border-white/10 ${className}`}
    >
      <div className="space-y-3">
        {/* Заголовок */}
        <div className="space-y-2">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-4 bg-white/20 rounded"
            style={{ width: isCompact ? '80%' : '90%' }}
          />
          {!isCompact && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              className="h-4 bg-white/20 rounded"
              style={{ width: '60%' }}
            />
          )}
        </div>

        {/* Описание */}
        <div className="space-y-2">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="h-3 bg-white/15 rounded"
            style={{ width: '100%' }}
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="h-3 bg-white/15 rounded"
            style={{ width: '85%' }}
          />
          {!isCompact && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="h-3 bg-white/15 rounded"
              style={{ width: '70%' }}
            />
          )}
        </div>

        {/* Метаданные */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="h-3 bg-white/15 rounded"
              style={{ width: '60px' }}
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="h-3 bg-white/15 rounded"
              style={{ width: '40px' }}
            />
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            className="h-3 bg-white/15 rounded"
            style={{ width: '30px' }}
          />
        </div>

        {/* Категория и теги */}
        {!isCompact && (
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="h-6 bg-white/15 rounded-full"
              style={{ width: '80px' }}
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
              className="h-6 bg-white/15 rounded-full"
              style={{ width: '60px' }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function NewsListSkeleton({ count = 5, variant = 'default' }: { count?: number; variant?: 'default' | 'compact' }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <NewsCardSkeleton variant={variant} />
        </motion.div>
      ))}
    </div>
  );
}
