import React, { Component } from "react";
import Step1 from "./Step1/Step1";
import "./Lk.css";

export class Lk extends Component {
  fio = "";
  birthDate = "";

  constructor(props) {
    super(props);
    if (this.props.match.params.userData) {
      this.fio = JSON.parse(this.props.match.params.userData).fio;
      this.birthDate = JSON.parse(this.props.match.params.userData).birthDate;
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
          date: new Date(),
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
      },
      step: this.props.match.params.step,
    };
  }

  handleChange = (value, block, name) => {
    const temp = this.state;
    temp.summary[block][name] = value;
    this.setState(temp);
    console.log(temp);
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
            summary={summary}
            history={history}
          />
        )}
      </div>
    );
  }
}

export default Lk;
