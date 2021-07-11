import React, { Component } from "react";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import "./Lk.css";
import ProgressLk from "./ProgressLk";
import { connect } from "react-redux";
import { changeStep } from "../../redux/actionCreators";

export class Lk extends Component {
  aboutRef = React.createRef();
  passportRef = React.createRef();
  addressRef = React.createRef();

  render() {
    const { step, progress1, progress2, progress3, history, changeStep } =
      this.props;
    changeStep(this.props.match.params.step);

    return (
      <div>
        <h1 className="title">Личный кабинет клиента</h1>
        {step === "step1" && (
          <Step1
            history={history}
            aboutRef={this.aboutRef}
            passportRef={this.passportRef}
            addressRef={this.addressRef}
          />
        )}
        {step === "step2" && <Step2 history={history} />}
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

const mapStateToProps = (state) => {
  return {
    step: state.progress.step,
    progress1: state.progress.progress1,
    progress2: state.progress.progress2,
    progress3: state.progress.progress3,
  };
};

const putActionProps = {
  changeStep,
};

export default connect(mapStateToProps, putActionProps)(Lk);
