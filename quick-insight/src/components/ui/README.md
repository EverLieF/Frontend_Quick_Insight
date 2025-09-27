# UI Компоненты

Коллекция переиспользуемых UI компонентов для приложения Quick Insight.

## Компоненты

### Button
Кнопка с различными вариантами стилизации.

```tsx
import { Button } from '@/components/ui'

// Основные варианты
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="ghost">Ghost Button</Button>

// Размеры
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Состояния
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
```

### Card
Карточка с различными вариантами отображения.

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui'

<Card variant="default">
  <CardHeader>
    <h3>Заголовок карточки</h3>
  </CardHeader>
  <CardContent>
    <p>Содержимое карточки</p>
  </CardContent>
  <CardFooter>
    <Button>Действие</Button>
  </CardFooter>
</Card>

// Варианты
<Card variant="elevated">Elevated Card</Card>
<Card variant="glass">Glass Card</Card>
```

### Badge
Бейдж для тегов и категорий.

```tsx
import { Badge } from '@/components/ui'

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>

// Размеры
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Skeleton
Скелетон для состояний загрузки.

```tsx
import { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar } from '@/components/ui'

// Базовый скелетон
<Skeleton variant="text" />
<Skeleton variant="rectangular" width={200} height={100} />
<Skeleton variant="circular" width={40} height={40} />

// Предустановленные скелетоны
<SkeletonText lines={3} />
<SkeletonCard />
<SkeletonAvatar size={50} />
```

## Дизайн-система

Все компоненты следуют дизайн-системе приложения:

- **Цвета**: Используют акцентный цвет #56CDFF и градиенты
- **Эффекты**: Backdrop blur, тени с голубым свечением
- **Анимации**: Плавные переходы и hover эффекты
- **Типографика**: Шрифт Onest с различными весами

## Типы

Все компоненты полностью типизированы с TypeScript и поддерживают:
- Строгую типизацию пропсов
- Автодополнение в IDE
- Проверку типов на этапе компиляции
