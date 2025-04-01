import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowDownUp, 
  RefreshCw, 
  CircleDollarSign,
  Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// Define token type
type Token = {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
};

// Define api response types
interface TokensResponse {
  tokens: Token[];
}

interface QuoteResponse {
  quote: {
    inAmount: string;
    outAmount: string;
    otherAmountThreshold: string;
    swapMode: string;
    slippageBps: number;
    priceImpactPct: string;
    routePlan: any[];
    contextSlot: number;
  };
}

// Solana mainnet token addresses
const USDC_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const SOL_ADDRESS = 'So11111111111111111111111111111111111111112';

export function TokenSwap() {
  // Token states
  const [fromToken, setFromToken] = useState<string>(USDC_ADDRESS);
  const [toToken, setToToken] = useState<string>(SOL_ADDRESS);
  const [amount, setAmount] = useState<string>('1000000'); // 1 USDC (6 decimals)
  const [quote, setQuote] = useState<any>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  
  // Fetch top tokens
  const { 
    data: tokensData, 
    isLoading: isLoadingTokens, 
    error: tokensError 
  } = useQuery<TokensResponse>({
    queryKey: ['/api/jupiter/tokens'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Fetch quote when tokens and amount are selected
  const { 
    data: quoteData, 
    isLoading: isLoadingQuote,
    error: quoteError,
    refetch: refetchQuote
  } = useQuery<QuoteResponse>({
    queryKey: ['/api/jupiter/quote', fromToken, toToken, amount],
    enabled: Boolean(fromToken && toToken && amount && fromToken !== toToken),
    staleTime: 1000 * 30, // 30 seconds
  });
  
  // Set USDC and SOL as default tokens when available
  useEffect(() => {
    if (tokensData?.tokens && Array.isArray(tokensData.tokens) && tokensData.tokens.length > 0) {
      // Try to find USDC
      const usdcToken = tokensData.tokens.find(
        (t: Token) => t && t.symbol && t.symbol.toUpperCase() === 'USDC'
      );
      
      // Try to find SOL
      const solToken = tokensData.tokens.find(
        (t: Token) => 
          (t && t.symbol && t.symbol.toUpperCase() === 'SOL') || 
          (t && t.address === 'So11111111111111111111111111111111111111112')
      );
      
      if (usdcToken && !fromToken) {
        setFromToken(usdcToken.address);
      }
      
      if (solToken && !toToken) {
        setToToken(solToken.address);
      }
    }
  }, [tokensData, fromToken, toToken]);
  
  // Update quote when it changes
  useEffect(() => {
    if (quoteData?.quote) {
      setQuote(quoteData.quote);
    }
  }, [quoteData]);
  
  // Switch tokens
  const handleSwitchTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };
  
  // Handle amount change
  const handleAmountChange = (value: string) => {
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };
  
  // Get token data by address
  const getTokenByAddress = (address: string): Token | undefined => {
    if (!address || !tokensData?.tokens || !Array.isArray(tokensData.tokens)) {
      return undefined;
    }
    return tokensData.tokens.find((t: Token) => t && t.address === address);
  };
  
  // Format token amount based on decimals
  const formatTokenAmount = (amount: string, decimals: number): string => {
    if (!amount) return '0';
    const parsed = parseInt(amount, 10);
    return (parsed / Math.pow(10, decimals)).toFixed(decimals > 6 ? 6 : decimals);
  };
  
  // Placeholder for the actual swap function
  // In a real app, this would interact with Solana wallet 
  const handleSwap = async () => {
    setIsSwapping(true);
    
    try {
      // Simulate an API call for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, we would execute the swap transaction
      
      // Reset states
      setIsSwapping(false);
      
      // Show success
      console.log('Swap successful!');
    } catch (error) {
      console.error('Swap failed:', error);
      setIsSwapping(false);
    }
  };
  
  if (isLoadingTokens) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-primary" />
            Swap Tokens
          </CardTitle>
          <CardDescription>Swap between Sharia-compliant tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (tokensError) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Failed to load token data. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }
  
  const tokens: Token[] = Array.isArray(tokensData?.tokens) 
    ? tokensData.tokens.filter((t): t is Token => !!t && !!t.address && !!t.symbol)
    : [];
  const fromTokenData = getTokenByAddress(fromToken);
  const toTokenData = getTokenByAddress(toToken);
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5 text-primary" />
          Swap Tokens
        </CardTitle>
        <CardDescription>Halal, Sharia-compliant token swapping via Jupiter</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* From token */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">From</label>
              {fromTokenData && (
                <span className="text-sm text-muted-foreground">
                  Balance: 0 {fromTokenData.symbol}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem 
                      key={token.address} 
                      value={token.address}
                      disabled={token.address === toToken}
                    >
                      <div className="flex items-center gap-2">
                        {token.logoURI && (
                          <img 
                            src={token.logoURI} 
                            alt={token.symbol} 
                            className="w-5 h-5 rounded-full"
                          />
                        )}
                        <span>{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="text"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="flex-1"
                placeholder="Amount"
              />
            </div>
          </div>
          
          {/* Swap button */}
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleSwitchTokens}
              disabled={!fromToken || !toToken}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>
          
          {/* To token */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">To (Estimated)</label>
              {toTokenData && (
                <span className="text-sm text-muted-foreground">
                  Balance: 0 {toTokenData.symbol}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem 
                      key={token.address} 
                      value={token.address}
                      disabled={token.address === fromToken}
                    >
                      <div className="flex items-center gap-2">
                        {token.logoURI && (
                          <img 
                            src={token.logoURI} 
                            alt={token.symbol} 
                            className="w-5 h-5 rounded-full"
                          />
                        )}
                        <span>{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-1 p-2 border rounded-md bg-muted/30 flex items-center">
                {isLoadingQuote ? (
                  <div className="flex items-center justify-center w-full">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                ) : quoteError ? (
                  <span className="text-destructive text-sm">Error loading quote</span>
                ) : quote && toTokenData ? (
                  <span>
                    {formatTokenAmount(
                      quote.outAmount,
                      toTokenData.decimals
                    )}
                  </span>
                ) : (
                  <span className="text-muted-foreground">Select tokens</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Quote details */}
          {quote && fromTokenData && toTokenData && (
            <div className="mt-4 p-3 bg-muted/30 rounded-md space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rate</span>
                <span>
                  1 {fromTokenData.symbol} ≈ {' '}
                  {(
                    parseInt(quote.outAmount) / 
                    (parseInt(amount) / Math.pow(10, toTokenData.decimals))
                  ).toFixed(6)}{' '}
                  {toTokenData.symbol}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price Impact</span>
                <span className={
                  parseFloat(quote.priceImpactPct) > 1 
                    ? 'text-destructive' 
                    : 'text-green-600'
                }>
                  {parseFloat(quote.priceImpactPct).toFixed(2)}%
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Minimum Received</span>
                <span>
                  {formatTokenAmount(
                    quote.otherAmountThreshold,
                    toTokenData.decimals
                  )}{' '}
                  {toTokenData.symbol}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network Fee</span>
                <span>≈ 0.00001 SOL</span>
              </div>
              
              <div className="flex justify-between text-sm items-center">
                <span className="text-muted-foreground">Route</span>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs">Jupiter</Badge>
                  {quote.routePlan && quote.routePlan.length > 1 && (
                    <Badge variant="outline" className="text-xs">
                      {quote.routePlan.length} hops
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end mt-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => refetchQuote()}
                  className="h-7 px-2 text-xs"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          disabled={!fromToken || !toToken || !amount || isSwapping || !quote}
          onClick={handleSwap}
        >
          {isSwapping ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Swapping...
            </>
          ) : (
            'Swap Tokens'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}