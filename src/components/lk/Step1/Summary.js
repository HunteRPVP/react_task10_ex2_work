import React from "react";

const Summary = ({ summary }) => {
  return (
    <div className="summary">
      <h3>Ключевые данные</h3>
      <p>
        <span>ФИО:</span> {summary.about.fio}
      </p>
      <p>
        <span>Серия и номер паспорта:</span> {summary.passport.seriesNumber}
      </p>
      <p>
        <span>Адрес регистрации:</span> {summary.address.regAddress}
      </p>
    </div>
  );
};

export default Summary;
