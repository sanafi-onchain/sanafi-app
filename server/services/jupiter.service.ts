import { BaseService } from './base.service';
import fetch from 'node-fetch';
import config from '../config';

/**
 * Jupiter Service for Solana token swaps
 * 
 * This service integrates with Jupiter, the main DEX aggregator on Solana,
 * to provide Sharia-compliant token swapping functionality
 */
export class JupiterService implements BaseService {
  private referralAccount: string | undefined;
  private apiBaseUrl: string = 'https://quote-api.jup.ag/v6';
  private initialized: boolean = false;
  
  constructor() {
    this.referralAccount = config.jupiter.referralAccount;
  }
  
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }
    
    console.log('Initializing Jupiter service');
    
    try {
      // Validate that we can connect to Jupiter API
      const response = await fetch(`${this.apiBaseUrl}/health`);
      
      if (!response.ok) {
        throw new Error(`Jupiter API responded with status: ${response.status}`);
      }
      
      console.log('Jupiter service connected successfully');
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize Jupiter service:', error);
      throw new Error('Failed to connect to Jupiter API');
    }
  }
  
  isConfigured(): boolean {
    return true; // Jupiter doesn't require API keys
  }
  
  async healthCheck(): Promise<{ status: 'ok' | 'error', message?: string }> {
    try {
      // Check if we can reach the Jupiter API
      const response = await fetch(`${this.apiBaseUrl}/health`);
      
      if (!response.ok) {
        return {
          status: 'error',
          message: `Jupiter API responded with status: ${response.status}`
        };
      }
      
      return { status: 'ok' };
    } catch (error) {
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
  
  /**
   * Get a list of top tokens on Jupiter by volume
   */
  async getTopTokens(limit: number = 100): Promise<any[]> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/tokens`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tokens: ${response.status}`);
      }
      
      const data = await response.json() as any;
      return limit ? data.slice(0, limit) : data;
    } catch (error) {
      console.error('Error fetching Jupiter tokens:', error);
      throw error;
    }
  }
  
  /**
   * Get a quote for swapping tokens
   */
  async getQuote(
    inputMint: string,
    outputMint: string,
    amount: string,
    slippageBps: number = 50 // 0.5% slippage by default
  ): Promise<any> {
    try {
      const queryParams = new URLSearchParams({
        inputMint,
        outputMint,
        amount,
        slippageBps: slippageBps.toString(),
        onlyDirectRoutes: 'false',
        asLegacyTransaction: 'false',
      });
      
      if (this.referralAccount) {
        queryParams.append('platformFeeBps', '0'); // No platform fee
        queryParams.append('feeAccount', this.referralAccount);
      }
      
      const response = await fetch(
        `${this.apiBaseUrl}/quote?${queryParams.toString()}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch quote: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching Jupiter quote:', error);
      throw error;
    }
  }
  
  /**
   * Get all routes for a token swap
   */
  async getSwapRoutes(
    inputMint: string,
    outputMint: string,
    amount: string,
    slippageBps: number = 50 // 0.5% slippage by default
  ): Promise<any> {
    try {
      const queryParams = new URLSearchParams({
        inputMint,
        outputMint,
        amount,
        slippageBps: slippageBps.toString(),
        onlyDirectRoutes: 'false',
      });
      
      const response = await fetch(
        `${this.apiBaseUrl}/routes?${queryParams.toString()}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch routes: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching Jupiter routes:', error);
      throw error;
    }
  }
  
  /**
   * Get price for a token pair
   */
  async getPrice(inputMint: string, outputMint: string): Promise<number> {
    try {
      const queryParams = new URLSearchParams({
        ids: `${inputMint},${outputMint}`,
      });
      
      const response = await fetch(
        `${this.apiBaseUrl}/price?${queryParams.toString()}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch price: ${response.status}`);
      }
      
      const data = await response.json() as any;
      return data.data[outputMint] / data.data[inputMint];
    } catch (error) {
      console.error('Error fetching Jupiter price:', error);
      throw error;
    }
  }
}