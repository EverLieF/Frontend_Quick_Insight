# 🚀 Руководство по деплою Quick Insight

## 📋 Предварительные требования

- Node.js 18+
- npm или yarn
- Git
- Аккаунт на платформе деплоя (Vercel, Netlify, etc.)

## 🔧 Подготовка к деплою

### 1. Проверка кода
```bash
# Проверка типов TypeScript
npm run type-check

# Проверка ESLint
npm run lint:check

# Форматирование кода
npm run format

# Запуск тестов
npm run test
```

### 2. Сборка проекта
```bash
# Очистка предыдущих сборок
npm run clean

# Сборка для продакшена
npm run build
```

### 3. Проверка сборки локально
```bash
# Запуск продакшен сборки
npm run start
```

## 🌐 Деплой на Vercel (рекомендуется)

### Автоматический деплой
1. Подключите GitHub репозиторий к Vercel
2. Настройте переменные окружения в Vercel Dashboard
3. Деплой произойдет автоматически при push в main

### Ручной деплой
```bash
# Установка Vercel CLI
npm i -g vercel

# Деплой
vercel

# Продакшен деплой
vercel --prod
```

### Переменные окружения для Vercel
```env
NEXT_PUBLIC_APP_NAME="Quick Insight"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_API_BASE_URL="https://your-api-domain.com/api"
NEXT_PUBLIC_ENABLE_ANALYTICS="true"
NEXT_PUBLIC_ENABLE_PWA="true"
```

## 🐳 Деплой с Docker

### Сборка образа
```bash
# Сборка для продакшена
docker build -t quick-insight .

# Сборка для разработки
docker build -f Dockerfile.dev -t quick-insight:dev .
```

### Запуск контейнера
```bash
# Продакшен
docker run -p 3000:3000 quick-insight

# Разработка
docker run -p 3000:3000 -v $(pwd):/app quick-insight:dev
```

### Docker Compose
```bash
# Продакшен
docker-compose up app

# Разработка
docker-compose up dev
```

## ☁️ Деплой на других платформах

### Netlify
1. Подключите репозиторий к Netlify
2. Настройте build команды:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Настройте переменные окружения

### Railway
1. Подключите GitHub репозиторий
2. Настройте переменные окружения
3. Railway автоматически определит Next.js проект

### DigitalOcean App Platform
1. Создайте новое приложение
2. Подключите GitHub репозиторий
3. Настройте переменные окружения
4. Выберите Node.js runtime

## 🔒 Настройка безопасности

### HTTPS
- Все современные платформы предоставляют HTTPS по умолчанию
- Убедитесь, что SSL сертификат активен

### Заголовки безопасности
Настроены в `next.config.ts`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- Permissions-Policy: ограничения

### Переменные окружения
- Никогда не коммитьте `.env` файлы
- Используйте `.env.example` как шаблон
- Настройте переменные в панели управления платформы

## 📊 Мониторинг и аналитика

### Vercel Analytics
```bash
# Установка Vercel Analytics
npm install @vercel/analytics

# Добавление в layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics
```env
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### Error Monitoring
Рекомендуется интегрировать:
- Sentry
- LogRocket
- Bugsnag

## 🚀 Оптимизация производительности

### Bundle Analysis
```bash
# Анализ размера bundle
npm run analyze
```

### Image Optimization
- Используйте Next.js Image компонент
- Настройте форматы WebP/AVIF
- Оптимизируйте размеры изображений

### Caching
- Настроены заголовки кэширования
- Используйте CDN для статических ресурсов
- Настройте Service Worker для офлайн режима

## 🔄 CI/CD Pipeline

### GitHub Actions
Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint:check
      - run: npm run test
      - run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🐛 Отладка проблем

### Общие проблемы

1. **Build ошибки**
   - Проверьте TypeScript типы: `npm run type-check`
   - Проверьте ESLint: `npm run lint:check`
   - Проверьте зависимости: `npm ci`

2. **Runtime ошибки**
   - Проверьте переменные окружения
   - Проверьте логи в панели управления платформы
   - Используйте ErrorBoundary для отлова ошибок

3. **Performance проблемы**
   - Используйте `npm run analyze` для анализа bundle
   - Проверьте размер изображений
   - Оптимизируйте компоненты

### Логи и мониторинг
- Vercel: Dashboard > Functions > Logs
- Netlify: Site settings > Functions > Logs
- Railway: App > Deployments > Logs

## 📱 PWA настройка

### Manifest
- Файл `public/manifest.json` настроен
- Иконки должны быть в формате PNG
- Размеры: 192x192, 512x512

### Service Worker
- Настроен автоматически Next.js
- Кэширование статических ресурсов
- Офлайн поддержка

## 🔄 Обновления

### Автоматические обновления
- Vercel: автоматически при push в main
- Netlify: автоматически при push в main
- Railway: автоматически при push в main

### Ручные обновления
```bash
# Обновление зависимостей
npm update

# Проверка устаревших пакетов
npm outdated

# Обновление до последних версий
npx npm-check-updates -u
npm install
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи деплоя
2. Проверьте переменные окружения
3. Создайте Issue в репозитории
4. Обратитесь к документации платформы

---

Удачного деплоя! 🚀
