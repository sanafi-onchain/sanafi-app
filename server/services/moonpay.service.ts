import { BaseService, ServiceError } from './base.service';
import config, { isServiceConfigured } from '../config';

/**
 * Interface for interacting with Moonpay's fiat on/off ramp functionality
 */
export interface MoonpayService extends BaseService {
  /**
   * Generates a URL for the Moonpay widget to buy crypto
   */
  generateBuyUrl(params: {
    baseCurrencyCode: string; // e.g., 'usd'
    baseCurrencyAmount?: number;
    quoteCurrencyCode: string; // e.g., 'sol', 'usdc_sol'
    walletAddress: string;
    redirectUrl?: string;
    email?: string;
  }): Promise<{ url: string }>;
  
  /**
   * Generates a URL for the Moonpay widget to sell crypto
   */
  generateSellUrl(params: {
    baseCurrencyCode: string; // e.g., 'sol', 'usdc_sol'
    quoteCurrencyCode: string; // e.g., 'usd'
    walletAddress: string;
    redirectUrl?: string;
    email?: string;
  }): Promise<{ url: string }>;
  
  /**
   * Handles webhook notifications from Moonpay
   */
  handleWebhook(payload: any, signature: string): Promise<{ handled: boolean, type: string }>;
  
  /**
   * Gets transaction status
   */
  getTransactionStatus(transactionId: string): Promise<{
    status: 'pending' | 'completed' | 'failed';
    amountReceived?: number;
    fee?: number;
  }>;
}

/**
 * Implementation of the Moonpay service for fiat on/off ramp functionality
 */
export class MoonpayServiceImpl implements MoonpayService {
  private initialized = false;
  
  /**
   * Initializes the Moonpay service
   */
  async initialize(): Promise<void> {
    if (!this.isConfigured()) {
      throw new ServiceError('Moonpay service is not properly configured', 500);
    }
    
    // In a real implementation, we would initialize the Moonpay API client here
    
    this.initialized = true;
  }
  
  /**
   * Checks if the Moonpay service is properly configured
   */
  isConfigured(): boolean {
    return isServiceConfigured('moonpay');
  }
  
  /**
   * Performs a health check on the Moonpay service
   */
  async healthCheck(): Promise<{ status: 'ok' | 'error', message?: string }> {
    if (!this.initialized) {
      return { status: 'error', message: 'Moonpay service not initialized' };
    }
    
    if (!this.isConfigured()) {
      return { status: 'error', message: 'Moonpay service not configured' };
    }
    
    try {
      // In a real implementation, we would make a test API call to Moonpay here
      return { status: 'ok' };
    } catch (error) {
      return { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error with Moonpay service'
      };
    }
  }
  
  /**
   * Generates a URL for the Moonpay widget to buy crypto
   */
  async generateBuyUrl(params: {
    baseCurrencyCode: string;
    baseCurrencyAmount?: number;
    quoteCurrencyCode: string;
    walletAddress: string;
    redirectUrl?: string;
    email?: string;
  }): Promise<{ url: string }> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // In a real implementation, we would use the Moonpay API to generate a buy URL
    
    if (!this.isConfigured()) {
      throw new ServiceError('Cannot generate buy URL: Moonpay service not configured', 500);
    }
    
    // For development/testing without actual API credentials
    if (config.environment === 'development') {
      // Generate a mock buy URL
      const baseUrl = 'https://buy.moonpay.com';
      const queryParams = new URLSearchParams({
        apiKey: 'demo_api_key',
        currencyCode: params.quoteCurrencyCode,
        walletAddress: params.walletAddress,
        baseCurrencyCode: params.baseCurrencyCode,
      });
      
      if (params.baseCurrencyAmount) {
        queryParams.append('baseCurrencyAmount', params.baseCurrencyAmount.toString());
      }
      
      if (params.redirectUrl) {
        queryParams.append('redirectURL', params.redirectUrl);
      }
      
      if (params.email) {
        queryParams.append('email', params.email);
      }
      
      return { url: `${baseUrl}?${queryParams.toString()}` };
    }
    
    throw new ServiceError('Moonpay API keys required for buy URL generation in production', 500);
  }
  
  /**
   * Generates a URL for the Moonpay widget to sell crypto
   */
  async generateSellUrl(params: {
    baseCurrencyCode: string;
    quoteCurrencyCode: string;
    walletAddress: string;
    redirectUrl?: string;
    email?: string;
  }): Promise<{ url: string }> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // In a real implementation, we would use the Moonpay API to generate a sell URL
    
    if (!this.isConfigured()) {
      throw new ServiceError('Cannot generate sell URL: Moonpay service not configured', 500);
    }
    
    // For development/testing without actual API credentials
    if (config.environment === 'development') {
      // Generate a mock sell URL
      const baseUrl = 'https://sell.moonpay.com';
      const queryParams = new URLSearchParams({
        apiKey: 'demo_api_key',
        baseCurrencyCode: params.baseCurrencyCode,
        quoteCurrencyCode: params.quoteCurrencyCode,
        walletAddress: params.walletAddress,
      });
      
      if (params.redirectUrl) {
        queryParams.append('redirectURL', params.redirectUrl);
      }
      
      if (params.email) {
        queryParams.append('email', params.email);
      }
      
      return { url: `${baseUrl}?${queryParams.toString()}` };
    }
    
    throw new ServiceError('Moonpay API keys required for sell URL generation in production', 500);
  }
  
  /**
   * Handles webhook notifications from Moonpay
   */
  async handleWebhook(payload: any, signature: string): Promise<{ handled: boolean, type: string }> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // In a real implementation, we would verify and process the webhook payload
    
    if (!this.isConfigured()) {
      throw new ServiceError('Cannot handle webhook: Moonpay service not configured', 500);
    }
    
    // For development/testing without actual API credentials
    if (config.environment === 'development') {
      // Simulate webhook handling
      return {
        handled: true,
        type: payload.type || 'transaction_updated'
      };
    }
    
    throw new ServiceError('Moonpay API keys required for webhook handling in production', 500);
  }
  
  /**
   * Gets transaction status
   */
  async getTransactionStatus(transactionId: string): Promise<{
    status: 'pending' | 'completed' | 'failed';
    amountReceived?: number;
    fee?: number;
  }> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // In a real implementation, we would use the Moonpay API to check transaction status
    
    if (!this.isConfigured()) {
      throw new ServiceError('Cannot get transaction status: Moonpay service not configured', 500);
    }
    
    // For development/testing without actual API credentials
    if (config.environment === 'development') {
      // Generate mock transaction status based on transaction ID
      const lastChar = transactionId.slice(-1);
      const status = lastChar === '0' ? 'failed' : (lastChar === '5' ? 'pending' : 'completed');
      
      return {
        status: status as 'pending' | 'completed' | 'failed',
        amountReceived: status === 'completed' ? 100 : undefined,
        fee: status === 'completed' ? 3.5 : undefined
      };
    }
    
    throw new ServiceError('Moonpay API keys required for transaction status check in production', 500);
  }
}

// Export singleton instance
export const moonpayService = new MoonpayServiceImpl();