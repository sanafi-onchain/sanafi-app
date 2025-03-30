import { useWallet } from "@/contexts/WalletContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { UserCircle, Bell, Lock, Globe, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useState } from "react";

export default function Settings() {
  const { wallet } = useWallet();
  const { language, setLanguage } = useLanguage();
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile" className="flex items-center">
                <UserCircle className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">Update your account details</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <Input defaultValue={wallet?.isConnected ? "Test User" : ""} disabled={!wallet?.isConnected} />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input defaultValue={wallet?.isConnected ? "user@example.com" : ""} disabled={!wallet?.isConnected} />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Wallet Address</label>
                  <Input 
                    value={wallet?.address || "Not connected"} 
                    disabled 
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="pt-4">
                  <Button disabled={!wallet?.isConnected}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Transaction Updates</h4>
                      <p className="text-sm text-muted-foreground">Notifications for deposits, withdrawals, and transfers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Investment Updates</h4>
                      <p className="text-sm text-muted-foreground">Notifications for performance and new opportunities</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Profit Distributions</h4>
                      <p className="text-sm text-muted-foreground">Notifications when profits are distributed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Reward Alerts</h4>
                      <p className="text-sm text-muted-foreground">Notifications when you earn rewards from spending</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Educational Content</h4>
                      <p className="text-sm text-muted-foreground">Updates about new learning materials</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button disabled={!wallet?.isConnected}>
                    Save Preferences
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Security Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage your account security</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Transaction Notifications</h4>
                      <p className="text-sm text-muted-foreground">Get notified for all transactions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Wallet Connection Alerts</h4>
                      <p className="text-sm text-muted-foreground">Get alerted when your wallet connects</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button disabled={!wallet?.isConnected}>
                    Save Security Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Appearance Settings</h3>
                  <p className="text-sm text-muted-foreground">Customize how Tahara looks</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Language</h4>
                      <p className="text-sm text-muted-foreground">Select your preferred language</p>
                    </div>
                    <Select 
                      value={language} 
                      onValueChange={(value) => setLanguage(value as "en" | "ar")}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">العربية (Arabic)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Theme</h4>
                      <p className="text-sm text-muted-foreground">Choose light or dark mode</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className={`h-5 w-5 ${!darkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                      <Switch 
                        checked={darkMode}
                        onCheckedChange={setDarkMode}
                      />
                      <Moon className={`h-5 w-5 ${darkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>
                    Save Appearance Settings
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
