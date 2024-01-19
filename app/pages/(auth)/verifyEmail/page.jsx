"use client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { CustomInput } from "@/components/ui/input/customInput";

const EmailVerificationPage = () => {
  const router = useRouter();

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    setTimeout(() => {
      toast.success("successfully logged in");
      router.push("/pages/login");
    }, 2000);
  };
  return (
    <section className="w-screen h-screen">
      <ToastContainer />
      <main className="flex flex-col md:flex-row items-center">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="min-h-[300px] w-full lg:w-[48%]"
        >
          <h1>VERIFY EMAIL ADDRESS</h1>
          <div className="my-3">
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
            size="md"
            variant="primary"
            loadingText="loading"
            text="register"
            disabled={false}
            fullWidth={true}
            loading={false}
          />
        </form>
        <div className="bg-black min-h-screen w-full md:w-[48%] border-4 border-black"></div>
      </main>
    </section>
  );
};

export default EmailVerificationPage;
