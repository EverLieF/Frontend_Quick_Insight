// Production configuration utilities
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

// Environment variables validation
export const validateEnvVars = () => {
  const requiredVars = [
    'NEXT_PUBLIC_APP_NAME',
    'NEXT_PUBLIC_APP_VERSION',
  ];

  const missingVars = requiredVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0 && isProduction) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
};

// Performance configuration
export const performanceConfig = {
  // Image optimization
  imageQuality: isProduction ? 75 : 90,
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  
  // Caching
  cacheTTL: isProduction ? 60 * 60 * 24 * 7 : 60 * 5, // 7 days in prod, 5 minutes in dev
  
  // Bundle optimization
  enableCodeSplitting: true,
  enableTreeShaking: true,
  enableMinification: isProduction,
  
  // Analytics
  enableAnalytics: isProduction && process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  
  // Error reporting
  enableErrorReporting: isProduction,
  
  // Debug mode
  enableDebugMode: isDevelopment,
};

// Security headers
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

// Cache headers
export const cacheHeaders = {
  static: 'public, max-age=31536000, immutable',
  dynamic: 'public, max-age=300, s-maxage=300',
  api: 'public, max-age=60, s-maxage=60',
};

// Feature flags
export const featureFlags = {
  enablePWA: process.env.NEXT_PUBLIC_ENABLE_PWA === 'true',
  enableOfflineMode: process.env.NEXT_PUBLIC_ENABLE_OFFLINE_MODE === 'true',
  enableLazyLoading: process.env.NEXT_PUBLIC_ENABLE_LAZY_LOADING === 'true',
  enableImageOptimization: process.env.NEXT_PUBLIC_ENABLE_IMAGE_OPTIMIZATION === 'true',
};

// API configuration
export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  retries: isProduction ? 3 : 1,
  retryDelay: 1000,
};

// Logging configuration
export const loggingConfig = {
  level: isProduction ? 'error' : 'debug',
  enableConsole: isDevelopment,
  enableRemote: isProduction,
};
