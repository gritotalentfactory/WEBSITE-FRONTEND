"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Cookies from "js-cookie";
import Button from "@/components/ui/button";
import { CustomInput } from "@/components/ui/input/customInput";
import { useResetPassword } from "@/services/auth/authApi";
import Logo from "@/asets/GritoLogo.svg";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp_code: "",
      password: "",
    },
  });
  const useResetPasswordMutation = useResetPassword();
  const user = JSON.parse(Cookies.get("user"));
  const email = user.email;
  const onSubmit = async (values) => {
    if (values.password !== values.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    const { confirmpassword, ...dataWithoutConfirmPassword } = values;
    try {
      const response = await useResetPasswordMutation.mutateAsync(
        // dataWithoutConfirmPassword,
        // email
        {
          ...dataWithoutConfirmPassword,
          email: email,
        }
      );

      // Check if the mutation was successful
      if (response) {
        setTimeout(() => {
          toast.success("Password reset successful!");
          router.push("/pages/login");
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
          <h1>Reset Your Password</h1>
          <p>Check your email for an otp and reset yuur password</p>
          <div className="mb-2 w-[100%]">
            <Controller
              control={control}
              name="otp_code"
              rules={{
                required: "This field is required",
                pattern: {
                  value: /^\d+$/,
                  message: "Enter a valid number",
                },
                // min: {
                //   value: 1,
                //   message: "Number must be greater than or equal to 1",
                // },
                // max: {
                //   value: 100,
                //   message: "Number must be less than or equal to 100",
                // },
              }}
              render={({ field: { onChange, onBlur, value }, formState }) => (
                <CustomInput
                  size="sm"
                  placeholder={"Enter Your OTP"}
                  fullWidth
                  LabelText="OTP CODE"
                  isPassword={false}
                  value={value}
                  type="number"
                  variant="outlined"
                  onBlur={onBlur} // notify when input is touched
                  onChange={onChange} // send value to hook form
                />
              )}
            />
            {errors.otp_code && <p>{errors.otp_code.message}</p>}
          </div>{" "}
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
            text="reset"
            disabled={false}
            fullWidth={true}
          />
          <Link href={""} className="text-center pt-12">
            Having Trouble?
          </Link>
        </form>
        <div className="hidden bg-black min-h-screen w-full md:w-[48%] border-4 md:flex items-center justify-center border-black">
          <Image src={Logo} height={350} width={350} alt="logo" />
        </div>
      </main>
    </div>
  );
};

export default Login;
