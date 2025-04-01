import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Alert, AlertCircle, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Activity,
  AlertCircle as AlertCircleIcon,
  CheckCircle2,
  Clock,
  RefreshCw,
  Server,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define the type for a service's status data
export type ServiceStatusData = {
  name: string;
  status: 'ok' | 'error';
  message?: string;
  isConfigured: boolean;
  lastChecked: string;
};

export function ServiceStatus() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  type ServiceResponse = {
    success: boolean;
    services: ServiceStatusData[];
  };

  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery<ServiceResponse>({
    queryKey: ['/api/services/status'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Service Status
          </CardTitle>
          <CardDescription>Status of connected third-party services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Separator />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Service Status
          </CardTitle>
          <CardDescription>Status of connected third-party services</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Could not load service status information.
              {error instanceof Error ? ` ${error.message}` : ''}
              <div className="mt-4">
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const services: ServiceStatusData[] = data?.services || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Service Status
          </CardTitle>
          <CardDescription>Status of connected third-party services</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {services.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircleIcon className="mx-auto h-8 w-8 mb-2" />
            <p>No services have been registered yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {services.map((service) => (
              <div key={service.name}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium">{service.name}</h3>
                    {!service.isConfigured && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Not Configured
                      </Badge>
                    )}
                  </div>
                  <div>
                    {service.status === 'ok' ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 flex items-center">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Operational
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="flex items-center">
                        <XCircle className="mr-1 h-3 w-3" />
                        Service Issue
                      </Badge>
                    )}
                  </div>
                </div>
                
                {service.message && (
                  <p className="text-sm text-muted-foreground mb-2">{service.message}</p>
                )}
                
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Activity className="mr-1 h-3 w-3" />
                    Status: {service.isConfigured ? 'Ready' : 'Missing Credentials'}
                  </div>
                  {service.lastChecked && (
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      Last checked: {new Date(service.lastChecked).toLocaleTimeString()}
                    </div>
                  )}
                  {!service.isConfigured && (
                    <div className="flex items-center text-amber-500">
                      <ShieldAlert className="mr-1 h-3 w-3" />
                      API credentials required
                    </div>
                  )}
                </div>
                
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}