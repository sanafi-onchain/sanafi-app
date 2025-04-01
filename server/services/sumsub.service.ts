import { BaseService, ServiceError } from './base.service';
import config, { isServiceConfigured } from '../config';

/**
 * Interface for interacting with Sumsub's KYC verification functionality
 */
export interface SumsubService extends BaseService {
  /**
   * Creates a new applicant for KYC verification
   */
  createApplicant(params: {
    externalUserId: string;
    email: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  }): Promise<{ applicantId: string }>;
  
  /**
   * Generates an access token for the verification flow
   */
  generateAccessToken(applicantId: string, ttlInSeconds?: number): Promise<{ token: string, expiresAt: Date }>;
  
  /**
   * Gets the current verification status for an applicant
   */
  getApplicantStatus(applicantId: string): Promise<{
    reviewStatus: 'pending' | 'completed' | 'rejected';
    reviewResult?: 'approved' | 'declined';
    rejectReason?: string;
    completedAt?: Date;
  }>;
  
  /**
   * Handles webhook notifications from Sumsub
   */
  handleWebhook(payload: any, signature: string): Promise<{ handled: boolean, type: string }>;
}

/**
 * Implementation of the Sumsub service for KYC verification functionality
 */
export class SumsubServiceImpl implements SumsubService {
  private initialized = false;
  
  /**
   * Initializes the Sumsub service
   */
  async initialize(): Promise<void> {
    if (!this.isConfigured()) {
      throw new ServiceError('Sumsub service is not properly configured', 500);
    }
    
    // In a real implementation, we would initialize the Sumsub API client here
    
    this.initialized = true;
  }
  
  /**
   * Checks if the Sumsub service is properly configured
   */
  isConfigured(): boolean {
    return isServiceConfigured('sumsub');
  }
  
  /**
   * Performs a health check on the Sumsub service
   */
  async healthCheck(): Promise<{ status: 'ok' | 'error', message?: string }> {
    if (!this.initialized) {
      return { status: 'error', message: 'Sumsub service not initialized' };
    }
    
    if (!this.isConfigured()) {
      return { status: 'error', message: 'Sumsub service not configured' };
    }
    
    try {
      // In a real implementation, we would make a test API call to Sumsub here
      return { status: 'ok' };
    } catch (error) {
      return { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error with Sumsub service'
      };
    }
  }
  
  /**
   * Creates a new applicant for KYC verification
   */
  async createApplicant(params: {
    externalUserId: string;
    email: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  }): Promise<{ applicantId: string }> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // In a real implementation, we would use the Sumsub API to create an applicant
    
    if (!this.isConfigured()) {
      throw new ServiceError('Cannot create applicant: Sumsub service not configured', 500);
    }
    
    // For development/testing without actual API credentials
    if (config.environment === 'development') {
      // Generate a mock applicant ID
      const applicantId = `applicant_${Date.now()}_${params.externalUserId.substring(0, 8)}`;
      return { applicantId };
    }
    
    throw new ServiceError('Sumsub API keys required for applicant creation in production', 500);
  }
  
  /**
   * Generates an access token for the verification flow
   */
  async generateAccessToken(applicantId: string, ttlInSeconds: number = 3600): Promise<{ token: string, expiresAt: Date }> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // In a real implementation, we would use the Sumsub API to generate an access token
    
    if (!this.isConfigured()) {
      throw new ServiceError('Cannot generate access token: Sumsub service not configured', 500);
    }
    
    // For development/testing without actual API credentials
    if (config.environment === 'development') {
      // Generate a mock access token
      const mockToken = `${applicantId}_token_${Date.now()}`;
      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + ttlInSeconds);
      
      return { token: mockToken, expiresAt };
    }
    
    throw new ServiceError('Sumsub API keys required for token generation in production', 500);
  }
  
  /**
   * Gets the current verification status for an applicant
   */
  async getApplicantStatus(applicantId: string): Promise<{
    reviewStatus: 'pending' | 'completed' | 'rejected';
    reviewResult?: 'approved' | 'declined';
    rejectReason?: string;
    completedAt?: Date;
  }> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // In a real implementation, we would use the Sumsub API to get applicant status
    
    if (!this.isConfigured()) {
      throw new ServiceError('Cannot get applicant status: Sumsub service not configured', 500);
    }
    
    // For development/testing without actual API credentials
    if (config.environment === 'development') {
      // Generate mock status based on applicant ID
      const lastChar = applicantId.slice(-1);
      
      if (lastChar === '0') {
        return {
          reviewStatus: 'rejected',
          reviewResult: 'declined',
          rejectReason: 'Document validation failed',
          completedAt: new Date(Date.now() - 86400000) // yesterday
        };
      } else if (lastChar === '1' || lastChar === '2') {
        return {
          reviewStatus: 'pending'
        };
      } else {
        return {
          reviewStatus: 'completed',
          reviewResult: 'approved',
          completedAt: new Date(Date.now() - 3600000) // an hour ago
        };
      }
    }
    
    throw new ServiceError('Sumsub API keys required for status check in production', 500);
  }
  
  /**
   * Handles webhook notifications from Sumsub
   */
  async handleWebhook(payload: any, signature: string): Promise<{ handled: boolean, type: string }> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // In a real implementation, we would verify and process the webhook payload
    
    if (!this.isConfigured()) {
      throw new ServiceError('Cannot handle webhook: Sumsub service not configured', 500);
    }
    
    // For development/testing without actual API credentials
    if (config.environment === 'development') {
      // Simulate webhook handling
      return {
        handled: true,
        type: payload.type || 'applicantReviewed'
      };
    }
    
    throw new ServiceError('Sumsub API keys required for webhook handling in production', 500);
  }
}

// Export singleton instance
export const sumsubService = new SumsubServiceImpl();