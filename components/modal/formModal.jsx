"use client";
import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import CountrySelector from "../ui/input/countryInput";
import RadioInput from "../ui/input/radioInput";
import Button from "../ui/button";
import style from "./modal.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePostTalent } from "@/services/talentAdmin/adminApi";

const FormModal = ({ openModal, closeModal }) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const usePostTalentMutation = usePostTalent();

  const onSubmit = async (data) => {
    data.skill_set = [data.skill_set];
    data.country = data.country.label;

    try {
      const response = await usePostTalentMutation.mutateAsync(data);
      if (response) {
        Cookies.set("formSubmitted", "true");
        reset();
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      const errorMessage = error?.response?.message;
      toast.error(errorMessage);
    }
    console.log({ data });
    console.log({ formData });
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
                <label htmlFor="">Name of Client:</label>
                <input
                  type="text"
                  {...register("name", { required: true, maxLength: 20 })}
                />
                <p>{errors.message}</p>
              </div>{" "}
              <div className={style.inputContainer}>
                <label htmlFor="">Client&lsquo;s Email:</label>
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  })}
                />
              </div>{" "}
              <div className={style.inputContainer}>
                <label htmlFor="">Client&lsquo;s Whatsapp Number:</label>
                <input
                  type="text"
                  {...register("contact_number", {
                    required: true,
                    // pattern: /^[0-9]{10}$/,
                  })}
                />
                <p>{errors.message}</p>
              </div>
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
                      // checked={value === "female"}
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
                      // checked={value === "male"}
                    />
                  )}
                />
              </div>
            </section>
            <Button
              size="md"
              variant="outline"
              text={usePostTalentMutation.isPending ? "Loading...." : "Submit"}
              disabled={false}
              fullWidth={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
