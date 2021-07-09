import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import About from "./About";
import Passport from "./Passport";
import Address from "./Address";
import Summary from "./Summary";
import Zoom from "./Zoom";
import Step1DialogButton from "./Step1DialogButton";

export class Step1 extends Component {
  state = {
    summary: this.props.summary,
    component: "",
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
    const { about } = this.state.summary;
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
    const { passport } = this.state.summary;
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
    const { address } = this.state.summary;
    if (
      address.regAddress.length === 0 ||
      (!address.match && address.factAddress.length === 0)
    ) {
      return false;
    }
    return true;
  };

  handleAboutChange = (value, name) => {
    this.props.onAboutChange(value, "about", name);
    this.handleClick("Основная информация");
  };

  handlePassportChange = (value, name) => {
    this.props.onPassportChange(value, "passport", name);
    this.handleClick("Паспортные данные");
  };

  handleAddressChange = (value, name) => {
    this.props.onAddressChange(value, "address", name);
    this.handleClick("Адрес регистрации");
  };

  handleClick = (name) => {
    if (name === "Основная информация") {
      this.setState({
        component: (
          <About
            about={this.state.summary.about}
            onAboutChange={this.handleAboutChange}
          />
        ),
      });
    } else if (name === "Паспортные данные") {
      this.setState({
        component: (
          <Passport
            passport={this.state.summary.passport}
            onPassportChange={this.handlePassportChange}
          />
        ),
      });
    } else {
      this.setState({
        component: (
          <Address
            address={this.state.summary.address}
            onAddressChange={this.handleAddressChange}
          />
        ),
      });
    }
  };

  render() {
    const { history } = this.props;
    const { summary, component } = this.state;

    return (
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <About
            about={summary.about}
            onAboutChange={this.handleAboutChange}
            aboutRef={this.props.aboutRef}
          />
          <Passport
            passport={summary.passport}
            onPassportChange={this.handlePassportChange}
            passportRef={this.props.passportRef}
          />
          <Address
            address={summary.address}
            onAddressChange={this.handleAddressChange}
            addressRef={this.props.addressRef}
          />
          {this.validateAll() && (
            <Step1DialogButton summary={summary} history={history} />
          )}
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs="auto">
          {this.validateAll() && <Summary summary={summary} />}
          <Zoom component={component} onZoomChange={this.handleClick} />
        </Grid>
      </Grid>
    );
  }
}

export default Step1;
