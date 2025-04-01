/**
 * Base error class for service-related errors
 */
export class ServiceError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

/**
 * Base interface that all services must implement
 */
export interface BaseService {
  /**
   * Initialize the service
   */
  initialize(): Promise<void>;
  
  /**
   * Check if the service is properly configured with all required credentials
   */
  isConfigured(): boolean;
  
  /**
   * Perform a health check to verify the service is working properly
   */
  healthCheck(): Promise<{ status: 'ok' | 'error', message?: string }>;
}