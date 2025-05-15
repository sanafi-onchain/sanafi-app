import { Router, Request, Response } from "express";
import { storage } from "../../storage";
import { z } from "zod";
import { PrivyService } from "../../services/privy.service";
import { serviceManager } from "../../services/service-manager";

const router = Router();

// Get user profile data
router.get("/profile", async (req: Request, res: Response) => {
  try {
    // For demo purposes, return a demo user
    // In a real app, this would validate the user's session/JWT and return their profile
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