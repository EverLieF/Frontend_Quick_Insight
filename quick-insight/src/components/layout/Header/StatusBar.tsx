'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface StatusBarProps {
  className?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ className = '' }) => {
  const [currentTime, setCurrentTime] = useState('8:16');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setCurrentTime(timeString);
    };

    // Обновляем время каждую минуту
    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-between px-0 py-5 h-[54px] ${className}`}
    >
      {/* Время */}
      <motion.span
        className="text-white font-semibold text-lg tracking-tight ml-14"
        style={{ fontFamily: 'SF Pro, system-ui, sans-serif' }}
      >
        {currentTime}
      </motion.span>

      {/* Индикаторы справа */}
      <div className="flex items-center space-x-1 mr-4">
        {/* Сотовый сигнал */}
        <motion.div
          className="flex items-end space-x-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className="bg-white rounded-sm"
              style={{
                width: '3px',
                height: `${3 + bar * 2}px`,
                opacity: bar <= 3 ? 1 : 0.3,
              }}
            />
          ))}
        </motion.div>

        {/* Wi-Fi */}
        <motion.div
          className="ml-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <svg
            width="17"
            height="12"
            viewBox="0 0 17 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 9.5L11.5 6.5C10.5 5.5 9.5 5 8.5 5C7.5 5 6.5 5.5 5.5 6.5L8.5 9.5Z"
              fill="white"
            />
            <path
              d="M8.5 12L13.5 7C11.5 5 9.5 4 8.5 4C7.5 4 5.5 5 3.5 7L8.5 12Z"
              fill="white"
              opacity="0.7"
            />
            <path
              d="M8.5 7L10.5 5C9.5 4 8.5 3.5 8.5 3.5C8.5 3.5 7.5 4 6.5 5L8.5 7Z"
              fill="white"
              opacity="0.4"
            />
          </svg>
        </motion.div>

        {/* Батарея */}
        <motion.div
          className="ml-2 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            {/* Корпус батареи */}
            <div
              className="bg-white rounded border border-white/35"
              style={{ width: '25px', height: '13px' }}
            >
              {/* Заряд батареи */}
              <motion.div
                className="bg-white rounded-sm"
                style={{ width: '21px', height: '9px' }}
                initial={{ width: '21px' }}
                animate={{ width: '21px' }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {/* Положительный контакт */}
            <div
              className="absolute -right-0.5 top-1.5 bg-white/40 rounded-sm"
              style={{ width: '1.33px', height: '4px' }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
