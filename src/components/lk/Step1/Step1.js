import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import About from "./About";
import Passport from "./Passport";
import Address from "./Address";
import Summary from "./Summary";
import Step1DialogButton from "./Step1DialogButton";
import { connect } from "react-redux";

export class Step1 extends Component {
  state = {
    summary: this.props.summary,
  };

  validateAll = () => {
    if (
      this.validateAbout() &&
      this.validatePassport() &&
      this.validateAddress()
    ) {
      return true;
    }
    return false;
  };

  validateAbout = () => {
    const { about } = this.props;
    if (
      about.fio.split(" ").length !== 3 ||
      (about.changed === "true" &&
        (about.prevLastname.length === 0 ||
          about.prevLastname.split(" ").length !== 1))
    ) {
      return false;
    }
    return true;
  };

  validatePassport = () => {
    const { passport } = this.props;
    if (
      passport.seriesNumber.length !== 10 ||
      !/^\d+$/.test(passport.seriesNumber) ||
      passport.date.length === 0 ||
      !/\d{3}-\d{3}/.test(passport.code) ||
      passport.source.length === 0 ||
      passport.birthDate.length === 0 ||
      passport.birthPlace.length === 0
    ) {
      return false;
    }
    return true;
  };

  validateAddress = () => {
    const { address } = this.props;
    if (
      address.regAddress.length === 0 ||
      (!address.match && address.factAddress.length === 0)
    ) {
      return false;
    }
    return true;
  };

  render() {
    const { history } = this.props;
    const { summary } = this.state;

    return (
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <About aboutRef={this.props.aboutRef} />
          <Passport passportRef={this.props.passportRef} />
          <Address addressRef={this.props.addressRef} />
          {this.validateAll() && (
            <Step1DialogButton summary={summary} history={history} />
          )}
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs="auto">
          <Summary summary={summary} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    about: state.about,
    passport: state.passport,
    address: state.address,
  };
};

export default connect(mapStateToProps)(Step1);
