# TabBar Компонент

Компонент нижней навигации с поддержкой темной темы, анимаций и кастомизации.

## Особенности

- 🎨 **Темная тема** с градиентами и эффектами размытия
- ✨ **Анимации** с помощью Framer Motion
- 🔧 **Переиспользуемость** с настраиваемыми пропсами
- 📱 **Адаптивность** для мобильных устройств
- ♿ **Доступность** с поддержкой ARIA атрибутов
- 🎯 **TypeScript** с полной типизацией

## Структура файлов

```
TabBar/
├── index.tsx          # Основной TabBar компонент
├── TabItem.tsx        # Отдельный таб с иконкой и подписью
├── TabBar.example.tsx # Примеры использования
└── README.md          # Документация
```

## Использование

### Базовое использование

```tsx
import { TabBar } from '@/components/layout';

function App() {
  const [activeTab, setActiveTab] = useState('news');

  return (
    <TabBar
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}
```

### Кастомные табы

```tsx
import { TabBar, Tab } from '@/components/layout';
import { Home, Search, Heart, Bell } from 'lucide-react';

const customTabs: Tab[] = [
  {
    id: 'home',
    icon: Home,
    label: 'Главная',
  },
  {
    id: 'search',
    icon: Search,
    label: 'Поиск',
  },
  {
    id: 'favorites',
    icon: Heart,
    label: 'Избранное',
  },
  {
    id: 'notifications',
    icon: Bell,
    label: 'Уведомления',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <TabBar
      tabs={customTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}
```

### Скрытие TabBar

```tsx
<TabBar
  visible={false}
/>
```

## API

### TabBar Props

| Проп | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `tabs` | `Tab[]` | `defaultTabs` | Массив табов для отображения |
| `activeTab` | `string` | `'news'` | ID активного таба |
| `onTabChange` | `(tabId: string) => void` | - | Обработчик смены таба |
| `className` | `string` | - | Дополнительные CSS классы |
| `visible` | `boolean` | `true` | Показать ли TabBar |

### Tab Interface

```tsx
interface Tab {
  id: string;           // Уникальный ID таба
  icon: LucideIcon;     // Иконка из Lucide React
  label: string;        // Подпись таба
  data?: any;          // Дополнительные данные
}
```

### TabItem Props

| Проп | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `icon` | `LucideIcon` | - | Иконка таба |
| `label` | `string` | - | Подпись таба |
| `isActive` | `boolean` | `false` | Активен ли таб |
| `onClick` | `() => void` | - | Обработчик клика |
| `className` | `string` | - | Дополнительные CSS классы |
| `id` | `string` | - | ID таба для навигации |

## Дефолтные табы

По умолчанию TabBar включает 4 таба:

1. **Новости** (`news`) - иконка `Newspaper`
2. **Обучение** (`learning`) - иконка `BookOpen`
3. **Профиль** (`profile`) - иконка `User`
4. **Настройки** (`settings`) - иконка `Settings`

## Стилизация

### CSS классы

- `.tab-bar` - основной контейнер TabBar
- `.tab-item` - отдельный таб
- `.tab-item--active` - активный таб
- `.tab-icon` - иконка таба
- `.tab-label` - подпись таба

### Кастомизация

```tsx
<TabBar
  className="custom-tab-bar"
  // ... другие пропсы
/>
```

```css
.custom-tab-bar {
  background: linear-gradient(to top, #1a1a1a, #2a2a2a);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
```

## Анимации

TabBar использует Framer Motion для следующих анимаций:

- **Появление**: плавное появление снизу при загрузке
- **Hover**: масштабирование при наведении
- **Tap**: уменьшение при нажатии
- **Активное состояние**: плавные переходы цветов и эффектов
- **Смена таба**: анимация индикатора активности

## Доступность

- Поддержка клавиатурной навигации
- ARIA атрибуты для скрин-ридеров
- Семантические HTML элементы
- Focus management

## Примеры

Смотрите `TabBar.example.tsx` для полных примеров использования.

## Зависимости

- `framer-motion` - для анимаций
- `lucide-react` - для иконок
- `clsx` - для условных CSS классов
