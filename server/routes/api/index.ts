import { Router } from 'express';
import servicesRouter from './services';
import jupiterRouter from './jupiter';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Register all API routes
router.use('/services', servicesRouter);
router.use('/jupiter', jupiterRouter);

export default router;