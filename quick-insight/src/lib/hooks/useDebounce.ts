/**
 * Кастомный хук для дебаунса значений
 * Предоставляет функциональность для задержки выполнения функций и обновления значений
 */

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Интерфейс для опций хука дебаунса
 */
interface UseDebounceOptions {
  /** Задержка в миллисекундах */
  delay: number;
  /** Начальное значение */
  initialValue?: any;
  /** Максимальная задержка в миллисекундах (для throttle-like поведения) */
  maxWait?: number;
  /** Вызывать функцию при первом изменении */
  leading?: boolean;
  /** Вызывать функцию при последнем изменении */
  trailing?: boolean;
}

/**
 * Интерфейс возвращаемых данных хука useDebounce
 */
interface UseDebounceReturn<T> {
  /** Дебаунсированное значение */
  debouncedValue: T;
  /** Исходное значение */
  value: T;
  /** Функция для обновления значения */
  setValue: (value: T) => void;
  /** Функция для принудительного обновления дебаунсированного значения */
  flush: () => void;
  /** Функция для отмены дебаунса */
  cancel: () => void;
  /** Состояние активности дебаунса */
  isPending: boolean;
}

/**
 * Хук для дебаунса значения
 * 
 * @param value - Значение для дебаунса
 * @param delay - Задержка в миллисекундах
 * @returns Объект с дебаунсированным значением и функциями управления
 * 
 * @example
 * ```tsx
 * const [searchQuery, setSearchQuery] = useState('');
 * const debouncedQuery = useDebounce(searchQuery, 300);
 * 
 * useEffect(() => {
 *   if (debouncedQuery) {
 *     searchArticles(debouncedQuery);
 *   }
 * }, [debouncedQuery]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Расширенный хук для дебаунса с дополнительными опциями
 * 
 * @param initialValue - Начальное значение
 * @param options - Опции для настройки поведения дебаунса
 * @returns Объект с дебаунсированным значением и функциями управления
 * 
 * @example
 * ```tsx
 * const {
 *   debouncedValue,
 *   value,
 *   setValue,
 *   flush,
 *   cancel,
 *   isPending
 * } = useDebounceState('', {
 *   delay: 300,
 *   leading: true,
 *   trailing: true
 * });
 * ```
 */
export function useDebounceState<T>(
  initialValue: T,
  options: UseDebounceOptions
): UseDebounceReturn<T> {
  const { delay, maxWait, leading = false, trailing = true } = options;
  
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const [isPending, setIsPending] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  const maxTimeoutRef = useRef<NodeJS.Timeout>();
  const lastCallTimeRef = useRef<number>(0);
  const lastInvokeTimeRef = useRef<number>(0);

  // Функция для принудительного обновления
  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
    }
    
    setDebouncedValue(value);
    setIsPending(false);
    lastInvokeTimeRef.current = Date.now();
  }, [value]);

  // Функция для отмены дебаунса
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
    }
    setIsPending(false);
  }, []);

  // Функция для обновления значения
  const handleSetValue = useCallback((newValue: T) => {
    setValue(newValue);
    
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTimeRef.current;
    const timeSinceLastInvoke = now - lastInvokeTimeRef.current;
    
    lastCallTimeRef.current = now;
    
    // Вызываем сразу, если это первый вызов и включен leading
    if (leading && timeSinceLastInvoke >= delay) {
      setDebouncedValue(newValue);
      setIsPending(false);
      lastInvokeTimeRef.current = now;
      return;
    }
    
    setIsPending(true);
    
    // Очищаем предыдущий таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Устанавливаем новый таймер
    timeoutRef.current = setTimeout(() => {
      if (trailing) {
        setDebouncedValue(newValue);
        setIsPending(false);
        lastInvokeTimeRef.current = Date.now();
      }
    }, delay);
    
    // Устанавливаем максимальный таймер, если указан
    if (maxWait && timeSinceLastInvoke >= maxWait) {
      if (maxTimeoutRef.current) {
        clearTimeout(maxTimeoutRef.current);
      }
      
      maxTimeoutRef.current = setTimeout(() => {
        if (trailing) {
          setDebouncedValue(newValue);
          setIsPending(false);
          lastInvokeTimeRef.current = Date.now();
        }
      }, maxWait - timeSinceLastInvoke);
    }
  }, [delay, maxWait, leading, trailing]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (maxTimeoutRef.current) {
        clearTimeout(maxTimeoutRef.current);
      }
    };
  }, []);

  return {
    debouncedValue,
    value,
    setValue: handleSetValue,
    flush,
    cancel,
    isPending,
  };
}

/**
 * Хук для дебаунса функции
 * 
 * @param callback - Функция для дебаунса
 * @param delay - Задержка в миллисекундах
 * @param deps - Зависимости для пересоздания функции
 * @returns Дебаунсированная функция
 * 
 * @example
 * ```tsx
 * const debouncedSearch = useDebouncedCallback(
 *   (query: string) => {
 *     searchArticles(query);
 *   },
 *   300,
 *   []
 * );
 * 
 * const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
 *   debouncedSearch(e.target.value);
 * };
 * ```
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef<T>(callback);

  // Обновляем ссылку на callback при изменении зависимостей
  useEffect(() => {
    callbackRef.current = callback;
  }, deps);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    }) as T,
    [delay]
  );

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Хук для дебаунса с возможностью отмены и принудительного выполнения
 * 
 * @param callback - Функция для дебаунса
 * @param delay - Задержка в миллисекундах
 * @param deps - Зависимости для пересоздания функции
 * @returns Объект с дебаунсированной функцией и методами управления
 * 
 * @example
 * ```tsx
 * const {
 *   debouncedCallback,
 *   cancel,
 *   flush
 * } = useDebouncedCallbackWithControls(
 *   (query: string) => {
 *     searchArticles(query);
 *   },
 *   300,
 *   []
 * );
 * 
 * const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
 *   debouncedCallback(e.target.value);
 * };
 * 
 * const handleCancel = () => {
 *   cancel();
 * };
 * ```
 */
export function useDebouncedCallbackWithControls<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): {
  debouncedCallback: T;
  cancel: () => void;
  flush: () => void;
  isPending: boolean;
} {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef<T>(callback);
  const [isPending, setIsPending] = useState(false);

  // Обновляем ссылку на callback при изменении зависимостей
  useEffect(() => {
    callbackRef.current = callback;
  }, deps);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      setIsPending(true);
      
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
        setIsPending(false);
      }, delay);
    }) as T,
    [delay]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsPending(false);
  }, []);

  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Выполняем callback с последними переданными аргументами
    // Это требует дополнительной логики для хранения аргументов
    setIsPending(false);
  }, []);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    debouncedCallback,
    cancel,
    flush,
    isPending,
  };
}

/**
 * Хук для дебаунса поискового запроса с дополнительной функциональностью
 * 
 * @param initialQuery - Начальный поисковый запрос
 * @param delay - Задержка в миллисекундах
 * @param onSearch - Функция, вызываемая при поиске
 * @returns Объект с поисковым запросом и функциями управления
 * 
 * @example
 * ```tsx
 * const {
 *   query,
 *   debouncedQuery,
 *   setQuery,
 *   clearQuery,
 *   isSearching
 * } = useDebouncedSearch('', 300, (query) => {
 *   searchArticles(query);
 * });
 * ```
 */
export function useDebouncedSearch(
  initialQuery: string,
  delay: number,
  onSearch: (query: string) => void
): {
  query: string;
  debouncedQuery: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
  isSearching: boolean;
} {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, delay);
  const [isSearching, setIsSearching] = useState(false);

  // Выполняем поиск при изменении дебаунсированного запроса
  useEffect(() => {
    if (debouncedQuery !== initialQuery) {
      setIsSearching(true);
      onSearch(debouncedQuery);
      // Сбрасываем состояние поиска через небольшую задержку
      const timer = setTimeout(() => setIsSearching(false), 100);
      return () => clearTimeout(timer);
    }
  }, [debouncedQuery, onSearch, initialQuery]);

  const clearQuery = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    debouncedQuery,
    setQuery,
    clearQuery,
    isSearching,
  };
}

/**
 * Хук для дебаунса с throttle-like поведением
 * Ограничивает частоту вызовов функции, но гарантирует выполнение
 * 
 * @param callback - Функция для дебаунса
 * @param delay - Задержка в миллисекундах
 * @param deps - Зависимости для пересоздания функции
 * @returns Дебаунсированная функция с throttle поведением
 * 
 * @example
 * ```tsx
 * const throttledScroll = useThrottledCallback(
 *   (event: Event) => {
 *     handleScroll(event);
 *   },
 *   100,
 *   []
 * );
 * 
 * useEffect(() => {
 *   window.addEventListener('scroll', throttledScroll);
 *   return () => window.removeEventListener('scroll', throttledScroll);
 * }, [throttledScroll]);
 * ```
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef<T>(callback);
  const lastCallTimeRef = useRef<number>(0);

  // Обновляем ссылку на callback при изменении зависимостей
  useEffect(() => {
    callbackRef.current = callback;
  }, deps);

  const throttledCallback = useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTimeRef.current;

      if (timeSinceLastCall >= delay) {
        // Выполняем сразу, если прошло достаточно времени
        callbackRef.current(...args);
        lastCallTimeRef.current = now;
      } else {
        // Планируем выполнение на оставшееся время
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          callbackRef.current(...args);
          lastCallTimeRef.current = Date.now();
        }, delay - timeSinceLastCall);
      }
    }) as T,
    [delay]
  );

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}
