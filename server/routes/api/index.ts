import { Router } from 'express';
import servicesRoutes from './services';

const router = Router();

// Register API routes
router.use('/services', servicesRoutes);

export default router;