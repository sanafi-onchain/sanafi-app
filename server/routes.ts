import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { userSchema, transactionSchema, investmentSchema } from "@shared/schema";
import apiRoutes from "./routes/api";
import { serviceManager } from "./services";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize service manager
  try {
    await serviceManager.initialize();
  } catch (error) {
    console.error('Error initializing service manager:', error);
  }
  
  // Register API routes
  app.use('/api', apiRoutes);
  // User Routes
  app.get('/api/user/profile', async (req, res) => {
    // In a real app, we would get this from the session
    const mockWalletAddress = req.query.address || "unknown";
    
    try {
      const user = await storage.getUserByWalletAddress(mockWalletAddress as string);
      
      if (user) {
        res.json(user);
      } else {
        // Return mock data if no user found (for demo purposes)
        res.json({
          id: 1,
          name: "Demo User",
          walletAddress: mockWalletAddress,
          createdAt: new Date().toISOString()
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user profile" });
    }
  });

  // Wallet Routes
  app.post('/api/wallet/connect', async (req, res) => {
    const walletSchema = z.object({
      address: z.string(),
      provider: z.string()
    });

    try {
      const validatedData = walletSchema.parse(req.body);
      
      // Check if user exists
      let user = await storage.getUserByWalletAddress(validatedData.address);
      
      if (!user) {
        // Create new user if not exists
        user = await storage.createUser({
          name: "New User",
          username: `user_${Date.now()}`,
          walletAddress: validatedData.address,
          password: "not_used_for_wallet_auth", // not actually used for wallet auth
        });
      }
      
      res.json({ success: true, user });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid wallet data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Error connecting wallet" });
      }
    }
  });

  // Transaction Routes
  app.get('/api/transactions', async (req, res) => {
    try {
      const transactions = await storage.getAllTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching transactions" });
    }
  });

  app.get('/api/transactions/recent', async (req, res) => {
    try {
      const transactions = await storage.getRecentTransactions(5);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recent transactions" });
    }
  });

  // Investment Routes
  app.get('/api/investments', async (req, res) => {
    try {
      const investments = await storage.getAllInvestments();
      res.json(investments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching investments" });
    }
  });

  app.get('/api/investments/featured', async (req, res) => {
    try {
      const featuredInvestments = await storage.getFeaturedInvestments();
      res.json(featuredInvestments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured investments" });
    }
  });

  // Savings Routes
  app.get('/api/savings', async (req, res) => {
    // In a real app, we would get this from the session
    const mockWalletAddress = req.query.address || "unknown";
    
    try {
      const savings = await storage.getSavingsByWalletAddress(mockWalletAddress as string);
      res.json(savings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching savings" });
    }
  });

  // Rewards Routes
  app.get('/api/rewards', async (req, res) => {
    // In a real app, we would get this from the session
    const mockWalletAddress = req.query.address || "unknown";
    
    try {
      const rewards = await storage.getRewardsByWalletAddress(mockWalletAddress as string);
      res.json(rewards);
    } catch (error) {
      res.status(500).json({ message: "Error fetching rewards" });
    }
  });

  // Notifications Routes
  app.get('/api/notifications', async (req, res) => {
    try {
      const notifications = await storage.getNotifications();
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching notifications" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
