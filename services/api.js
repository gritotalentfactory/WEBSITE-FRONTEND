"use client";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

// Retrieve token from cookies
const userData = Cookies.get("userData");

if (userData) {
  const myData = JSON.parse(userData);

  if (myData.access) {
    // Assuming dashboard endpoints start with "/dashboard"
    if (
      window.location.pathname.startsWith("/pages/dashboard") ||
      window.location.pathname.startsWith("/pages/availableTalent")
    ) {
      // Set the token in the Authorization header only for dashboard endpoints
      authApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${myData.access}`;
    } else {
      // If the token is not available or not accessing dashboard endpoints, remove Authorization header
      delete authApi.defaults.headers.common["Authorization"];
    }
  } else {
    // If the token is not available, remove Authorization header
    delete authApi.defaults.headers.common["Authorization"];
  }
} else {
  // If user data is not available, remove Authorization header
  delete authApi.defaults.headers.common["Authorization"];
}

// import Cookies from "js-cookie";
// import axios from "axios";
// import { BASE_URL } from "./baseUrl";

// export const authApi = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// authApi.defaults.headers.common["Content-Type"] = "application/json";

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
