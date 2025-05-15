import { useWallet } from "@/contexts/WalletContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { PiggyBank, TrendingUp, Building, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Savings() {
  const { wallet } = useWallet();
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  
  const { data: savingsData, isLoading } = useQuery({
    queryKey: ["/api/savings"],
    enabled: !!wallet?.address
  });

  // Show demo data if wallet is not connected
  const isWalletConnected = wallet?.isConnected || false;
  // Continue with the rest of the component

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Savings Pool</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="space-y-2">
                <h3 className="text-sm font-light uppercase text-muted-foreground">Current Balance</h3>
                <div className="text-2xl font-bold">{isLoading ? "Loading..." : "2.1 SOL"}</div>
                <div className="text-sm text-primary">4% annualized return</div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-light uppercase text-muted-foreground mb-2">Savings Goal</h3>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Current: 2.1 SOL</span>
                  <span className="text-sm">Goal: 10 SOL</span>
                </div>
                <Progress value={21} className="h-2" />
                <div className="mt-1 text-xs text-muted-foreground">50% to 10 SOL</div>
              </div>
            </div>

            <div className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Deposit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Deposit to Savings</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-2 block">Amount (SOL)</label>
                      <Input 
                        type="number" 
                        min="0.01" 
                        step="0.01" 
                        placeholder="0.00" 
                        value={depositAmount} 
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                    </div>
                    <div className="mb-4 p-3 bg-muted rounded-md text-sm">
                      <div className="flex justify-between mb-2">
                        <span>Deposit Amount</span>
                        <span>{depositAmount || "0.00"} SOL</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Network Fee</span>
                        <span>~0.00005 SOL</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t">
                        <span>Total</span>
                        <span>{depositAmount ? Number(depositAmount) + 0.00005 : "0.00005"} SOL</span>
                      </div>
                    </div>
                    <Button className="w-full" disabled={!depositAmount}>
                      Confirm Deposit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">Withdraw</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Withdraw from Savings</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-2 block">Amount (SOL)</label>
                      <Input 
                        type="number" 
                        min="0.01" 
                        max="2.1" 
                        step="0.01" 
                        placeholder="0.00" 
                        value={withdrawAmount} 
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                      <div className="mt-1 text-xs text-muted-foreground">Available: 2.1 SOL</div>
                    </div>
                    <div className="mb-4 p-3 bg-muted rounded-md text-sm">
                      <div className="flex justify-between mb-2">
                        <span>Withdraw Amount</span>
                        <span>{withdrawAmount || "0.00"} SOL</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Network Fee</span>
                        <span>~0.00005 SOL</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t">
                        <span>You'll Receive</span>
                        <span>{withdrawAmount ? Number(withdrawAmount) - 0.00005 : "0.00"} SOL</span>
                      </div>
                    </div>
                    <Button className="w-full" disabled={!withdrawAmount}>
                      Confirm Withdrawal
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profit-Sharing Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="breakdown">
            <TabsList className="mb-4">
              <TabsTrigger value="breakdown">Investment Breakdown</TabsTrigger>
              <TabsTrigger value="returns">Past Returns</TabsTrigger>
              <TabsTrigger value="explainer">How It Works</TabsTrigger>
            </TabsList>
            
            <TabsContent value="breakdown" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <Building className="h-8 w-8 text-secondary mb-2" />
                      <span className="text-lg font-bold">60%</span>
                    </div>
                    <h3 className="font-medium mb-1">Real Estate</h3>
                    <p className="text-sm text-muted-foreground">Sharia-compliant real estate investments.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <TrendingUp className="h-8 w-8 text-secondary mb-2" />
                      <span className="text-lg font-bold">40%</span>
                    </div>
                    <h3 className="font-medium mb-1">Small Business</h3>
                    <p className="text-sm text-muted-foreground">Funding for ethical small businesses.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <PiggyBank className="h-8 w-8 text-primary mb-2" />
                      <span className="text-lg font-bold">4%</span>
                    </div>
                    <h3 className="font-medium mb-1">Expected Return</h3>
                    <p className="text-sm text-muted-foreground">Annualized return based on past performance.</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>All investments are Sharia-compliant and follow Islamic finance principles of risk-sharing and ethical investments.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="returns" className="mt-0">
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">Q4 2023</h3>
                    <span className="text-primary font-medium">+0.08 SOL (4.1%)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Distribution date: Jan 1, 2024</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">Q3 2023</h3>
                    <span className="text-primary font-medium">+0.06 SOL (3.9%)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Distribution date: Oct 1, 2023</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="explainer" className="mt-0">
              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-muted/50">
                  <h3 className="font-medium mb-2">What is Mudarabah?</h3>
                  <p className="text-sm">Mudarabah is a profit-sharing partnership where one party provides capital and the other provides expertise. Profits are shared according to a pre-agreed ratio, while losses are borne by the capital provider only.</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Mudarabah Explainer Video</h3>
                  <Button variant="ghost" size="sm" className="text-secondary">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    Watch Now
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
