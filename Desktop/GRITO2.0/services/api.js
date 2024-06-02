"use client";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

// const userData = Cookies.get("userData");
// if (userData) {
//   const myData = JSON.parse(userData);

//   if (myData.access && myData.refresh) {
//     authApi.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${myData.access}`;
//   } else {
//     delete authApi.defaults.headers.common["Authorization"];
//   }
// } else {
//   delete authApi.defaults.headers.common["Authorization"];
// }
