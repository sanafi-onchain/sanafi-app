import { Router, Request, Response } from 'express';
import { serviceManager } from '../../services';
import { JupiterService } from '../../services/jupiter.service';

const router = Router();

// Get a list of tokens available for swapping
router.get('/tokens', async (req: Request, res: Response) => {
  try {
    const jupiterService = serviceManager.getService<JupiterService>('jupiter');
    if (!jupiterService) {
      return res.status(500).json({ error: 'Jupiter service not available' });
    }
    
    const tokens = await jupiterService.getTopTokens(100); // Get top 100 tokens
    return res.json({ tokens });
  } catch (error) {
    console.error('Error fetching token list:', error);
    return res.status(500).json({ error: 'Failed to fetch token list' });
  }
});

// Get a quote for a token swap
router.get('/quote', async (req: Request, res: Response) => {
  try {
    const { inputMint, outputMint, amount } = req.query;
    
    if (!inputMint || !outputMint || !amount) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const jupiterService = serviceManager.getService<JupiterService>('jupiter');
    if (!jupiterService) {
      return res.status(500).json({ error: 'Jupiter service not available' });
    }
    
    const quote = await jupiterService.getQuote(
      inputMint as string,
      outputMint as string,
      amount as string
    );
    
    return res.json({ quote });
  } catch (error) {
    console.error('Error fetching swap quote:', error);
    return res.status(500).json({ error: 'Failed to fetch swap quote' });
  }
});

// Get swap routes for a token pair
router.get('/routes', async (req: Request, res: Response) => {
  try {
    const { inputMint, outputMint, amount } = req.query;
    
    if (!inputMint || !outputMint || !amount) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const jupiterService = serviceManager.getService<JupiterService>('jupiter');
    if (!jupiterService) {
      return res.status(500).json({ error: 'Jupiter service not available' });
    }
    
    const routes = await jupiterService.getSwapRoutes(
      inputMint as string,
      outputMint as string,
      amount as string
    );
    
    return res.json({ routes });
  } catch (error) {
    console.error('Error fetching swap routes:', error);
    return res.status(500).json({ error: 'Failed to fetch swap routes' });
  }
});

// Get price for a token pair
router.get('/price', async (req: Request, res: Response) => {
  try {
    const { inputMint, outputMint } = req.query;
    
    if (!inputMint || !outputMint) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const jupiterService = serviceManager.getService<JupiterService>('jupiter');
    if (!jupiterService) {
      return res.status(500).json({ error: 'Jupiter service not available' });
    }
    
    const price = await jupiterService.getPrice(
      inputMint as string,
      outputMint as string
    );
    
    return res.json({ price });
  } catch (error) {
    console.error('Error fetching token price:', error);
    return res.status(500).json({ error: 'Failed to fetch token price' });
  }
});

export default router;