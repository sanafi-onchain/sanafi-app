import { CheckCircle2, XCircle, Server, Clock } from "lucide-react";

export function ServiceStatus() {
  // Simulated status data - in a real app this would come from an API
  const services = [
    { 
      name: "Blockchain Gateway", 
      status: "operational", 
      lastChecked: "2 minutes ago",
      description: "Connection to the Solana blockchain network"
    },
    { 
      name: "Wallet API", 
      status: "operational", 
      lastChecked: "3 minutes ago",
      description: "Integration with wallet services"
    },
    { 
      name: "Transaction Services", 
      status: "operational", 
      lastChecked: "5 minutes ago",
      description: "Processing of financial transactions"
    },
    { 
      name: "Exchange Rate API", 
      status: "degraded", 
      lastChecked: "7 minutes ago",
      description: "Real-time currency exchange rates"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "operational":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "outage":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "operational":
        return "Operational";
      case "degraded":
        return "Performance Issues";
      case "outage":
        return "Service Outage";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Service Health</h3>
          <p className="text-sm text-muted-foreground">Current status of Sanafi services</p>
        </div>
        <div className="flex items-center">
          <Server className="h-4 w-4 mr-1 text-[#1b4d3e]" />
          <span className="text-sm">Last updated: just now</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <div key={index} className="border rounded-md p-4 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center">
                {getStatusIcon(service.status)}
                <h4 className="font-medium ml-2">{service.name}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
            <div className="text-right">
              <div className={`text-sm font-medium ${
                service.status === 'operational' ? 'text-green-500' : 
                service.status === 'degraded' ? 'text-amber-500' : 'text-red-500'
              }`}>
                {getStatusText(service.status)}
              </div>
              <p className="text-xs text-muted-foreground">
                Checked {service.lastChecked}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}