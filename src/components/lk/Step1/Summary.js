import { Paper } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const selectSummary = (state) => state;

const Summary = () => {
  const summary = useSelector(selectSummary);

  return (
    <Paper elevation={2} className="summary">
      <h2>Данные пользователя</h2>
      {(summary.about.fio !== "" ||
        (summary.about.prevLastname !== "" &&
          summary.about.changed === "true")) && <h3>Основная информация</h3>}
      {summary.about.fio !== "" && (
        <p>
          <span>ФИО:</span> {summary.about.fio}
        </p>
      )}
      {summary.about.prevLastname !== "" && summary.about.changed === "true" && (
        <p>
          <span>Предыдущая фамилия:</span> {summary.about.prevLastname}
        </p>
      )}
      {(summary.passport.seriesNumber !== "" ||
        summary.passport.date !== "" ||
        summary.passport.code !== "" ||
        summary.passport.source !== "" ||
        summary.passport.birthDate !== "" ||
        summary.passport.birthPlace !== "") && <h3>Паспортные данные</h3>}
      {summary.passport.seriesNumber !== "" && (
        <p>
          <span>Серия и номер паспорта:</span> {summary.passport.seriesNumber}
        </p>
      )}
      {summary.passport.date !== "" && (
        <p>
          <span>Дата выдачи:</span> {summary.passport.date}
        </p>
      )}
      {summary.passport.code !== "" && (
        <p>
          <span>Код подразделения:</span> {summary.passport.code}
        </p>
      )}
      {summary.passport.source !== "" && (
        <p>
          <span>Кем выдан:</span> {summary.passport.source}
        </p>
      )}
      {summary.passport.birthDate !== "" && (
        <p>
          <span>Дата рождения:</span> {summary.passport.birthDate}
        </p>
      )}
      {summary.passport.birthPlace !== "" && (
        <p>
          <span>Место рождения:</span> {summary.passport.birthPlace}
        </p>
      )}
      {(summary.address.regAddress !== "" ||
        (summary.address.factAddress !== "" && !summary.address.match)) && (
        <h3>Адрес регистрации</h3>
      )}
      {summary.address.regAddress !== "" && (
        <p>
          <span>Адрес регистрации:</span> {summary.address.regAddress}
        </p>
      )}
      {summary.address.factAddress !== "" && !summary.address.match && (
        <p>
          <span>Адрес фактический:</span> {summary.address.factAddress}
        </p>
      )}
    </Paper>
  );
};

export default Summary;
