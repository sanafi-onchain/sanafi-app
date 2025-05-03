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
        <Route path="/" component={() => (
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        )} />
        <Route path="/signin" component={SignIn} />
        <Route path="/dashboard" component={() => (
          <Redirect to="/" />
        )} />
        <Route path="/accounts" component={() => (
          <ProtectedRoute><Accounts /></ProtectedRoute>
        )} />
        <Route path="/savings" component={() => (
          <ProtectedRoute><Savings /></ProtectedRoute>
        )} />
        <Route path="/investments" component={() => (
          <ProtectedRoute><Investments /></ProtectedRoute>
        )} />
        <Route path="/spend" component={() => (
          <ProtectedRoute><Spend /></ProtectedRoute>
        )} />
        <Route path="/spend/rewards" component={() => (
          <ProtectedRoute><SpendRewards /></ProtectedRoute>
        )} />
        <Route path="/learn" component={Learn} />
        <Route path="/settings" component={() => (
          <ProtectedRoute><Settings /></ProtectedRoute>
        )} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
