import React, { useEffect } from "react";
import ReactDaDataBox from "react-dadata-box";
import { TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBirthdate,
  changeBirthplace,
  changeCode,
  changeDate,
  changeProgress2,
  changeSeriesNumber,
  changeSource,
} from "../../../redux/actionCreators";

const selectPassport = (state) => state.passport;

const Passport = (props) => {
  const { passportRef } = props;

  const passport = useSelector(selectPassport);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      changeProgress2(
        (passport.seriesNumber.length !== 10 ||
        !/^\d+$/.test(passport.seriesNumber)
          ? 0
          : 16) +
          (passport.date === "" ? 0 : 16) +
          (!/\d{3}-\d{3}/.test(passport.code) ? 0 : 16) +
          (passport.source === "" ? 0 : 16) +
          (passport.birthDate === "" ? 0 : 16) +
          (passport.birthPlace === "" ? 0 : 20)
      )
    );
  }, [passport, dispatch]);

  const handleCodeChange = (e) => {
    dispatch(changeCode(e.target.value));
    var url =
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fms_unit";
    var token = "9959c2a9603b4e457d5f5f5919e81dcec9da3307";
    var query = e.target.value;

    var options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({ query: query }),
    };

    fetch(url, options)
      .then((response) => response.text())
      .then((result) =>
        dispatch(
          changeSource(
            JSON.parse(result).suggestions[
              JSON.parse(result).suggestions.length - 1
            ].data.name,
            "source"
          )
        )
      )
      .catch((error) => console.log("error", error));
  };

  const handleSourceChange = (e) => {
    dispatch(changeSource(e.value));
    var url =
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fms_unit";
    var token = "9959c2a9603b4e457d5f5f5919e81dcec9da3307";
    var query = e.value;

    var options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({ query: query }),
    };

    fetch(url, options)
      .then((response) => response.text())
      .then((result) =>
        dispatch(
          changeCode(
            JSON.parse(result).suggestions[
              JSON.parse(result).suggestions.length - 1
            ].data.code,
            "code"
          )
        )
      )
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <h3>Паспортные данные</h3>
      <TextField
        label="Серия номер"
        className="lkText"
        type="text"
        variant="outlined"
        name="seriesNumber"
        value={passport.seriesNumber}
        onChange={(e) => dispatch(changeSeriesNumber(e.target.value))}
        inputRef={passportRef}
      />
      {(passport.seriesNumber.length !== 10 ||
        !/^\d+$/.test(passport.seriesNumber)) && (
        <p className="errorMsg">Поле должно содержать 10 цифр</p>
      )}
      <br />
      <br />
      <TextField
        label="Дата выдачи"
        className="lkText"
        variant="outlined"
        type="date"
        name="date"
        value={passport.date}
        onChange={(e) => dispatch(changeDate(e.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {passport.date.length === 0 && (
        <p className="errorMsg">Поле должно быть заполнено</p>
      )}
      <br />
      <br />
      <TextField
        label="Код подразделения"
        className="lkText"
        variant="outlined"
        type="text"
        name="code"
        value={passport.code}
        onChange={(e) => handleCodeChange(e)}
      />
      {!/\d{3}-\d{3}/.test(passport.code) && (
        <p className="errorMsg">Поле должно быть следующего формата NNN-NNN</p>
      )}
      <br />
      <label className="fioLabel" style={{ marginLeft: "0" }}>
        Кем выдан
      </label>
      <ReactDaDataBox
        token="9959c2a9603b4e457d5f5f5919e81dcec9da3307"
        type="fms_unit"
        name="source"
        query={passport.source}
        onChange={(e) => handleSourceChange(e)}
      />
      {passport.source.length === 0 && (
        <p className="errorMsg">Поле должно быть заполнено</p>
      )}
      <br />
      <TextField
        label="Дата рождения"
        className="lkText"
        variant="outlined"
        type="date"
        name="birthDate"
        value={passport.birthDate}
        onChange={(e) => dispatch(changeBirthdate(e.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {passport.birthDate.length === 0 && (
        <p className="errorMsg">Поле должно быть заполнено</p>
      )}
      <br />
      <label className="fioLabel" style={{ marginLeft: "0" }}>
        Место рождения
      </label>
      <ReactDaDataBox
        token="9959c2a9603b4e457d5f5f5919e81dcec9da3307"
        type="address"
        name="birthPlace"
        query={passport.birthPlace}
        onChange={(e) => dispatch(changeBirthplace(e.value))}
      />
      {passport.birthPlace.length === 0 && (
        <p className="errorMsg">Поле должно быть заполнено</p>
      )}
    </div>
  );
};

export default Passport;
