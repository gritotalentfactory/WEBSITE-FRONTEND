"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/components/ui/button";
import { CustomInput } from "@/components/ui/input/customInput";
import Logo from "@/asets/GritoLogo.svg";
import { useResetPasswordRequest } from "@/services/auth/authApi";

const Login = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const usePasswordResetRequestMutaion = useResetPasswordRequest();
  const onSubmit = async (values) => {
    try {
      const response = await usePasswordResetRequestMutaion.mutateAsync(values);
      // Check if the mutation was successful
      if (response) {
        setTimeout(() => {
          toast.success("password reset successfull");
          router.push("/pages/forgotPassword");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      // Handle errors using the onError callback
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      setTimeout(() => {
        toast.error(errorMessage);
      }, 2000);
    }
  };
  return (
    <div className="w-screen h-screen px-6">
      <ToastContainer />
      <main className="flex flex-col md:flex-row gap-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-h-full w-full md:w-[48%] bg-white flex items-center flex-col justify-center gap-3 p-4 "
        >
          <h1>Recover Password</h1>
          <p>
            Enter an email so that an otp for resseting your password will be
            sent to you
          </p>
          <div className="mb-2 w-[100%]">
            <Controller
              control={control}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value }, formState }) => (
                <CustomInput
                  placeholder={"Email"}
                  size="sm"
                  fullWidth
                  LabelText="Email"
                  isPassword={false}
                  value={value}
                  type="email"
                  variant="outlined"
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          <Button
            size="md"
            variant="primary"
            text={
              usePasswordResetRequestMutaion.isPending ? "loading.." : "send"
            }
            disabled={false}
            fullWidth={true}
          />
        </form>
        <div className="hidden bg-black min-h-screen w-full md:w-[48%] border-4 md:flex items-center justify-center border-black">
          <Image src={Logo} height={350} width={350} alt="logo" />
        </div>
      </main>
    </div>
  );
};

export default Login;
