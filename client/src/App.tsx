import { Route, Switch, useLocation, Redirect } from "wouter";
import Layout from "@/components/Layout";
import { SignIn } from "@/pages/SignIn";
import Dashboard from "@/pages/Dashboard";
import Accounts from "@/pages/Accounts";
import Savings from "@/pages/Savings";
import Investments from "@/pages/Investments";
import Spend from "@/pages/Spend";
import SpendRewards from "@/pages/SpendRewards";
import Learn from "@/pages/Learn";
import Stake from "@/pages/Stake";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <Layout>
      <Switch>
        {/* Public routes */}
        <Route path="/signin" component={SignIn} />
        <Route path="/learn" component={Learn} />
        <Route path="/stake" component={Stake} />
        
        {/* Legacy dashboard redirect - clean URL redirection */}
        <Route path="/dashboard">
          {() => {
            window.history.replaceState(null, '', '/');
            return <Dashboard />;
          }}
        </Route>
        
        {/* All routes accessible without authentication */}
        <Route path="/" component={Dashboard} />
        <Route path="/accounts" component={Accounts} />
        <Route path="/savings" component={Savings} />
        <Route path="/investments" component={Investments} />
        <Route path="/spend" component={Spend} />
        <Route path="/spend/rewards" component={SpendRewards} />
        <Route path="/settings" component={Settings} />
        
        {/* Catch all for 404 */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
