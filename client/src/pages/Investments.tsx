import { useWallet } from "@/contexts/WalletContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, CheckCircle, PieChart, TrendingUp, ArrowUpDown, Repeat } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/toggle-group";
import { TokenSwap } from "@/components/TokenSwap";
import { PerformanceChart } from "@/components/investments/PerformanceChart";
import { HoldingsPieChart } from "@/components/investments/HoldingsPieChart";

export default function Investments() {
  const { wallet } = useWallet();
  const [selectedAssetType, setSelectedAssetType] = useState<string>("all");
  const [selectedRisk, setSelectedRisk] = useState<string>("all");
  const [investAmount, setInvestAmount] = useState<string>("");
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '1Y' | 'All'>('1M');
  
  const { data: investmentsData, isLoading } = useQuery({
    queryKey: ["/api/investments"],
    enabled: !!wallet?.address
  });

  // Mock investment options that would come from API
  const investmentOptions = [
    {
      id: "1",
      name: "Real Estate Sukuk",
      description: "Sharia-compliant investment in commercial real estate properties.",
      compliant: "AAOIFI-Compliant",
      expectedReturn: "5.2%",
      riskLevel: "Low-Medium",
      type: "sukuk"
    },
    {
      id: "2",
      name: "Ethical Tech Fund",
      description: "Diversified portfolio of ethical technology companies.",
      compliant: "Sharia-Compliant",
      expectedReturn: "7.8%",
      riskLevel: "Medium",
      type: "equity"
    },
    {
      id: "3",
      name: "Halal SME Financing",
      description: "Support small businesses with Sharia-compliant financing.",
      compliant: "Mudarabah-Based",
      expectedReturn: "6.5%",
      riskLevel: "Medium-High",
      type: "mudarabah"
    }
  ];

  // Show demo data if wallet is not connected
  const isWalletConnected = wallet?.isConnected || false;
  // Continue with the rest of the component

  return (
    <div className="space-y-6">
      <Tabs defaultValue="investments" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="swap" className="flex items-center gap-1">
            <Repeat className="h-4 w-4" />
            Token Swap
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="investments">
          <Card>
            <CardHeader>
              <CardTitle>Asset Browser</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Asset Type</label>
                  <Select 
                    value={selectedAssetType} 
                    onValueChange={setSelectedAssetType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Assets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assets</SelectItem>
                      <SelectItem value="sukuk">Sukuk</SelectItem>
                      <SelectItem value="equity">Equity</SelectItem>
                      <SelectItem value="mudarabah">Mudarabah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Risk Level</label>
                  <Select 
                    value={selectedRisk} 
                    onValueChange={setSelectedRisk}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Risk Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="low-medium">Low-Medium</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="medium-high">Medium-High</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Sector</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Sectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sectors</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="health">Healthcare</SelectItem>
                      <SelectItem value="consumer">Consumer Goods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {investmentOptions.map((option) => (
                  <Card key={option.id} className="overflow-hidden">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg">{option.name}</h3>
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {option.compliant}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4">{option.description}</p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-xs text-muted-foreground">Expected Return</span>
                          <div className="font-bold text-lg">{option.expectedReturn}</div>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Risk Level</span>
                          <div className="text-sm font-medium">{option.riskLevel}</div>
                        </div>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">Learn More</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>{option.name}</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-medium">About This Investment</h3>
                                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                              </div>
                              <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                {option.compliant}
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <h3 className="font-medium mb-2">Performance</h3>
                              <div className="h-32 rounded-md">
                                <PerformanceChart height={128} showGrid={false} />
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <h3 className="font-medium mb-2">Invest</h3>
                              <div className="mb-4">
                                <label className="text-sm font-medium mb-2 block">Amount (USDC)</label>
                                <Input 
                                  type="number" 
                                  min="0.01" 
                                  step="0.01" 
                                  placeholder="0.00" 
                                  value={investAmount} 
                                  onChange={(e) => setInvestAmount(e.target.value)}
                                />
                              </div>
                              
                              {investAmount && (
                                <div className="p-3 rounded-md bg-muted">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Expected Annual Return</span>
                                    <span className="font-medium text-primary">
                                      {parseFloat(investAmount) * parseFloat(option.expectedReturn) / 100} USDC
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Based on {option.expectedReturn} annual rate</span>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <Button className="w-full" disabled={!investAmount}>
                              Invest Now
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="swap">
          <div className="py-4">
            <h2 className="text-xl font-bold mb-4">Swap Tokens</h2>
            <p className="mb-6 text-muted-foreground">
              Use our Sharia-compliant token swap functionality to exchange between halal cryptocurrencies 
              with full transparency and no hidden fees.
            </p>
            <TokenSwap />
            <div className="mt-6 p-4 bg-primary/5 rounded-md">
              <h3 className="text-sm font-medium mb-2">🔍 Sharia Compliance Notice</h3>
              <p className="text-sm text-muted-foreground">
                All tokens available for swap on our platform have been reviewed and certified by our 
                Sharia board. We only support tokens that comply with Islamic finance principles, avoiding
                interest (riba), excessive uncertainty (gharar), and unethical business activities.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Portfolio View</CardTitle>
          <ToggleGroup 
            type="single" 
            value={timeRange}
            onValueChange={(value) => value && setTimeRange(value as '1M' | '3M' | '1Y' | 'All')}
          >
            <ToggleGroupItem value="1M">1M</ToggleGroupItem>
            <ToggleGroupItem value="3M">3M</ToggleGroupItem>
            <ToggleGroupItem value="1Y">1Y</ToggleGroupItem>
            <ToggleGroupItem value="All">All</ToggleGroupItem>
          </ToggleGroup>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-1">
              <h3 className="text-sm font-medium mb-4">Holdings Breakdown</h3>
              <div className="mb-4">
                <HoldingsPieChart />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                  <div className="text-sm flex-1">Sukuk</div>
                  <div className="text-sm font-medium">40%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                  <div className="text-sm flex-1">Equities</div>
                  <div className="text-sm font-medium">30%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-accent mr-2"></div>
                  <div className="text-sm flex-1">Mudarabah</div>
                  <div className="text-sm font-medium">30%</div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Performance</h3>
                <div className="text-sm text-primary font-medium">+2.3% today</div>
              </div>
              <div className="h-40 rounded-md mb-6">
                <PerformanceChart height={160} timeRange={timeRange} />
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-4 text-sm font-medium p-3 border-b">
                  <div>Asset</div>
                  <div className="text-right">Value</div>
                  <div className="text-right">P/L</div>
                  <div className="text-right">% Change</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-4 text-sm p-3">
                    <div>Real Estate Sukuk</div>
                    <div className="text-right">18 USDC</div>
                    <div className="text-right text-primary">+0.94 USDC</div>
                    <div className="text-right text-primary">+5.2%</div>
                  </div>
                  <div className="grid grid-cols-4 text-sm p-3">
                    <div>Ethical Tech Fund</div>
                    <div className="text-right">13.5 USDC</div>
                    <div className="text-right text-primary">+0.28 USDC</div>
                    <div className="text-right text-primary">+2.1%</div>
                  </div>
                  <div className="grid grid-cols-4 text-sm p-3">
                    <div>Halal SME Financing</div>
                    <div className="text-right">13.5 USDC</div>
                    <div className="text-right text-primary">+0.58 USDC</div>
                    <div className="text-right text-primary">+4.3%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
