import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Home from "../containers/Home";
import Login from "../containers/Login";
import Register from "../containers/Register";
import Dashboard from "../containers/Dashboard";
import Calculator from "../containers/Calculator";
import NotFound from "../containers/NotFound";
import Layout from "../components/Layout";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user/:userId" component={Dashboard} />
        <Route exact path="/calculator" component={Calculator} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
