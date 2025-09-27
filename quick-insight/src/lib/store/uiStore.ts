import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { 
  Theme, 
  UserSettings, 
  ModalState, 
  Notification, 
  ScreenSize, 
  Breakpoints,
  NavigationItem,
  Breadcrumb,
  Tab,
  AccordionItem,
  Step,
  ProgressState,
  FormStatus,
  FormState,
  PageMetadata,
  AnalyticsEvent
} from '@/types/common';

// Интерфейс состояния UI
interface UIState {
  // Тема и настройки
  theme: Theme;
  userSettings: UserSettings;
  
  // Размер экрана и адаптивность
  screenSize: ScreenSize;
  breakpoints: Breakpoints;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  
  // Модальные окна
  modals: {
    [key: string]: ModalState;
  };
  
  // Уведомления
  notifications: Notification[];
  
  // Навигация
  navigation: {
    items: NavigationItem[];
    activeItem: string | null;
    breadcrumbs: Breadcrumb[];
    isSidebarOpen: boolean;
    isMobileMenuOpen: boolean;
  };
  
  // Вкладки
  tabs: {
    [key: string]: Tab[];
  };
  
  // Аккордеоны
  accordions: {
    [key: string]: AccordionItem[];
  };
  
  // Шаги (stepper)
  steppers: {
    [key: string]: {
      steps: Step[];
      currentStep: number;
    };
  };
  
  // Прогресс
  progress: {
    [key: string]: ProgressState;
  };
  
  // Формы
  forms: {
    [key: string]: FormState;
  };
  
  // Метаданные страницы
  pageMetadata: PageMetadata | null;
  
  // Аналитика
  analytics: {
    events: AnalyticsEvent[];
    isEnabled: boolean;
  };
  
  // Общее состояние загрузки
  globalLoading: boolean;
  
  // Состояние ошибок
  globalError: string | null;
  
  // Состояние успеха
  globalSuccess: string | null;
}

// Интерфейс действий
interface UIActions {
  // Управление темой
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  
  // Управление настройками пользователя
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  resetUserSettings: () => void;
  
  // Управление размером экрана
  setScreenSize: (size: ScreenSize) => void;
  updateBreakpoints: (breakpoints: Partial<Breakpoints>) => void;
  
  // Управление модальными окнами
  openModal: (key: string, data?: any) => void;
  closeModal: (key: string) => void;
  closeAllModals: () => void;
  
  // Управление уведомлениями
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isVisible'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  markNotificationAsRead: (id: string) => void;
  
  // Управление навигацией
  setActiveNavigationItem: (id: string) => void;
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  
  // Управление вкладками
  setActiveTab: (tabGroup: string, tabId: string) => void;
  addTab: (tabGroup: string, tab: Tab) => void;
  removeTab: (tabGroup: string, tabId: string) => void;
  
  // Управление аккордеонами
  toggleAccordionItem: (accordionGroup: string, itemId: string) => void;
  setAccordionItems: (accordionGroup: string, items: AccordionItem[]) => void;
  
  // Управление шагами
  setCurrentStep: (stepperGroup: string, step: number) => void;
  nextStep: (stepperGroup: string) => void;
  previousStep: (stepperGroup: string) => void;
  setSteps: (stepperGroup: string, steps: Step[]) => void;
  
  // Управление прогрессом
  setProgress: (progressGroup: string, progress: ProgressState) => void;
  updateProgress: (progressGroup: string, current: number, total?: number) => void;
  
  // Управление формами
  setFormState: (formId: string, state: FormState) => void;
  updateFormData: (formId: string, data: any) => void;
  setFormErrors: (formId: string, errors: Record<string, string>) => void;
  setFormStatus: (formId: string, status: FormStatus) => void;
  resetForm: (formId: string) => void;
  
  // Управление метаданными страницы
  setPageMetadata: (metadata: PageMetadata) => void;
  clearPageMetadata: () => void;
  
  // Управление аналитикой
  trackEvent: (event: Omit<AnalyticsEvent, 'timestamp'>) => void;
  setAnalyticsEnabled: (enabled: boolean) => void;
  clearAnalyticsEvents: () => void;
  
  // Общее состояние
  setGlobalLoading: (loading: boolean) => void;
  setGlobalError: (error: string | null) => void;
  setGlobalSuccess: (success: string | null) => void;
  
  // Сброс состояния
  reset: () => void;
}

// Начальное состояние
const initialState: UIState = {
  theme: 'system',
  userSettings: {
    theme: 'system',
    language: 'ru',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      showEmail: false,
      showProfile: true,
    },
  },
  
  screenSize: 'lg',
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  
  modals: {},
  
  notifications: [],
  
  navigation: {
    items: [],
    activeItem: null,
    breadcrumbs: [],
    isSidebarOpen: true,
    isMobileMenuOpen: false,
  },
  
  tabs: {},
  accordions: {},
  steppers: {},
  progress: {},
  forms: {},
  
  pageMetadata: null,
  
  analytics: {
    events: [],
    isEnabled: true,
  },
  
  globalLoading: false,
  globalError: null,
  globalSuccess: null,
};

// Создание store
export const useUIStore = create<UIState & UIActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Установка темы
        setTheme: (theme) => {
          set((state) => ({
            theme,
            userSettings: {
              ...state.userSettings,
              theme,
            },
          }));
        },
        
        // Переключение темы
        toggleTheme: () => {
          const currentTheme = get().theme;
          const newTheme = currentTheme === 'light' ? 'dark' : 'light';
          get().setTheme(newTheme);
        },
        
        // Обновление настроек пользователя
        updateUserSettings: (settings) => {
          set((state) => ({
            userSettings: {
              ...state.userSettings,
              ...settings,
            },
          }));
        },
        
        // Сброс настроек пользователя
        resetUserSettings: () => {
          set({ userSettings: initialState.userSettings });
        },
        
        // Установка размера экрана
        setScreenSize: (size) => {
          const breakpoints = get().breakpoints;
          const isMobile = size === 'xs' || size === 'sm';
          const isTablet = size === 'md';
          const isDesktop = size === 'lg' || size === 'xl' || size === '2xl';
          
          set({
            screenSize: size,
            isMobile,
            isTablet,
            isDesktop,
          });
        },
        
        // Обновление breakpoints
        updateBreakpoints: (newBreakpoints) => {
          set((state) => ({
            breakpoints: {
              ...state.breakpoints,
              ...newBreakpoints,
            },
          }));
        },
        
        // Открытие модального окна
        openModal: (key, data) => {
          set((state) => ({
            modals: {
              ...state.modals,
              [key]: {
                isOpen: true,
                data,
              },
            },
          }));
        },
        
        // Закрытие модального окна
        closeModal: (key) => {
          set((state) => ({
            modals: {
              ...state.modals,
              [key]: {
                isOpen: false,
                data: undefined,
              },
            },
          }));
        },
        
        // Закрытие всех модальных окон
        closeAllModals: () => {
          set((state) => {
            const closedModals: typeof state.modals = {};
            Object.keys(state.modals).forEach(key => {
              closedModals[key] = { isOpen: false, data: undefined };
            });
            return { modals: closedModals };
          });
        },
        
        // Добавление уведомления
        addNotification: (notification) => {
          const newNotification: Notification = {
            ...notification,
            id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            isVisible: true,
          };
          
          set((state) => ({
            notifications: [...state.notifications, newNotification],
          }));
          
          // Автоматическое удаление уведомления через указанное время
          if (notification.duration && notification.duration > 0) {
            setTimeout(() => {
              get().removeNotification(newNotification.id);
            }, notification.duration);
          }
        },
        
        // Удаление уведомления
        removeNotification: (id) => {
          set((state) => ({
            notifications: state.notifications.filter(n => n.id !== id),
          }));
        },
        
        // Очистка всех уведомлений
        clearNotifications: () => {
          set({ notifications: [] });
        },
        
        // Отметка уведомления как прочитанного
        markNotificationAsRead: (id) => {
          set((state) => ({
            notifications: state.notifications.map(n => 
              n.id === id ? { ...n, isVisible: false } : n
            ),
          }));
        },
        
        // Установка активного элемента навигации
        setActiveNavigationItem: (id) => {
          set((state) => ({
            navigation: {
              ...state.navigation,
              activeItem: id,
            },
          }));
        },
        
        // Установка хлебных крошек
        setBreadcrumbs: (breadcrumbs) => {
          set((state) => ({
            navigation: {
              ...state.navigation,
              breadcrumbs,
            },
          }));
        },
        
        // Переключение сайдбара
        toggleSidebar: () => {
          set((state) => ({
            navigation: {
              ...state.navigation,
              isSidebarOpen: !state.navigation.isSidebarOpen,
            },
          }));
        },
        
        // Переключение мобильного меню
        toggleMobileMenu: () => {
          set((state) => ({
            navigation: {
              ...state.navigation,
              isMobileMenuOpen: !state.navigation.isMobileMenuOpen,
            },
          }));
        },
        
        // Установка состояния сайдбара
        setSidebarOpen: (isOpen) => {
          set((state) => ({
            navigation: {
              ...state.navigation,
              isSidebarOpen: isOpen,
            },
          }));
        },
        
        // Установка состояния мобильного меню
        setMobileMenuOpen: (isOpen) => {
          set((state) => ({
            navigation: {
              ...state.navigation,
              isMobileMenuOpen: isOpen,
            },
          }));
        },
        
        // Установка активной вкладки
        setActiveTab: (tabGroup, tabId) => {
          set((state) => ({
            tabs: {
              ...state.tabs,
              [tabGroup]: state.tabs[tabGroup]?.map(tab => ({
                ...tab,
                isActive: tab.id === tabId,
              })) || [],
            },
          }));
        },
        
        // Добавление вкладки
        addTab: (tabGroup, tab) => {
          set((state) => ({
            tabs: {
              ...state.tabs,
              [tabGroup]: [...(state.tabs[tabGroup] || []), tab],
            },
          }));
        },
        
        // Удаление вкладки
        removeTab: (tabGroup, tabId) => {
          set((state) => ({
            tabs: {
              ...state.tabs,
              [tabGroup]: state.tabs[tabGroup]?.filter(tab => tab.id !== tabId) || [],
            },
          }));
        },
        
        // Переключение элемента аккордеона
        toggleAccordionItem: (accordionGroup, itemId) => {
          set((state) => ({
            accordions: {
              ...state.accordions,
              [accordionGroup]: state.accordions[accordionGroup]?.map(item => ({
                ...item,
                isOpen: item.id === itemId ? !item.isOpen : item.isOpen,
              })) || [],
            },
          }));
        },
        
        // Установка элементов аккордеона
        setAccordionItems: (accordionGroup, items) => {
          set((state) => ({
            accordions: {
              ...state.accordions,
              [accordionGroup]: items,
            },
          }));
        },
        
        // Установка текущего шага
        setCurrentStep: (stepperGroup, step) => {
          set((state) => ({
            steppers: {
              ...state.steppers,
              [stepperGroup]: {
                ...state.steppers[stepperGroup],
                currentStep: step,
              },
            },
          }));
        },
        
        // Следующий шаг
        nextStep: (stepperGroup) => {
          const stepper = get().steppers[stepperGroup];
          if (stepper && stepper.currentStep < stepper.steps.length - 1) {
            get().setCurrentStep(stepperGroup, stepper.currentStep + 1);
          }
        },
        
        // Предыдущий шаг
        previousStep: (stepperGroup) => {
          const stepper = get().steppers[stepperGroup];
          if (stepper && stepper.currentStep > 0) {
            get().setCurrentStep(stepperGroup, stepper.currentStep - 1);
          }
        },
        
        // Установка шагов
        setSteps: (stepperGroup, steps) => {
          set((state) => ({
            steppers: {
              ...state.steppers,
              [stepperGroup]: {
                steps,
                currentStep: 0,
              },
            },
          }));
        },
        
        // Установка прогресса
        setProgress: (progressGroup, progress) => {
          set((state) => ({
            progress: {
              ...state.progress,
              [progressGroup]: progress,
            },
          }));
        },
        
        // Обновление прогресса
        updateProgress: (progressGroup, current, total) => {
          const existingProgress = get().progress[progressGroup];
          const newProgress: ProgressState = {
            current,
            total: total || existingProgress?.total || 100,
            percentage: Math.round((current / (total || existingProgress?.total || 100)) * 100),
            label: existingProgress?.label,
          };
          
          get().setProgress(progressGroup, newProgress);
        },
        
        // Установка состояния формы
        setFormState: (formId, state) => {
          set((uiState) => ({
            forms: {
              ...uiState.forms,
              [formId]: state,
            },
          }));
        },
        
        // Обновление данных формы
        updateFormData: (formId, data) => {
          set((state) => ({
            forms: {
              ...state.forms,
              [formId]: {
                ...state.forms[formId],
                data: { ...state.forms[formId]?.data, ...data },
                isDirty: true,
              },
            },
          }));
        },
        
        // Установка ошибок формы
        setFormErrors: (formId, errors) => {
          set((state) => ({
            forms: {
              ...state.forms,
              [formId]: {
                ...state.forms[formId],
                errors,
                isValid: Object.keys(errors).length === 0,
              },
            },
          }));
        },
        
        // Установка статуса формы
        setFormStatus: (formId, status) => {
          set((state) => ({
            forms: {
              ...state.forms,
              [formId]: {
                ...state.forms[formId],
                status,
              },
            },
          }));
        },
        
        // Сброс формы
        resetForm: (formId) => {
          set((state) => ({
            forms: {
              ...state.forms,
              [formId]: {
                status: 'idle',
                data: {},
                errors: {},
                isDirty: false,
                isValid: true,
              },
            },
          }));
        },
        
        // Установка метаданных страницы
        setPageMetadata: (metadata) => {
          set({ pageMetadata: metadata });
        },
        
        // Очистка метаданных страницы
        clearPageMetadata: () => {
          set({ pageMetadata: null });
        },
        
        // Отслеживание события аналитики
        trackEvent: (event) => {
          const analyticsEvent: AnalyticsEvent = {
            ...event,
            timestamp: new Date(),
          };
          
          set((state) => ({
            analytics: {
              ...state.analytics,
              events: [...state.analytics.events, analyticsEvent],
            },
          }));
        },
        
        // Включение/выключение аналитики
        setAnalyticsEnabled: (enabled) => {
          set((state) => ({
            analytics: {
              ...state.analytics,
              isEnabled: enabled,
            },
          }));
        },
        
        // Очистка событий аналитики
        clearAnalyticsEvents: () => {
          set((state) => ({
            analytics: {
              ...state.analytics,
              events: [],
            },
          }));
        },
        
        // Установка глобального состояния загрузки
        setGlobalLoading: (loading) => {
          set({ globalLoading: loading });
        },
        
        // Установка глобальной ошибки
        setGlobalError: (error) => {
          set({ globalError: error });
        },
        
        // Установка глобального успеха
        setGlobalSuccess: (success) => {
          set({ globalSuccess: success });
        },
        
        // Сброс состояния
        reset: () => {
          set(initialState);
        },
      }),
      {
        name: 'ui-store',
        partialize: (state) => ({
          theme: state.theme,
          userSettings: state.userSettings,
          breakpoints: state.breakpoints,
          navigation: {
            isSidebarOpen: state.navigation.isSidebarOpen,
          },
          analytics: {
            isEnabled: state.analytics.isEnabled,
          },
        }),
      }
    ),
    {
      name: 'ui-store',
    }
  )
);

// Селекторы для удобного использования
export const useUISelectors = () => {
  const theme = useUIStore((state) => state.theme);
  const userSettings = useUIStore((state) => state.userSettings);
  const screenSize = useUIStore((state) => state.screenSize);
  const isMobile = useUIStore((state) => state.isMobile);
  const isTablet = useUIStore((state) => state.isTablet);
  const isDesktop = useUIStore((state) => state.isDesktop);
  const modals = useUIStore((state) => state.modals);
  const notifications = useUIStore((state) => state.notifications);
  const navigation = useUIStore((state) => state.navigation);
  const pageMetadata = useUIStore((state) => state.pageMetadata);
  const globalLoading = useUIStore((state) => state.globalLoading);
  const globalError = useUIStore((state) => state.globalError);
  const globalSuccess = useUIStore((state) => state.globalSuccess);
  
  return {
    theme,
    userSettings,
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    modals,
    notifications,
    navigation,
    pageMetadata,
    globalLoading,
    globalError,
    globalSuccess,
  };
};

// Хуки для отдельных частей состояния
export const useTheme = () => useUIStore((state) => state.theme);
export const useUserSettings = () => useUIStore((state) => state.userSettings);
export const useScreenSize = () => useUIStore((state) => state.screenSize);
export const useModals = () => useUIStore((state) => state.modals);
export const useNotifications = () => useUIStore((state) => state.notifications);
export const useNavigation = () => useUIStore((state) => state.navigation);
export const usePageMetadata = () => useUIStore((state) => state.pageMetadata);
export const useGlobalLoading = () => useUIStore((state) => state.globalLoading);
export const useGlobalError = () => useUIStore((state) => state.globalError);
export const useGlobalSuccess = () => useUIStore((state) => state.globalSuccess);

// Хуки для проверки состояния
export const useIsMobile = () => useUIStore((state) => state.isMobile);
export const useIsTablet = () => useUIStore((state) => state.isTablet);
export const useIsDesktop = () => useUIStore((state) => state.isDesktop);
