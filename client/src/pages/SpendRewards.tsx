import { useWallet } from "@/contexts/WalletContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, Award, ShoppingBag, Gift, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SpendRewards() {
  const { wallet } = useWallet();
  
  const { data: rewardsData, isLoading } = useQuery({
    queryKey: ["/api/rewards"],
    enabled: !!wallet?.address
  });

  // Mock merchant data that would come from API
  const merchants = [
    {
      id: "1",
      name: "Halal Grocery Store",
      category: "Grocery",
      rewardPercentage: "10%",
      distance: "0.8 miles"
    },
    {
      id: "2",
      name: "Ethical Fashion Outlet",
      category: "Clothing",
      rewardPercentage: "5%",
      distance: "1.2 miles"
    },
    {
      id: "3",
      name: "Muslim Bookstore",
      category: "Books",
      rewardPercentage: "7%",
      distance: "2.5 miles"
    }
  ];

  // Mock recent spends data that would come from API
  const recentSpends = [
    {
      id: "1",
      merchant: "Halal Grocery",
      date: "Oct 15, 2023",
      amount: "0.1 SOL",
      reward: "0.01 SOL"
    },
    {
      id: "2",
      merchant: "Ethical Fashion",
      date: "Oct 10, 2023",
      amount: "0.3 SOL",
      reward: "0.015 SOL"
    },
    {
      id: "3",
      merchant: "Muslim Bookstore",
      date: "Oct 5, 2023",
      amount: "0.05 SOL",
      reward: "0.0035 SOL"
    }
  ];

  if (!wallet?.isConnected) {
    return (
      <Card className="p-6 my-8">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">Sign In</h2>
          <p className="text-muted-foreground mb-6">
            Please sign in to view your spend and rewards
          </p>
          <Button className="bg-primary">Sign In</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Card Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Recent Spends</h3>
              <Button variant="ghost" size="sm" className="text-secondary">
                View All
              </Button>
            </div>
            
            <div className="divide-y border rounded-md">
              {recentSpends.map((spend) => (
                <div key={spend.id} className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center mr-4">
                      <ShoppingBag className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium">{spend.merchant}</div>
                      <div className="text-xs text-muted-foreground">{spend.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">-{spend.amount}</div>
                    <div className="text-xs text-primary">+{spend.reward} reward</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Spend Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold mb-1">0.45 SOL</div>
                  <p className="text-sm text-muted-foreground">Total Spent This Month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold mb-1 text-primary">0.0285 SOL</div>
                  <p className="text-sm text-muted-foreground">Total Rewards Earned</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold mb-1">3</div>
                  <p className="text-sm text-muted-foreground">Halal Merchants Visited</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Merchant Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search merchants" className="pl-9" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-1" />
                Nearby
              </Button>
              <Button variant="outline" size="sm">
                Latest
              </Button>
              <Button variant="outline" size="sm">
                Most Rewards
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="list">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {merchants.map((merchant) => (
                  <Card key={merchant.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{merchant.name}</h3>
                          <p className="text-sm text-muted-foreground">{merchant.category}</p>
                        </div>
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                          {merchant.rewardPercentage} rewards
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {merchant.distance}
                        </div>
                        <Button size="sm">
                          Shop Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="map" className="mt-0">
              <div className="border rounded-md bg-muted h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">Map view of nearby halal merchants</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rewards Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <Award className="h-10 w-10 mb-4" />
                  <div className="text-3xl font-bold mb-2">0.3 SOL</div>
                  <p className="text-sm opacity-90">Total Rewards Earned</p>
                  <div className="mt-4 pt-4 border-t border-primary-foreground/20">
                    <p className="text-xs opacity-75">Last earned: Today</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="font-medium mb-4">Redeem Your Rewards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-secondary/10 mr-4">
                        <Gift className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Fee Discount</h4>
                        <p className="text-sm text-muted-foreground mb-4">Use rewards to cover transaction fees on your next investment.</p>
                        <Button size="sm" variant="outline">
                          Redeem
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-primary/10 mr-4">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Invest Rewards</h4>
                        <p className="text-sm text-muted-foreground mb-4">Automatically invest your rewards into your chosen portfolio.</p>
                        <Button size="sm">
                          Redeem
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Rewards History</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-3 font-medium text-sm p-3 border-b">
                    <div>Source</div>
                    <div>Date</div>
                    <div className="text-right">Amount</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-3 text-sm p-3">
                      <div>Halal Grocery</div>
                      <div>Oct 15, 2023</div>
                      <div className="text-right">0.01 SOL</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm p-3">
                      <div>Ethical Fashion</div>
                      <div>Oct 10, 2023</div>
                      <div className="text-right">0.015 SOL</div>
                    </div>
                    <div className="grid grid-cols-3 text-sm p-3">
                      <div>Muslim Bookstore</div>
                      <div>Oct 5, 2023</div>
                      <div className="text-right">0.0035 SOL</div>
                    </div>
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
