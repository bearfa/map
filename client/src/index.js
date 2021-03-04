import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// core components
// import Admin from "layouts/Admin.js";
// import RTL from "layouts/RTL.js";
import map from './views/Maps/Maps';
import Home from './layouts/Home';
import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
