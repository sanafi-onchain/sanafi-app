import { useState } from 'react';
import { usePrivyAuth } from '@/contexts/PrivyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Component for demonstrating Solana transactions
export function SolanaTransactionDemo() {
  const { walletConnected, walletAddress, walletProvider, connectWallet } = usePrivyAuth();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [txId, setTxId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Function to handle transaction submission
  const handleTransaction = async () => {
    if (!walletConnected) {
      connectWallet();
      return;
    }

    if (!recipient || !amount || parseFloat(amount) <= 0) {
      setStatus('error');
      setErrorMessage('Please enter a valid recipient address and amount');
      return;
    }

    try {
      setStatus('loading');
      setErrorMessage(null);

      // In a real implementation, we would:
      // 1. Create a transaction using @solana/web3.js
      // 2. Send it to the connected wallet for signing
      // 3. Send the signed transaction to the Solana network
      
      // Mock implementation for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock transaction ID
      const mockTxId = `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 10)}`;
      setTxId(mockTxId);
      setStatus('success');
    } catch (error: any) {
      console.error('Transaction error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send transaction');
    }
  };

  // Reset the form
  const resetForm = () => {
    setStatus('idle');
    setTxId(null);
    setErrorMessage(null);
    setRecipient('');
    setAmount('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-[#1b4d3e]">Send Solana</CardTitle>
        <CardDescription>
          {walletConnected 
            ? `Connected with ${walletProvider || 'wallet'}: ${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`
            : 'Connect your wallet to make transactions'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!walletConnected ? (
          <Button 
            onClick={() => connectWallet()} 
            className="w-full bg-[#1b4d3e] hover:bg-[#1b4d3e]/90"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        ) : (
          <>
            {status === 'success' ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>Transaction Successful</AlertTitle>
                <AlertDescription>
                  Transaction ID: {txId}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-green-600 ml-2"
                    onClick={resetForm}
                  >
                    Send another
                  </Button>
                </AlertDescription>
              </Alert>
            ) : status === 'error' ? (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle>Transaction Failed</AlertTitle>
                <AlertDescription>
                  {errorMessage || 'An error occurred'}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-red-600 ml-2"
                    onClick={resetForm}
                  >
                    Try again
                  </Button>
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="recipient" className="text-sm font-medium">Recipient Address</label>
                  <Input
                    id="recipient"
                    placeholder="Solana address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium">Amount (SOL)</label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0.000001"
                    step="0.000001"
                    disabled={status === 'loading'}
                  />
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
      {walletConnected && status !== 'success' && status !== 'error' && (
        <CardFooter>
          <Button 
            onClick={handleTransaction} 
            className="w-full bg-[#1b4d3e] hover:bg-[#1b4d3e]/90"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Send <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}