import React, { Component } from "react";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import "./Lk.css";
import ProgressLk from "./ProgressLk";

export class Lk extends Component {
  fio = "";
  birthDate = "";
  phoneNum = "";
  email = "";

  aboutRef = React.createRef();
  passportRef = React.createRef();
  addressRef = React.createRef();

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
      progress1: this.fio === "" ? 0 : 100,
      progress2: this.birthDate === "" ? 0 : 17,
      progress3: 0,
    };
  }

  handleChange = (value, block, name) => {
    const temp = this.state;
    temp.summary[block][name] = value;
    this.setState(temp, () => {
      switch (block) {
        case "about":
          const { about } = this.state.summary;
          if (about.changed === "false") {
            if (about.fio.split(" ").length !== 3) {
              this.setState({ ...this.state, progress1: 0 });
            } else {
              this.setState({ progress1: 100 });
            }
          } else {
            this.setState({
              progress1:
                (about.fio.split(" ").length !== 3 ? 0 : 50) +
                (about.prevLastname === "" ||
                about.prevLastname.split(" ").length !== 1
                  ? 0
                  : 50),
            });
          }
          break;
        case "passport":
          const { passport } = this.state.summary;
          this.setState({
            progress2:
              (passport.seriesNumber.length !== 10 ||
              !/^\d+$/.test(passport.seriesNumber)
                ? 0
                : 16) +
              (passport.date === "" ? 0 : 16) +
              (!/\d{3}-\d{3}/.test(passport.code) ? 0 : 16) +
              (passport.source === "" ? 0 : 16) +
              (passport.birthDate === "" ? 0 : 16) +
              (passport.birthPlace === "" ? 0 : 20),
          });
          break;
        case "address":
          const { address } = this.state.summary;
          if (address.match === true) {
            if (address.regAddress === "") {
              this.setState({ ...this.state, progress3: 0 });
            } else {
              this.setState({ progress3: 100 });
            }
          } else {
            this.setState({
              progress3:
                (address.regAddress === "" ? 0 : 50) +
                (address.factAddress === "" ? 0 : 50),
            });
          }
          break;
        default:
          break;
      }
    });
  };

  render() {
    const { history } = this.props;
    const { summary, step, progress1, progress2, progress3 } = this.state;

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
            aboutRef={this.aboutRef}
            passportRef={this.passportRef}
            addressRef={this.addressRef}
          />
        )}
        {step === "step2" && <Step2 summary={summary} history={history} />}
        <ProgressLk
          progress1={progress1}
          progress2={progress2}
          progress3={progress3}
          aboutRef={this.aboutRef}
          passportRef={this.passportRef}
          addressRef={this.addressRef}
        />
      </div>
    );
  }
}

export default Lk;
