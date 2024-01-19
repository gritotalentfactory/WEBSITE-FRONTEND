"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Button from "@/components/ui/button";
import { CustomInput } from "@/components/ui/input/customInput";
import Logo from "@/asets/GritoLogo.svg";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
  const onSubmit = (values) => {
    setTimeout(() => {
      toast.success("successfully logged in");
      router.push("pages/dashboard");
    }, 2000);
  };
  return (
    <div className="w-screen h-screen px-6">
      <ToastContainer />
      <main className="flex flex-col md:flex-row gap-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-h-full w-full md:w-[48%] bg-white flex items-center flex-col justify-center gap-3 p-4 "
        >
          <div className="mb-2 w-[100%]">
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message: "Password must meet complexity requirements",
                },
              }}
              name="password"
              render={({ field: { onChange, onBlur, value }, formState }) => (
                <CustomInput
                  placeholder={"Password"}
                  size="sm"
                  fullWidth
                  LabelText="Password"
                  isPassword
                  onClick={() => setShowPassword(!showPassword)}
                  showPassword={showPassword}
                  value={value}
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
            <p style={{ color: "red" }}>
              {errors.password && errors.password.message}
            </p>
          </div>
          <div className="mb-2 w-[100%]">
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message: "Password must meet complexity requirements",
                },
              }}
              name="confirmpassword"
              render={({ field: { onChange, onBlur, value }, formState }) => (
                <CustomInput
                  placeholder={"Confirm Password"}
                  size="sm"
                  fullWidth
                  LabelText="Confirm Password"
                  isPassword
                  onClick={() => setShowPassword(!showPassword)}
                  showPassword={showPassword}
                  value={value}
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
            <p style={{ color: "red" }}>
              {errors.confirmpassword && errors.confirmpassword.message}
            </p>
          </div>

          <Button
            size="md"
            variant="primary"
            loadingText="loading"
            text="register"
            disabled={false}
            fullWidth={true}
            loading={false}
          />
          <Link href={""} className="text-center pt-12">
            Having Trouble?
          </Link>
        </form>
        <div className="bg-black min-h-screen w-full md:w-[48%] border-4 flex items-center justify-center border-black">
          <Image src={Logo} height={350} width={350} alt="logo" />
        </div>
      </main>
    </div>
  );
};

export default Login;
