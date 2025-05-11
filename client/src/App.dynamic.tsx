import { Route, Switch, Redirect } from "wouter";
import Layout from "@/components/Layout";
import { ProtectedRoute } from "@/components/DynamicProtectedRoute"; // Import our new protected route component
import { SignIn } from "@/pages/DynamicSignIn"; // Import our new sign-in page
import Accounts from "@/pages/Accounts";
import Learn from "@/pages/Learn";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <Layout>
      <Switch>
        {/* Main accessible routes */}
        <Route path="/signin" component={SignIn} />
        <Route path="/accounts" component={() => (
          <ProtectedRoute><Accounts /></ProtectedRoute>
        )} />
        <Route path="/learn" component={() => (
          <ProtectedRoute><Learn /></ProtectedRoute>
        )} />
        
        {/* Make Sanafi AI the default landing page */}
        <Route path="/" component={() => (
          <ProtectedRoute><Learn /></ProtectedRoute>
        )} />
        
        {/* Hidden pages - redirect all to root (Sanafi AI) */}
        <Route path="/dashboard" component={() => (
          <Redirect to="/" />
        )} />
        <Route path="/savings" component={() => (
          <Redirect to="/" />
        )} />
        <Route path="/investments" component={() => (
          <Redirect to="/" />
        )} />
        <Route path="/spend" component={() => (
          <Redirect to="/" />
        )} />
        <Route path="/spend/rewards" component={() => (
          <Redirect to="/" />
        )} />
        <Route path="/settings" component={() => (
          <Redirect to="/" />
        )} />
        
        {/* 404 page */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;