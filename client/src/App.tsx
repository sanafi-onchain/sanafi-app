import { Route, Switch, useLocation } from "wouter";
import Layout from "@/components/Layout";
import Landing from "@/pages/Landing";
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
  const [location] = useLocation();
  
  // Don't use Layout for landing page
  if (location === '/') {
    return (
      <Switch>
        <Route path="/" component={Landing} />
      </Switch>
    );
  }
  
  return (
    <Layout>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/accounts" component={Accounts} />
        <Route path="/savings" component={Savings} />
        <Route path="/investments" component={Investments} />
        <Route path="/spend" component={Spend} />
        <Route path="/spend/rewards" component={SpendRewards} />
        <Route path="/learn" component={Learn} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
