# Кастомные хуки

Коллекция переиспользуемых хуков для работы с новостями, фильтрами, бесконечной прокруткой и дебаунсом.

## 📁 Структура

```
src/lib/hooks/
├── useNews.ts           # Хуки для работы с новостями
├── useFilters.ts        # Хуки для работы с фильтрами
├── useInfiniteScroll.ts # Хуки для бесконечной прокрутки
├── useDebounce.ts       # Хуки для дебаунса
├── index.ts            # Централизованный экспорт
└── README.md           # Документация
```

## 🚀 Использование

### Импорт хуков

```tsx
// Импорт отдельных хуков
import { useNews, useFilters, useInfiniteScroll, useDebounce } from '@/lib/hooks';

// Импорт всех хуков
import * as hooks from '@/lib/hooks';
```

## 📰 Хуки для работы с новостями

### `useNews`

Основной хук для работы с новостями. Интегрируется с Zustand store.

```tsx
const {
  articles,
  filteredArticles,
  loading,
  errors,
  pagination,
  actions: { loadArticles, setFilters, markAsRead },
  computed: { isLoading, hasError, isEmpty }
} = useNews({
  autoLoad: true,
  initialFilters: { category: 'politics' }
});

useEffect(() => {
  loadArticles();
}, []);
```

### `useNewsArticle`

Хук для работы с отдельной статьей.

```tsx
const { article, loading, actions: { markAsRead, toggleBookmark } } = useNewsArticle('article-id');
```

### `useNewsCategories`

Хук для работы с категориями новостей.

```tsx
const { categories, loading, actions: { setCategoryFilter } } = useNewsCategories();
```

### `useNewsStats`

Хук для работы со статистикой новостей.

```tsx
const { stats, loading, actions: { refresh } } = useNewsStats();
```

## 🔍 Хуки для работы с фильтрами

### `useFilters`

Основной хук для работы с фильтрами.

```tsx
const {
  activeFilters,
  filterOptions,
  actions: { setFilter, clearAllFilters },
  computed: { hasActiveFilters, filterSummary }
} = useFilters({
  autoInitialize: true,
  initialFilters: { category: 'all' }
});
```

### `useSearch`

Хук для работы с поиском.

```tsx
const { searchQuery, setSearchQuery, clearSearch, searchHistory } = useSearch({
  debounceMs: 300,
  autoAddToHistory: true
});
```

### `useCategoryFilter`

Хук для работы с фильтром категорий.

```tsx
const { categories, selectedCategory, actions: { setCategory, clearCategory } } = useCategoryFilter();
```

### `useTagFilter`

Хук для работы с фильтром тегов.

```tsx
const { tags, selectedTags, actions: { addTag, removeTag, toggleTag } } = useTagFilter();
```

### `useSortFilter`

Хук для работы с сортировкой.

```tsx
const { sortOptions, currentSort, actions: { setSort } } = useSortFilter();
```

### `useSavedFilters`

Хук для работы с сохраненными фильтрами.

```tsx
const { savedFilters, actions: { saveCurrentFilters, loadSavedFilters } } = useSavedFilters();
```

## ♾️ Хуки для бесконечной прокрутки

### `useInfiniteScroll`

Основной хук для бесконечной прокрутки.

```tsx
const {
  sentinelRef,
  isLoading,
  hasMore,
  error,
  retry
} = useInfiniteScroll({
  loadMore: async () => {
    await loadNextPage();
  },
  hasMore: pagination.hasNext,
  isLoading: loading.articles === 'loading',
  threshold: 100,
  debounceMs: 100
});

return (
  <div>
    {articles.map(article => <ArticleCard key={article.id} article={article} />)}
    {hasMore && <div ref={sentinelRef}>Загрузка...</div>}
  </div>
);
```

### `useVirtualizedInfiniteScroll`

Хук для бесконечной прокрутки с виртуализацией.

```tsx
const {
  sentinelRef,
  visibleRange,
  totalHeight,
  offsetY
} = useVirtualizedInfiniteScroll({
  loadMore: async () => await loadNextPage(),
  hasMore: pagination.hasNext,
  isLoading: loading.articles === 'loading',
  itemHeight: 200,
  containerHeight: 600
});
```

### `usePullToRefreshInfiniteScroll`

Хук для бесконечной прокрутки с pull-to-refresh.

```tsx
const {
  sentinelRef,
  isRefreshing,
  refresh,
  pullDistance,
  isPulling
} = usePullToRefreshInfiniteScroll({
  loadMore: async () => await loadNextPage(),
  refresh: async () => await refreshData(),
  hasMore: pagination.hasNext,
  isLoading: loading.articles === 'loading'
});
```

## ⏱️ Хуки для дебаунса

### `useDebounce`

Простой хук для дебаунса значения.

```tsx
const [searchQuery, setSearchQuery] = useState('');
const debouncedQuery = useDebounce(searchQuery, 300);

useEffect(() => {
  if (debouncedQuery) {
    searchArticles(debouncedQuery);
  }
}, [debouncedQuery]);
```

### `useDebounceState`

Расширенный хук для дебаунса с дополнительными опциями.

```tsx
const {
  debouncedValue,
  value,
  setValue,
  flush,
  cancel,
  isPending
} = useDebounceState('', {
  delay: 300,
  leading: true,
  trailing: true,
  maxWait: 1000
});
```

### `useDebouncedCallback`

Хук для дебаунса функции.

```tsx
const debouncedSearch = useDebouncedCallback(
  (query: string) => {
    searchArticles(query);
  },
  300,
  []
);

const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  debouncedSearch(e.target.value);
};
```

### `useDebouncedCallbackWithControls`

Хук для дебаунса функции с возможностью управления.

```tsx
const {
  debouncedCallback,
  cancel,
  flush,
  isPending
} = useDebouncedCallbackWithControls(
  (query: string) => searchArticles(query),
  300,
  []
);
```

### `useDebouncedSearch`

Специализированный хук для дебаунса поиска.

```tsx
const {
  query,
  debouncedQuery,
  setQuery,
  clearQuery,
  isSearching
} = useDebouncedSearch('', 300, (query) => {
  searchArticles(query);
});
```

### `useThrottledCallback`

Хук для throttle-like поведения.

```tsx
const throttledScroll = useThrottledCallback(
  (event: Event) => handleScroll(event),
  100,
  []
);

useEffect(() => {
  window.addEventListener('scroll', throttledScroll);
  return () => window.removeEventListener('scroll', throttledScroll);
}, [throttledScroll]);
```

## 🎯 Примеры использования

### Компонент списка новостей с фильтрами и бесконечной прокруткой

```tsx
import { useNews, useFilters, useInfiniteScroll, useDebounce } from '@/lib/hooks';

function NewsList() {
  const {
    articles,
    loading,
    pagination,
    actions: { loadArticles, setFilters }
  } = useNews();

  const {
    activeFilters,
    actions: { setFilter, clearAllFilters }
  } = useFilters();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const {
    sentinelRef,
    isLoading: isLoadingMore,
    hasMore,
    retry
  } = useInfiniteScroll({
    loadMore: async () => {
      await loadArticles();
    },
    hasMore: pagination.hasNext,
    isLoading: loading.articles === 'loading'
  });

  // Поиск при изменении дебаунсированного запроса
  useEffect(() => {
    setFilters({ search: debouncedQuery });
  }, [debouncedQuery, setFilters]);

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск новостей..."
      />
      
      <div>
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      
      {hasMore && (
        <div ref={sentinelRef}>
          {isLoadingMore ? 'Загрузка...' : 'Загрузить еще'}
        </div>
      )}
    </div>
  );
}
```

### Компонент поиска с автодополнением

```tsx
import { useDebouncedSearch, useSearch } from '@/lib/hooks';

function SearchInput() {
  const {
    query,
    setQuery,
    clearQuery,
    isSearching
  } = useDebouncedSearch('', 300, (query) => {
    searchArticles(query);
  });

  const { searchHistory, actions: { addToSearchHistory } } = useSearch();

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск..."
      />
      
      {isSearching && <div>Поиск...</div>}
      
      {searchHistory.length > 0 && (
        <div>
          <h3>История поиска:</h3>
          {searchHistory.map((item, index) => (
            <button key={index} onClick={() => setQuery(item)}>
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

## 🔧 Настройка

Все хуки интегрируются с существующими Zustand stores:

- `useNewsStore` - для работы с новостями
- `useFilterStore` - для работы с фильтрами

Хуки автоматически подписываются на изменения в stores и обновляют компоненты при изменении состояния.

## 📝 Типизация

Все хуки полностью типизированы с TypeScript и предоставляют:

- Строгую типизацию параметров и возвращаемых значений
- Автодополнение в IDE
- Проверку типов на этапе компиляции
- JSDoc комментарии для документации

## 🚀 Производительность

Хуки оптимизированы для производительности:

- Используют `useMemo` и `useCallback` для предотвращения лишних перерендеров
- Реализуют дебаунс и throttle для оптимизации API вызовов
- Поддерживают виртуализацию для больших списков
- Автоматически очищают таймеры и подписки при размонтировании

## 🧪 Тестирование

Хуки легко тестируются с помощью React Testing Library:

```tsx
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/lib/hooks';

test('useDebounce should debounce value', async () => {
  const { result } = renderHook(() => useDebounce('test', 100));
  
  expect(result.current).toBe('test');
  
  act(() => {
    // Изменяем значение
  });
  
  // Проверяем, что значение обновилось после задержки
});
```
