'use client';

import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-main-gradient flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Иконка 404 */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full flex items-center justify-center relative">
            {/* Большой номер 404 */}
            <div className="text-6xl font-bold text-transparent bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text">
              404
            </div>
            
            {/* Иконка поиска */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
            >
              <Search className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Заголовок */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-white mb-4 font-onest"
        >
          Страница не найдена
        </motion.h1>

        {/* Описание */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white/70 mb-8 leading-relaxed"
        >
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </motion.p>

        {/* Предложения */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10"
        >
          <h3 className="text-sm font-semibold text-white mb-3">Возможные причины:</h3>
          <ul className="text-sm text-white/60 space-y-1 text-left">
            <li>• Неправильный URL адрес</li>
            <li>• Страница была удалена или перемещена</li>
            <li>• Временные технические проблемы</li>
          </ul>
        </motion.div>

        {/* Кнопки действий */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-4"
        >
          {/* Кнопка возврата назад */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Вернуться назад
          </motion.button>

          {/* Кнопка на главную */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoHome}
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
          <p>Или воспользуйтесь поиском для поиска нужной информации</p>
        </motion.div>

        {/* Дополнительные эффекты */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Эффект свечения */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          
          {/* Плавающие частицы */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${15 + i * 12}%`,
                top: `${25 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-8, 8, -8],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + i * 0.3,
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
