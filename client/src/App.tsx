import { Route, Switch, useLocation, Redirect } from "wouter";
import Layout from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SignIn } from "@/pages/SignIn";
import Dashboard from "@/pages/Dashboard";
import Accounts from "@/pages/Accounts";
import Savings from "@/pages/Savings";
import Investments from "@/pages/Investments";
import Spend from "@/pages/Spend";
import SpendRewards from "@/pages/SpendRewards";
import Learn from "@/pages/Learn";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <Layout>
      <Switch>
        {/* Public routes */}
        <Route path="/signin" component={SignIn} />
        <Route path="/learn" component={Learn} />
        
        {/* Legacy dashboard redirect - clean URL redirection */}
        <Route path="/dashboard">
          {() => {
            window.history.replaceState(null, '', '/');
            return <Dashboard />;
          }}
        </Route>
        
        {/* Protected routes - require authentication */}
        <Route path="/">
          {() => <ProtectedRoute><Dashboard /></ProtectedRoute>}
        </Route>
        <Route path="/accounts">
          {() => <ProtectedRoute><Accounts /></ProtectedRoute>}
        </Route>
        <Route path="/savings">
          {() => <ProtectedRoute><Savings /></ProtectedRoute>}
        </Route>
        <Route path="/investments">
          {() => <ProtectedRoute><Investments /></ProtectedRoute>}
        </Route>
        <Route path="/spend">
          {() => <ProtectedRoute><Spend /></ProtectedRoute>}
        </Route>
        <Route path="/spend/rewards">
          {() => <ProtectedRoute><SpendRewards /></ProtectedRoute>}
        </Route>
        <Route path="/settings">
          {() => <ProtectedRoute><Settings /></ProtectedRoute>}
        </Route>
        
        {/* Catch all for 404 */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
