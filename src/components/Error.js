import React, { Component } from "react";

export class Error extends Component {
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <h1 style={{ color: "red", fontWeight: "bold" }}>Что-то пошло не так</h1>
      </div>
    );
  }
}

export default Error;
