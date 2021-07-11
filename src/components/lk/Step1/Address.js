import React, { useEffect } from "react";
import ReactDaDataBox from "react-dadata-box";
import { Checkbox } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFactAdress,
  changeMatch,
  changeProgress3,
  changeRegAdress,
} from "../../../redux/actionCreators";

const selectAddress = (state) => state.address;

const Address = (props) => {
  const { addressRef } = props;

  const address = useSelector(selectAddress);
  const dispatch = useDispatch();

  useEffect(() => {
    if (address.match === true) {
      if (address.regAddress === "") {
        dispatch(changeProgress3(0));
      } else {
        dispatch(changeProgress3(100));
      }
    } else {
      dispatch(
        changeProgress3(
          (address.regAddress === "" ? 0 : 50) +
            (address.factAddress === "" ? 0 : 50)
        )
      );
    }
  }, [address, dispatch]);

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
        onChange={(e) => dispatch(changeRegAdress(e.value))}
        customInput={(params) => {
          return <input {...params} ref={addressRef} />;
        }}
      />
      {address.regAddress.length === 0 && (
        <p className="errorMsg">Поле должно быть заполнено</p>
      )}
      <Checkbox
        checked={address.match}
        onChange={(e) => dispatch(changeMatch(!address.match))}
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
            onChange={(e) => dispatch(changeFactAdress(e.value))}
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
