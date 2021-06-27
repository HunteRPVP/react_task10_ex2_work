import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import About from "./Step1/About";
import Passport from "./Step1/Passport";
import Address from "./Step1/Address";
import Summary from "./Step1/Summary";
import Calendar from "./Step1/Calendar";
import Zoom from "./Step1/Zoom";
import DialogButton from "./Step1/Step1DialogButton";

export class Lk extends Component {
  state = {
    summary: "",
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        <h1>Личный кабинет клиента</h1>
        <Grid container>
          <Grid item xs={12}>
            <About />
            <Passport />
            <Address />
            <DialogButton data={this.state.summary} history={history} />
          </Grid>
          <Grid item xs={12}>
            <Summary />
            <Calendar />
            <Zoom component={() => <h1>Зум</h1>} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Lk;
