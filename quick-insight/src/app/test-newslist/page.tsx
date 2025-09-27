'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Modal, AnimatedCard, AnimatedList } from '@/components/ui';
import { NewsList } from '@/components/news/NewsList';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { Header } from '@/components/layout/Header';
import { TabBar } from '@/components/layout/TabBar';

export default function TestNewsListPage() {
  const [activeTab, setActiveTab] = useState('news');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<'demo' | 'settings'>('demo');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const openModal = (content: 'demo' | 'settings') => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-main-gradient">
      {/* Основной контейнер */}
      <div className="max-w-[375px] mx-auto min-h-screen bg-main-gradient relative overflow-hidden">
        {/* Градиентный фон */}
        <div className="absolute inset-0 bg-gradient-radial from-[#2E3247] via-[#00153E] to-black" />
        
        {/* Header */}
        <Header
          onBackClick={() => console.log('Back clicked')}
          onMenuClick={() => openModal('settings')}
          showBackButton={true}
          showMenuButton={true}
        />

        {/* Основной контент */}
        <main className="relative z-10 px-4 pb-24">
          {/* Демо секция с анимациями */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-6 pb-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white font-onest">
                Демо анимаций
              </h1>
              <Button
                onClick={() => openModal('demo')}
                variant="secondary"
                size="sm"
              >
                Демо
              </Button>
            </div>

            {/* Анимированные карточки */}
            <AnimatedList
              staggerDelay={0.1}
              initialDelay={0.3}
              direction="up"
              animationType="slideScale"
              className="space-y-4 mb-6"
            >
              <AnimatedCard
                glassEffect={true}
                gradientBorder={true}
                interactive={true}
                onClick={() => console.log('Card 1 clicked')}
                className="p-4"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Анимированная карточка 1
                </h3>
                <p className="text-white/70 text-sm">
                  Эта карточка демонстрирует плавные анимации появления и взаимодействия.
                </p>
              </AnimatedCard>

              <AnimatedCard
                glassEffect={true}
                gradientBorder={true}
                interactive={true}
                onClick={() => console.log('Card 2 clicked')}
                className="p-4"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Анимированная карточка 2
                </h3>
                <p className="text-white/70 text-sm">
                  Каждая карточка появляется с задержкой, создавая эффект каскада.
                </p>
              </AnimatedCard>

              <AnimatedCard
                glassEffect={true}
                gradientBorder={true}
                interactive={true}
                onClick={() => console.log('Card 3 clicked')}
                className="p-4"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  Анимированная карточка 3
                </h3>
                <p className="text-white/70 text-sm">
                  При наведении карточка поднимается и слегка увеличивается.
                </p>
              </AnimatedCard>
            </AnimatedList>

            {/* Анимированные кнопки */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex gap-3 mb-6"
            >
              <Button
                variant="primary"
                size="md"
                hoverAnimation={true}
                tapAnimation={true}
                appearAnimation={true}
              >
                Основная кнопка
              </Button>
              <Button
                variant="secondary"
                size="md"
                hoverAnimation={true}
                tapAnimation={true}
                appearAnimation={true}
              >
                Вторичная кнопка
              </Button>
            </motion.div>
          </motion.section>

          {/* Фильтры категорий */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mb-6"
          >
            <CategoryFilter
              onCategoryChange={(categoryId) => console.log('Category changed:', categoryId)}
              initialCategory="all"
              showAllOption={true}
            />
          </motion.section>

          {/* Лента новостей */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <NewsList
              cardVariant="default"
              showStats={true}
              showAuthor={true}
              showCategory={true}
              showTags={true}
              showReadStatus={true}
              showBookmarkButton={true}
              showLikeButton={true}
              enableInfiniteScroll={true}
              itemsPerPage={6}
            />
          </motion.section>
        </main>

        {/* TabBar */}
        <TabBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          visible={true}
        />

        {/* Дополнительные эффекты */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Модальные окна */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalContent === 'demo' ? 'Демо анимаций' : 'Настройки'}
        size="md"
        animation="scale"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
        showBackdrop={true}
      >
        {modalContent === 'demo' ? (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                Возможности анимаций
              </h3>
              <ul className="space-y-2 text-white/70">
                <li>• Stagger анимации для списков</li>
                <li>• Hover эффекты для интерактивных элементов</li>
                <li>• Плавные переходы между состояниями</li>
                <li>• Анимации загрузки и скелетоны</li>
                <li>• Модальные окна с анимациями</li>
                <li>• Spring анимации для естественности</li>
              </ul>
            </motion.div>
            
            <motion.div
              className="flex gap-3 pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Button
                variant="primary"
                size="sm"
                onClick={() => console.log('Learn more clicked')}
              >
                Узнать больше
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={closeModal}
              >
                Закрыть
              </Button>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                Настройки приложения
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Темная тема</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Анимации</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Уведомления</span>
                  <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="flex gap-3 pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Button
                variant="primary"
                size="sm"
                onClick={() => console.log('Save clicked')}
              >
                Сохранить
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={closeModal}
              >
                Отмена
              </Button>
            </motion.div>
          </div>
        )}
      </Modal>
    </div>
  );
}