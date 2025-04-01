import { Router } from 'express';
import servicesRouter from './services';
import jupiterRouter from './jupiter';
import userRouter from './user';
import configRouter from './config';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Register all API routes
router.use('/services', servicesRouter);
router.use('/jupiter', jupiterRouter);
router.use('/user', userRouter);
router.use('/config', configRouter);

export default router;