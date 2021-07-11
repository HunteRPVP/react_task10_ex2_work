import React, { Component } from "react";
import { Route, Router, Redirect, Switch } from "react-router-dom";
import Error from "./Error";
import Login from "./login/Login";
import Lk from "./lk/Lk";

export class Routing extends Component {
  render() {
    const { history } = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/error" component={Error} />
          <Route exact path="/login/:form" component={Login} />
          <Route exact path="/lk/:step" component={Lk} />
          <Redirect exact from="/" to="/login/signin" />
        </Switch>
      </Router>
    );
  }
}

export default Routing;
