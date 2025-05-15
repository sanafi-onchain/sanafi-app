import { useState } from 'react';
import { ServiceStatus } from '@/components/ServiceStatus';
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
  HelpCircle
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
              {/* Form content would go here */}
              <p className="text-muted-foreground">Personal information settings will be implemented in a future update.</p>
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