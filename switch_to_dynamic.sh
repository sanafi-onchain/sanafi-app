#!/bin/bash

# This script replaces Privy authentication with our simulated Dynamic.xyz authentication

echo "Switching from Privy to simulated Dynamic.xyz authentication..."

# Make sure all files exist before copying
echo "Checking all required files..."
MISSING_FILES=0

# Check each file before copying
for SRC_FILE in \
  "client/src/main.dynamic.tsx" \
  "client/src/App.dynamic.tsx" \
  "client/src/contexts/WalletContext.dynamic.tsx" \
  "client/src/pages/DynamicSignIn.tsx" \
  "client/src/components/DynamicProtectedRoute.tsx" \
  "client/src/components/Header.dynamic.tsx"
do
  if [ ! -f "$SRC_FILE" ]; then
    echo "ERROR: Source file $SRC_FILE does not exist"
    MISSING_FILES=1
  fi
done

# Exit if any files are missing
if [ $MISSING_FILES -eq 1 ]; then
  echo "One or more source files are missing. Aborting."
  exit 1
fi

# Everything looks good, start copying
echo "All required files found. Beginning migration..."

# Create backups of original files
echo "Creating backups of original files..."
mkdir -p ./backups
cp client/src/main.tsx ./backups/main.tsx.bak
cp client/src/App.tsx ./backups/App.tsx.bak
cp client/src/contexts/WalletContext.tsx ./backups/WalletContext.tsx.bak
cp client/src/pages/SignIn.tsx ./backups/SignIn.tsx.bak
cp client/src/components/ProtectedRoute.tsx ./backups/ProtectedRoute.tsx.bak
cp client/src/components/Header.tsx ./backups/Header.tsx.bak

# Replace main.tsx with main.dynamic.tsx
echo "Replacing main.tsx..."
cp client/src/main.dynamic.tsx client/src/main.tsx 

# Replace App.tsx with App.dynamic.tsx
echo "Replacing App.tsx..."
cp client/src/App.dynamic.tsx client/src/App.tsx

# Replace WalletContext.tsx with WalletContext.dynamic.tsx
echo "Replacing WalletContext.tsx..."
cp client/src/contexts/WalletContext.dynamic.tsx client/src/contexts/WalletContext.tsx

# Replace SignIn.tsx with DynamicSignIn.tsx
echo "Replacing SignIn.tsx..."
cp client/src/pages/DynamicSignIn.tsx client/src/pages/SignIn.tsx

# Replace ProtectedRoute.tsx with DynamicProtectedRoute.tsx
echo "Replacing ProtectedRoute.tsx..."
cp client/src/components/DynamicProtectedRoute.tsx client/src/components/ProtectedRoute.tsx

# Replace Header.tsx with Header.dynamic.tsx
echo "Replacing Header.tsx..."
cp client/src/components/Header.dynamic.tsx client/src/components/Header.tsx

echo "All files have been replaced successfully!"
echo "✅ Migration to simulated Dynamic.xyz authentication complete."
echo ""
echo "Starting the application with simulated Dynamic.xyz authentication..."
npm run dev