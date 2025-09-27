import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

/**
 * Format date for display in news cards
 */
export function formatNewsDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(dateObj)) {
    return format(dateObj, 'HH:mm');
  }
  
  if (isYesterday(dateObj)) {
    return 'Вчера';
  }
  
  return format(dateObj, 'dd.MM.yyyy');
}

/**
 * Format date for relative time display
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  return formatDistanceToNow(dateObj, {
    addSuffix: true,
    locale: ru,
  });
}

/**
 * Format date for detailed view
 */
export function formatDetailedDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  return format(dateObj, 'dd MMMM yyyy, HH:mm', { locale: ru });
}

/**
 * Calculate reading time based on content length
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Format reading time for display
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '1 мин чтения';
  }
  
  if (minutes < 5) {
    return `${minutes} мин чтения`;
  }
  
  return `${minutes} мин чтения`;
}

/**
 * Check if date is recent (within last 24 hours)
 */
export function isRecent(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  const diffInHours = (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60);
  
  return diffInHours < 24;
}

/**
 * Get date range for filtering
 */
export function getDateRange(days: number): { from: Date; to: Date } {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - days);
  
  return { from, to };
}
