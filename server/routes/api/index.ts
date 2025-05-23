import { Router } from 'express';
import servicesRouter from './services';
import jupiterRouter from './jupiter';
import userRouter from './user';
import configRouter from './config';
import chatRouter from './chat';

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
router.use('/chat', chatRouter);

export default router;