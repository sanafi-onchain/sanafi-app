import { serviceManager } from './service-manager';
import { PrivyService } from './privy.service';

// Register services
const privyService = new PrivyService();
serviceManager.registerService('privy', privyService);

// Export service instances
export { serviceManager };
export { privyService };