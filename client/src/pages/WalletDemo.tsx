import { SolanaTransactionDemo } from '@/components/SolanaTransactionDemo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePrivyAuth } from '@/contexts/PrivyContext';

export function WalletDemo() {
  const { isAuthenticated, user } = usePrivyAuth();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-[#1b4d3e] mb-6">Wallet Integration</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1b4d3e]">About Wallets</CardTitle>
              <CardDescription>
                Understanding Sharia-compliant digital wallets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                In Sanafi's Sharia-compliant financial ecosystem, digital wallets serve as the foundation for all transactions.
                These wallets adhere to Islamic principles while providing modern financial capabilities.
              </p>
              <p className="mb-4">
                <strong>Key Features:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>All transactions are transparent and traceable on the Solana blockchain</li>
                <li>Zero interest (riba) involvement in any transaction</li>
                <li>No speculative (gharar) or gambling-like (maysir) features</li>
                <li>Full ownership of your assets with non-custodial technology</li>
              </ul>
              <p>
                Use the demo panel to test sending mock transactions and experience the wallet integration.
              </p>
            </CardContent>
          </Card>
          
          {isAuthenticated && (
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1b4d3e]">Your Account</CardTitle>
                <CardDescription>
                  Connected account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">User ID</div>
                  <div className="font-mono text-sm p-2 bg-slate-100 rounded">
                    {user?.id || 'Not available'}
                  </div>
                </div>
                {user?.email && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Email</div>
                    <div className="text-sm p-2 bg-slate-100 rounded">
                      {user.email}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <SolanaTransactionDemo />
        </div>
      </div>
    </div>
  );
}