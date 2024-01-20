import { authApi } from "../api";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

let token = Cookies.get("token");
export const signUpUserFn = async (user) => {
  const response = await authApi.post("/auth/v1/admin/sign-up", user);
  return response.data;
};

export const loginUserFn = async (user) => {
  const response = await authApi.post("/auth/v1/login/admin/", user);
  return response.data;
};

export const verifyEmailFn = async (otp_code) => {
  const response = await authApi.get(`/auth/v1/confirm/otp/${otp_code}`);
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await authApi.get("/auth/v1/logout/");
  return response.data;
};

// export const getMeFn = async () => {
//   const response = await authApi.get("users/me");
//   return response.data;
// };

// // Export your authentication functions
export const useLogin = () => useMutation({ mutationFn: loginUserFn });
export const useSignUp = () => useMutation({ mutationFn: signUpUserFn });
// export const useLogout = () => useMutation(logoutUserFn);
export const useVerifyEmail = () => useMutation({ mutationFn: verifyEmailFn });
// export const useGetUser = () => useMutation(getMeFn);
