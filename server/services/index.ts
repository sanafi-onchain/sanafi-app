import { serviceManager } from './service-manager';
import { PrivyService } from './privy.service';
import { JupiterService } from './jupiter.service';

// Register services
const privyService = new PrivyService();
const jupiterService = new JupiterService();

serviceManager.registerService('privy', privyService);
serviceManager.registerService('jupiter', jupiterService);

// Export service instances
export { serviceManager };
export { privyService, jupiterService };