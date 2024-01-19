"use client";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { CustomInput } from "@/components/ui/input/customInput";
import Logo from "@/asets/GritoLogo.svg";
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
    <section className="w-screen h-screen px-6 ">
      <ToastContainer />
      <main className="flex flex-col md:flex-row items-center gap-5">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="min-h-[300px] w-full lg:w-[48%] "
        >
          <h1 className="text-center">VERIFY EMAIL ADDRESS</h1>
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
                  placeholder={"enter otp"}
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
            text="verify email"
            disabled={false}
            fullWidth={true}
            loading={false}
          />
        </form>
        <div className="bg-black min-h-screen w-full md:w-[48%] border-4 flex items-center justify-center border-black">
          <Image src={Logo} height={350} width={350} alt="logo" />
        </div>
      </main>
    </section>
  );
};

export default EmailVerificationPage;
