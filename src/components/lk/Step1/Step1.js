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

  validate = () => {
    const { about, passport, address } = this.state.summary;
    if (
      about.fio.split(" ").length !== 3 ||
      (about.changed === "true" &&
        (about.prevLastname.length === 0 ||
          about.prevLastname.split(" ").length !== 1)) ||
      passport.seriesNumber.length !== 10 ||
      !/^\d+$/.test(passport.seriesNumber) ||
      passport.date.length === 0 ||
      !/\d{3}-\d{3}/.test(passport.code) ||
      passport.source.length === 0 ||
      passport.birthDate.length === 0 ||
      passport.birthPlace.length === 0 ||
      address.regAddress.length === 0 ||
      (!address.match && address.factAddress.length === 0)
    ) {
      return false;
    }
    return true;
  };

  handleAboutChange = (value, name) => {
    this.props.onAboutChange(value, "about", name);
  };

  handlePassportChange = (value, name) => {
    this.props.onPassportChange(value, "passport", name);
  };

  handleAddressChange = (value, name) => {
    this.props.onAddressChange(value, "address", name);
  };

  render() {
    const { history } = this.props;
    const { summary } = this.state;

    return (
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <About about={summary.about} onAboutChange={this.handleAboutChange} />
          <Passport
            passport={summary.passport}
            onPassportChange={this.handlePassportChange}
          />
          <Address
            address={summary.address}
            onAddressChange={this.handleAddressChange}
          />
          {this.validate() && (
            <Step1DialogButton summary={summary} history={history} />
          )}
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
