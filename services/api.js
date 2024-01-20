"use client";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

const token = Cookies.get("token");
if (token) {
  authApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  delete authApi.defaults.headers.common["Authorization"];
}
