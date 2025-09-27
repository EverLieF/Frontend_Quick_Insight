# NewsCard Component

Компонент для отображения карточек новостей с различными вариантами и состояниями.

## Особенности

- 🎨 **Три варианта отображения**: default, compact, featured
- 📱 **Адаптивный дизайн** с градиентными фонами и эффектами размытия
- ⚡ **Анимации** при наведении и взаимодействии
- 🔖 **Поддержка избранного** с анимированными кнопками
- ❤️ **Лайки** с визуальной обратной связью
- 📊 **Статистика** просмотров, лайков, комментариев
- 🏷️ **Теги категорий** с цветовой кодировкой
- 👤 **Информация об авторе** и дате публикации
- 📖 **Статус прочитанности** с визуальными индикаторами
- 🎭 **Состояние загрузки** с анимированными скелетонами

## Использование

### Базовое использование

```tsx
import { NewsCard } from '@/components/news/NewsCard';
import { mockNews } from '@/data/mockNews';

function NewsList() {
  return (
    <div className="space-y-4">
      {mockNews.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          onClick={(article) => console.log('Clicked:', article.title)}
        />
      ))}
    </div>
  );
}
```

### Различные варианты

```tsx
// Featured статья (большая)
<NewsCard
  article={article}
  variant="featured"
  showLikeButton={true}
/>

// Компактная карточка
<NewsCard
  article={article}
  variant="compact"
  showStats={false}
/>

// Обычная карточка
<NewsCard
  article={article}
  variant="default"
/>
```

### Обработка событий

```tsx
<NewsCard
  article={article}
  onRead={(article) => {
    // Пометить как прочитанную
    markAsRead(article.id);
  }}
  onBookmark={(article) => {
    // Добавить/удалить из избранного
    toggleBookmark(article.id);
  }}
  onLike={(article) => {
    // Поставить/убрать лайк
    toggleLike(article.id);
  }}
  onClick={(article) => {
    // Открыть детальную страницу
    router.push(`/news/${article.slug}`);
  }}
/>
```

### Состояние загрузки

```tsx
import { NewsCardSkeleton } from '@/components/news/NewsCard';

function NewsList({ isLoading, articles }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <NewsCardSkeleton key={index} variant="default" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
```

## API

### NewsCard Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `article` | `NewsArticle` | - | **Обязательно.** Данные статьи |
| `variant` | `'default' \| 'compact' \| 'featured'` | `'default'` | Вариант отображения |
| `className` | `string` | - | Дополнительные CSS классы |
| `onRead` | `(article: NewsArticle) => void` | - | Обработчик прочтения |
| `onBookmark` | `(article: NewsArticle) => void` | - | Обработчик избранного |
| `onLike` | `(article: NewsArticle) => void` | - | Обработчик лайков |
| `onClick` | `(article: NewsArticle) => void` | - | Обработчик клика |
| `showStats` | `boolean` | `true` | Показывать статистику |
| `showAuthor` | `boolean` | `true` | Показывать автора |
| `showCategory` | `boolean` | `true` | Показывать категорию |
| `showTags` | `boolean` | `true` | Показывать теги |
| `showReadStatus` | `boolean` | `true` | Показывать статус прочитанности |
| `showBookmarkButton` | `boolean` | `true` | Показывать кнопку избранного |
| `showLikeButton` | `boolean` | `false` | Показывать кнопку лайков |
| `isInteractive` | `boolean` | `true` | Интерактивность карточки |

### NewsCardSkeleton Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `variant` | `'default' \| 'compact' \| 'featured'` | `'default'` | Вариант скелетона |
| `className` | `string` | - | Дополнительные CSS классы |
| `showImage` | `boolean` | `true` | Показывать скелетон изображения |
| `showAuthor` | `boolean` | `true` | Показывать скелетон автора |
| `showTags` | `boolean` | `true` | Показывать скелетон тегов |
| `showStats` | `boolean` | `true` | Показывать скелетон статистики |
| `showBookmarkButton` | `boolean` | `true` | Показывать скелетон кнопки избранного |

## Варианты отображения

### Default
- Стандартный размер карточки
- Полная информация об статье
- Подходит для основных списков новостей

### Compact
- Уменьшенный размер
- Меньше информации
- Подходит для плотных списков

### Featured
- Увеличенный размер
- Больше места для контента
- Подходит для выделенных статей

## Стилизация

Компонент использует дизайн-систему Quick Insight:

- **Фон**: Градиентный с эффектом размытия
- **Цвета**: Темная тема с голубыми акцентами
- **Анимации**: Плавные переходы и hover эффекты
- **Типографика**: Шрифт Onest с различными весами

## Примеры использования

См. файл `NewsCard.example.tsx` для полных примеров использования всех возможностей компонента.

## Зависимости

- `framer-motion` - для анимаций
- `lucide-react` - для иконок
- `@/types/news` - типы данных
- `@/lib/utils/date` - утилиты для работы с датами
- `@/lib/utils/cn` - утилита для объединения CSS классов
