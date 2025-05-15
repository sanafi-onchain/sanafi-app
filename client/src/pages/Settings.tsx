import { useState } from 'react';
import { ServiceStatus } from '../components/settings/ServiceStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  UserRound, 
  Bell, 
  Shield, 
  Globe,
  Moon,
  PanelLeft, 
  Languages,
  CircleDollarSign,
  HelpCircle,
  Pencil,
  ExternalLink,
  Wallet
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Settings() {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="flex flex-wrap gap-1 md:gap-0 md:grid md:grid-cols-4 lg:grid-cols-8 lg:w-2/3">
          <TabsTrigger value="general" className="flex-1 min-w-[3rem] flex items-center justify-center gap-2">
            <UserRound className="h-4 w-4" />
            <span className="hidden md:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 min-w-[3rem] flex items-center justify-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-1 min-w-[3rem] flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex-1 min-w-[3rem] flex items-center justify-center gap-2">
            <PanelLeft className="h-4 w-4" />
            <span className="hidden md:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex-1 min-w-[3rem] flex items-center justify-center gap-2">
            <Languages className="h-4 w-4" />
            <span className="hidden md:inline">Language</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex-1 min-w-[3rem] flex items-center justify-center gap-2">
            <CircleDollarSign className="h-4 w-4" />
            <span className="hidden md:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex-1 min-w-[3rem] flex items-center justify-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">Services</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex-1 min-w-[3rem] flex items-center justify-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden md:inline">Support</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal information and how we can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Photo */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-2 border-[#1b4d3e] overflow-hidden bg-[#f5f0e5] flex items-center justify-center">
                      <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=SanafiUser&backgroundColor=f5f0e5" 
                        alt="Profile Avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white border-[#1b4d3e]">
                      <Pencil className="h-4 w-4 text-[#1b4d3e]" />
                      <span className="sr-only">Change profile picture</span>
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Upload a photo (max 2MB)
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        defaultValue="Demo User" 
                        className="border-[#e9e1ca] focus:border-[#1b4d3e]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input 
                        id="displayName" 
                        defaultValue="Demo User" 
                        className="border-[#e9e1ca] focus:border-[#1b4d3e]"
                      />
                      <p className="text-xs text-muted-foreground">
                        This is how your name will appear publicly
                      </p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          defaultValue="user@example.com" 
                          className="border-[#e9e1ca] focus:border-[#1b4d3e]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="+1 (555) 123-4567" 
                          className="border-[#e9e1ca] focus:border-[#1b4d3e]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="us">
                          <SelectTrigger id="country" className="border-[#e9e1ca] focus:border-[#1b4d3e]">
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ae">United Arab Emirates</SelectItem>
                            <SelectItem value="sa">Saudi Arabia</SelectItem>
                            <SelectItem value="my">Malaysia</SelectItem>
                            <SelectItem value="id">Indonesia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="utc-5">
                          <SelectTrigger id="timezone" className="border-[#e9e1ca] focus:border-[#1b4d3e]">
                            <SelectValue placeholder="Select Timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                            <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                            <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                            <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                            <SelectItem value="utc">UTC</SelectItem>
                            <SelectItem value="utc+3">Arabian Time (UTC+3)</SelectItem>
                            <SelectItem value="utc+8">Malaysia/Singapore (UTC+8)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Connected Wallet */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Blockchain Wallet</h3>
                    <div className="p-4 border border-[#e9e1ca] rounded-md bg-[#f5f0e5]/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-[#1b4d3e]/10 flex items-center justify-center">
                            <Wallet className="h-5 w-5 text-[#1b4d3e]" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Connected Wallet</p>
                            <p className="text-xs text-muted-foreground">HeKs...YABvEBrV</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />
              
              {/* Preferences */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Account Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new features and investment opportunities
                      </p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="transaction-notifications">Transaction Confirmations</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email confirmations for all transactions
                      </p>
                    </div>
                    <Switch id="transaction-notifications" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-[#1b4d3e] hover:bg-[#1b4d3e]/90 text-[#f5f0e5]">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="transactions">Transaction Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for important transaction updates
                    </p>
                  </div>
                  <Switch id="transactions" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing">Marketing Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new features and promotional offers
                    </p>
                  </div>
                  <Switch id="marketing" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="security">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about security-related events with your account
                    </p>
                  </div>
                  <Switch id="security" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch id="2fa" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Last changed: 30 days ago
                    </p>
                    <Button variant="outline" size="sm">Change Password</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how Tahara looks on your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="theme-light" 
                        name="theme" 
                        value="light"
                        checked={theme === 'light'}
                        onChange={() => setTheme('light')}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="theme-light" className="cursor-pointer">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="theme-dark" 
                        name="theme" 
                        value="dark"
                        checked={theme === 'dark'}
                        onChange={() => setTheme('dark')}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="theme-dark" className="cursor-pointer">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="theme-system" 
                        name="theme" 
                        value="system"
                        checked={theme === 'system'}
                        onChange={() => setTheme('system')}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="theme-system" className="cursor-pointer">System</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reduce-motion">Reduce Motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimize animations throughout the interface
                    </p>
                  </div>
                  <Switch id="reduce-motion" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="large-text">Larger Text</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase the text size for better readability
                    </p>
                  </div>
                  <Switch id="large-text" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Language Settings</CardTitle>
              <CardDescription>Choose your preferred language and region</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language-select">Display Language</Label>
                  <Select 
                    value={language} 
                    onValueChange={setLanguage}
                  >
                    <SelectTrigger id="language-select" className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="id">Indonesian</SelectItem>
                      <SelectItem value="ms">Malay</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">
                    This will change the language throughout the application
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="currency-select">Display Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency-select" className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="aed">AED (د.إ)</SelectItem>
                      <SelectItem value="sar">SAR (ر.س)</SelectItem>
                      <SelectItem value="myr">MYR (RM)</SelectItem>
                      <SelectItem value="idr">IDR (Rp)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">
                    This determines how monetary values are displayed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your payment methods and billing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Plan</Label>
                  <div className="flex justify-between items-center border rounded p-4">
                    <div>
                      <h4 className="font-medium">Basic Plan</h4>
                      <p className="text-sm text-muted-foreground">All essential features</p>
                    </div>
                    <Button variant="outline" size="sm">Upgrade</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Payment Methods</Label>
                    <Button variant="outline" size="sm">Add Method</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No payment methods currently on file
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-6">
          <ServiceStatus />
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Manage third-party services and API integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="api-access">API Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable access to your account via the API
                    </p>
                  </div>
                  <Switch id="api-access" />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>API Keys</Label>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Manage your API keys for external services
                    </p>
                    <Button variant="outline" size="sm">Manage Keys</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
              <CardDescription>Get help with your account and find resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 space-y-2">
                  <h3 className="font-medium flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Customer Support
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Have a question or need help with your account? Our support team is here to help.
                  </p>
                  <Button variant="outline" size="sm">Contact Support</Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <h3 className="font-medium">Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore our documentation for detailed guides on using Tahara's features.
                  </p>
                  <Button variant="outline" size="sm">View Documentation</Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <h3 className="font-medium">FAQ</h3>
                  <p className="text-sm text-muted-foreground">
                    Find answers to commonly asked questions about our service.
                  </p>
                  <Button variant="outline" size="sm">View FAQ</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}