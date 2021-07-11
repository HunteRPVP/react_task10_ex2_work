import React, { useEffect } from "react";
import ReactDaDataBox from "react-dadata-box";
import { Radio } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  changeChanged,
  changeFIO,
  changePrevLastname,
  changeProgress1,
} from "../../../redux/actionCreators";

const selectAbout = (state) => state.about;

const About = (props) => {
  const { aboutRef } = props;

  const about = useSelector(selectAbout);
  const dispatch = useDispatch();

  useEffect(() => {
    if (about.changed === "false") {
      if (about.fio.split(" ").length !== 3) {
        dispatch(changeProgress1(0));
      } else {
        dispatch(changeProgress1(100));
      }
    } else {
      dispatch(
        changeProgress1(
          (about.fio.split(" ").length !== 3 ? 0 : 50) +
            (about.prevLastname === "" ||
            about.prevLastname.split(" ").length !== 1
              ? 0
              : 50)
        )
      );
    }
  }, [about, dispatch]);

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
        onChange={(e) => dispatch(changeFIO(e.value))}
        customInput={(params) => {
          return <input {...params} ref={aboutRef} />;
        }}
      />
      {about.fio.split(" ").length !== 3 && (
        <p className="errorMsg">Поле должно содержать полные ФИО</p>
      )}
      <Radio
        checked={about.changed === "true"}
        onChange={(e) => dispatch(changeChanged(e.target.value))}
        value="true"
      />
      <label>Изменялась</label>
      <Radio
        checked={about.changed === "false"}
        onChange={(e) => dispatch(changeChanged(e.target.value))}
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
            onChange={(e) => dispatch(changePrevLastname(e.value))}
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
