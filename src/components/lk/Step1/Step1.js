import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import About from "./About";
import Passport from "./Passport";
import Address from "./Address";
import Summary from "./Summary";
import Calendar from "./Calendar";
import Zoom from "./Zoom";
import Step1DialogButton from "./Step1DialogButton";

export class Step1 extends Component {
  state = {
    summary: this.props.summary,
  };

  handleAboutChange = (about, name) => {
    this.props.onAboutChange(about, "about", name);
  };

  render() {
    const { history } = this.props;
    const { summary } = this.state;

    return (
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <About about={summary.about} onAboutChange={this.handleAboutChange} />
          <Passport />
          <Address />
          <Step1DialogButton data={summary} history={history} />
        </Grid>
        <Grid item xs={2}>
          <Summary />
          <Calendar />
          <Zoom component={() => <h1>Зум</h1>} />
        </Grid>
      </Grid>
    );
  }
}

export default Step1;
