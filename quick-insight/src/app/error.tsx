'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Логируем ошибку для мониторинга
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-main-gradient flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Иконка ошибки */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
        </motion.div>

        {/* Заголовок ошибки */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold text-white mb-4 font-onest"
        >
          Что-то пошло не так
        </motion.h1>

        {/* Описание ошибки */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white/70 mb-8 leading-relaxed"
        >
          Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.
        </motion.p>

        {/* Детали ошибки (только в development) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left"
          >
            <h3 className="text-sm font-semibold text-red-400 mb-2">Детали ошибки:</h3>
            <p className="text-xs text-red-300 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-300/70 mt-2">
                ID ошибки: {error.digest}
              </p>
            )}
          </motion.div>
        )}

        {/* Кнопки действий */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-4"
        >
          {/* Кнопка повтора */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            Попробовать снова
          </motion.button>

          {/* Кнопка возврата на главную */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium border border-white/20"
          >
            <Home className="w-5 h-5" />
            На главную
          </motion.button>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-sm text-white/50"
        >
          <p>Если проблема повторяется, обратитесь в поддержку</p>
        </motion.div>

        {/* Дополнительные эффекты */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Эффект свечения */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
          
          {/* Плавающие частицы */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400/20 rounded-full"
              style={{
                left: `${25 + i * 20}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                y: [-5, 5, -5],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
