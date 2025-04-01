import { Router } from "express";
import config from "../../config";

const router = Router();

// Provide client-side configuration
router.get("/", (_req, res) => {
  // Only send what the client needs
  const clientConfig = {
    privy: {
      appId: process.env.PRIVY_APP_ID || config.privy.appId,
    },
    // Add other necessary configuration values here
  };
  
  res.json(clientConfig);
});

export default router;