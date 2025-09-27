'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Wifi, WifiOff, Server, Bug } from 'lucide-react';
import { logger } from '@/lib/utils/logger';

export interface ErrorDisplayProps {
  error: {
    message: string;
    code?: string;
    type?: 'network' | 'server' | 'client' | 'unknown';
    retryable?: boolean;
  };
  onRetry?: () => void;
  onDismiss?: () => void;
  showRetry?: boolean;
  showDismiss?: boolean;
  className?: string;
}

const errorIcons = {
  network: WifiOff,
  server: Server,
  client: Bug,
  unknown: AlertTriangle,
};

const errorMessages = {
  network: 'Проблема с подключением',
  server: 'Ошибка сервера',
  client: 'Ошибка приложения',
  unknown: 'Произошла ошибка',
};

export function ErrorDisplay({
  error,
  onRetry,
  onDismiss,
  showRetry = true,
  showDismiss = false,
  className = '',
}: ErrorDisplayProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry || isRetrying) return;

    setIsRetrying(true);
    logger.userAction('error_retry_clicked', { errorType: error.type, errorCode: error.code });

    try {
      await onRetry();
    } catch (retryError) {
      logger.error('Retry failed:', retryError);
    } finally {
      setIsRetrying(false);
    }
  };

  const handleDismiss = () => {
    logger.userAction('error_dismissed', { errorType: error.type, errorCode: error.code });
    onDismiss?.();
  };

  const Icon = errorIcons[error.type || 'unknown'];
  const title = errorMessages[error.type || 'unknown'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`p-6 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-xl ${className}`}
    >
      <div className="flex items-start gap-4">
        {/* Иконка ошибки */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="flex-shrink-0 p-3 bg-red-500/20 rounded-lg"
        >
          <Icon className="w-6 h-6 text-red-400" />
        </motion.div>

        {/* Содержимое ошибки */}
        <div className="flex-1 min-w-0">
          <motion.h3
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-semibold text-red-400 mb-2"
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 mb-4 leading-relaxed"
          >
            {error.message}
          </motion.p>

          {/* Код ошибки */}
          {error.code && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-4"
            >
              <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded">
                Код: {error.code}
              </span>
            </motion.div>
          )}

          {/* Действия */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3"
          >
            {showRetry && (error.retryable !== false) && onRetry && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRetry}
                disabled={isRetrying}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <motion.div
                  animate={isRetrying ? { rotate: 360 } : {}}
                  transition={isRetrying ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium">
                  {isRetrying ? 'Повтор...' : 'Повторить'}
                </span>
              </motion.button>
            )}

            {showDismiss && onDismiss && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDismiss}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/70 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium">Закрыть</span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Компонент для отображения сетевых ошибок
 */
export function NetworkErrorDisplay({ onRetry, className }: { onRetry?: () => void; className?: string }) {
  return (
    <ErrorDisplay
      error={{
        message: 'Проверьте подключение к интернету и попробуйте снова',
        type: 'network',
        retryable: true,
      }}
      onRetry={onRetry}
      showRetry={true}
      className={className}
    />
  );
}

/**
 * Компонент для отображения ошибок сервера
 */
export function ServerErrorDisplay({ onRetry, className }: { onRetry?: () => void; className?: string }) {
  return (
    <ErrorDisplay
      error={{
        message: 'Сервер временно недоступен. Попробуйте позже',
        type: 'server',
        retryable: true,
      }}
      onRetry={onRetry}
      showRetry={true}
      className={className}
    />
  );
}

/**
 * Компонент для отображения ошибок клиента
 */
export function ClientErrorDisplay({ 
  message, 
  onRetry, 
  className 
}: { 
  message?: string; 
  onRetry?: () => void; 
  className?: string; 
}) {
  return (
    <ErrorDisplay
      error={{
        message: message || 'Произошла ошибка в приложении',
        type: 'client',
        retryable: true,
      }}
      onRetry={onRetry}
      showRetry={true}
      className={className}
    />
  );
}
