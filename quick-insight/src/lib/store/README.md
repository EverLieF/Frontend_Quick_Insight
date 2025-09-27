# Zustand Stores для Quick Insight

Этот каталог содержит Zustand stores для управления состоянием приложения Quick Insight.

## 📁 Структура

```
src/lib/store/
├── newsStore.ts      # Управление новостями и статьями
├── filterStore.ts    # Управление фильтрами и поиском
├── uiStore.ts        # Управление UI состоянием
├── index.ts          # Централизованный экспорт
└── README.md         # Документация
```

## 🏪 Stores

### 1. NewsStore (`newsStore.ts`)

Управляет состоянием новостей, статей, загрузкой данных и пагинацией.

**Основные возможности:**
- Загрузка и кэширование новостных статей
- Фильтрация и сортировка статей
- Пагинация с настраиваемым количеством элементов
- Управление избранными и прочитанными статьями
- Поиск по статьям
- Статистика новостей

**Основные хуки:**
```typescript
import { useNewsStore, useNewsSelectors } from '@/lib/store';

// Основной store
const { articles, loadArticles, setFilters } = useNewsStore();

// Селекторы
const { currentPageArticles, pagination, loading } = useNewsSelectors();
```

### 2. FilterStore (`filterStore.ts`)

Управляет фильтрами, поиском и сортировкой.

**Основные возможности:**
- Управление активными фильтрами
- Поиск с историей запросов
- Сохранение и загрузка пользовательских фильтров
- UI состояние фильтров
- Группировка фильтров

**Основные хуки:**
```typescript
import { useFilterStore, useFilterSelectors } from '@/lib/store';

// Основной store
const { setFilter, clearFilters, setSearchQuery } = useFilterStore();

// Селекторы
const { activeFilters, filterOptions, ui } = useFilterSelectors();
```

### 3. UIStore (`uiStore.ts`)

Управляет UI состоянием, темами, модалками и настройками.

**Основные возможности:**
- Управление темой (светлая/темная/системная)
- Настройки пользователя
- Модальные окна
- Уведомления
- Навигация и хлебные крошки
- Адаптивность (мобильные/планшеты/десктоп)
- Формы и их состояние
- Аналитика событий

**Основные хуки:**
```typescript
import { useUIStore, useUISelectors } from '@/lib/store';

// Основной store
const { setTheme, openModal, addNotification } = useUIStore();

// Селекторы
const { theme, notifications, navigation } = useUISelectors();
```

## 🚀 Быстрый старт

### Инициализация stores

```typescript
import { initializeStores } from '@/lib/store';

// Инициализация всех stores при запуске приложения
await initializeStores();
```

### Использование в компонентах

```typescript
import React from 'react';
import { 
  useNewsSelectors, 
  useFilterSelectors, 
  useThemeManager 
} from '@/lib/store';

export const NewsList: React.FC = () => {
  const { currentPageArticles, loading } = useNewsSelectors();
  const { activeFilters } = useFilterSelectors();
  const { isDarkMode } = useThemeManager();

  if (loading.articles === 'loading') {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      {currentPageArticles.map(article => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  );
};
```

## 🔧 Комбинированные хуки

### useGlobalLoading
Получает состояние загрузки из всех stores:
```typescript
const { isLoading, news, global } = useGlobalLoading();
```

### useGlobalErrors
Получает ошибки из всех stores:
```typescript
const { hasErrors, news, global } = useGlobalErrors();
```

### useFilteredNews
Получает отфильтрованные новости с пагинацией:
```typescript
const { articles, pagination, hasActiveFilters } = useFilteredNews();
```

### useThemeManager
Управляет темой с учетом настроек пользователя:
```typescript
const { currentTheme, setTheme, toggleTheme, isDarkMode } = useThemeManager();
```

### useNotificationManager
Управляет уведомлениями:
```typescript
const { showSuccess, showError, showInfo, showWarning } = useNotificationManager();
```

## 💾 Персистентность

Все stores поддерживают персистентность с помощью Zustand middleware:

- **NewsStore**: сохраняет избранные и прочитанные статьи, фильтры, настройки пагинации
- **FilterStore**: сохраняет активные фильтры, историю поиска, сохраненные фильтры
- **UIStore**: сохраняет тему, настройки пользователя, состояние сайдбара

## 🔄 Интеграция с API

Stores готовы для интеграции с реальным API. В текущей реализации используются моковые данные:

```typescript
// В newsStore.ts
loadArticles: async () => {
  // Замените на реальный API вызов
  const response = await fetch('/api/news');
  const articles = await response.json();
  // ...
}
```

## 📊 Типизация

Все stores полностью типизированы с TypeScript:

```typescript
// Автокомплит и проверка типов
const { articles } = useNewsStore(); // articles: NewsArticle[]
const { activeFilters } = useFilterStore(); // activeFilters: NewsFilters
const { theme } = useUIStore(); // theme: Theme
```

## 🧪 Тестирование

Для тестирования stores можно использовать:

```typescript
import { renderHook, act } from '@testing-library/react';
import { useNewsStore } from '@/lib/store';

test('should load articles', async () => {
  const { result } = renderHook(() => useNewsStore());
  
  await act(async () => {
    await result.current.loadArticles();
  });
  
  expect(result.current.articles).toHaveLength(20);
});
```

## 🔧 Утилиты

### Сброс всех stores
```typescript
import { resetAllStores } from '@/lib/store';
resetAllStores();
```

### Получение состояния всех stores
```typescript
import { getAllStoresState } from '@/lib/store';
const allState = getAllStoresState();
```

### Подписка на изменения
```typescript
import { subscribeToAllStores } from '@/lib/store';
const unsubscribe = subscribeToAllStores((state) => {
  console.log('State changed:', state);
});
```

## 📝 Лучшие практики

1. **Используйте селекторы** для получения только нужных данных
2. **Группируйте связанные действия** в одном компоненте
3. **Используйте комбинированные хуки** для упрощения логики
4. **Обрабатывайте состояния загрузки и ошибок**
5. **Используйте персистентность** для улучшения UX

## 🐛 Отладка

Для отладки используйте Redux DevTools (поддерживается через devtools middleware):

```typescript
// В каждом store включен devtools
export const useNewsStore = create<NewsState & NewsActions>()(
  devtools(
    // ...
    { name: 'news-store' }
  )
);
```

## 📚 Дополнительные ресурсы

- [Zustand документация](https://github.com/pmndrs/zustand)
- [TypeScript с Zustand](https://github.com/pmndrs/zustand#typescript)
- [Zustand middleware](https://github.com/pmndrs/zustand#middleware)
