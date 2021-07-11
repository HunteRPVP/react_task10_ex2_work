import {
  CHANGE_FIO,
  CHANGE_CHANGED,
  CHANGE_PREV_LASTNAME,
  CHANGE_SERIES_NUMBER,
  CHANGE_DATE,
  CHANGE_CODE,
  CHANGE_SOURCE,
  CHANGE_BIRTHDATE,
  CHANGE_BIRTHPLACE,
  CHANGE_REGADDRESS,
  CHANGE_MATCH,
  CHANGE_FACTADDRESS,
  CHANGE_PHONE_NUMBER,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_STEP,
  CHANGE_PROGRESS1,
  CHANGE_PROGRESS2,
  CHANGE_PROGRESS3,
} from "./consts";

export const changeFIO = (fio) => ({
  type: CHANGE_FIO,
  payload: fio,
});
export const changeChanged = (changed) => ({
  type: CHANGE_CHANGED,
  payload: changed,
});
export const changePrevLastname = (lastname) => ({
  type: CHANGE_PREV_LASTNAME,
  payload: lastname,
});
export const changeSeriesNumber = (seriesnumber) => ({
  type: CHANGE_SERIES_NUMBER,
  payload: seriesnumber,
});
export const changeDate = (date) => ({
  type: CHANGE_DATE,
  payload: date,
});
export const changeCode = (code) => ({
  type: CHANGE_CODE,
  payload: code,
});
export const changeSource = (source) => ({
  type: CHANGE_SOURCE,
  payload: source,
});
export const changeBirthdate = (birthDate) => ({
  type: CHANGE_BIRTHDATE,
  payload: birthDate,
});
export const changeBirthplace = (birthPlace) => ({
  type: CHANGE_BIRTHPLACE,
  payload: birthPlace,
});
export const changeRegAdress = (regAddress) => ({
  type: CHANGE_REGADDRESS,
  payload: regAddress,
});
export const changeMatch = (match) => ({
  type: CHANGE_MATCH,
  payload: match,
});
export const changeFactAdress = (factAddress) => ({
  type: CHANGE_FACTADDRESS,
  payload: factAddress,
});
export const changePhoneNumber = (phoneNum) => ({
  type: CHANGE_PHONE_NUMBER,
  payload: phoneNum,
});
export const changeEmail = (email) => ({
  type: CHANGE_EMAIL,
  payload: email,
});
export const changePassword = (pwd) => ({
  type: CHANGE_PASSWORD,
  payload: pwd,
});
export const changeStep = (step) => ({
  type: CHANGE_STEP,
  payload: step,
});
export const changeProgress1 = (progress) => ({
  type: CHANGE_PROGRESS1,
  payload: progress,
});
export const changeProgress2 = (progress) => ({
  type: CHANGE_PROGRESS2,
  payload: progress,
});
export const changeProgress3 = (progress) => ({
  type: CHANGE_PROGRESS3,
  payload: progress,
});
