"use client";
import { authApi } from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";

const getAdminDataFn = async () => {
  const response = await authApi.get("/talent-api/v1/admin/talents");
  return response.data;
};
const getLandingData = async () => {
  const response = await authApi.get("/talent-api/v1/talents");
  return response.data;
};

const postDataFn = async (user) => {
  const response = await authApi.post("/talent-api/v1/talent-request", user);
  return response.data;
};
const postAdminData = async (user) => {
  console.log("admin user detail is", user);
  authApi.defaults.headers.common["Content-Type"] = "multipart/form-data";
  const response = await authApi.post("/talent-api/v1/admin/talent", user);
  return response.data;
};
const deleteDataFn = async (id) => {
  const response = await authApi.delete(`/talent-api/v1/talent/${id}`);

  return response.data;
};
const editDataFn = async (user) => {
  console.log("my user details", user);
  authApi.defaults.headers.common["Content-Type"] = "multipart/form-data";
  // const response = await authApi.put("/talent-api/v1/admin/talent", user);
  const response = await authApi.put(
    `/talent-api/v1/admin/talent/${user.myId}`,
    user.data
  );
  return response.data;
};
const getSingleData = async (id) => {
  const response = await authApi.get(`/talent-api/v1/talent/${id}`);
  return response.data;
};

export const useGetAdminTalent = () =>
  useQuery({ queryKey: ["todos"], queryFn: getAdminDataFn });

export const useGetLandingTalent = () =>
  useQuery({ queryKey: ["todos"], queryFn: getLandingData });

export const usePostTalent = () => useMutation({ mutationFn: postDataFn });
export const usePostAdminData = () =>
  useMutation({ mutationFn: postAdminData });
export const useDeleteTalent = () => useMutation({ mutationFn: deleteDataFn });
export const useEditDataTalent = () => useMutation({ mutationFn: editDataFn });
export const getSingleTalent = () =>
  useQuery({ queryKey: ["todo"], queryFn: getSingleData });
