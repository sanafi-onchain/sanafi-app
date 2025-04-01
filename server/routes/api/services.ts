import { Router, Request, Response } from 'express';
import { serviceManager } from '../../services';
import { BaseService } from '../../services/base.service';

const router = Router();

// Get status of all registered services
router.get('/status', async (req: Request, res: Response) => {
  try {
    const serviceStatus = await serviceManager.getServicesStatus();
    return res.json({ services: serviceStatus });
  } catch (error) {
    console.error('Error fetching service status:', error);
    return res.status(500).json({ error: 'Failed to fetch service status' });
  }
});

export default router;