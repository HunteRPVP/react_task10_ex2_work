import React from "react";
import ReactDaDataBox from "react-dadata-box";
import { Radio } from "@material-ui/core";

const About = (props) => {
  const { about, aboutRef } = props;

  return (
    <div>
      <h3>Основная информация</h3>
      <label className="fioLabel" style={{ marginLeft: "0" }}>
        Фамилия имя отчество
      </label>
      <ReactDaDataBox
        token="9959c2a9603b4e457d5f5f5919e81dcec9da3307"
        type="fio"
        query={about.fio}
        onChange={(e) => props.onAboutChange(e.value, "fio")}
        customInput={(params) => {
          return <input {...params} ref={aboutRef} />;
        }}
      />
      {about.fio.split(" ").length !== 3 && (
        <p className="errorMsg">Поле должно содержать полные ФИО</p>
      )}
      <Radio
        checked={about.changed === "true"}
        onChange={(e) => props.onAboutChange(e.target.value, "changed")}
        value="true"
      />
      <label>Изменялась</label>
      <Radio
        checked={about.changed === "false"}
        onChange={(e) => props.onAboutChange(e.target.value, "changed")}
        value="false"
      />
      <label>Не изменялась</label>
      {about.changed === "true" && (
        <div>
          <label className="fioLabel" style={{ marginLeft: "0" }}>
            Предыдущая фамилия
          </label>
          <ReactDaDataBox
            token="9959c2a9603b4e457d5f5f5919e81dcec9da3307"
            type="fio"
            query={about.prevLastname}
            onChange={(e) => props.onAboutChange(e.value, "prevLastname")}
          />
          {(about.prevLastname.length === 0 ||
            about.prevLastname.split(" ").length !== 1) && (
            <p className="errorMsg">Поле должно содержать только фамилию</p>
          )}
        </div>
      )}
    </div>
  );
};

export default About;
