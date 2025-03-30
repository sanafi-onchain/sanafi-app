import { Route, Switch } from "wouter";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Accounts from "@/pages/Accounts";
import Savings from "@/pages/Savings";
import Investments from "@/pages/Investments";
import SpendRewards from "@/pages/SpendRewards";
import Learn from "@/pages/Learn";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/accounts" component={Accounts} />
        <Route path="/savings" component={Savings} />
        <Route path="/investments" component={Investments} />
        <Route path="/spend-rewards" component={SpendRewards} />
        <Route path="/learn" component={Learn} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
