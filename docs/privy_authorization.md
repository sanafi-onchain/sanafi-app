# Authorization signatures
Source: https://docs.privy.io/api-reference/authorization-signatures

Securing Privy API requests with authorization signatures

Authorization signatures protect your resources and wallet operations by cryptographically signing API requests. When enabled, these signatures prevent malicious actors from tampering with your request payload or forging requests to your wallets, ensuring that only authorized servers can trigger wallet actions.

> Authorization signatures are a security feature used to secure **update requests** to all critical resources.

## Required headers

When using authorization signatures, include the following header with your request:

- `privy-authorization-signature` (header): The authorization signature. If multiple signatures are required, they should be comma separated.

## When are they necessary?

### Modifying resources

All critical resources have an `owner_id` field, which indicates the authorization key or quorum whose signatures are required in order to modify the given resource.

This means, if the `owner_id` is set, authorization signatures are required for all `PATCH` and `DELETE` requests to the resource.

Key quorums do not have owners, but rather require a satisfaying set of signatures from the key quorum itself.

You can add additional, non-owner, signers to a wallet by specifying them in the [additional_signers](/api-reference/wallets/create#body-additional-signers) field on the wallet resource.

### Taking actions with wallets

Signatures from the wallet's owner are required to take actions on a wallet by default. If an `owner_id` is set, authorization signatures are required for:

* POST requests to `/v1/wallets/<wallet_id>/rpc`

> Authorization signatures are an important security measure and we strongly recommend registering authorization keys for all production resources.

## How to use authorization signatures

In order to use authorization signatures, you need to:

1. Create an authorization key.
2. Register the authorization public key with the resource you wish to protect.
3. Begin using the authorization private key to sign requests via the `privy-authorization-signature` header.

### Creating authorization keys

To create a new authorization key via the Dashboard:

1. Visit the [Authorization keys](https://dashboard.privy.io/apps?page=authorization-keys) page in the Dashboard.
2. Click the **New key** button.
3. Copy and save the generated **Private key**.

Read more about [creating authorization keys](/controls/authorization-keys/creating-authorization-keys).

> The private key (e.g. the Authorization key you copy) is generated on your device. Privy only receives the public key for registration. The private key never leaves the client.

### Registering authorization keys

To register an authorization key with a resource, you need to specify the public key in the `owner` field when creating a resource (e.g. [wallet](/api-reference/wallets/create#body-owner) or [policy](/api-reference/policies/create#body-owner)).

### Generating signatures

You can generate authorization signatures in three ways:

* Using `PrivyClient` via the Server SDK. `PrivyClient` will automatically inject authorization signatures when required. [Learn more](/basics/nodeJS/setup#getting-the-privyclient).
* Using utility functions from the Server SDK such as `formatRequestForAuthorizationSignature` and `generateAuthorizationSignature`.
* Implementing your own signing logic.

#### Steps to generate an authorization signature:

1. **Build Payload**
   Generate a JSON payload containing the following fields. All fields are required unless otherwise specified.

   | Field | Type | Description |
   | --- | --- | --- |
   | `version` | `1` | Authorization signature version. Currently, `1` is the only version. |
   | `method` | `'POST'/'PUT'/'PATCH'/'DELETE'` | HTTP method for the request. Signatures are not required on `'GET'` requests. |
   | `url` | `string` | The full URL for the request. Should not include a trailing slash. |
   | `body` | `JSON` | JSON body for the request. |
   | `headers` | `JSON` | JSON object containing any Privy-specific headers, e.g. those that are prefixed with `'privy-'`. This should **not** include any other headers, such as authentication headers, `content-type`, or trace headers. |
   | `headers['privy-app-id']` | `string` | Privy app ID header (required). |
   | `headers['privy-idempotency-key']` | `string` | Privy idempotency key header (optional). If the request does not contain an idempotency key, leave this field out of the payload. |

2. **Format Payload**
   Canonicalize the payload per [RFC 8785](https://www.rfc-editor.org/rfc/rfc8785) and serialize it to a string.

3. **Sign Payload**
   Sign the serialized JSON with ECDSA P-256 using your app's private key and serialize it to a base64-encoded string.

### Example with @privy-io/server-auth

We recommend using `PrivyClient` to send WalletApi requests, which will automatically inject authorization signatures when required.

```typescript
import {PrivyClient} from '@privy-io/server-auth';

const client = new PrivyClient($PRIVY_APP_ID, $PRIVY_APP_SECRET, {
  walletApi: {
    // This is required in order to generate the privy-authorization-signature header.
    authorizationPrivateKey: $PRIVY_AUTHORIZATION_PRIVATE_KEY
  }
});

// This request will automatically include the privy-authorization-signature header.
const res = await privy.walletApi.ethereum.signMessage({
  walletId: $WALLET_ID,
  message: 'Hello world'
});
```

For some use cases, you may need to format and/or sign requests manually:

```typescript
// For some use cases, you may need to format and/or sign requests manually
import {WalletApiRequestSignatureInput} from '@privy-io/server-auth';
import {formatRequestForAuthorizationSignature, generateAuthorizationSignature} from '@privy-io/server-auth/wallet-api';

// The AuthorizationPrivateKey is the private key copied from the Dashboard, prefixed with 'wallet-auth:'
const authorizationPrivateKey: $YOUR_AUTHORIZATION_PRIVATE_KEY;

const input = {
  version: 1,
  method: 'POST',
  url: 'https://api.privy.io/v1/wallets/<wallet_id>/rpc',
  body: {
    method: 'personal_sign',
    params: {
      message: 'Hello world',
      // ...
    },
  },
  headers: {
    'privy-app-id': $PRIVY_APP_ID,
    // If your request includes an idempotency key, include that header here as well
  }
} as WalletApiRequestSignatureInput

// Given this input, you can generate an authorization signature:
const signature = generateAuthorizationSignature({input, authorizationPrivateKey});

// Alternatively, you can format and serialize the payload:
const serializedPayload = formatRequestForAuthorizationSignature({input});
// And then sign the payload elsewhere:
const signature = signElsewhere(serializedPayload);

// Then, you can use the signature in your request:
const res = await fetch(input.url, {
  method: input.method,
  body: input.body,
  headers: {
    ...input.headers,
    'privy-authorization-signature': signature
  }
});
```

### Example with JavaScript/TypeScript

```typescript
import canonicalize from 'canonicalize'; // Support JSON canonicalization
import crypto from 'crypto'; // Support P-256 signing

// Replace this with your private key from the Dashboard
const PRIVY_AUTHORIZATION_KEY = 'wallet-auth:insert-your-private-key-here';
// ...

function getAuthorizationSignature({url, body}: {url: string; body: object}) {
  const payload = {
    version: 1,
    method: 'POST',
    url,
    body,
    headers: {
      'privy-app-id': 'insert-your-app-id'
      // If your request includes an idempotency key, include that header here as well
    }
  };

  // JSON-canonicalize the payload and convert it to a buffer
  const serializedPayload = canonicalize(payload) as string;
  const serializedPayloadBuffer = Buffer.from(serializedPayload);

  // Replace this with your app's authorization key. We remove the 'wallet-auth:' prefix
  // from the key before using it to sign requests
  const privateKeyAsString = PRIVY_AUTHORIZATION_KEY.replace('wallet-auth:', '');

  // Convert your private key to PEM format, and instantiate a node crypto KeyObject for it
  const privateKeyAsPem = `-----BEGIN PRIVATE KEY-----\n${privateKeyAsString}\n-----END PRIVATE KEY-----`;
  const privateKey = crypto.createPrivateKey({
    key: privateKeyAsPem,
    format: 'pem'
  });

  // Sign the payload with the private key
  const signer = crypto.createSign('SHA256');
  signer.update(serializedPayloadBuffer);
  signer.end();
  const signature = signer.sign(privateKey, 'base64');

  return signature;
}
```