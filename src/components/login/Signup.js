import React from "react";
import { Button, TextField } from "@material-ui/core";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ReactDaDataBox from "react-dadata-box";
import {
  changeBirthdate,
  changeEmail,
  changeFIO,
  changePhoneNumber,
} from "../../redux/actionCreators";
import { useSelector, useDispatch } from "react-redux";

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Мобильный телефон является необходимым полем для заполнения")
    .matches(
      /\+7 \d{3} \d{3} \d{2} \d{2}/,
      "Не совпадает с необходимой маской +7 NNN NNN NN NN"
    ),
  email: yup
    .string()
    .required("Email является необходимым полем для заполнения")
    .email("Необходимо ввести корректный адрес электронной почты"),
});

const selectFIO = (state) => state.about.fio;
const selectState = (state) => state;

const Signup = (props) => {
  const dispatch = useDispatch();
  const fio = useSelector(selectFIO);
  const state = useSelector(selectState);

  const normalizePhoneNumber = (value) => {
    if (value === "8") {
      value = "+7";
    } else if (value === "7") {
      value = "+7";
    } else if (!value.includes("+7") && value !== "+" && value !== "") {
      value = "+7" + value;
    }
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) {
      return value;
    }

    return phoneNumber.formatInternational();
  };

  const onSubmit = () => {
    if (fio.split(" ").length === 3) {
      localStorage.setItem("summary", JSON.stringify(state));
      props.history.push("/lk/step1/");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="fioBox">
          <label className="fioLabel">Фамилия имя отчество</label>
          <ReactDaDataBox
            token="9959c2a9603b4e457d5f5f5919e81dcec9da3307"
            type="fio"
            className="fio"
            onChange={(e) => dispatch(changeFIO(e.value))}
          />
          {/* <input
            className="invisible"
            name="lastname"
            value={fio.split(" ")[0] || ""}
            onChange={(e) => console.log(e.target.value)}
          />
          <input
            className="invisible"
            name="firstname"
            value={fio.split(" ")[1] || ""}
            onChange={(e) => console.log(e.target.value)}
          />
          <input
            className="invisible"
            name="fathername"
            value={fio.split(" ")[2] || ""}
            onChange={(e) => console.log(e.target.value)}
          /> */}
          {fio.split(" ").length !== 3 && (
            <p className="errorMsg">Поле должно содержать полные ФИО</p>
          )}
        </div>
        <br />
        <TextField
          label="Дата рождения"
          className="loginText"
          variant="outlined"
          type="date"
          onChange={(e) => dispatch(changeBirthdate(e.target.value))}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />
        <TextField
          id="phoneNumber"
          label="Мобильный телефон"
          type="tel"
          variant="outlined"
          className="loginText"
          {...register("phoneNumber")}
          name="phoneNumber"
          error={!!errors?.phoneNumber}
          helperText={errors?.phoneNumber?.message}
          onChange={(event) => {
            event.target.value = normalizePhoneNumber(event.target.value);
            dispatch(changePhoneNumber(event.target.value));
          }}
        />
        <br />
        <br />
        <TextField
          {...register("email")}
          label="Email"
          className="loginText"
          type="email"
          variant="outlined"
          name="email"
          error={!!errors?.email}
          helperText={errors?.email?.message}
          onChange={(e) => dispatch(changeEmail(e.target.value))}
        />
        <br />
        <br />
        <Button variant="outlined" type="submit" onClick={() => onSubmit}>
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};

export default Signup;
