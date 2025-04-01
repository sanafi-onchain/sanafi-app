import { BaseService } from './base.service';

/**
 * Service Manager maintains a registry of all available services
 * and provides methods to access and manage them
 */
class ServiceManager {
  private services: Map<string, BaseService> = new Map();
  private initialized: boolean = false;
  
  constructor() {
    console.log('Service manager created');
  }
  
  /**
   * Register a service with the manager
   */
  registerService(name: string, service: BaseService): void {
    if (this.services.has(name)) {
      console.warn(`Service with name "${name}" is already registered. Overwriting.`);
    }
    this.services.set(name, service);
    console.log(`Service "${name}" registered`);
  }
  
  /**
   * Get a service by name
   */
  getService<T extends BaseService>(name: string): T | undefined {
    return this.services.get(name) as T | undefined;
  }
  
  /**
   * Initialize all registered services
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      console.log('Service manager already initialized');
      return;
    }
    
    console.log('Initializing services...');
    
    for (const [name, service] of this.services.entries()) {
      try {
        await service.initialize();
        console.log(`Service "${name}" initialized`);
      } catch (error) {
        console.error(`Failed to initialize service "${name}":`, error);
      }
    }
    
    this.initialized = true;
    console.log('All services initialized');
  }
  
  /**
   * Get status of all registered services
   */
  async getServicesStatus(): Promise<Array<{
    name: string;
    status: 'ok' | 'error';
    message?: string;
    isConfigured: boolean;
    lastChecked: string;
  }>> {
    const statuses = [];
    
    for (const [name, service] of this.services.entries()) {
      try {
        const isConfigured = service.isConfigured();
        let status = { status: 'error' as const, message: 'Service not initialized' };
        
        if (isConfigured) {
          status = await service.healthCheck();
        } else {
          status = { 
            status: 'error' as const, 
            message: 'Service not properly configured. Missing API credentials or environment variables.' 
          };
        }
        
        statuses.push({
          name,
          status: status.status,
          message: status.message,
          isConfigured,
          lastChecked: new Date().toISOString()
        });
      } catch (error) {
        statuses.push({
          name,
          status: 'error' as const,
          message: error instanceof Error ? error.message : 'Unknown error',
          isConfigured: false,
          lastChecked: new Date().toISOString()
        });
      }
    }
    
    return statuses;
  }
  
  /**
   * Get a list of all registered service names
   */
  getServiceNames(): string[] {
    return Array.from(this.services.keys());
  }
}

export const serviceManager = new ServiceManager();