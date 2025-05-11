import { ReactNode } from "react";
import { Redirect } from "wouter";
import { useDynamicAuth } from "@/contexts/DynamicContext";
import { Spinner } from "@/components/ui/spinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useDynamicAuth();

  // If authentication is still loading, show a spinner
  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Spinner className="h-10 w-10 text-primary" />
      </div>
    );
  }

  // If not authenticated, redirect to sign in
  if (!isAuthenticated) {
    return <Redirect to="/signin" />;
  }

  // If authenticated, render the children
  return <>{children}</>;
};