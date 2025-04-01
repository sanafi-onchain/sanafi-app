interface Config {
  // Common configuration
  environment: 'development' | 'production' | 'test';
  
  // Database configuration
  database: {
    url: string;
  };
  
  // Privy wallet integration
  privy: {
    appId: string | undefined;
    secretKey: string | undefined;
  };
  
  // Stripe payments & cards
  stripe: {
    publishableKey: string | undefined;
    secretKey: string | undefined;
    webhookSecret: string | undefined;
  };
  
  // Moonpay fiat on/off ramp
  moonpay: {
    apiKey: string | undefined;
    secretKey: string | undefined;
    webhookKey: string | undefined;
  };
  
  // Jupiter DEX aggregator
  jupiter: {
    referralAccount: string | undefined;
  };
  
  // Dinari tokenized stocks
  dinari: {
    apiKey: string | undefined;
    secretKey: string | undefined;
  };
  
  // Sumsub KYC verification
  sumsub: {
    appToken: string | undefined;
    secretKey: string | undefined;
    webhookSecret: string | undefined;
  };
  
  // Solana blockchain
  solana: {
    rpcUrl: string | undefined;
    rpcToken: string | undefined;
    network: 'mainnet-beta' | 'testnet' | 'devnet'; 
  };
  
  // AI services (if needed)
  ai: {
    apiKey: string | undefined;
  };
}

/**
 * Global configuration object
 */
const config: Config = {
  environment: process.env.NODE_ENV as 'development' | 'production' | 'test' || 'development',
  
  database: {
    url: process.env.DATABASE_URL || '',
  },
  
  privy: {
    appId: process.env.PRIVY_APP_ID,
    secretKey: process.env.PRIVY_SECRET_KEY,
  },
  
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  
  moonpay: {
    apiKey: process.env.MOONPAY_API_KEY,
    secretKey: process.env.MOONPAY_SECRET_KEY,
    webhookKey: process.env.MOONPAY_WEBHOOK_KEY,
  },
  
  jupiter: {
    referralAccount: process.env.JUPITER_REFERRAL_ACCOUNT,
  },
  
  dinari: {
    apiKey: process.env.DINARI_API_KEY,
    secretKey: process.env.DINARI_SECRET_KEY,
  },
  
  sumsub: {
    appToken: process.env.SUMSUB_APP_TOKEN,
    secretKey: process.env.SUMSUB_SECRET_KEY,
    webhookSecret: process.env.SUMSUB_WEBHOOK_SECRET,
  },
  
  solana: {
    rpcUrl: process.env.SOLANA_RPC_URL,
    rpcToken: process.env.SOLANA_RPC_TOKEN,
    network: (process.env.SOLANA_NETWORK || 'devnet') as 'mainnet-beta' | 'testnet' | 'devnet',
  },
  
  ai: {
    apiKey: process.env.AI_API_KEY,
  },
};

/**
 * Helper function to check if a service has all required config values
 */
export const isServiceConfigured = (serviceName: keyof Config): boolean => {
  const serviceConfig = config[serviceName];
  
  if (!serviceConfig) return false;
  
  // Check if any required config value is missing
  return !Object.values(serviceConfig).some(
    (value) => value === undefined || value === null || value === ''
  );
};

export default config;