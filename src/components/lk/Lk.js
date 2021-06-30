import React, { Component } from "react";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import "./Lk.css";

export class Lk extends Component {
  fio = "";
  birthDate = "";
  phoneNum = "";
  email = "";

  constructor(props) {
    super(props);
    if (this.props.match.params.userData) {
      if (JSON.parse(this.props.match.params.userData).fio) {
        this.fio = JSON.parse(this.props.match.params.userData).fio;
        this.birthDate = JSON.parse(this.props.match.params.userData).birthDate;
        this.phoneNum = JSON.parse(this.props.match.params.userData).phoneNum;
        this.email = JSON.parse(this.props.match.params.userData).email;
      } else {
        this.phoneNum = JSON.parse(this.props.match.params.userData).phoneNum;
      }
    }
    this.state = {
      summary: {
        about: {
          fio: this.fio,
          changed: "false",
          prevLastname: "",
        },
        passport: {
          seriesNumber: "",
          date: "",
          code: "",
          source: "",
          birthDate: this.birthDate,
          birthPlace: "",
        },
        address: {
          regAddress: "",
          match: false,
          factAddress: "",
        },
        contactInfo: {
          phoneNum: this.phoneNum,
          email: this.email,
        },
      },
      step: this.props.match.params.step,
    };
  }

  handleChange = (value, block, name) => {
    const temp = this.state;
    temp.summary[block][name] = value;
    this.setState(temp);
  };

  render() {
    const { history } = this.props;
    const { summary, step } = this.state;

    return (
      <div>
        <h1 className="title">Личный кабинет клиента</h1>
        {step === "step1" && (
          <Step1
            onAboutChange={this.handleChange}
            onPassportChange={this.handleChange}
            onAddressChange={this.handleChange}
            summary={summary}
            history={history}
          />
        )}
        {step === "step2" && (
          <Step2
            summary={summary}
            history={history}
          />
        )}
      </div>
    );
  }
}

export default Lk;
