#!/bin/bash

# This script replaces Privy authentication with Dynamic.xyz authentication

echo "Switching from Privy to Dynamic.xyz authentication..."

# Install required packages
npm install @dynamic-labs/sdk-react-core @dynamic-labs/solana

# Replace main.tsx with main.dynamic.tsx
cp client/src/main.dynamic.tsx client/src/main.tsx 

# Replace App.tsx with App.dynamic.tsx
cp client/src/App.dynamic.tsx client/src/App.tsx

# Replace WalletContext.tsx with WalletContext.dynamic.tsx
cp client/src/contexts/WalletContext.dynamic.tsx client/src/contexts/WalletContext.tsx

# Replace SignIn.tsx with DynamicSignIn.tsx
cp client/src/pages/DynamicSignIn.tsx client/src/pages/SignIn.tsx

# Replace ProtectedRoute.tsx with DynamicProtectedRoute.tsx
cp client/src/components/DynamicProtectedRoute.tsx client/src/components/ProtectedRoute.tsx

# Remove SolanaWalletProvider reference from imports in App.tsx
sed -i 's/import { SolanaWalletProvider } from "@\/contexts\/SolanaWalletProvider";//g' client/src/main.tsx

# Execute npm start
echo "Starting the application with Dynamic.xyz authentication..."
npm run dev