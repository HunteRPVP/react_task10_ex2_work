import React, { useRef } from "react";
import { Button, TextField } from "@material-ui/core";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ReactDaDataBox from "react-dadata-box";
import { useState } from "react";

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

const Signup = (props) => {
  const fioRef = useRef(null);
  const birthDateRef = useRef(null);

  const [fio, setFio] = useState("");

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
      const userData = {
        fio: fioRef.current.state.query,
        birthDate: birthDateRef.current.value,
      };
      props.history.push("/lk/step1/" + JSON.stringify(userData));
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
            ref={fioRef}
            onChange={(e) => setFio(e.value)}
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
        <TextField
          label="Дата рождения"
          defaultValue="2017-05-24"
          className="loginText"
          inputRef={birthDateRef}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
          id="phoneNumber"
          label="Мобильный телефон"
          type="tel"
          className="loginText"
          {...register("phoneNumber")}
          name="phoneNumber"
          error={!!errors?.phoneNumber}
          helperText={errors?.phoneNumber?.message}
          onChange={(event) => {
            event.target.value = normalizePhoneNumber(event.target.value);
          }}
        />
        <br />
        <TextField
          {...register("email")}
          label="Email"
          className="loginText"
          type="email"
          name="email"
          error={!!errors?.email}
          helperText={errors?.email?.message}
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
