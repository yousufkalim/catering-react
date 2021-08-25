// Init
import React from "react";
import { Route, Switch } from "react-router-dom";

// Routes
import Home from "../containers/Home.js";
import VendorRegistration from "../containers/VendorRegistration.js";

const index = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={VendorRegistration} />
    </Switch>
  );
};

export default index;
