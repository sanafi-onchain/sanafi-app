// Global type definitions for browser extensions and injected objects

interface PhantomProvider {
  isPhantom?: boolean;
  connect: (options?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
}

interface SolflareProvider {
  isSolflare?: boolean;
  connect: (options?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
}

interface Window {
  // Phantom wallet
  solana?: PhantomProvider;
  
  // Solflare wallet
  solflare?: SolflareProvider;
}