#!/bin/bash

# This script replaces Privy authentication with our simulated Dynamic.xyz authentication

echo "Switching from Privy to simulated Dynamic.xyz authentication..."

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

# Replace Header.tsx with Header.dynamic.tsx
cp client/src/components/Header.dynamic.tsx client/src/components/Header.tsx

# Restart the application with our simulated Dynamic authentication
echo "Starting the application with simulated Dynamic.xyz authentication..."
npm run dev