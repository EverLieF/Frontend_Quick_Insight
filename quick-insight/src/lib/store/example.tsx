/**
 * Пример использования Zustand stores в компонентах
 * 
 * Этот файл демонстрирует, как использовать созданные stores
 * в React компонентах для управления состоянием приложения.
 */

import React, { useEffect } from 'react';
import { 
  useNewsSelectors, 
  useFilterSelectors, 
  useThemeManager,
  useNotificationManager,
  useGlobalLoading,
  useGlobalErrors 
} from './index';

// Пример компонента списка новостей
export const NewsListExample: React.FC = () => {
  const { 
    currentPageArticles, 
    pagination, 
    loading, 
    setPage,
    markAsRead,
    toggleBookmark 
  } = useNewsSelectors();
  
  const { activeFilters, setFilter, clearFilters } = useFilterSelectors();
  const { isDarkMode, toggleTheme } = useThemeManager();
  const { showSuccess, showError } = useNotificationManager();
  const { isLoading } = useGlobalLoading();
  const { hasErrors } = useGlobalErrors();

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const loadData = async () => {
      try {
        // Здесь можно вызвать loadArticles() если нужно
        showSuccess('Новости загружены успешно');
      } catch (error) {
        showError('Ошибка загрузки новостей');
      }
    };

    loadData();
  }, [showSuccess, showError]);

  const handleFilterChange = (category: string) => {
    setFilter('category', category);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleMarkAsRead = (articleId: string) => {
    markAsRead(articleId);
    showSuccess('Статья отмечена как прочитанная');
  };

  const handleToggleBookmark = (articleId: string) => {
    toggleBookmark(articleId);
    showSuccess('Закладка обновлена');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Загрузка новостей...</div>
      </div>
    );
  }

  if (hasErrors) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-500">Произошла ошибка при загрузке данных</div>
      </div>
    );
  }

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Заголовок с переключателем темы */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Новости</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isDarkMode ? '☀️' : '🌙'} {isDarkMode ? 'Светлая' : 'Темная'} тема
        </button>
      </div>

      {/* Фильтры */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Фильтры</h2>
        <div className="flex gap-4 flex-wrap">
          <select
            value={activeFilters.category || 'all'}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="all">Все категории</option>
            <option value="politics">Политика</option>
            <option value="science">Наука</option>
            <option value="history">История</option>
            <option value="research">Исследования</option>
            <option value="finance">Финансы</option>
          </select>
          
          <button
            onClick={() => clearFilters()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Очистить фильтры
          </button>
        </div>
      </div>

      {/* Список новостей */}
      <div className="space-y-4">
        {currentPageArticles.map((article) => (
          <div
            key={article.id}
            className={`p-4 border rounded-lg ${
              isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMarkAsRead(article.id)}
                  className={`px-2 py-1 text-xs rounded ${
                    article.isRead 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                >
                  {article.isRead ? '✓ Прочитано' : 'Отметить прочитанным'}
                </button>
                <button
                  onClick={() => handleToggleBookmark(article.id)}
                  className={`px-2 py-1 text-xs rounded ${
                    article.isBookmarked 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                >
                  {article.isBookmarked ? '★ В избранном' : '☆ Добавить в избранное'}
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-2">{article.excerpt}</p>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex gap-4">
                <span>👤 {article.author.name}</span>
                <span>📅 {article.publishedAt.toLocaleDateString()}</span>
                <span>⏱️ {article.readTime} мин</span>
                <span>👁️ {article.views || 0}</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                article.category.color ? `bg-[${article.category.color}]` : 'bg-blue-500'
              } text-white`}>
                {article.category.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Предыдущая
          </button>
          
          <span className="px-4 py-2">
            Страница {pagination.currentPage} из {pagination.totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Следующая →
          </button>
        </div>
      )}
    </div>
  );
};

// Пример компонента для демонстрации UI store
export const UIExample: React.FC = () => {
  const { theme, setTheme } = useThemeManager();
  const { addNotification, clearNotifications } = useNotificationManager();

  const handleShowNotification = (type: 'success' | 'error' | 'info' | 'warning') => {
    const messages = {
      success: 'Операция выполнена успешно!',
      error: 'Произошла ошибка при выполнении операции',
      info: 'Полезная информация для пользователя',
      warning: 'Внимание! Проверьте введенные данные'
    };

    addNotification({
      type,
      title: type === 'success' ? 'Успех' : 
             type === 'error' ? 'Ошибка' :
             type === 'info' ? 'Информация' : 'Предупреждение',
      message: messages[type],
      duration: 3000,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">UI Store Примеры</h2>
      
      <div className="space-y-4">
        {/* Управление темой */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Управление темой</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('light')}
              className={`px-3 py-2 rounded ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Светлая
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-3 py-2 rounded ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Темная
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`px-3 py-2 rounded ${theme === 'system' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Системная
            </button>
          </div>
        </div>

        {/* Уведомления */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Уведомления</h3>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleShowNotification('success')}
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Успех
            </button>
            <button
              onClick={() => handleShowNotification('error')}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Ошибка
            </button>
            <button
              onClick={() => handleShowNotification('info')}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Информация
            </button>
            <button
              onClick={() => handleShowNotification('warning')}
              className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Предупреждение
            </button>
            <button
              onClick={clearNotifications}
              className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Очистить все
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsListExample;
