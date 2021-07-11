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
import { combineReducers } from "redux";

const summary = JSON.parse(localStorage.getItem("summary"));

const initialAboutState = summary.about || {
  fio: "",
  changed: "false",
  prevLastname: "",
};

const initialPassportState = summary.passport || {
  seriesNumber: "",
  date: "",
  code: "",
  source: "",
  birthDate: "",
  birthPlace: "",
};

const initialAddressState = summary.address || {
  regAddress: "",
  match: false,
  factAddress: "",
};

const initialContactInfoState = summary.contactInfo || {
  phoneNum: "",
  email: "",
  password: "",
};

const initialProgressState = summary.progress || {
  step: "",
  progress1: 0,
  progress2: 0,
  progress3: 0,
};

const newAboutState = {
  [CHANGE_FIO]: (state, payload) => ({
    ...state,
    fio: payload,
  }),
  [CHANGE_CHANGED]: (state, payload) => ({
    ...state,
    changed: payload,
  }),
  [CHANGE_PREV_LASTNAME]: (state, payload) => ({
    ...state,
    prevLastname: payload,
  }),
};

const newPassportState = {
  [CHANGE_SERIES_NUMBER]: (state, payload) => ({
    ...state,
    seriesNumber: payload,
  }),
  [CHANGE_DATE]: (state, payload) => ({
    ...state,
    date: payload,
  }),
  [CHANGE_CODE]: (state, payload) => ({
    ...state,
    code: payload,
  }),
  [CHANGE_SOURCE]: (state, payload) => ({
    ...state,
    source: payload,
  }),
  [CHANGE_BIRTHDATE]: (state, payload) => ({
    ...state,
    birthDate: payload,
  }),
  [CHANGE_BIRTHPLACE]: (state, payload) => ({
    ...state,
    birthPlace: payload,
  }),
};

const newAddressState = {
  [CHANGE_REGADDRESS]: (state, payload) => ({
    ...state,
    regAddress: payload,
  }),
  [CHANGE_MATCH]: (state, payload) => ({
    ...state,
    match: payload,
  }),
  [CHANGE_FACTADDRESS]: (state, payload) => ({
    ...state,
    factAddress: payload,
  }),
};

const newСontactInfoState = {
  [CHANGE_PHONE_NUMBER]: (state, payload) => ({
    ...state,
    phoneNum: payload,
  }),
  [CHANGE_EMAIL]: (state, payload) => ({
    ...state,
    email: payload,
  }),
  [CHANGE_PASSWORD]: (state, payload) => ({
    ...state,
    password: payload,
  }),
};

const newProggressState = {
  [CHANGE_STEP]: (state, payload) => ({
    ...state,
    step: payload,
  }),
  [CHANGE_PROGRESS1]: (state, payload) => ({
    ...state,
    progress1: payload,
  }),
  [CHANGE_PROGRESS2]: (state, payload) => ({
    ...state,
    progress2: payload,
  }),
  [CHANGE_PROGRESS3]: (state, payload) => ({
    ...state,
    progress3: payload,
  }),
};

const aboutReducer = (state = initialAboutState, { type, payload }) => {
  return newAboutState[type] ? newAboutState[type](state, payload) : state;
};

const passportReducer = (state = initialPassportState, { type, payload }) => {
  return newPassportState[type]
    ? newPassportState[type](state, payload)
    : state;
};

const addressReducer = (state = initialAddressState, { type, payload }) => {
  return newAddressState[type] ? newAddressState[type](state, payload) : state;
};

const contactInfoReducer = (
  state = initialContactInfoState,
  { type, payload }
) => {
  return newСontactInfoState[type]
    ? newСontactInfoState[type](state, payload)
    : state;
};

const progressReducer = (state = initialProgressState, { type, payload }) => {
  return newProggressState[type]
    ? newProggressState[type](state, payload)
    : state;
};

export const rootReducer = combineReducers({
  progress: progressReducer,
  about: aboutReducer,
  passport: passportReducer,
  address: addressReducer,
  contactInfo: contactInfoReducer,
});
