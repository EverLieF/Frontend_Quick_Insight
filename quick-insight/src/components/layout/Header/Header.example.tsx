'use client';

import { Header } from './index';

/**
 * Пример использования Header компонента
 * Этот файл можно удалить после интеграции в основное приложение
 */
export const HeaderExample: React.FC = () => {
  const handleBackClick = () => {
    console.log('Нажата кнопка "Назад"');
    // Здесь можно добавить логику навигации
  };

  const handleMenuClick = () => {
    console.log('Нажата кнопка меню');
    // Здесь можно добавить логику открытия меню
  };

  return (
    <div className="w-full max-w-[375px] mx-auto">
      <Header
        onBackClick={handleBackClick}
        onMenuClick={handleMenuClick}
        showBackButton={true}
        showMenuButton={true}
      />
      
      {/* Контент приложения */}
      <div className="bg-gradient-to-b from-[#00153E] to-[#000000] min-h-screen p-6">
        <h2 className="text-white text-xl font-bold mb-4">
          Контент приложения
        </h2>
        <p className="text-white/70">
          Здесь будет основной контент приложения Quick Insight
        </p>
      </div>
    </div>
  );
};
