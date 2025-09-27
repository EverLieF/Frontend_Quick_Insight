'use client';

import { motion } from 'framer-motion';
import { RefreshCw, ArrowDown } from 'lucide-react';

interface PullToRefreshIndicatorProps {
  isPulling: boolean;
  isRefreshing: boolean;
  canRefresh: boolean;
  progress: number;
  className?: string;
}

export function PullToRefreshIndicator({
  isPulling,
  isRefreshing,
  canRefresh,
  progress,
  className = '',
}: PullToRefreshIndicatorProps) {
  if (!isPulling && !isRefreshing) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ 
        opacity: isPulling || isRefreshing ? 1 : 0,
        y: isPulling || isRefreshing ? 0 : -50,
      }}
      transition={{ duration: 0.2 }}
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
    >
      <div className="flex flex-col items-center justify-center p-4">
        {/* Индикатор */}
        <motion.div
          animate={isRefreshing ? { rotate: 360 } : {}}
          transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            canRefresh || isRefreshing
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-white/10 text-white/60'
          }`}
        >
          {isRefreshing ? (
            <RefreshCw className="w-5 h-5" />
          ) : (
            <motion.div
              animate={{ rotate: canRefresh ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          )}
        </motion.div>

        {/* Текст */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`text-sm font-medium mt-2 transition-colors ${
            canRefresh || isRefreshing
              ? 'text-blue-400'
              : 'text-white/60'
          }`}
        >
          {isRefreshing 
            ? 'Обновление...' 
            : canRefresh 
              ? 'Отпустите для обновления' 
              : 'Потяните для обновления'
          }
        </motion.p>

        {/* Прогресс бар */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ 
            opacity: isPulling ? 1 : 0,
            scaleX: progress,
          }}
          transition={{ duration: 0.1 }}
          className="w-24 h-1 bg-white/20 rounded-full mt-2 overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
            style={{ width: '100%' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
