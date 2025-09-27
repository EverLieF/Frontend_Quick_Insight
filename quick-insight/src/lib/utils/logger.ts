/**
 * Утилита для логирования в приложении
 * Поддерживает разные уровни логирования и может быть легко настроена
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableAnalytics: boolean;
}

class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: LogLevel.INFO,
      enableConsole: process.env.NODE_ENV === 'development',
      enableAnalytics: false,
      ...config,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  private formatMessage(level: string, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  private log(level: LogLevel, levelName: string, message: string, ...args: any[]): void {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(levelName, message, ...args);

    if (this.config.enableConsole) {
      switch (level) {
        case LogLevel.DEBUG:
          console.debug(formattedMessage, ...args);
          break;
        case LogLevel.INFO:
          console.info(formattedMessage, ...args);
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage, ...args);
          break;
        case LogLevel.ERROR:
          console.error(formattedMessage, ...args);
          break;
      }
    }

    // Здесь можно добавить отправку в аналитику
    if (this.config.enableAnalytics && level >= LogLevel.WARN) {
      // Отправка в аналитику для ошибок и предупреждений
      this.sendToAnalytics(levelName, message, args);
    }
  }

  private sendToAnalytics(level: string, message: string, args: any[]): void {
    // Реализация отправки в аналитику
    // Например, в Google Analytics, Sentry и т.д.
  }

  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.DEBUG, 'DEBUG', message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, 'INFO', message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, 'WARN', message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log(LogLevel.ERROR, 'ERROR', message, ...args);
  }

  // Специальные методы для разных типов событий
  userAction(action: string, data?: any): void {
    this.info(`User action: ${action}`, data);
  }

  apiCall(method: string, url: string, status?: number, duration?: number): void {
    this.info(`API ${method} ${url}`, { status, duration });
  }

  navigation(from: string, to: string): void {
    this.info(`Navigation: ${from} -> ${to}`);
  }

  performance(metric: string, value: number, unit: string = 'ms'): void {
    this.info(`Performance: ${metric} = ${value}${unit}`);
  }
}

// Создаем глобальный экземпляр логгера
export const logger = new Logger({
  level: process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO,
  enableConsole: process.env.NODE_ENV === 'development',
  enableAnalytics: process.env.NODE_ENV === 'production',
});

// Экспортируем типы для использования в других файлах
export type { LoggerConfig };
