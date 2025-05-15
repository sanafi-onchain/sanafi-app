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
  initialize(): Promise<void>;
  isConfigured(): boolean;
  getConnectionStatus(): Promise<{
    connected: boolean;
    error?: string;
  }>;
  /**
   * Perform a health check to verify the service is working properly
   */
  healthCheck(): Promise<{ status: 'ok' | 'error', message?: string }>;
}