/// <reference types="vite/client" />

// Declaration for environment variables
interface ImportMetaEnv {
  readonly VITE_PRIVY_APP_ID: string;
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Declare modules that don't have proper typings
declare module '@privy-io/react-auth' {
  import { ReactNode } from 'react';
  
  interface PrivyProviderProps {
    appId: string;
    children: ReactNode;
    config?: {
      loginMethods?: string[];
      appearance?: {
        theme?: 'light' | 'dark';
        accentColor?: string;
        logo?: string;
      };
      externalWallets?: {
        solana?: {
          enabled?: boolean;
          connectors?: any[];
        };
      };
    };
  }

  export function PrivyProvider(props: PrivyProviderProps): JSX.Element;
  
  // Add other exports you might need to use from the module
  export function usePrivy(): any;
}