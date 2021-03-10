// const IP = "54.172.72.74:4000";

const IP = "localhost:4000";

const AUTH_RESOURCE = "api/auth";
const USER_RESOURCE = "api/user";

const REGISTER_ENDPOINT = `${AUTH_RESOURCE}/new`;
export const REGISTER_URL = `http://${IP}/${REGISTER_ENDPOINT}`;

const LOGIN_ENDPOINT = `${AUTH_RESOURCE}`;
export const LOGIN_URL = `http://${IP}/${LOGIN_ENDPOINT}`;

const PROFILE_ENDPOINT = `${USER_RESOURCE}/by`;
export const PROFILE_URL = `http://${IP}/${PROFILE_ENDPOINT}`;

const UPDATE_PROFILE_ENDPOINT = `${USER_RESOURCE}/update`;
export const UPDATE_PROFILE_URL = `http://${IP}/${UPDATE_PROFILE_ENDPOINT}`;

export const DEFAULT_CALC_VALUES = {
  percentage: 17,
  salary: 3000000,
  installments: 42,
  topLimit: 75000000,
  payedInstallments: 0,
  payed: 0,
};
