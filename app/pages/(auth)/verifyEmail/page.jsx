"use client";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { CustomInput } from "@/components/ui/input/customInput";
import Logo from "@/asets/GritoLogo.svg";
import { useVerifyEmail } from "@/services/auth/authApi";
import { useResendOtp } from "@/services/auth/authApi";
import Cookies from "js-cookie";

const EmailVerificationPage = () => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      otp_code: "",
      email: "",
    },
  });
  const useVerifyEmailMutation = useVerifyEmail();
  const onSubmit = async (values) => {
    try {
      const response = await useVerifyEmailMutation.mutateAsync(values);
      // Check if the mutation was successful
      if (response) {
        setTimeout(() => {
          toast.success("email verified");
          router.push("/pages/login");
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
  // RESEND OTP FUNCTION
  const useResendOTPMutation = useResendOtp();
  const user = Cookies.get("user");
  const userEmail = JSON.parse(user);
  const email = userEmail.email;

  const resendOTP = async (email) => {
    try {
      const res = await useResendOTPMutation.mutateAsync({ email });
      if (res) {
        toast.success("OTP resent");
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      setTimeout(() => {
        toast.error(errorMessage);
      }, 2000);
    }
  };
  return (
    <section className="w-screen h-screen px-6 ">
      <ToastContainer />
      <main className="flex flex-col md:flex-row items-center gap-5">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="min-h-[300px] w-full lg:w-[48%] "
        >
          <h1 className="text-center">VERIFY EMAIL ADDRESS</h1>
          <div className="my-3 md:mb-7">
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
          <div className="my-3 md:mb-16">
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
                  size="sm"
                  placeholder={"Enter Your Email"}
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
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <Button
            size="lg"
            variant="primary"
            loadingText="loading"
            text={useVerifyEmailMutation.isPending ? "loading" : "verify Email"}
            disabled={false}
            fullWidth={true}
            loading={false}
          />
          <div className="pt-4 text-primary cursor-pointer">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                resendOTP(email);
              }}
              className="text-[#CBB26A]"
            >
              Resend OTP
            </button>
          </div>
          <div className=" text-center pt-12 w-[100%]">
            <Link href={""}>Having Trouble?</Link>
          </div>
        </form>
        <div className="hidden bg-black min-h-screen w-full md:w-[48%] border-4 md:flex items-center justify-center border-black">
          <Image src={Logo} height={350} width={350} alt="logo" />
        </div>
      </main>
    </section>
  );
};

export default EmailVerificationPage;
