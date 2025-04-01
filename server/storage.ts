import { 
  users, 
  transactions, 
  investments, 
  savings, 
  rewards, 
  notifications,
  wallets,
  kycVerifications,
  paymentCards,
  type User, 
  type InsertUser,
  type Transaction,
  type Investment,
  type Savings,
  type Reward,
  type Notification,
  type Wallet,
  type InsertWallet,
  type KycVerification,
  type InsertKycVerification,
  type PaymentCard,
  type InsertPaymentCard
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, asc, isNull, count } from "drizzle-orm";

// Storage interface
export interface IStorage {
  // User Methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByWalletAddress(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Wallet Methods
  getWallet(address: string): Promise<Wallet | undefined>;
  createWallet(wallet: InsertWallet): Promise<Wallet>;
  
  // KYC Methods
  getKycVerification(userId: number): Promise<KycVerification | undefined>;
  createKycVerification(kyc: InsertKycVerification): Promise<KycVerification>;
  updateKycStatus(userId: number, status: string): Promise<void>;
  
  // Payment Card Methods
  getPaymentCardsByUserId(userId: number): Promise<PaymentCard[]>;
  createPaymentCard(card: InsertPaymentCard): Promise<PaymentCard>;
  
  // Transaction Methods
  getAllTransactions(): Promise<Transaction[]>;
  getRecentTransactions(limit: number): Promise<Transaction[]>;
  getTransactionsByWalletAddress(walletAddress: string): Promise<Transaction[]>;
  createTransaction(transaction: any): Promise<Transaction>;
  
  // Investment Methods
  getAllInvestments(): Promise<Investment[]>;
  getFeaturedInvestments(): Promise<Investment[]>;
  getInvestmentsByWalletAddress(walletAddress: string): Promise<Investment[]>;
  createInvestment(investment: any): Promise<Investment>;
  
  // Savings Methods
  getSavingsByWalletAddress(walletAddress: string): Promise<Savings | undefined>;
  updateSavingsBalance(walletAddress: string, amount: number): Promise<void>;
  
  // Rewards Methods
  getRewardsByWalletAddress(walletAddress: string): Promise<Reward[]>;
  createReward(reward: any): Promise<Reward>;
  
  // Notification Methods
  getNotifications(): Promise<Notification[]>;
  getNotificationsByUserId(userId: number): Promise<Notification[]>;
  createNotification(notification: any): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<void>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User Methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }
  
  async getUserByWalletAddress(walletAddress: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.walletAddress, walletAddress));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Wallet Methods
  async getWallet(address: string): Promise<Wallet | undefined> {
    const [wallet] = await db.select().from(wallets).where(eq(wallets.address, address));
    return wallet || undefined;
  }
  
  async createWallet(wallet: InsertWallet): Promise<Wallet> {
    const [createdWallet] = await db.insert(wallets).values(wallet).returning();
    return createdWallet;
  }
  
  // KYC Methods
  async getKycVerification(userId: number): Promise<KycVerification | undefined> {
    const [kyc] = await db.select().from(kycVerifications).where(eq(kycVerifications.userId, userId));
    return kyc || undefined;
  }
  
  async createKycVerification(kyc: InsertKycVerification): Promise<KycVerification> {
    const [createdKyc] = await db.insert(kycVerifications).values(kyc).returning();
    return createdKyc;
  }
  
  async updateKycStatus(userId: number, status: string): Promise<void> {
    await db.update(kycVerifications)
      .set({ status, dateVerified: status === 'verified' ? new Date() : null })
      .where(eq(kycVerifications.userId, userId));
    
    await db.update(users)
      .set({ kycStatus: status })
      .where(eq(users.id, userId));
  }
  
  // Payment Card Methods
  async getPaymentCardsByUserId(userId: number): Promise<PaymentCard[]> {
    return await db.select().from(paymentCards)
      .where(eq(paymentCards.userId, userId))
      .orderBy(desc(paymentCards.dateAdded));
  }
  
  async createPaymentCard(card: InsertPaymentCard): Promise<PaymentCard> {
    const [createdCard] = await db.insert(paymentCards).values(card).returning();
    return createdCard;
  }
  
  // Transaction Methods
  async getAllTransactions(): Promise<Transaction[]> {
    return await db.select().from(transactions).orderBy(desc(transactions.date));
  }
  
  async getRecentTransactions(limit: number): Promise<Transaction[]> {
    return await db.select().from(transactions)
      .orderBy(desc(transactions.date))
      .limit(limit);
  }
  
  async getTransactionsByWalletAddress(walletAddress: string): Promise<Transaction[]> {
    return await db.select().from(transactions)
      .where(eq(transactions.walletAddress, walletAddress))
      .orderBy(desc(transactions.date));
  }
  
  async createTransaction(transaction: any): Promise<Transaction> {
    const [createdTransaction] = await db.insert(transactions).values(transaction).returning();
    return createdTransaction;
  }
  
  // Investment Methods
  async getAllInvestments(): Promise<Investment[]> {
    return await db.select().from(investments).orderBy(desc(investments.date));
  }
  
  async getFeaturedInvestments(): Promise<Investment[]> {
    return await db.select().from(investments)
      .where(eq(investments.featured, true))
      .orderBy(desc(investments.date));
  }
  
  async getInvestmentsByWalletAddress(walletAddress: string): Promise<Investment[]> {
    return await db.select().from(investments)
      .where(eq(investments.walletAddress, walletAddress))
      .orderBy(desc(investments.date));
  }
  
  async createInvestment(investment: any): Promise<Investment> {
    const [createdInvestment] = await db.insert(investments).values(investment).returning();
    return createdInvestment;
  }
  
  // Savings Methods
  async getSavingsByWalletAddress(walletAddress: string): Promise<Savings | undefined> {
    const [savingsAccount] = await db.select().from(savings)
      .where(eq(savings.walletAddress, walletAddress));
    return savingsAccount || undefined;
  }
  
  async updateSavingsBalance(walletAddress: string, amount: number): Promise<void> {
    // First check if savings account exists
    const savingsAccount = await this.getSavingsByWalletAddress(walletAddress);
    
    if (savingsAccount) {
      // Update existing account
      await db.update(savings)
        .set({ 
          balance: savingsAccount.balance + amount,
          lastDistribution: amount > 0 ? new Date() : savingsAccount.lastDistribution
        })
        .where(eq(savings.walletAddress, walletAddress));
    } else {
      // Create new account
      await db.insert(savings).values({
        walletAddress,
        balance: amount,
        annualizedReturn: 4,
        lastDistribution: amount > 0 ? new Date() : undefined
      });
    }
  }
  
  // Rewards Methods
  async getRewardsByWalletAddress(walletAddress: string): Promise<Reward[]> {
    return await db.select().from(rewards)
      .where(eq(rewards.walletAddress, walletAddress))
      .orderBy(desc(rewards.date));
  }
  
  async createReward(reward: any): Promise<Reward> {
    const [createdReward] = await db.insert(rewards).values(reward).returning();
    return createdReward;
  }
  
  // Notification Methods
  async getNotifications(): Promise<Notification[]> {
    return await db.select().from(notifications)
      .orderBy(desc(notifications.date));
  }
  
  async getNotificationsByUserId(userId: number): Promise<Notification[]> {
    return await db.select().from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.date));
  }
  
  async createNotification(notification: any): Promise<Notification> {
    const [createdNotification] = await db.insert(notifications).values(notification).returning();
    return createdNotification;
  }
  
  async markNotificationAsRead(id: number): Promise<void> {
    await db.update(notifications)
      .set({ isNew: false })
      .where(eq(notifications.id, id));
  }
}

// In-memory storage implementation for development
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private wallets: Map<string, Wallet>;
  private kycVerifications: Map<number, KycVerification>;
  private paymentCards: Map<number, PaymentCard>;
  private transactions: Map<number, Transaction>;
  private investments: Map<number, Investment>;
  private savings: Map<string, Savings>;
  private rewards: Map<number, Reward>;
  private notifications: Map<number, Notification>;
  
  currentUserId: number;
  currentWalletId: number;
  currentKycId: number;
  currentCardId: number;
  currentTransactionId: number;
  currentInvestmentId: number;
  currentRewardId: number;
  currentNotificationId: number;

  constructor() {
    this.users = new Map();
    this.wallets = new Map();
    this.kycVerifications = new Map();
    this.paymentCards = new Map();
    this.transactions = new Map();
    this.investments = new Map();
    this.savings = new Map();
    this.rewards = new Map();
    this.notifications = new Map();
    
    this.currentUserId = 1;
    this.currentWalletId = 1;
    this.currentKycId = 1;
    this.currentCardId = 1;
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
      email: null,
      phone: null,
      kycStatus: "pending",
      createdAt: new Date().toISOString()
    };
    this.users.set(id, user);
    return user;
  }
  
  // Wallet Methods
  async getWallet(address: string): Promise<Wallet | undefined> {
    return this.wallets.get(address);
  }
  
  async createWallet(wallet: InsertWallet): Promise<Wallet> {
    const id = this.currentWalletId++;
    const newWallet: Wallet = {
      ...wallet,
      id,
      balance: 0,
      isConnected: true,
      dateCreated: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    this.wallets.set(newWallet.address, newWallet);
    return newWallet;
  }
  
  // KYC Methods
  async getKycVerification(userId: number): Promise<KycVerification | undefined> {
    return Array.from(this.kycVerifications.values()).find(
      (kyc) => kyc.userId === userId
    );
  }
  
  async createKycVerification(kyc: InsertKycVerification): Promise<KycVerification> {
    const id = this.currentKycId++;
    const newKyc: KycVerification = {
      ...kyc,
      id,
      dateSubmitted: new Date().toISOString(),
      dateVerified: null
    };
    this.kycVerifications.set(id, newKyc);
    return newKyc;
  }
  
  async updateKycStatus(userId: number, status: string): Promise<void> {
    // Find the KYC entry
    const kyc = Array.from(this.kycVerifications.values()).find(
      (k) => k.userId === userId
    );
    
    if (kyc) {
      // Update KYC
      kyc.status = status;
      kyc.dateVerified = status === 'verified' ? new Date().toISOString() : null;
      this.kycVerifications.set(kyc.id, kyc);
    }
    
    // Update user
    const user = this.users.get(userId);
    if (user) {
      user.kycStatus = status;
      this.users.set(userId, user);
    }
  }
  
  // Payment Card Methods
  async getPaymentCardsByUserId(userId: number): Promise<PaymentCard[]> {
    return Array.from(this.paymentCards.values())
      .filter(card => card.userId === userId)
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }
  
  async createPaymentCard(card: InsertPaymentCard): Promise<PaymentCard> {
    const id = this.currentCardId++;
    const newCard: PaymentCard = {
      ...card,
      id,
      isActive: true,
      dateAdded: new Date().toISOString()
    };
    this.paymentCards.set(id, newCard);
    return newCard;
  }
  
  // Transaction Methods
  async getAllTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
  
  async createTransaction(transaction: any): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const newTransaction: Transaction = {
      ...transaction,
      id,
      date: new Date().toISOString()
    };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }
  
  // Investment Methods
  async getAllInvestments(): Promise<Investment[]> {
    return Array.from(this.investments.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  async getFeaturedInvestments(): Promise<Investment[]> {
    return Array.from(this.investments.values())
      .filter(inv => inv.featured)
      .sort((a, b) => parseFloat(b.expectedReturn) - parseFloat(a.expectedReturn));
  }
  
  async getInvestmentsByWalletAddress(walletAddress: string): Promise<Investment[]> {
    return Array.from(this.investments.values())
      .filter(inv => inv.walletAddress === walletAddress)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  async createInvestment(investment: any): Promise<Investment> {
    const id = this.currentInvestmentId++;
    const newInvestment: Investment = {
      ...investment,
      id,
      date: new Date().toISOString(),
      featured: false
    };
    this.investments.set(id, newInvestment);
    return newInvestment;
  }
  
  // Savings Methods
  async getSavingsByWalletAddress(walletAddress: string): Promise<Savings | undefined> {
    return this.savings.get(walletAddress);
  }
  
  async updateSavingsBalance(walletAddress: string, amount: number): Promise<void> {
    const savingsAccount = this.savings.get(walletAddress);
    
    if (savingsAccount) {
      // Update existing account
      const updatedSavings: Savings = {
        ...savingsAccount,
        balance: savingsAccount.balance + amount,
        lastDistribution: amount > 0 ? new Date().toISOString() : savingsAccount.lastDistribution
      };
      this.savings.set(walletAddress, updatedSavings);
    } else {
      // Create new account
      const newSavings: Savings = {
        walletAddress,
        balance: amount,
        annualizedReturn: 4,
        goalAmount: null,
        lastDistribution: amount > 0 ? new Date().toISOString() : null
      };
      this.savings.set(walletAddress, newSavings);
    }
  }
  
  // Rewards Methods
  async getRewardsByWalletAddress(walletAddress: string): Promise<Reward[]> {
    return Array.from(this.rewards.values())
      .filter(reward => reward.walletAddress === walletAddress)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  async createReward(reward: any): Promise<Reward> {
    const id = this.currentRewardId++;
    const newReward: Reward = {
      ...reward,
      id,
      date: new Date().toISOString()
    };
    this.rewards.set(id, newReward);
    return newReward;
  }
  
  // Notification Methods
  async getNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  async getNotificationsByUserId(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(notification => notification.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  async createNotification(notification: any): Promise<Notification> {
    const id = this.currentNotificationId++;
    const newNotification: Notification = {
      ...notification,
      id,
      isNew: true,
      date: new Date().toISOString()
    };
    this.notifications.set(id, newNotification);
    return newNotification;
  }
  
  async markNotificationAsRead(id: number): Promise<void> {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.isNew = false;
      this.notifications.set(id, notification);
    }
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
      email: "demo@example.com",
      phone: null,
      kycStatus: "pending",
      createdAt: new Date().toISOString()
    };
    this.users.set(user1.id, user1);
    
    // Mock Wallet
    const wallet1: Wallet = {
      id: this.currentWalletId++,
      address: user1.walletAddress,
      userId: user1.id,
      balance: 3,
      provider: "Privy",
      isConnected: true,
      dateCreated: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    this.wallets.set(wallet1.address, wallet1);
    
    // Mock KYC Verification
    const kyc1: KycVerification = {
      id: this.currentKycId++,
      userId: user1.id,
      status: "pending",
      verificationId: null,
      dateSubmitted: new Date().toISOString(),
      dateVerified: null,
      documentType: null
    };
    this.kycVerifications.set(kyc1.id, kyc1);
    
    // Mock Transactions
    const transactions: Transaction[] = [
      {
        id: this.currentTransactionId++,
        type: "deposit",
        title: "Deposited USDC",
        amount: 1,
        walletAddress: user1.walletAddress,
        userId: user1.id,
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
        userId: user1.id,
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
        userId: user1.id,
        date: new Date("2023-10-15").toISOString(),
        status: "Completed"
      },
      {
        id: this.currentTransactionId++,
        type: "savings",
        title: "Savings Deposit",
        amount: -1,
        walletAddress: user1.walletAddress,
        userId: user1.id,
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
        userId: user1.id,
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
        userId: user1.id,
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
        userId: user1.id,
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
        userId: user1.id,
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
        userId: user1.id,
        date: new Date("2023-10-15").toISOString()
      },
      {
        id: this.currentRewardId++,
        source: "Ethical Fashion",
        amount: 0.015,
        walletAddress: user1.walletAddress,
        userId: user1.id,
        date: new Date("2023-10-10").toISOString()
      },
      {
        id: this.currentRewardId++,
        source: "Muslim Bookstore",
        amount: 0.0035,
        walletAddress: user1.walletAddress,
        userId: user1.id,
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
        actionUrl: "/investments",
        userId: user1.id
      },
      {
        id: this.currentNotificationId++,
        title: "Savings profit distributed",
        description: "Your quarterly profit-sharing distribution has been processed.",
        type: "savings",
        isNew: true,
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        actionUrl: "/savings",
        userId: user1.id
      },
      {
        id: this.currentNotificationId++,
        title: "New educational content",
        description: "Learn about Mudarabah contracts in our latest article.",
        type: "education",
        isNew: true,
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        actionUrl: "/learn",
        userId: user1.id
      }
    ];
    
    notifications.forEach(notification => {
      this.notifications.set(notification.id, notification);
    });
  }
}

// Use Database Storage as our default implementation
export const storage = new DatabaseStorage();
