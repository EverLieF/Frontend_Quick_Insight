import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names
 * Combines clsx with conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Utility function to create variant-based class names
 */
export function createVariants<T extends Record<string, Record<string, string>>>(
  variants: T
) {
  return function getVariantClasses(
    variantProps: {
      [K in keyof T]?: keyof T[K];
    }
  ) {
    const classes: string[] = [];
    
    Object.entries(variantProps).forEach(([key, value]) => {
      if (value && variants[key] && variants[key][value as string]) {
        classes.push(variants[key][value as string]);
      }
    });
    
    return classes.join(' ');
  };
}

/**
 * Utility function to create responsive class names
 */
export function responsive(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
) {
  const classes = [base];
  
  if (sm) classes.push(`sm:${sm}`);
  if (md) classes.push(`md:${md}`);
  if (lg) classes.push(`lg:${lg}`);
  if (xl) classes.push(`xl:${xl}`);
  
  return classes.join(' ');
}

/**
 * Utility function to create conditional class names
 */
export function conditional(
  condition: boolean,
  trueClass: string,
  falseClass?: string
) {
  return condition ? trueClass : falseClass || '';
}

/**
 * Utility function to create animation class names
 */
export function animate(
  animation: 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn' | 'bounce',
  delay?: number
) {
  const baseClass = `animate-${animation}`;
  return delay ? `${baseClass} delay-${delay}` : baseClass;
}
