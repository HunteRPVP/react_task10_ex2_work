import React from "react";
import ReactDaDataBox from "react-dadata-box";
import { Checkbox } from "@material-ui/core";

const Address = (props) => {
  const { address } = props;

  return (
    <div>
      <h3>Адрес регистрации</h3>
      <label className="fioLabel" style={{ marginLeft: "0" }}>
        Адрес регистрации
      </label>
      <ReactDaDataBox
        token="9959c2a9603b4e457d5f5f5919e81dcec9da3307"
        type="address"
        name="regAddress"
        query={address.regAddress}
        onChange={(e) => props.onAddressChange(e.value, "regAddress")}
      />
      {address.regAddress.length === 0 && (
        <p className="errorMsg">Поле должно быть заполнено</p>
      )}
      <Checkbox
        checked={address.match}
        onChange={(e) => props.onAddressChange(e.target.checked, "match")}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      <label>Совпадает с фактическим</label>
      <br />
      {!address.match && (
        <div>
          <label className="fioLabel" style={{ marginLeft: "0" }}>
            Адрес фактический
          </label>
          <ReactDaDataBox
            token="9959c2a9603b4e457d5f5f5919e81dcec9da3307"
            type="address"
            name="factAddress"
            query={address.factAddress}
            onChange={(e) => props.onAddressChange(e.value, "factAddress")}
          />
          {address.factAddress.length === 0 && (
            <p className="errorMsg">Поле должно быть заполнено</p>
          )}
        </div>
      )}
      <br />
    </div>
  );
};

export default Address;
