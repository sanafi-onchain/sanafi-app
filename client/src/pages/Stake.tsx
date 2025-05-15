import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { InfoIcon, ArrowDownUp, Edit3, RefreshCw } from "lucide-react";

export default function Stake() {
  const [amount, setAmount] = useState<string>("0.00");
  const [amountUSD, setAmountUSD] = useState<string>("$0 USD");
  const [receiveAmount, setReceiveAmount] = useState<string>("0.00");
  const [receiveAmountUSD, setReceiveAmountUSD] = useState<string>("$0 USD");
  
  // Mock TVL data - in a real app, this would come from an API
  const tvlSol = "42,810";
  const tvlUSD = "$6,493,715";
  const solPrice = 152; // Mock SOL price in USD
  
  const handleAmountChange = (value: string) => {
    setAmount(value);
    // Calculate USD value
    const numericValue = parseFloat(value) || 0;
    setAmountUSD(`$${(numericValue * solPrice).toFixed(2)} USD`);
    // Set receive amount (assuming 1:1 ratio for SanaSOL)
    setReceiveAmount(value);
    setReceiveAmountUSD(`$${(numericValue * solPrice).toFixed(2)} USD`);
  };
  
  const handleSliderChange = (value: number[]) => {
    const sliderValue = value[0];
    const newAmount = (sliderValue / 100 * 10).toFixed(2); // Assuming max is 10 SOL
    handleAmountChange(newAmount);
  };
  
  const handleHalfClick = () => {
    // In a real app, this would be half of the user's balance
    const halfAmount = "2.50";
    handleAmountChange(halfAmount);
  };
  
  const handleMaxClick = () => {
    // In a real app, this would be the user's balance
    const maxAmount = "5.00";
    handleAmountChange(maxAmount);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Ethical Solana Staking</h1>
          <p className="text-muted-foreground mt-1">Earn rewards with SanaSOL, a Sharia-compliant Solana LST</p>
        </div>
        <div className="bg-primary/10 rounded-md px-3 py-1 flex items-center mt-2 md:mt-0">
          <span className="text-primary font-medium mr-1">BETA</span>
          <InfoIcon className="h-4 w-4 text-primary" />
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <Card className="bg-white border-[#e9e1ca]">
            <CardHeader className="border-b border-[#e9e1ca] pb-4">
              <CardTitle className="text-lg font-medium text-primary">SanaSOL Staking Pool</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="mb-6">
                <p className="text-muted-foreground text-sm">Solana TVL</p>
                <div className="flex items-baseline">
                  <h2 className="text-3xl font-bold text-foreground">{tvlUSD}</h2>
                  <span className="ml-2 text-muted-foreground">({tvlSol} SOL)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Amount Input */}
                <div className="bg-[#f5f0e5]/50 rounded-lg p-5 border border-[#e9e1ca]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-primary">Amount</span>
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleHalfClick}
                        className="h-7 px-2 text-xs border-[#e9e1ca] hover:bg-[#e9e1ca]/50 text-primary"
                      >
                        HALF
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleMaxClick}
                        className="h-7 px-2 text-xs border-[#e9e1ca] hover:bg-[#e9e1ca]/50 text-primary"
                      >
                        MAX
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Input 
                      type="number" 
                      value={amount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="text-3xl font-bold h-16 bg-transparent border-none focus-visible:ring-0 p-0"
                      placeholder="0.00"
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <span className="text-lg font-semibold text-primary">SOL</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{amountUSD}</div>
                  </div>
                  
                  <div className="mt-4">
                    <Slider
                      defaultValue={[0]}
                      max={100}
                      step={1}
                      onValueChange={handleSliderChange}
                      className="my-4"
                    />
                  </div>
                </div>
                
                {/* Arrow Icon */}
                <div className="flex justify-center">
                  <div className="bg-primary/10 rounded-full p-3">
                    <ArrowDownUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                {/* You'll Get */}
                <div className="bg-[#f5f0e5]/50 rounded-lg p-5 border border-[#e9e1ca]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-primary">You'll Get</span>
                  </div>
                  
                  <div className="relative">
                    <Input 
                      type="text" 
                      value={receiveAmount}
                      readOnly
                      className="text-3xl font-bold h-16 bg-transparent border-none focus-visible:ring-0 p-0"
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <span className="text-lg font-semibold text-primary">SanaSOL</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{receiveAmountUSD}</div>
                  </div>
                </div>
                
                {/* Stake Button */}
                <Button 
                  className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white"
                  disabled={parseFloat(amount) <= 0}
                >
                  Stake Now
                </Button>
                
                {/* Info Section */}
                <div className="space-y-4 mt-6">
                  <div className="flex justify-between py-2 border-b border-[#e9e1ca]">
                    <span className="text-muted-foreground flex items-center">
                      Fee / Commission
                      <InfoIcon className="h-4 w-4 ml-1" />
                    </span>
                    <span className="font-medium">0%</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-[#e9e1ca]">
                    <span className="text-muted-foreground flex items-center">
                      Rate
                      <InfoIcon className="h-4 w-4 ml-1" />
                    </span>
                    <span className="font-medium">1 SOL = 0.982080 SanaSOL</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-[#e9e1ca]">
                    <span className="text-muted-foreground flex items-center">
                      Network fee
                      <InfoIcon className="h-4 w-4 ml-1" />
                    </span>
                    <span className="font-medium">0.00005 SOL</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-[#e9e1ca]">
                    <span className="text-muted-foreground flex items-center">
                      Unlock period
                      <InfoIcon className="h-4 w-4 ml-1" />
                    </span>
                    <span className="font-medium">Instant</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:w-1/3 space-y-6">
          <Card className="bg-white border-[#e9e1ca]">
            <CardHeader className="border-b border-[#e9e1ca] pb-4">
              <CardTitle className="text-lg font-medium text-primary">About SanaSOL</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-muted-foreground">
                SanaSOL is a liquid staking token that represents your staked SOL on
                the Solana network. It allows you to earn staking rewards while
                maintaining liquidity.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Key Benefits:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Sharia-compliant staking solution</li>
                  <li>Earn ~6-7% APY on your SOL</li>
                  <li>No lock-up period</li>
                  <li>Fully transparent and secure</li>
                  <li>Eligible for DeFi applications</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-[#e9e1ca]">
            <CardHeader className="border-b border-[#e9e1ca] pb-4">
              <CardTitle className="text-lg font-medium text-primary">My Staking</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center p-6">
                <p className="text-muted-foreground mb-4">Connect your wallet to view your staking positions</p>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Connect Wallet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}