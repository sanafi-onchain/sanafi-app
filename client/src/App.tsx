import { Route, Switch, useLocation, Redirect } from "wouter";
import Layout from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SignIn } from "@/pages/SignIn";
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
        
        {/* Hidden pages - redirect all to Learn page */}
        <Route path="/" component={() => (
          <Redirect to="/learn" />
        )} />
        <Route path="/dashboard" component={() => (
          <Redirect to="/learn" />
        )} />
        <Route path="/savings" component={() => (
          <Redirect to="/learn" />
        )} />
        <Route path="/investments" component={() => (
          <Redirect to="/learn" />
        )} />
        <Route path="/spend" component={() => (
          <Redirect to="/learn" />
        )} />
        <Route path="/spend/rewards" component={() => (
          <Redirect to="/learn" />
        )} />
        <Route path="/settings" component={() => (
          <Redirect to="/learn" />
        )} />
        
        {/* 404 page */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
