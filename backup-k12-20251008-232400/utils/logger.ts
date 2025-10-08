/**
 * Logger utility for development and production
 * Automatically disables logging in production builds
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isProduction = import.meta.env.PROD;
  private isDevelopment = import.meta.env.DEV;

  debug(message: string, ...args: any[]): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    // Always log errors, even in production
    console.error(`[ERROR] ${message}`, ...args);
  }

  log(level: LogLevel, message: string, ...args: any[]): void {
    switch (level) {
      case 'debug':
        this.debug(message, ...args);
        break;
      case 'info':
        this.info(message, ...args);
        break;
      case 'warn':
        this.warn(message, ...args);
        break;
      case 'error':
        this.error(message, ...args);
        break;
    }
  }

  // For critical errors that should always be logged
  critical(message: string, error?: Error, context?: any): void {
    console.error(`[CRITICAL] ${message}`, error, context);
    
    // In production, you might want to send this to an error tracking service
    if (this.isProduction) {
      // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
      // errorTrackingService.captureException(error, { extra: context });
    }
  }
}

export const logger = new Logger();

// Convenience exports for common logging patterns
export const logDebug = (message: string, ...args: any[]) => logger.debug(message, ...args);
export const logInfo = (message: string, ...args: any[]) => logger.info(message, ...args);
export const logWarn = (message: string, ...args: any[]) => logger.warn(message, ...args);
export const logError = (message: string, ...args: any[]) => logger.error(message, ...args);
export const logCritical = (message: string, error?: Error, context?: any) => logger.critical(message, error, context);
