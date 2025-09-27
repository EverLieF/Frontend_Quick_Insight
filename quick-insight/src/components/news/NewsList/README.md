# NewsList Component

Компонент для отображения списка новостей с поддержкой бесконечной прокрутки, поиска, фильтрации и различных состояний загрузки.

## Особенности

- ✅ **Бесконечная прокрутка** - автоматическая загрузка новых статей при скролле
- ✅ **Pull-to-refresh** - обновление списка потягиванием вниз
- ✅ **Поиск и фильтрация** - интеграция с filterStore
- ✅ **Скелетоны загрузки** - красивые плейсхолдеры во время загрузки
- ✅ **Обработка состояний** - пустые состояния, ошибки, загрузка
- ✅ **Анимации** - плавные переходы и появление карточек
- ✅ **Интеграция с stores** - использование newsStore и filterStore
- ✅ **Моковые данные** - работает с существующими моковыми данными
- ✅ **Настраиваемость** - множество опций для кастомизации

## Использование

### Базовое использование

```tsx
import { NewsList } from '@/components/news/NewsList';

function App() {
  return (
    <NewsList
      onArticleClick={(article) => console.log('Clicked:', article)}
      onBookmark={(article) => console.log('Bookmarked:', article)}
    />
  );
}
```

### Расширенное использование

```tsx
import { NewsList } from '@/components/news/NewsList';

function App() {
  const handleArticleClick = (article) => {
    // Навигация к детальной странице
    router.push(`/news/${article.slug}`);
  };

  const handleBookmark = (article) => {
    // Добавление в закладки
    addToBookmarks(article.id);
  };

  const handleRefresh = () => {
    // Обновление данных
    refetchNews();
  };

  return (
    <NewsList
      cardVariant="default"
      showStats={true}
      showAuthor={true}
      showCategory={true}
      showTags={true}
      showReadStatus={true}
      showBookmarkButton={true}
      showLikeButton={false}
      itemsPerPage={12}
      enableInfiniteScroll={true}
      enablePullToRefresh={true}
      onArticleClick={handleArticleClick}
      onBookmark={handleBookmark}
      onRefresh={handleRefresh}
      onError={(error) => console.error('Error:', error)}
    />
  );
}
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `className` | `string` | - | CSS класс для контейнера |
| `cardVariant` | `'default' \| 'compact' \| 'featured'` | `'default'` | Вариант отображения карточек |
| `showStats` | `boolean` | `true` | Показывать статистику на карточках |
| `showAuthor` | `boolean` | `true` | Показывать автора на карточках |
| `showCategory` | `boolean` | `true` | Показывать категорию на карточках |
| `showTags` | `boolean` | `true` | Показывать теги на карточках |
| `showReadStatus` | `boolean` | `true` | Показывать статус прочтения |
| `showBookmarkButton` | `boolean` | `true` | Показывать кнопку закладки |
| `showLikeButton` | `boolean` | `false` | Показывать кнопку лайка |
| `itemsPerPage` | `number` | `12` | Количество элементов на странице |
| `enableInfiniteScroll` | `boolean` | `true` | Включить бесконечную прокрутку |
| `enablePullToRefresh` | `boolean` | `true` | Включить pull-to-refresh |
| `onArticleClick` | `(article: NewsArticle) => void` | - | Обработчик клика по карточке |
| `onBookmark` | `(article: NewsArticle) => void` | - | Обработчик добавления в закладки |
| `onLike` | `(article: NewsArticle) => void` | - | Обработчик лайка |
| `onMarkAsRead` | `(article: NewsArticle) => void` | - | Обработчик отметки как прочитанной |
| `onRefresh` | `() => void` | - | Обработчик обновления списка |
| `onError` | `(error: Error) => void` | - | Обработчик ошибки |

## Варианты карточек

### Default
Стандартный размер карточки с полной информацией:
- Изображение: 192px высота
- Заголовок: 16px
- Описание: 14px
- Полная статистика

### Compact
Компактный размер для плотного отображения:
- Изображение: 128px высота
- Заголовок: 14px
- Описание: 12px
- Минимальная статистика

### Featured
Расширенный размер для выделенных статей:
- Изображение: 256px высота
- Заголовок: 18px
- Описание: 16px
- Расширенная статистика

## Состояния компонента

### Загрузка
- Показывает скелетоны карточек
- Анимированная индикация загрузки
- Блокирует взаимодействие

### Пустое состояние
- Иконка и сообщение
- Кнопки для очистки фильтров
- Кнопка обновления

### Ошибка
- Иконка ошибки
- Описание проблемы
- Кнопка повторной попытки

### Бесконечная прокрутка
- Автоматическая загрузка при достижении конца
- Индикатор загрузки дополнительных статей
- Обработка ошибок загрузки

## Интеграция с Stores

Компонент автоматически интегрируется с:

### newsStore
- Загрузка статей
- Пагинация
- Отметка как прочитанные
- Добавление в закладки
- Применение фильтров

### filterStore
- Поиск по тексту
- Фильтрация по категориям
- Сортировка
- Сохранение состояния

## Анимации

- **Появление карточек**: плавное появление с задержкой
- **Hover эффекты**: масштабирование и подсветка
- **Переходы состояний**: fade in/out между состояниями
- **Загрузка**: вращающаяся иконка
- **Pull-to-refresh**: анимация обновления

## Производительность

- **Виртуализация**: оптимизация для больших списков
- **Lazy loading**: ленивая загрузка изображений
- **Debounced search**: задержка поисковых запросов
- **Memoization**: кэширование вычислений
- **Intersection Observer**: эффективное отслеживание скролла

## Примеры

Смотрите файл `NewsList.example.tsx` для полных примеров использования:

- Базовое использование
- Компактные карточки
- Расширенные карточки
- Обработка событий

## Зависимости

- `framer-motion` - анимации
- `lucide-react` - иконки
- `zustand` - управление состоянием
- `@/lib/hooks/useInfiniteScroll` - бесконечная прокрутка
- `@/lib/hooks/useDebounce` - дебаунс поиска
- `@/components/news/NewsCard` - карточка новости
- `@/components/news/NewsCard/NewsCardSkeleton` - скелетон

## Тестирование

Компонент готов к тестированию:

```tsx
import { render, screen } from '@testing-library/react';
import { NewsList } from '@/components/news/NewsList';

test('renders news list', () => {
  render(<NewsList />);
  expect(screen.getByRole('list')).toBeInTheDocument();
});
```
