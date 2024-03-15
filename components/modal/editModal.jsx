"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import CountrySelector from "../ui/input/countryInput";
import { getSingleTalent } from "@/services/talentAdmin/adminApi";
import { useEditDataTalent } from "@/services/talentAdmin/adminApi";
import RadioInput from "../ui/input/radioInput";
import Button from "../ui/button";
import style from "./modal.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditFormModal = ({ openModal, closeModal, singleData }) => {
  console.log({ singleData });
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const myId = singleData?.user?.id;
  // const {
  //   isLoading,
  //   isError,
  //   data: mytalent,
  // } = getSingleTalent(singleData?.user?.id);
  const useEdittalentMutation = useEditDataTalent();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: singleData?.user?.name || "",
      email: singleData?.user?.email || "",
      country: singleData?.user?.country || "",
      skill_set: singleData?.skill_set || "",
      skill_level: singleData?.skill_level || "",
      gender: singleData?.user?.gender || "",
      // contact_number: singleData?.contact_number || "",
    },
  });
  const onSubmit = async (data) => {
    console.log("my information is, ", data);
    // data.skill_set = [data.skill_set];
    // if (typeof data.skill_set === "string") {
    //   data.skill_set = [data.skill_set.replace(/^00/, "")];
    // }
    //   if (typeof data.skill_set === "string") {
    //     data.skill_set = [data.skill_set.replace(/^00/, "")];
    //   }
    data.country = data.country.label;
    data.image = file;
    console.log("my Id is", myId);

    try {
      const response = await useEdittalentMutation.mutateAsync({ data, myId });

      if (response) {
        reset();
        toast.success(response.message);

        // window.location.reload();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    }
  };
  return (
    <div style={{ zIndex: "1000" }}>
      <div className="absolute h-screen w-screen  bottom-0 max-sm:left-0 max-sm:items-start flex items-center justify-center">
        <ToastContainer />
        <div className="bg-black min-h-[600px] max-w-[600px] max-sm:w-full  mx-auto py-6">
          <h1
            className="text-red-600 flex justify-end cursor-pointer pr-4 "
            onClick={closeModal}
          >
            X
          </h1>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className={style.carouselForm}
          >
            <section className="mb-2  w-[100%]">
              <div className={style.inputContainer}>
                <label htmlFor="">Name:</label>
                <input
                  type="text"
                  {...register("name", { required: true, maxLength: 20 })}
                />
                <p>{errors.message}</p>
              </div>{" "}
              <div className={style.inputContainer}>
                <label htmlFor="">Email:</label>
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  })}
                />
              </div>{" "}
              <div className={style.inputContainer}>
                <label htmlFor="">Country</label>
                <Controller
                  control={control}
                  // rules={{
                  //   required: {
                  //     value: true,
                  //     message: "Name is required",
                  //   },
                  // }}
                  name="country"
                  render={({
                    field: { onChange, onBlur, value },
                    formState,
                  }) => (
                    <CountrySelector
                      className={style.countrySelect}
                      placeholder={"Select Country"}
                      value={value}
                      type="text"
                      onBlur={onBlur}
                      onChange={onChange}
                      
                    />
                  )}
                />
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="">Skill Set:</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  {...register("skill_set", { required: true })}
                ></textarea>
              </div>
              <div
                className={` ${style.inputContainer} text-black mx-3 max-sm:my-3`}
              >
                <label htmlFor="">Level</label>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Level is required",
                    },
                  }}
                  name="skill_level" // Same name for all radio buttons in the group
                  render={({
                    field: { onChange, onBlur, value },
                    formState,
                  }) => (
                    <RadioInput
                      text={"Beginner"}
                      value={"beginner"}
                      name={"skill_level"}
                      onChange={onChange}
                      onBlur={onBlur}
                      checked={value === "beginner"}
                    />
                  )}
                />
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Level is required",
                    },
                  }}
                  name="skill_level" // Same name for all radio buttons in the group
                  render={({
                    field: { onChange, onBlur, value },
                    formState,
                  }) => (
                    <RadioInput
                      text={"Intermediate"}
                      value={"intermediate"}
                      name={"skill_level"}
                      onChange={onChange}
                      onBlur={onBlur}
                      checked={value === "intermediate"}
                    />
                  )}
                />
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Level is required",
                    },
                  }}
                  name="skill_level" // Same name for all radio buttons in the group
                  render={({
                    field: { onChange, onBlur, value },
                    formState,
                  }) => (
                    <RadioInput
                      text={"Professional"}
                      value={"professional"}
                      name={"skill_level"}
                      onChange={onChange}
                      onBlur={onBlur}
                      checked={value === "professional"}
                    />
                  )}
                />
              </div>
              <div className={` ${style.inputContainer} text-black mx-3  `}>
                <label htmlFor="">Gender:</label>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  }}
                  name="gender"
                  render={({
                    field: { onChange, onBlur, value },
                    formState,
                  }) => (
                    <RadioInput
                      text={"Female"}
                      value={"female"}
                      name={"gender"}
                      onChange={onChange}
                      onBlur={onBlur}
                      checked={value === "female"}
                    />
                  )}
                />{" "}
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  }}
                  name="gender"
                  render={({
                    field: { onChange, onBlur, value },
                    formState,
                  }) => (
                    <RadioInput
                      text={"Male"}
                      value={"male"}
                      name={"gender"}
                      onChange={onChange}
                      onBlur={onBlur}
                      checked={value === "male"}
                    />
                  )}
                />
              </div>
              <div className="bg-white">
                <label htmlFor="">Upload Image</label>
                <Controller
                  name="image"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    // <input
                    //   type="file"
                    //   onChange={(e) => field.onChange(e.target.files[0])}
                    // />
                    <input type="file" onChange={handleFileChange} />
                  )}
                />
              </div>
            </section>
            <Button
              size="md"
              variant="outline"
              text={useEdittalentMutation.isPending ? "Loading...." : "Submit"}
              disabled={false}
              fullWidth={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFormModal;
