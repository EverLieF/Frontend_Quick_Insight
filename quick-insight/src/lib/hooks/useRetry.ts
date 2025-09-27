import { useState, useCallback } from 'react';
import { logger } from '@/lib/utils/logger';

export interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoffMultiplier?: number;
  maxDelay?: number;
}

export interface RetryState {
  isRetrying: boolean;
  attempt: number;
  lastError: Error | null;
  canRetry: boolean;
}

/**
 * Хук для реализации retry логики с экспоненциальным backoff
 */
export function useRetry<T extends any[], R>(
  asyncFunction: (...args: T) => Promise<R>,
  options: RetryOptions = {}
) {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoffMultiplier = 2,
    maxDelay = 10000,
  } = options;

  const [state, setState] = useState<RetryState>({
    isRetrying: false,
    attempt: 0,
    lastError: null,
    canRetry: true,
  });

  const calculateDelay = useCallback((attempt: number): number => {
    const calculatedDelay = delay * Math.pow(backoffMultiplier, attempt - 1);
    return Math.min(calculatedDelay, maxDelay);
  }, [delay, backoffMultiplier, maxDelay]);

  const executeWithRetry = useCallback(async (...args: T): Promise<R> => {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      setState(prev => ({
        ...prev,
        isRetrying: attempt > 1,
        attempt,
        lastError: null,
        canRetry: attempt < maxAttempts,
      }));

      try {
        logger.debug(`Retry attempt ${attempt}/${maxAttempts}`);
        const result = await asyncFunction(...args);
        
        setState(prev => ({
          ...prev,
          isRetrying: false,
          attempt: 0,
          lastError: null,
          canRetry: true,
        }));

        if (attempt > 1) {
          logger.info(`Retry successful on attempt ${attempt}`);
        }

        return result;
      } catch (error) {
        lastError = error as Error;
        logger.warn(`Retry attempt ${attempt} failed:`, error);

        setState(prev => ({
          ...prev,
          lastError: lastError,
          canRetry: attempt < maxAttempts,
        }));

        // Если это не последняя попытка, ждем перед следующей
        if (attempt < maxAttempts) {
          const waitTime = calculateDelay(attempt);
          logger.debug(`Waiting ${waitTime}ms before next attempt`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }

    // Все попытки исчерпаны
    setState(prev => ({
      ...prev,
      isRetrying: false,
      canRetry: false,
    }));

    logger.error(`All ${maxAttempts} retry attempts failed`);
    throw lastError;
  }, [asyncFunction, maxAttempts, calculateDelay]);

  const reset = useCallback(() => {
    setState({
      isRetrying: false,
      attempt: 0,
      lastError: null,
      canRetry: true,
    });
  }, []);

  return {
    executeWithRetry,
    reset,
    ...state,
  };
}

/**
 * Хук для простого retry с фиксированной задержкой
 */
export function useSimpleRetry<T extends any[], R>(
  asyncFunction: (...args: T) => Promise<R>,
  maxAttempts: number = 3,
  delay: number = 1000
) {
  return useRetry(asyncFunction, {
    maxAttempts,
    delay,
    backoffMultiplier: 1,
  });
}

/**
 * Хук для retry с экспоненциальным backoff
 */
export function useExponentialBackoffRetry<T extends any[], R>(
  asyncFunction: (...args: T) => Promise<R>,
  maxAttempts: number = 5,
  initialDelay: number = 1000,
  maxDelay: number = 30000
) {
  return useRetry(asyncFunction, {
    maxAttempts,
    delay: initialDelay,
    backoffMultiplier: 2,
    maxDelay,
  });
}
