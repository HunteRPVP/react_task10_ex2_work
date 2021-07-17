import React, { Component } from "react";
import { Route, Router, Redirect, Switch } from "react-router-dom";
import Error from "./Error";
import Login from "./login/Login";
import Lk from "./lk/Lk";
import IssueTable from "./github/IssueTable";
import Comments from "./github/Comments";
import NotFound from "./NotFound";

export class Routing extends Component {
  render() {
    const { history } = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/error" component={Error} />
          <Route exact path="/login/:form" component={Login} />
          <Route exact path="/lk/:step" component={Lk} />
          <Route exact path="/issues" component={IssueTable} />
          <Route exact path="/comments/:id" component={Comments} />
          <Route path="/404" component={NotFound} />
          <Redirect exact from="/" to="/login/signin" />
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default Routing;
