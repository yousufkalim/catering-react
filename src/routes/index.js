// Init
import React from "react";
import { Route, Switch } from "react-router-dom";

// Routes
import Home from "../containers/Home.js";
import Details from "../containers/details.js";
import Registration from "../containers/Registration.js";

const index = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Registration} />
      <Route exact path="/vendor" component={Details} />
    </Switch>
  );
};

export default index;
