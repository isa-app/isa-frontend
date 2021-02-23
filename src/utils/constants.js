// const IP = "54.172.72.74:4000";

const IP = "localhost:4000";

const REGISTER_ENDPOINT = "api/auth/new";
export const REGISTER_URL = `http://${IP}/${REGISTER_ENDPOINT}`;

const LOGIN_ENDPOINT = "api/auth";
export const LOGIN_URL = `http://${IP}/${LOGIN_ENDPOINT}`;

const PROFILE_ENDPOINT = "api/user/by";
export const PROFILE_URL = `http://${IP}/${PROFILE_ENDPOINT}`;
