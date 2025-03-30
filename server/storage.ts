import { 
  users, 
  transactions, 
  investments, 
  savings, 
  rewards, 
  notifications,
  type User, 
  type InsertUser,
  type Transaction,
  type Investment,
  type Savings,
  type Reward,
  type Notification
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User Methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByWalletAddress(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Transaction Methods
  getAllTransactions(): Promise<Transaction[]>;
  getRecentTransactions(limit: number): Promise<Transaction[]>;
  getTransactionsByWalletAddress(walletAddress: string): Promise<Transaction[]>;
  
  // Investment Methods
  getAllInvestments(): Promise<Investment[]>;
  getFeaturedInvestments(): Promise<Investment[]>;
  getInvestmentsByWalletAddress(walletAddress: string): Promise<Investment[]>;
  
  // Savings Methods
  getSavingsByWalletAddress(walletAddress: string): Promise<Savings | undefined>;
  
  // Rewards Methods
  getRewardsByWalletAddress(walletAddress: string): Promise<Reward[]>;
  
  // Notification Methods
  getNotifications(): Promise<Notification[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transactions: Map<number, Transaction>;
  private investments: Map<number, Investment>;
  private savings: Map<string, Savings>;
  private rewards: Map<number, Reward>;
  private notifications: Map<number, Notification>;
  
  currentUserId: number;
  currentTransactionId: number;
  currentInvestmentId: number;
  currentRewardId: number;
  currentNotificationId: number;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.investments = new Map();
    this.savings = new Map();
    this.rewards = new Map();
    this.notifications = new Map();
    
    this.currentUserId = 1;
    this.currentTransactionId = 1;
    this.currentInvestmentId = 1;
    this.currentRewardId = 1;
    this.currentNotificationId = 1;
    
    // Initialize with mock data
    this.initializeMockData();
  }

  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async getUserByWalletAddress(walletAddress: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.walletAddress === walletAddress
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date().toISOString()
    };
    this.users.set(id, user);
    return user;
  }
  
  // Transaction Methods
  async getAllTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }
  
  async getRecentTransactions(limit: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }
  
  async getTransactionsByWalletAddress(walletAddress: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(tx => tx.walletAddress === walletAddress)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  // Investment Methods
  async getAllInvestments(): Promise<Investment[]> {
    return Array.from(this.investments.values());
  }
  
  async getFeaturedInvestments(): Promise<Investment[]> {
    return Array.from(this.investments.values())
      .filter(inv => inv.featured)
      .sort((a, b) => parseFloat(b.expectedReturn) - parseFloat(a.expectedReturn));
  }
  
  async getInvestmentsByWalletAddress(walletAddress: string): Promise<Investment[]> {
    return Array.from(this.investments.values())
      .filter(inv => inv.walletAddress === walletAddress);
  }
  
  // Savings Methods
  async getSavingsByWalletAddress(walletAddress: string): Promise<Savings | undefined> {
    return this.savings.get(walletAddress);
  }
  
  // Rewards Methods
  async getRewardsByWalletAddress(walletAddress: string): Promise<Reward[]> {
    return Array.from(this.rewards.values())
      .filter(reward => reward.walletAddress === walletAddress)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  // Notification Methods
  async getNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  // Initialize mock data for development
  private initializeMockData() {
    // Mock Users
    const user1: User = {
      id: this.currentUserId++,
      username: "demo_user",
      password: "hashed_password",
      name: "Demo User",
      walletAddress: "demo123wallet456address789",
      createdAt: new Date().toISOString()
    };
    this.users.set(user1.id, user1);
    
    // Mock Transactions
    const transactions: Transaction[] = [
      {
        id: this.currentTransactionId++,
        type: "deposit",
        title: "Deposited USDC",
        amount: 1,
        walletAddress: user1.walletAddress,
        date: new Date("2023-10-20").toISOString(),
        status: "Successful",
        txHash: "mock_tx_hash_1"
      },
      {
        id: this.currentTransactionId++,
        type: "investment",
        title: "Invested in Sukuk Fund",
        amount: -0.5,
        walletAddress: user1.walletAddress,
        date: new Date("2023-10-18").toISOString(),
        status: "Successful",
        txHash: "mock_tx_hash_2"
      },
      {
        id: this.currentTransactionId++,
        type: "spend",
        title: "Halal Grocery Purchase",
        amount: -0.1,
        reward: 0.01,
        walletAddress: user1.walletAddress,
        date: new Date("2023-10-15").toISOString(),
        status: "Completed"
      },
      {
        id: this.currentTransactionId++,
        type: "savings",
        title: "Savings Deposit",
        amount: -1,
        walletAddress: user1.walletAddress,
        date: new Date("2023-10-10").toISOString(),
        status: "Successful",
        txHash: "mock_tx_hash_3"
      },
      {
        id: this.currentTransactionId++,
        type: "profit",
        title: "Savings Profit Distribution",
        amount: 0.04,
        walletAddress: user1.walletAddress,
        date: new Date("2023-10-01").toISOString(),
        status: "Completed",
        txHash: "mock_tx_hash_4"
      }
    ];
    
    transactions.forEach(tx => {
      this.transactions.set(tx.id, tx);
    });
    
    // Mock Investments
    const investments: Investment[] = [
      {
        id: this.currentInvestmentId++,
        name: "Real Estate Sukuk",
        description: "Sharia-compliant investment in commercial real estate properties.",
        amount: 0.6,
        expectedReturn: "5.2",
        riskLevel: "Low-Medium",
        compliance: "AAOIFI-Compliant",
        walletAddress: user1.walletAddress,
        type: "sukuk",
        sector: "real-estate",
        date: new Date("2023-10-18").toISOString(),
        featured: true
      },
      {
        id: this.currentInvestmentId++,
        name: "Ethical Tech Fund",
        description: "Diversified portfolio of ethical technology companies.",
        amount: 0.45,
        expectedReturn: "7.8",
        riskLevel: "Medium",
        compliance: "Sharia-Compliant",
        walletAddress: user1.walletAddress,
        type: "equity",
        sector: "technology",
        date: new Date("2023-09-15").toISOString(),
        featured: true
      },
      {
        id: this.currentInvestmentId++,
        name: "Halal SME Financing",
        description: "Support small businesses with Sharia-compliant financing.",
        amount: 0.45,
        expectedReturn: "6.5",
        riskLevel: "Medium-High",
        compliance: "Mudarabah-Based",
        walletAddress: user1.walletAddress,
        type: "mudarabah",
        sector: "small-business",
        date: new Date("2023-09-01").toISOString(),
        featured: true
      }
    ];
    
    investments.forEach(inv => {
      this.investments.set(inv.id, inv);
    });
    
    // Mock Savings
    const userSavings: Savings = {
      walletAddress: user1.walletAddress,
      balance: 2.1,
      annualizedReturn: 4,
      goalAmount: 10,
      lastDistribution: new Date("2023-10-01").toISOString()
    };
    
    this.savings.set(user1.walletAddress, userSavings);
    
    // Mock Rewards
    const rewards: Reward[] = [
      {
        id: this.currentRewardId++,
        source: "Halal Grocery",
        amount: 0.01,
        walletAddress: user1.walletAddress,
        date: new Date("2023-10-15").toISOString()
      },
      {
        id: this.currentRewardId++,
        source: "Ethical Fashion",
        amount: 0.015,
        walletAddress: user1.walletAddress,
        date: new Date("2023-10-10").toISOString()
      },
      {
        id: this.currentRewardId++,
        source: "Muslim Bookstore",
        amount: 0.0035,
        walletAddress: user1.walletAddress,
        date: new Date("2023-10-05").toISOString()
      }
    ];
    
    rewards.forEach(reward => {
      this.rewards.set(reward.id, reward);
    });
    
    // Mock Notifications
    const notifications: Notification[] = [
      {
        id: this.currentNotificationId++,
        title: "New sukuk asset listed!",
        description: "A new Sharia-compliant sukuk has been added to the investment marketplace.",
        type: "investment",
        isNew: true,
        date: new Date().toISOString(),
        actionUrl: "/investments"
      },
      {
        id: this.currentNotificationId++,
        title: "Savings profit distributed",
        description: "Your quarterly profit-sharing distribution has been processed.",
        type: "savings",
        isNew: true,
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        actionUrl: "/savings"
      },
      {
        id: this.currentNotificationId++,
        title: "New educational content",
        description: "Learn about Mudarabah contracts in our latest article.",
        type: "education",
        isNew: true,
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        actionUrl: "/learn"
      }
    ];
    
    notifications.forEach(notification => {
      this.notifications.set(notification.id, notification);
    });
  }
}

export const storage = new MemStorage();
