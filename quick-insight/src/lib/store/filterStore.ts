import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useMemo } from 'react';
import { NewsFilters, NewsCategory, NewsTag } from '@/types/news';
import { FilterOption, FilterGroup, SortOption } from '@/types/common';
import { mockCategories } from '@/data/mockCategories';
import { getAllTags } from '@/data/mockNews';

// Интерфейс состояния для фильтров
interface FilterState {
  // Активные фильтры
  activeFilters: NewsFilters;
  
  // Доступные опции фильтров
  filterOptions: {
    categories: FilterOption[];
    authors: FilterOption[];
    tags: FilterOption[];
    sortOptions: SortOption[];
  };
  
  // Группы фильтров для UI
  filterGroups: FilterGroup[];
  
  // Состояние UI фильтров
  ui: {
    isFiltersOpen: boolean;
    isSearchOpen: boolean;
    searchQuery: string;
    searchSuggestions: string[];
    selectedFiltersCount: number;
  };
  
  // История поиска
  searchHistory: string[];
  
  // Избранные фильтры
  savedFilters: {
    name: string;
    filters: NewsFilters;
    createdAt: Date;
  }[];
}

// Интерфейс действий
interface FilterActions {
  // Управление фильтрами
  setFilter: <K extends keyof NewsFilters>(key: K, value: NewsFilters[K]) => void;
  setFilters: (filters: Partial<NewsFilters>) => void;
  clearFilter: (key: keyof NewsFilters) => void;
  clearAllFilters: () => void;
  resetFilters: () => void;
  
  // Управление поиском
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  
  // Управление UI
  toggleFiltersOpen: () => void;
  toggleSearchOpen: () => void;
  setFiltersOpen: (isOpen: boolean) => void;
  setSearchOpen: (isOpen: boolean) => void;
  
  // Управление сохраненными фильтрами
  saveFilter: (name: string, filters: NewsFilters) => void;
  loadSavedFilter: (name: string) => void;
  deleteSavedFilter: (name: string) => void;
  
  // Инициализация
  initializeFilters: () => void;
  
  // Утилиты
  getActiveFiltersCount: () => number;
  hasActiveFilters: () => boolean;
  getFilterSummary: () => string;
}

// Начальное состояние
const initialState: FilterState = {
  activeFilters: {
    category: undefined,
    author: undefined,
    tags: [],
    dateFrom: undefined,
    dateTo: undefined,
    search: undefined,
    isRead: undefined,
    isBookmarked: undefined,
    sortBy: 'publishedAt',
    sortOrder: 'desc',
  },
  
  filterOptions: {
    categories: [],
    authors: [],
    tags: [],
    sortOptions: [
      { value: 'publishedAt', label: 'По дате публикации', direction: 'desc' },
      { value: 'publishedAt', label: 'По дате публикации (старые)', direction: 'asc' },
      { value: 'views', label: 'По популярности', direction: 'desc' },
      { value: 'likes', label: 'По лайкам', direction: 'desc' },
      { value: 'readTime', label: 'По времени чтения', direction: 'asc' },
    ],
  },
  
  filterGroups: [],
  
  ui: {
    isFiltersOpen: false,
    isSearchOpen: false,
    searchQuery: '',
    searchSuggestions: [],
    selectedFiltersCount: 0,
  },
  
  searchHistory: [],
  savedFilters: [],
};

// Создание store
export const useFilterStore = create<FilterState & FilterActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Установка одного фильтра
        setFilter: (key, value) => {
          set((state) => {
            const newFilters = { ...state.activeFilters, [key]: value };
            const selectedCount = get().getActiveFiltersCount();
            
            return {
              activeFilters: newFilters,
              ui: {
                ...state.ui,
                selectedFiltersCount: selectedCount,
              },
            };
          });
        },
        
        // Установка нескольких фильтров
        setFilters: (filters) => {
          set((state) => {
            const newFilters = { ...state.activeFilters, ...filters };
            const selectedCount = get().getActiveFiltersCount();
            
            return {
              activeFilters: newFilters,
              ui: {
                ...state.ui,
                selectedFiltersCount: selectedCount,
              },
            };
          });
        },
        
        // Очистка одного фильтра
        clearFilter: (key) => {
          set((state) => {
            const newFilters = { ...state.activeFilters, [key]: initialState.activeFilters[key] };
            const selectedCount = get().getActiveFiltersCount();
            
            return {
              activeFilters: newFilters,
              ui: {
                ...state.ui,
                selectedFiltersCount: selectedCount,
              },
            };
          });
        },
        
        // Очистка всех фильтров
        clearAllFilters: () => {
          set((state) => ({
            activeFilters: initialState.activeFilters,
            ui: {
              ...state.ui,
              selectedFiltersCount: 0,
            },
          }));
        },
        
        // Сброс фильтров к начальному состоянию
        resetFilters: () => {
          set((state) => ({
            activeFilters: initialState.activeFilters,
            ui: {
              ...state.ui,
              selectedFiltersCount: 0,
            },
          }));
        },
        
        // Установка поискового запроса
        setSearchQuery: (query) => {
          set((state) => ({
            ui: {
              ...state.ui,
              searchQuery: query,
            },
            activeFilters: {
              ...state.activeFilters,
              search: query || undefined,
            },
          }));
          
          // Обновляем количество активных фильтров
          const selectedCount = get().getActiveFiltersCount();
          set((state) => ({
            ui: {
              ...state.ui,
              selectedFiltersCount: selectedCount,
            },
          }));
        },
        
        // Очистка поиска
        clearSearch: () => {
          set((state) => ({
            ui: {
              ...state.ui,
              searchQuery: '',
            },
            activeFilters: {
              ...state.activeFilters,
              search: undefined,
            },
          }));
          
          const selectedCount = get().getActiveFiltersCount();
          set((state) => ({
            ui: {
              ...state.ui,
              selectedFiltersCount: selectedCount,
            },
          }));
        },
        
        // Добавление в историю поиска
        addToSearchHistory: (query) => {
          if (!query.trim()) return;
          
          set((state) => {
            const history = [query, ...state.searchHistory.filter(item => item !== query)].slice(0, 10);
            return {
              searchHistory: history,
            };
          });
        },
        
        // Очистка истории поиска
        clearSearchHistory: () => {
          set({ searchHistory: [] });
        },
        
        // Переключение открытия фильтров
        toggleFiltersOpen: () => {
          set((state) => ({
            ui: {
              ...state.ui,
              isFiltersOpen: !state.ui.isFiltersOpen,
            },
          }));
        },
        
        // Переключение открытия поиска
        toggleSearchOpen: () => {
          set((state) => ({
            ui: {
              ...state.ui,
              isSearchOpen: !state.ui.isSearchOpen,
            },
          }));
        },
        
        // Установка состояния открытия фильтров
        setFiltersOpen: (isOpen) => {
          set((state) => ({
            ui: {
              ...state.ui,
              isFiltersOpen: isOpen,
            },
          }));
        },
        
        // Установка состояния открытия поиска
        setSearchOpen: (isOpen) => {
          set((state) => ({
            ui: {
              ...state.ui,
              isSearchOpen: isOpen,
            },
          }));
        },
        
        // Сохранение фильтра
        saveFilter: (name, filters) => {
          set((state) => {
            const newSavedFilter = {
              name,
              filters,
              createdAt: new Date(),
            };
            
            const existingIndex = state.savedFilters.findIndex(f => f.name === name);
            let savedFilters;
            
            if (existingIndex >= 0) {
              savedFilters = [...state.savedFilters];
              savedFilters[existingIndex] = newSavedFilter;
            } else {
              savedFilters = [...state.savedFilters, newSavedFilter];
            }
            
            return { savedFilters };
          });
        },
        
        // Загрузка сохраненного фильтра
        loadSavedFilter: (name) => {
          const savedFilter = get().savedFilters.find(f => f.name === name);
          if (savedFilter) {
            get().setFilters(savedFilter.filters);
          }
        },
        
        // Удаление сохраненного фильтра
        deleteSavedFilter: (name) => {
          set((state) => ({
            savedFilters: state.savedFilters.filter(f => f.name !== name),
          }));
        },
        
        // Инициализация фильтров
        initializeFilters: () => {
          // Инициализация категорий
          const categories: FilterOption[] = mockCategories.map(category => ({
            value: category.id,
            label: category.name,
            count: 0, // Будет обновлено при загрузке новостей
          }));
          
          // Инициализация тегов
          const tags: FilterOption[] = getAllTags().map(tag => ({
            value: tag.id,
            label: tag.name,
            count: 0, // Будет обновлено при загрузке новостей
          }));
          
          // Инициализация групп фильтров
          const filterGroups: FilterGroup[] = [
            {
              id: 'category',
              label: 'Категории',
              type: 'single',
              options: categories,
            },
            {
              id: 'tags',
              label: 'Теги',
              type: 'multiple',
              options: tags,
            },
            {
              id: 'status',
              label: 'Статус',
              type: 'single',
              options: [
                { value: 'unread', label: 'Непрочитанные' },
                { value: 'read', label: 'Прочитанные' },
                { value: 'bookmarked', label: 'В избранном' },
              ],
            },
            {
              id: 'date',
              label: 'Дата публикации',
              type: 'range',
              options: [
                { value: 'today', label: 'Сегодня' },
                { value: 'week', label: 'За неделю' },
                { value: 'month', label: 'За месяц' },
                { value: 'year', label: 'За год' },
              ],
            },
          ];
          
          set({
            filterOptions: {
              ...get().filterOptions,
              categories,
              tags,
            },
            filterGroups,
          });
        },
        
        // Получение количества активных фильтров
        getActiveFiltersCount: () => {
          const filters = get().activeFilters;
          let count = 0;
          
          if (filters.category && filters.category !== 'all') count++;
          if (filters.author) count++;
          if (filters.tags && filters.tags.length > 0) count++;
          if (filters.dateFrom) count++;
          if (filters.dateTo) count++;
          if (filters.search) count++;
          if (filters.isRead !== undefined) count++;
          if (filters.isBookmarked !== undefined) count++;
          
          return count;
        },
        
        // Проверка наличия активных фильтров
        hasActiveFilters: () => {
          return get().getActiveFiltersCount() > 0;
        },
        
        // Получение краткого описания активных фильтров
        getFilterSummary: () => {
          const filters = get().activeFilters;
          const parts: string[] = [];
          
          if (filters.category && filters.category !== 'all') {
            const category = mockCategories.find(c => c.id === filters.category);
            if (category) parts.push(`Категория: ${category.name}`);
          }
          
          if (filters.search) {
            parts.push(`Поиск: "${filters.search}"`);
          }
          
          if (filters.tags && filters.tags.length > 0) {
            parts.push(`Теги: ${filters.tags.length}`);
          }
          
          if (filters.isRead !== undefined) {
            parts.push(filters.isRead ? 'Прочитанные' : 'Непрочитанные');
          }
          
          if (filters.isBookmarked !== undefined) {
            parts.push(filters.isBookmarked ? 'В избранном' : 'Не в избранном');
          }
          
          return parts.join(', ') || 'Все новости';
        },
      }),
      {
        name: 'filter-store',
        partialize: (state) => ({
          activeFilters: state.activeFilters,
          searchHistory: state.searchHistory,
          savedFilters: state.savedFilters,
        }),
      }
    ),
    {
      name: 'filter-store',
    }
  )
);

// Селекторы для удобного использования
export const useFilterSelectors = () => {
  const activeFilters = useFilterStore((state) => state.activeFilters);
  const filterOptions = useFilterStore((state) => state.filterOptions);
  const filterGroups = useFilterStore((state) => state.filterGroups);
  const ui = useFilterStore((state) => state.ui);
  const searchHistory = useFilterStore((state) => state.searchHistory);
  const savedFilters = useFilterStore((state) => state.savedFilters);
  
  return {
    activeFilters,
    filterOptions,
    filterGroups,
    ui,
    searchHistory,
    savedFilters,
  };
};

// Хуки для отдельных частей состояния
export const useActiveFilters = () => useFilterStore((state) => state.activeFilters);
export const useFilterUI = () => useFilterStore((state) => state.ui);
export const useSearchHistory = () => useFilterStore((state) => state.searchHistory);
export const useSavedFilters = () => useFilterStore((state) => state.savedFilters);

// Хуки для проверки состояния
export const useHasActiveFilters = () => useFilterStore((state) => state.hasActiveFilters());
export const useActiveFiltersCount = () => useFilterStore((state) => state.getActiveFiltersCount());
export const useFilterSummary = () => useFilterStore((state) => state.getFilterSummary());
