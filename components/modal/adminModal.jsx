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
import { usePostAdminData } from "@/services/talentAdmin/adminApi";

const AdminFormModal = ({ openModal, closeModal }) => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const usePostTalentMutation = usePostAdminData();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const onSubmit = async (data) => {
    const skillSetArray = JSON.stringify(
      data.skill_set.split("\n").filter((skill) => skill.trim() !== "")
    );
    data.image = file;
    data.country = data.country.label;
    // Create a new FormData object
    const formData = new FormData();

    // Append other form fields
    // formData.append("name", data.name);
    // formData.append("email", data.email);
    // formData.append("country", data.country);
    // formData.append("gender", data.gender);
    // formData.append("image", data.image);
    // formData.append("skill_level", data.skill_level);
    // // Append the skillset array as individual skills
    // formData.append("skills", JSON.stringify(skillSetArray));
    try {
      const response = await usePostTalentMutation.mutateAsync(data);
      console.log("My response is ", response.data);
      if (response) {
        Cookies.set("formSubmitted", "true");
        reset();
        toast.success(response.message);
        // window.location.reload();
      } else {
        toast.error("post not successfull");
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error?.message;
      console.log(errorMessage);
      toast.error({ errorMessage });
    }
  };

  return (
    <div style={{ zIndex: "1000" }}>
      <div className="absolute h-screen w-screen  bottom-0 max-sm:left-0 max-sm:items-start flex items-center justify-center">
        <ToastContainer />
        <div className="bg-black min-h-[600px] max-w-[600px] max-sm:w-full  mx-auto py-6">
          <div onClick={closeModal} className="cursor-pointer">
            <h1 className="text-red-600 flex justify-end cursor-pointer pr-4 ">
              X
            </h1>
          </div>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className={style.carouselForm}
            enctype="multipart/form-data"
          >
            <section className="mb-2  w-[100%]">
              <div className={style.inputContainer}>
                <label htmlFor="">Name:</label>
                <input
                  type="text"
                  {...register("name", { required: true, maxLength: 20 })}
                />
                <p>{errors.message}</p>
              </div>
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
              text={usePostTalentMutation.isPending ? "Loading...." : "Submit"}
              disabled={false}
              fullWidth={false}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminFormModal;
