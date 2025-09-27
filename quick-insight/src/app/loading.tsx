'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-main-gradient flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto px-6">
        {/* Анимированный логотип */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-2xl font-bold text-white">QI</span>
          </div>
        </motion.div>

        {/* Заголовок */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold text-white mb-2 font-onest"
        >
          Quick Insight
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white/70 mb-8"
        >
          Загружаем новости...
        </motion.p>

        {/* Спиннер загрузки */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            {/* Внешний круг */}
            <div className="w-12 h-12 border-4 border-blue-400/20 rounded-full"></div>
            {/* Вращающийся круг */}
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
          </div>
        </motion.div>

        {/* Прогресс-бар */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-4"
        />

        {/* Дополнительная информация */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-sm text-white/50"
        >
          Подготавливаем персонализированную ленту
        </motion.div>

        {/* Дополнительные эффекты */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Эффект свечения */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          
          {/* Плавающие частицы */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
