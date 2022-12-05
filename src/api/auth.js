import { api } from "../boot/axios";
import { response } from "./response.js";
import crypto from "crypto-js";

const SECRET_KEY = "FdQ%WA9p@qUEEkLs";

let responseJson = {};

const login = async (user) => {
  try {
    const responseApi = await api({
      method: "POST",
      url: "login",
      data: user,
    });

    responseJson = response(responseApi.status, responseApi.data);
    tokenEncrypt(responseJson.data.token);
  } catch (ex) {
    responseJson = response(ex.response.status, ex.response.data);
    console.error(ex);
  }

  return responseJson;
};

const logout = async () => {
  try {
    const responseApi = await api({
      method: "GET",
      url: "logout",
    });

    responseJson = response(responseApi.status, responseApi.data);
    api.defaults.headers.common["Authorization"] = ``;
  } catch (ex) {
    responseJson = response(ex.response.status, ex.response.data);
    console.error(ex);
  }

  return responseJson;
};

const userProfile = async () => {
  try {
    const responseApi = await api({
      method: "GET",
      url: "user-profile",
    });

    responseJson = response(responseApi.status, responseApi.data);
  } catch (ex) {
    responseJson = response(ex.response.status, ex.response.data);
    console.error(ex);
  }

  return responseJson;
};

const tokenAssigment = () => {
  const token = tokenDesencrypt(sessionStorage.getItem("user-token"));
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const tokenEncrypt = (token = "") => {
  const token_encrypt = crypto.AES.encrypt(token, SECRET_KEY).toString();
  sessionStorage.setItem("user-token", token_encrypt);
};

const tokenDesencrypt = (token = "") => {
  const token_desencrypt = crypto.AES.decrypt(token, SECRET_KEY);
  return token_desencrypt.toString(crypto.enc.Utf8);
};

export { login, logout, userProfile, tokenAssigment };
