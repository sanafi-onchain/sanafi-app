import { Router, Request, Response } from "express";
import { storage } from "../../storage";
import { z } from "zod";
import { PrivyService } from "../../services/privy.service";
import { serviceManager } from "../../services/service-manager";

const router = Router();

// Get authenticated user from Privy token
router.get("/me", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const privyService = serviceManager.getService<PrivyService>("privy");
    
    if (!privyService) {
      return res.status(500).json({ error: 'Privy service not available' });
    }

    const { verified, userId, error } = await privyService.verifyToken(token);
    
    if (!verified || !userId) {
      return res.status(401).json({ error: error || 'Invalid token' });
    }

    // Try to fetch user from database
    let user = await storage.getUserByWalletAddress(userId);
    
    // If user doesn't exist, create a minimal user record
    if (!user) {
      const tempUsername = `user_${Date.now().toString().slice(-6)}`;
      
      try {
        // Create basic user with random password (Privy handles auth)
        user = await storage.createUser({
          username: tempUsername,
          password: `pwd_${Math.random().toString(36).substring(2, 12)}`,
          name: "Sanafi User",
          email: "",
          walletAddress: userId
        });
        
        // Create wallet linked to user
        await storage.createWallet({
          address: userId,
          provider: "privy", // Wallet provider
          userId: user.id
        });
      } catch (err) {
        console.error('Error creating user:', err);
      }
    }

    // Create a sanitized response without sensitive data
    const userResponse = {
      id: user?.id || 0,
      name: user?.name || "Sanafi User",
      username: user?.username || "user",
      walletAddress: userId,
      email: user?.email || "",
      profileImageUrl: null,
      isKycVerified: user?.kycStatus === 'verified',
      privyUserId: userId
    };

    return res.json(userResponse);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Get user profile data
router.get("/profile", async (req: Request, res: Response) => {
  try {
    // For demo purposes, return a demo user if not authenticated
    // In production, this should require authentication
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      // If authenticated, fetch real user profile
      const token = authHeader.split(' ')[1];
      const privyService = serviceManager.getService<PrivyService>("privy");
      
      if (privyService) {
        const { verified, userId } = await privyService.verifyToken(token);
        
        if (verified && userId) {
          // Get user by wallet address (Privy user ID)
          const user = await storage.getUserByWalletAddress(userId);
          
          if (user) {
            return res.json({
              id: user.id,
              name: user.name || "Sanafi User",
              walletAddress: userId,
              email: user.email || "",
              profileImageUrl: null,
              isKycVerified: user.kycStatus === 'verified',
            });
          }
        }
      }
    }
    
    // Fallback to demo user
    const demoUser = {
      id: 1,
      name: "Demo User",
      walletAddress: "sol123...xyz",
      email: "user@example.com",
      profileImageUrl: null,
      isKycVerified: false,
    };

    return res.json(demoUser);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Handle user onboarding form submission
router.post("/onboarding", async (req: Request, res: Response) => {
  try {
    // Validate onboarding data
    const onboardingSchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().optional(),
      country: z.string().min(2),
      goals: z.array(z.string()).min(1),
      riskTolerance: z.enum(["low", "medium", "high"]),
      acceptTerms: z.boolean().refine((val) => val === true, {
        message: "Terms must be accepted",
      }),
      walletAddress: z.string().optional(),
    });

    const validatedData = onboardingSchema.parse(req.body);

    // Get the Privy service to verify wallet
    const privyService = serviceManager.getService<PrivyService>("privy");
    
    // Process wallet data if available
    if (validatedData.walletAddress && privyService) {
      // In a real app, verify the wallet with Privy
      // await privyService.verifyWalletOwnership(validatedData.walletAddress);
      
      // Check if wallet already exists
      const existingWallet = await storage.getWallet(validatedData.walletAddress);
      
      if (!existingWallet) {
        // Create wallet record
        await storage.createWallet({
          address: validatedData.walletAddress,
          type: "solana",
          userId: 1, // In a real app, use the actual user ID
        });
      }
    }
    
    // Create or update user profile
    // In a real app, this would upsert the user's profile in the database
    const user = await storage.getUserByWalletAddress(validatedData.walletAddress || "");
    
    if (!user) {
      // Create new user
      await storage.createUser({
        username: validatedData.email.split("@")[0],
        password: `pwd_${Math.random().toString(36).substring(2, 12)}`, // Generate random password
        email: validatedData.email,
        name: validatedData.name,
        country: validatedData.country,
        preferences: JSON.stringify({
          goals: validatedData.goals,
          riskTolerance: validatedData.riskTolerance,
        }),
      });
    }

    return res.status(201).json({
      success: true,
      message: "Onboarding completed successfully",
    });
  } catch (error) {
    console.error("Error processing onboarding:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: "Invalid onboarding data", 
        details: error.errors 
      });
    }
    return res.status(500).json({ error: "Failed to process onboarding" });
  }
});

export default router;