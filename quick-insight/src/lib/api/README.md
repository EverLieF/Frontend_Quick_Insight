# 📡 API Клиент Quick Insight

Полнофункциональный API клиент для приложения Quick Insight с поддержкой TypeScript, обработкой ошибок и моковыми данными.

## 🚀 Быстрый старт

```typescript
import { apiClient, getNews, getCategories, searchNewsByText } from '@/lib/api';

// Получить новости
const news = await getNews({ page: 1, limit: 20 });

// Получить категории
const categories = await getCategories();

// Поиск новостей
const searchResults = await searchNewsByText('политика');
```

## 📁 Структура

```
src/lib/api/
├── client.ts          # Базовый HTTP клиент
├── endpoints.ts       # Константы эндпоинтов
├── types.ts          # TypeScript типы
├── news.ts           # Функции для работы с новостями
├── categories.ts     # Функции для работы с категориями
├── search.ts         # Функции для поиска
├── index.ts          # Главный экспорт
└── README.md         # Документация
```

## 🔧 Конфигурация

### Базовые настройки

```typescript
import { apiClient } from '@/lib/api';

// Обновить конфигурацию
apiClient.updateConfig({
  baseURL: 'https://api.quickinsight.com',
  timeout: 15000,
  useMockData: false,
  headers: {
    'Authorization': 'Bearer your-token',
  },
});
```

### Переменные окружения

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_USE_MOCK_DATA=true
```

## 📰 Работа с новостями

### Получение новостей

```typescript
import { getNews, getNewsById, getNewsBySlug } from '@/lib/api';

// Получить список новостей с пагинацией
const news = await getNews({
  page: 1,
  limit: 20,
  category: 'politics',
  sortBy: 'publishedAt',
  sortOrder: 'desc',
});

// Получить новость по ID
const article = await getNewsById('news-1');

// Получить новость по slug
const article = await getNewsBySlug('new-eu-sanctions-russia-economy');
```

### Фильтрация новостей

```typescript
import { 
  getNewsByCategory, 
  getNewsByAuthor, 
  getReadNews, 
  getUnreadNews,
  getBookmarkedNews 
} from '@/lib/api';

// По категории
const politicsNews = await getNewsByCategory('politics');

// По автору
const authorNews = await getNewsByAuthor('author-1');

// Прочитанные новости
const readNews = await getReadNews();

// Непрочитанные новости
const unreadNews = await getUnreadNews();

// В избранном
const bookmarkedNews = await getBookmarkedNews();
```

### Действия с новостями

```typescript
import { markNewsAsRead, toggleNewsBookmark } from '@/lib/api';

// Отметить как прочитанную
await markNewsAsRead('news-1', {
  readAt: new Date().toISOString(),
});

// Добавить/удалить из избранного
await toggleNewsBookmark('news-1', {
  bookmarked: true,
});
```

## 🏷️ Работа с категориями

```typescript
import { 
  getCategories, 
  getCategoryById, 
  getActiveCategories,
  getFilterCategories 
} from '@/lib/api';

// Получить все категории
const categories = await getCategories();

// Получить категорию по ID
const category = await getCategoryById('politics');

// Получить активные категории
const activeCategories = await getActiveCategories();

// Получить категории для фильтрации
const filterCategories = await getFilterCategories();
```

## 🔍 Поиск

### Текстовый поиск

```typescript
import { searchNewsByText, getSearchSuggestions } from '@/lib/api';

// Поиск по тексту
const results = await searchNewsByText('искусственный интеллект', {
  page: 1,
  limit: 10,
  category: 'science',
});

// Получить предложения для автодополнения
const suggestions = await getSearchSuggestions('поли', 5);
```

### Поиск по параметрам

```typescript
import { 
  searchNewsByCategory,
  searchNewsByTags,
  searchNewsByAuthor,
  searchNewsByDate,
  searchNewsAdvanced 
} from '@/lib/api';

// По категории
const categoryResults = await searchNewsByCategory('politics');

// По тегам
const tagResults = await searchNewsByTags(['tag-1', 'tag-2']);

// По автору
const authorResults = await searchNewsByAuthor('author-1');

// По дате
const dateResults = await searchNewsByDate(
  '2024-01-01',
  '2024-01-31'
);

// Комплексный поиск
const advancedResults = await searchNewsAdvanced({
  q: 'технологии',
  category: 'science',
  tags: ['ai', 'tech'],
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31',
  sortBy: 'views',
  sortOrder: 'desc',
});
```

## 📊 Статистика

```typescript
import { getNewsStats } from '@/lib/api';

// Получить статистику новостей
const stats = await getNewsStats();
console.log(stats.totalArticles);
console.log(stats.mostPopularCategory);
```

## 🛠️ Утилиты

```typescript
import { apiUtils } from '@/lib/api';

// Создать новый клиент
const customClient = apiUtils.createClient({
  baseURL: 'https://custom-api.com',
  timeout: 5000,
});

// Обработка ошибок
try {
  const news = await getNews();
} catch (error) {
  if (apiUtils.isApiError(error)) {
    console.error('API Error:', error.message);
  } else {
    console.error('Unknown error:', apiUtils.getErrorMessage(error));
  }
}

// Повтор запроса с задержкой
const result = await apiUtils.retryWithBackoff(
  () => getNews(),
  3, // максимум 3 попытки
  1000 // базовая задержка 1 секунда
);
```

## 🔄 Моковые данные

API клиент автоматически использует моковые данные в режиме разработки:

```typescript
// В development режиме автоматически используются моковые данные
const news = await getNews(); // Возвращает данные из mockNews.ts

// Принудительно отключить моковые данные
apiClient.updateConfig({ useMockData: false });
```

## 📝 Типы

Все API функции полностью типизированы:

```typescript
import type { 
  GetNewsParams, 
  GetNewsResponse, 
  NewsArticle,
  PaginatedResponse 
} from '@/lib/api';

// Типизированные параметры
const params: GetNewsParams = {
  page: 1,
  limit: 20,
  category: 'politics',
};

// Типизированный ответ
const response: GetNewsResponse = await getNews(params);
const articles: NewsArticle[] = response.data;
```

## 🚨 Обработка ошибок

```typescript
import { ApiError } from '@/lib/api';

try {
  const news = await getNews();
} catch (error) {
  if (error instanceof ApiError) {
    console.error('Status:', error.status);
    console.error('Message:', error.message);
    console.error('Data:', error.data);
  }
}
```

## 🔧 Расширение

### Добавление новых эндпоинтов

```typescript
// В endpoints.ts
export const API_ENDPOINTS = {
  // ... существующие эндпоинты
  COMMENTS: {
    LIST: '/comments',
    BY_ARTICLE: (articleId: string) => `/comments/article/${articleId}`,
  },
};
```

### Добавление новых функций

```typescript
// В comments.ts
export async function getComments(articleId: string) {
  const response = await apiClient.get(
    API_ENDPOINTS.COMMENTS.BY_ARTICLE(articleId)
  );
  return response.data;
}
```

## 🎯 Лучшие практики

1. **Используйте типы**: Всегда импортируйте и используйте TypeScript типы
2. **Обрабатывайте ошибки**: Обязательно обрабатывайте ошибки API
3. **Кэширование**: Используйте кэширование для часто запрашиваемых данных
4. **Пагинация**: Всегда используйте пагинацию для больших списков
5. **Моковые данные**: Используйте моковые данные в разработке

## 📚 Примеры использования

### React Hook для новостей

```typescript
import { useState, useEffect } from 'react';
import { getNews, type GetNewsParams } from '@/lib/api';

export function useNews(params: GetNewsParams = {}) {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const data = await getNews(params);
        setNews(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [params]);

  return { news, loading, error };
}
```

### Компонент поиска

```typescript
import { useState } from 'react';
import { searchNewsByText } from '@/lib/api';

export function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    if (query.trim()) {
      const data = await searchNewsByText(query);
      setResults(data);
    }
  };

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Поиск</button>
      {/* Отображение результатов */}
    </div>
  );
}
```

---

API клиент готов к использованию и легко расширяется для новых функций! 🚀
