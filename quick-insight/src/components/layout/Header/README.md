# Header Component

Header компонент для приложения Quick Insight, созданный согласно дизайну из Figma.

## Структура

```
Header/
├── StatusBar.tsx      # Статус-бар с временем и индикаторами
├── Navigation.tsx     # Навигация с кнопками и заголовком
├── index.tsx          # Основной Header компонент
├── Header.example.tsx # Пример использования
└── README.md          # Документация
```

## Использование

### Базовое использование

```tsx
import { Header } from '@/components/layout/Header';

export default function App() {
  return (
    <Header
      onBackClick={() => console.log('Back clicked')}
      onMenuClick={() => console.log('Menu clicked')}
    />
  );
}
```

### С кастомными настройками

```tsx
import { Header } from '@/components/layout/Header';

export default function App() {
  return (
    <Header
      onBackClick={() => router.back()}
      onMenuClick={() => setMenuOpen(true)}
      showBackButton={true}
      showMenuButton={true}
      className="custom-header-class"
    />
  );
}
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `onBackClick` | `() => void` | - | Обработчик клика по кнопке "Назад" |
| `onMenuClick` | `() => void` | - | Обработчик клика по кнопке меню |
| `showBackButton` | `boolean` | `true` | Показывать ли кнопку "Назад" |
| `showMenuButton` | `boolean` | `true` | Показывать ли кнопку меню |
| `className` | `string` | `''` | Дополнительные CSS классы |

## Особенности

### StatusBar
- Автоматически обновляет время каждую минуту
- Показывает индикаторы сотовой связи, Wi-Fi и батареи
- Использует системный шрифт SF Pro для статус-бара
- Анимированное появление элементов

### Navigation
- Кнопки с эффектами hover и tap
- Градиентный фон с размытием
- Анимированное появление заголовка
- Адаптивные иконки из Lucide React

### Общие особенности
- Темная тема с градиентами
- Эффекты размытия (backdrop-blur)
- Плавные анимации с Framer Motion
- Адаптивный дизайн
- Переиспользуемые компоненты

## Стилизация

Компонент использует Tailwind CSS с кастомными градиентами:

```css
/* Основной градиент фона */
bg-gradient-to-b from-[#2E3247] to-[#00153E]

/* Эффекты размытия */
backdrop-blur-sm
bg-black/20

/* Кнопки */
bg-white/10 border border-white/20
hover:bg-white/20
```

## Анимации

- Появление компонента сверху вниз
- Плавные переходы при hover
- Масштабирование при нажатии
- Задержки для последовательного появления элементов

## Интеграция с Telegram

Компонент готов для интеграции с Telegram WebApp API:

```tsx
import { useTelegram } from '@/hooks/useTelegram';

export default function App() {
  const { close, showMainButton } = useTelegram();

  return (
    <Header
      onBackClick={close}
      onMenuClick={() => showMainButton()}
    />
  );
}
```
