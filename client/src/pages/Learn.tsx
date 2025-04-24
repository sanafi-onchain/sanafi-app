import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  PlayCircle, 
  GraduationCap, 
  Check, 
  FileText, 
  LightbulbIcon, 
  HelpCircle,
  BookIcon,
  Search,
  Clock,
  ChevronRight,
  ShieldCheck,
  Wallet,
  PiggyBank,
  TrendingUp,
  CreditCard
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function Learn() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Learning Center</CardTitle>
          <CardDescription>
            Explore our educational resources on Islamic finance and blockchain technology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input placeholder="Search for topics..." className="pl-9" />
              <div className="absolute left-3 top-2.5">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="basics">
            <TabsList className="mb-4">
              <TabsTrigger value="basics">Sharia Finance Basics</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain 101</TabsTrigger>
              <TabsTrigger value="tutorials">Tahara Tutorials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-primary/20 to-primary/10 h-24 flex items-center justify-center">
                      <LightbulbIcon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">Understanding Mudarabah</h3>
                      <p className="text-sm text-muted-foreground mb-4">Learn about profit-sharing partnerships in Islamic finance.</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          5 min read
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                          Read Article
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 h-24 flex items-center justify-center">
                      <FileText className="h-10 w-10 text-secondary" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">Introduction to Sukuk</h3>
                      <p className="text-sm text-muted-foreground mb-4">Discover how Islamic bonds work as financial instruments.</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <PlayCircle className="h-3 w-3 mr-1" />
                          3 min video
                        </div>
                        <Button variant="ghost" size="sm" className="text-secondary">
                          Watch Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-accent/20 to-accent/10 h-24 flex items-center justify-center">
                      <HelpCircle className="h-10 w-10 text-accent" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">Halal vs Haram Investments</h3>
                      <p className="text-sm text-muted-foreground mb-4">Identifying permissible investments in Islamic finance.</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <FileText className="h-3 w-3 mr-1" />
                          Guide
                        </div>
                        <Button variant="ghost" size="sm" className="text-accent">
                          Read Guide
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Featured Topic: Understanding Islamic Finance Principles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h3 className="font-bold text-lg mb-3">The Five Key Principles</h3>
                      <p className="text-muted-foreground mb-4">
                        Islamic finance is built on principles that ensure financial activities remain ethical and aligned with Sharia law. These include prohibition of interest (Riba), profit-and-loss sharing, avoiding uncertainty (Gharar), and investing only in permissible (halal) activities.
                      </p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Prohibition of Interest (Riba)</h4>
                            <p className="text-sm text-muted-foreground">Charging interest on loans is forbidden in Islamic finance.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Profit-and-Loss Sharing</h4>
                            <p className="text-sm text-muted-foreground">Financial risks must be shared among participants.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Asset-Backed Transactions</h4>
                            <p className="text-sm text-muted-foreground">Financial transactions should be backed by tangible assets.</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button>
                        Read Full Article
                      </Button>
                    </div>
                    
                    <div className="bg-muted rounded-lg p-5">
                      <h3 className="font-medium mb-3">Related Resources</h3>
                      <ul className="space-y-3">
                        <li>
                          <a href="#" className="flex items-start hover:text-primary">
                            <PlayCircle className="h-4 w-4 mt-0.5 mr-2 text-secondary" />
                            <span className="text-sm">Introduction to Murabaha - 4 min video</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex items-start hover:text-primary">
                            <FileText className="h-4 w-4 mt-0.5 mr-2 text-secondary" />
                            <span className="text-sm">Islamic Banking vs Conventional Banking</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex items-start hover:text-primary">
                            <BookIcon className="h-4 w-4 mt-0.5 mr-2 text-secondary" />
                            <span className="text-sm">The History of Islamic Finance</span>
                          </a>
                        </li>
                      </ul>
                      
                      <div className="mt-4 pt-4 border-t">
                        <a href="#" className="text-primary hover:underline text-sm font-medium flex items-center">
                          View All Resources
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="blockchain" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-primary/20 to-secondary/10 h-24 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-secondary" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">Blockchain Fundamentals</h3>
                      <p className="text-sm text-muted-foreground mb-4">Learn the basic concepts of blockchain technology.</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          10 min read
                        </div>
                        <Button variant="ghost" size="sm" className="text-secondary">
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 h-24 flex items-center justify-center">
                      <ShieldCheck className="h-10 w-10 text-secondary" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">Solana Blockchain</h3>
                      <p className="text-sm text-muted-foreground mb-4">Understand the technology behind Tahara's platform.</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <PlayCircle className="h-3 w-3 mr-1" />
                          5 min video
                        </div>
                        <Button variant="ghost" size="sm" className="text-secondary">
                          Watch Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-primary/20 to-primary/10 h-24 flex items-center justify-center">
                      <BookIcon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">Blockchain & Sharia Compliance</h3>
                      <p className="text-sm text-muted-foreground mb-4">How blockchain enables transparent Islamic finance.</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <FileText className="h-3 w-3 mr-1" />
                          Article
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                          Read Article
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tutorials" className="mt-0">
              <div className="mb-6">
                <h3 className="font-medium mb-4">Getting Started with Tahara</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-start">
                      <div className="p-2 rounded-full bg-primary/10 mr-4">
                        <Wallet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Setting Up Your Wallet</h4>
                        <p className="text-sm text-muted-foreground mb-2">Learn how to create and connect your Solana wallet.</p>
                        <Button size="sm" variant="ghost" className="text-primary">
                          View Tutorial
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex items-start">
                      <div className="p-2 rounded-full bg-secondary/10 mr-4">
                        <PiggyBank className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Your First Deposit</h4>
                        <p className="text-sm text-muted-foreground mb-2">How to deposit funds into your Sanafi account.</p>
                        <Button size="sm" variant="ghost" className="text-secondary">
                          View Tutorial
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex items-start">
                      <div className="p-2 rounded-full bg-primary/10 mr-4">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Making Your First Investment</h4>
                        <p className="text-sm text-muted-foreground mb-2">Step-by-step guide to investing in Sukuk.</p>
                        <Button size="sm" variant="ghost" className="text-primary">
                          View Tutorial
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 flex items-start">
                      <div className="p-2 rounded-full bg-secondary/10 mr-4">
                        <CreditCard className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Using Your Sanafi Card</h4>
                        <p className="text-sm text-muted-foreground mb-2">How to spend and earn rewards with your card.</p>
                        <Button size="sm" variant="ghost" className="text-secondary">
                          View Tutorial
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Sharia Finance Fundamentals</span>
                      <span className="text-sm">3/5 completed</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Blockchain Basics</span>
                      <span className="text-sm">1/4 completed</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Sanafi Platform Guide</span>
                      <span className="text-sm">2/3 completed</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  
                  <div className="text-center">
                    <GraduationCap className="h-12 w-12 mx-auto mb-2 text-primary/50" />
                    <h4 className="font-medium mb-1">Keep Learning!</h4>
                    <p className="text-sm text-muted-foreground mb-4">Complete more modules to earn knowledge badges.</p>
                    <Button>
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
