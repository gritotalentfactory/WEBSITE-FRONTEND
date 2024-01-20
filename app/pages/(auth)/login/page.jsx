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
import { useLogin } from "@/services/auth/authApi";

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
  const useLoginMutation = useLogin();
  const onSubmit = async (values) => {
    try {
      const response = await useLoginMutation.mutateAsync(values);
      // Check if the mutation was successful
      if (response) {
        sessionStorage.setItem("userData", JSON.stringify(response));
        console.log(userData);
        setTimeout(() => {
          toast.success("login successfull");
          router.push("/pages/dashboard");
        }, 2000);
      }
    } catch (error) {
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
          <h1>Welcome Back!</h1>
          <div className="mb-3 w-[100%]">
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
                  placeholder={"Enter Your Email"}
                  size="sm"
                  fullWidth
                  LabelText="Email"
                  isPassword={false}
                  value={value}
                  type="email"
                  variant="outlined"
                  onBlur={onBlur} // notify when input is touched
                  onChange={onChange} // send value to hook form
                />
              )}
            />
            {errors.email && <p>{errors?.email?.message}</p>}
          </div>
          <div className="mb-8 w-[100%]">
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
                  placeholder={"Enter Your pssword"}
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
            <p>{errors.password && errors.password.message}</p>
          </div>

          <Button
            size="md"
            variant="primary"
            text={useLoginMutation.isPending ? "loading.." : "login"}
            disabled={false}
            fullWidth={true}
          />
          <Link href="/pages/passwordRequest" className="flex ml-auto">
            Forgot Your Password?
          </Link>
          <Link href={""} className="text-center pt-12">
            Having Trouble?
          </Link>
        </form>
        <div className=" hidden bg-black min-h-screen w-full md:w-[48%] border-4 md:flex items-center justify-center border-black">
          <Image src={Logo} height={350} width={350} alt="logo" />
        </div>
      </main>
    </div>
  );
};

export default Login;
