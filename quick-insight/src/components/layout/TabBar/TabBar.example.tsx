'use client';

import { useState } from 'react';
import { TabBar, Tab } from './index';
import { 
  Newspaper, 
  BookOpen, 
  User, 
  Settings,
  Home,
  Search,
  Heart,
  Bell
} from 'lucide-react';

export const TabBarExample = () => {
  const [activeTab, setActiveTab] = useState('news');

  // Пример с дефолтными табами
  const handleDefaultTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log('Активный таб:', tabId);
  };

  // Пример с кастомными табами
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

  const [activeCustomTab, setActiveCustomTab] = useState('home');

  const handleCustomTabChange = (tabId: string) => {
    setActiveCustomTab(tabId);
    console.log('Активный кастомный таб:', tabId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            TabBar Примеры
          </h1>
          <p className="text-gray-400">
            Демонстрация различных конфигураций TabBar
          </p>
        </div>

        {/* Пример 1: Дефолтные табы */}
        <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4">
            Дефолтные табы
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Активный таб: <span className="text-blue-400">{activeTab}</span>
          </p>
          <div className="h-32 bg-gray-700/30 rounded-lg flex items-center justify-center">
            <p className="text-gray-300">
              Контент для таба: {activeTab}
            </p>
          </div>
        </div>

        {/* Пример 2: Кастомные табы */}
        <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4">
            Кастомные табы
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Активный таб: <span className="text-blue-400">{activeCustomTab}</span>
          </p>
          <div className="h-32 bg-gray-700/30 rounded-lg flex items-center justify-center">
            <p className="text-gray-300">
              Контент для таба: {activeCustomTab}
            </p>
          </div>
        </div>

        {/* Пример 3: Скрытый TabBar */}
        <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4">
            Скрытый TabBar
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            TabBar можно скрыть с помощью пропа visible
          </p>
          <div className="h-32 bg-gray-700/30 rounded-lg flex items-center justify-center">
            <p className="text-gray-300">
              TabBar скрыт
            </p>
          </div>
        </div>
      </div>

      {/* Дефолтный TabBar */}
      <TabBar
        activeTab={activeTab}
        onTabChange={handleDefaultTabChange}
      />

      {/* Кастомный TabBar (закомментирован для демонстрации) */}
      {/* 
      <TabBar
        tabs={customTabs}
        activeTab={activeCustomTab}
        onTabChange={handleCustomTabChange}
      />
      */}

      {/* Скрытый TabBar (закомментирован для демонстрации) */}
      {/* 
      <TabBar
        visible={false}
      />
      */}
    </div>
  );
};
