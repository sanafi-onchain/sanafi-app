# Privy Documentation

## Overview
Privy is a wallet-as-a-service platform that allows you to integrate web3 authentication and wallet management into your application. It provides a simple way to connect with various wallet providers, including Solana wallets.

## Integration
The Sanafi platform uses Privy for user authentication and wallet connection. This documentation covers the key components of the Privy integration.

### Key Features
- Wallet connection via Privy
- Email-based authentication
- Secure wallet operations
- Authorization signatures for secure API requests

## API Keys Required
To use Privy in your application, you need the following keys:
- `PRIVY_APP_ID`: The ID of your Privy application
- `PRIVY_SECRET_KEY`: The secret key for your Privy application

These should be stored as environment variables and not exposed in your client-side code.

## Installation
```bash
npm install @privy-io/react-auth
```

For server-side operations:
```bash
npm install @privy-io/server-auth
```

## Basic Usage

### Client-Side Configuration
```typescript
import { PrivyProvider } from '@privy-io/react-auth';

function App() {
  return (
    <PrivyProvider
      appId={process.env.PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#1b4d3e',
          logo: 'path/to/your/logo.png',
        },
        externalWallets: {
          solana: {
            enabled: true,
          },
        }
      }}
    >
      <YourApp />
    </PrivyProvider>
  );
}
```

### Using Privy in Components
```typescript
import { usePrivy } from '@privy-io/react-auth';

function YourComponent() {
  const privy = usePrivy();
  
  // Check if user is authenticated
  const isAuthenticated = privy.authenticated;
  
  // Login function
  const handleLogin = () => {
    privy.login();
  };
  
  // Logout function
  const handleLogout = () => {
    privy.logout();
  };
  
  // Connect wallet function
  const handleConnectWallet = () => {
    privy.connectWallet();
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      <button onClick={handleConnectWallet}>Connect Wallet</button>
    </div>
  );
}
```

## Server-Side Integration
For server-side operations, you'll need to use the `@privy-io/server-auth` package.

```typescript
import { PrivyClient } from '@privy-io/server-auth';

const privy = new PrivyClient(
  process.env.PRIVY_APP_ID,
  process.env.PRIVY_SECRET_KEY
);

// Example: Get user information
async function getUserInfo(userId) {
  const user = await privy.getUser(userId);
  return user;
}
```

## Wallet Integration
When a user connects their wallet via Privy, you can access the wallet information through the Privy user object.

```typescript
const walletAddress = privy.user?.wallet?.address;
const isWalletConnected = Boolean(walletAddress);
```

## Protected Routes
You can create protected routes that require a Privy authentication.

```typescript
function ProtectedRoute({ children }) {
  const { isAuthenticated, isReady } = usePrivy();
  
  if (!isReady) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    // Redirect to login page
    return <Redirect to="/login" />;
  }
  
  return <>{children}</>;
}
```

## JWT Verification
Privy uses JWTs (JSON Web Tokens) for authentication. To verify these tokens on your server, you can use the JWKS (JSON Web Key Set) endpoint provided by Privy.

### JWKS Endpoint
```
https://auth.privy.io/api/v1/apps/cm8yfr98w001nwmyjxn40quyk/jwks.json
```

This endpoint provides the public keys needed to verify JWTs issued by Privy for your application. You can use standard JWT libraries to verify tokens using these keys.

### Example JWT Verification (Node.js)
```javascript
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://auth.privy.io/api/v1/apps/cm8yfr98w001nwmyjxn40quyk/jwks.json'
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    if (err) return callback(err);
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Verify the token
jwt.verify(token, getKey, {}, function(err, decoded) {
  if (err) {
    // Handle error
    console.error('Invalid token:', err);
    return;
  }
  
  // Token is valid, use the decoded information
  console.log('Decoded token:', decoded);
});
```

## Additional Documentation
For more detailed information, refer to the official Privy documentation:
- [Privy React Auth](https://docs.privy.io/guide/client/react)
- [Privy Server Auth](https://docs.privy.io/guide/server/nodejs)
- [Authorization Signatures](https://docs.privy.io/api-reference/authorization-signatures)