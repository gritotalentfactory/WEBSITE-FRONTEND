"use client";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/button";
import { CustomInput } from "@/components/ui/input/customInput";
import Link from "next/link";
import Checkbox from "@/components/ui/input/customCheckbox";
import Logo from "@/asets/GritoLogo.svg";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = async (values) => {
    setTimeout(() => {
      toast.success("successfully logged in");
      router.push("pages/authMessage");
    }, 2000);
  };

  return (
    <div className="w-screen min-h-screen px-6   ">
      <ToastContainer />

      <main className="flex flex-col md:flex-row gap-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-h-[300px] w-full lg:w-[48%] bg-white flex items-center flex-col justify-center gap-3 p-4 "
        >
          <h1>Register With Email</h1>
          <div className="mb-2  w-[100%]">
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Name is required",
                },
              }}
              name="fname"
              render={({ field: { onChange, onBlur, value }, formState }) => (
                <CustomInput
                  placeholder={"Full Name"}
                  size="sm"
                  fullWidth={true}
                  value={value}
                  type="text"
                  LabelText="Full Name"
                  isPassword={false}
                  variant="outlined"
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
            <p style={{ color: "red" }}>
              {errors.fname && errors.fname.message}
            </p>
          </div>
          <div className="mb-2  w-[100%]">
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Username is required",
                },
              }}
              name="username"
              render={({ field: { onChange, onBlur, value }, formState }) => (
                <CustomInput
                  placeholder={"Username"}
                  size="sm"
                  fullWidth={true}
                  value={value}
                  type="text"
                  LabelText="Usename"
                  isPassword={false}
                  variant="outlined"
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
            <p style={{ color: "red" }}>
              {errors.username && errors.username.message}
            </p>
          </div>
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
                  onClick={() => setConfirmPassword(!confirmPassword)}
                  showPassword={confirmPassword}
                  value={value}
                  type={confirmPassword ? "text" : "password"}
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
            text={"Register"}
            disabled={false}
            fullWidth={true}
            loading={false}
          />
          <small>
            Already have an account?{" "}
            <Link href={"/pages/login"} className="text-primary font-bold">
              Log in
            </Link>
          </small>
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

export default SignUp;
