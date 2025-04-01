import { Router } from 'express';
import { serviceManager } from '../../services';

const router = Router();

// Get status of all services
router.get('/status', async (req, res) => {
  try {
    const services = await serviceManager.getServicesStatus();
    res.json({ success: true, services });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get list of all registered service names
router.get('/list', async (req, res) => {
  try {
    const serviceNames = serviceManager.getServiceNames();
    res.json({ success: true, services: serviceNames });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get specific service details
router.get('/:serviceName', async (req, res) => {
  const { serviceName } = req.params;
  
  try {
    const service = serviceManager.getService(serviceName);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: `Service '${serviceName}' not found`
      });
    }
    
    const isConfigured = service.isConfigured();
    const status = await service.healthCheck();
    
    res.json({
      success: true,
      service: {
        name: serviceName,
        status: status.status,
        message: status.message,
        isConfigured,
        lastChecked: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;