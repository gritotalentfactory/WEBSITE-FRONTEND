"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/components/ui/button";
import { CustomInput } from "@/components/ui/input/customInput";
import Logo from "@/asets/GritoLogo.svg";

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

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        const token = result.token;

        // Decode the token to extract admin data
        const adminData = parseJWT(token);

        // Store the token in a cookie
        Cookies.set("adminData", token, { expires: 1, sameSite: "strict" });

        toast.success("Login successful");
        setTimeout(() => {
          router.push("/pages/dashboard");
        }, 2000);
      } else {
        toast.error(result.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
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
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  placeholder={"Enter Your Email"}
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
            {errors.email && <p>{errors.email.message}</p>}
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
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  placeholder={"Enter Your password"}
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
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <Button
            size="md"
            variant="primary"
            text={"Login"}
            disabled={false}
            fullWidth={true}
            onClick={handleSubmit(onSubmit)}
          />

          <Link href="/pages/passwordRequest" className="flex ml-auto">
            Forgot Your Password?
          </Link>
          <small>
            Don't have an account?{" "}
            <Link href={"/pages/signUp"} className="text-primary font-bold">
              Sign Up
            </Link>
          </small>
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

// Helper function for decoding JWT
function base64Decode(str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

function parseJWT(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = base64Decode(base64);
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid JWT Token:", error);
    return null;
  }
}
