import React, { Component } from "react";
import { createBrowserHistory } from "history";
import App from "../App";

export class Guard extends Component {
  history = createBrowserHistory({forceRefresh:true});

  render() {
    return <App history={this.history} />;
  }

  componentDidCatch(error, info) {
    console.log(error.message, info);
    // this.history.push("/error");
  }
}

export default Guard;
