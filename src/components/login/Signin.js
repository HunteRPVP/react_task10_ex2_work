import React, { useRef } from "react";
import { Button, TextField } from "@material-ui/core";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { changePassword, changePhoneNumber } from "../../redux/actionCreators";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Мобильный телефон является необходимым полем для заполнения")
    .matches(
      /\+7 \d{3} \d{3} \d{2} \d{2}/,
      "Не совпадает с необходимой маской +7 NNN NNN NN NN"
    ),
  password: yup
    .string()
    .required("Пароль является необходимым полем для заполнения")
    .min(8, "Пароль должен быть не короче 8 символов")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Пароль должен содержать хотя бы одну цифру, латинскую букву и спец. символ"
    ),
});

const selectState = (state) => state;

const Signin = (props) => {
  const pnRef = useRef(null);

  const state = useSelector(selectState);
  const dispatch = useDispatch();

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
    localStorage.setItem("summary", JSON.stringify(state));
    props.history.push("/lk/step1/");
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
        <TextField
          id="phoneNumber"
          label="Мобильный телефон"
          type="tel"
          className="loginText"
          variant="outlined"
          inputRef={pnRef}
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
          id="standard-password-input"
          label="Пароль"
          className="loginText"
          variant="outlined"
          type="password"
          name="password"
          autoComplete="current-password"
          {...register("password")}
          error={!!errors?.password}
          helperText={errors?.password?.message}
          onChange={(e) => dispatch(changePassword(e.target.value))}
        />
        <br />
        <br />
        <Button variant="outlined" type="submit" onClick={() => onSubmit}>
          Войти в личный кабинет
        </Button>
      </form>
    </div>
  );
};

export default Signin;
