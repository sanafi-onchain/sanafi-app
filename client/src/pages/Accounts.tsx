import { useWallet } from "@/contexts/WalletContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink } from "lucide-react";

export default function Accounts() {
  const { wallet } = useWallet();
  const { toast } = useToast();

  const { data: transactionHistory, isLoading } = useQuery({
    queryKey: ["/api/transactions"],
    enabled: !!wallet?.address
  });

  const copyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard"
      });
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Show demo data if wallet is not connected
  const isWalletConnected = wallet?.isConnected || false;
  // Continue with the rest of the component

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:justify-between mb-6">
            <div>
              <h3 className="text-sm font-light uppercase mb-2 text-muted-foreground">Wallet Address</h3>
              <div className="flex items-center gap-2">
                <span className="font-medium">{wallet?.address ? truncateAddress(wallet.address) : "Not connected"}</span>
                {wallet?.address && (
                  <Button variant="ghost" size="sm" onClick={copyAddress}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-light uppercase mb-2 text-muted-foreground">Balance</h3>
              <div className="text-xl font-bold">{isLoading ? "Loading..." : "150 USDC"}</div>
              <div className="text-sm text-muted-foreground">$150 USD</div>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="deposits">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="spends">Card Spends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="rounded-md border">
                <div className="p-4">
                  {isLoading ? (
                    <div className="text-center py-10">Loading transactions...</div>
                  ) : (
                    <div className="text-center py-10">
                      <p>Your transaction history will appear here</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">
                  Export CSV
                </Button>
              </div>
            </TabsContent>
            
            {/* Other tab contents follow a similar pattern */}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-6">
            <div className="flex justify-between mb-8">
              <div>
                <div className="text-xs opacity-80 mb-1">Card Balance</div>
                <div className="text-xl font-bold">60 USDC</div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">T</span>
                </div>
              </div>
            </div>
            <div className="text-xs opacity-80 mb-1">Card Number</div>
            <div className="font-medium mb-2">•••• •••• •••• 1234</div>
            <div className="flex justify-between">
              <div>
                <div className="text-xs opacity-80 mb-1">Name</div>
                <div className="font-medium">
                  {wallet?.address ? "Card Holder" : "Not Available"}
                </div>
              </div>
              <div>
                <div className="text-xs opacity-80 mb-1">Status</div>
                <div className="font-medium">Active</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              Freeze Card
            </Button>
            <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
              Cancel Card
            </Button>
            <Button className="ml-auto">
              Order Physical Card
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
