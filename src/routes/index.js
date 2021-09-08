// Init
import React from "react";
import { Route, Switch } from "react-router-dom";

// Routes
import Home from "../containers/Home.js";
import Login from "../containers/Login.js";
import Details from "../containers/Details.js";
import Registration from "../containers/Registration.js";
import Profile from "../containers/Profile.js";

const index = () => {
  return (
    <Switch>
      <Route exact path="/vendor/:id" component={Details} />
      <Route exact path="/register" component={Registration} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default index;
