"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import CountrySelector from "../ui/input/countryInput";
import Button from "../ui/button";
import style from "./modal.module.css";
import { toast } from "react-toastify";

const FormModal = ({ closeModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientWnum: "",
      country: "",
      skillSet: "",
      level: "",
      gender: "",
    },
  });

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      country: data.country.label, // Extract the value from the selected country object
    };
    // console.log("Form data:", formattedData);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/talent-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        toast.success("Talent request successful.");
        closeModal();
      } else {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData);
        toast.error("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Network error submitting form:", error);
      toast.error("Network error submitting form. Please try again.");
    }
  };

  return (
    <div style={{ zIndex: "70" }}>
      <div className="absolute h-screen w-screen bottom-0 max-sm:left-0 max-sm:items-start flex items-center justify-center">
        <div className="bg-black min-h-[600px] max-w-[600px] max-sm:w-full mx-auto py-6">
          <h1
            className="text-red-600 flex justify-end cursor-pointer pr-4"
            onClick={closeModal}
          >
            X
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className={style.carouselForm}>
            <section className="mb-2 w-[90%]">
              <div className={style.inputContainer}>
                <label htmlFor="clientName">Name of Client </label>&nbsp;&nbsp; 
                <Controller
                  name="clientName"
                  control={control}
                  rules={{ required: "Name of client is required" }}
                  render={({ field }) => <input {...field} />}
                />
              </div>
                {errors.clientName && <span className="text-red-600">{errors.clientName.message}</span>}

              <div className={style.inputContainer}>
                <label htmlFor="clientEmail">Client&apos;s Email </label>&nbsp;&nbsp;
                <Controller
                  name="clientEmail"
                  control={control}
                  rules={{ required: "Client's Email is required" }}
                  render={({ field }) => <input {...field} />}
                />
              </div>
                {errors.clientEmail && <span className="text-red-600">{errors.clientEmail.message}</span>}

              <div className={style.inputContainer}>
                <label htmlFor="clientWnum">Client&apos;s Whatsapp Number </label>
                <Controller
                  name="clientWnum"
                  control={control}
                  rules={{ required: "Client's Whatsapp Number is required" }}
                  render={({ field }) => <input {...field} />}
                />
              </div>
                {errors.clientWnum && <span className="text-red-600">{errors.clientWnum.message}</span>}

              <div className={style.inputContainer}>
                <label htmlFor="country">Country </label>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => <CountrySelector {...field} />}
                />
              </div>
                {errors.country && <span className="text-red-600">{errors.country.message}</span>}
              <div className={style.inputContainer}>
                <label htmlFor="skillSet">Skill Set </label> &nbsp;&nbsp;
                <Controller
                  name="skillSet"
                  control={control}
                  rules={{ required: "Skill set is required" }}
                  render={({ field }) => (
                    <textarea {...field} cols="30" rows="5"></textarea>
                  )}
                />
              </div>
                {errors.skillSet && <span className="text-red-600">{errors.skillSet.message}</span>}

              <div className={`${style.inputContainer} text-black mx-3 max-sm:my-3`}>
                <label htmlFor="level">Level</label>
                <Controller
                  name="level"
                  control={control}
                  rules={{ required: "Level is required" }}
                  render={({ field }) => (
                    <div className="flex flex-row max-sm:flex-col max-sm:space-x-2 gap-2 max-sm:items-center">
                      <label>
                        <input
                          {...field}
                          type="radio"
                          value="Beginner"
                          checked={field.value === "Beginner"}
                        />
                        Beginner
                      </label>
                      <label>
                        <input
                          {...field}
                          type="radio"
                          value="Intermediate"
                          checked={field.value === "Intermediate"}
                        />
                        Intermediate
                      </label>
                      <label>
                        <input
                          {...field}
                          type="radio"
                          value="Professional"
                          checked={field.value === "Professional"}
                        />
                        Professional
                      </label>
                    </div>
                  )}
                />
              </div>
                {errors.level && <span className="text-red-600">{errors.level.message}</span>}
              <div className={`${style.inputContainer} text-black mx-3`}>
                <label htmlFor="gender">Gender </label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <div className="flex gap-2">
                      <label>
                        <input
                          {...field}
                          type="radio"
                          value="Female"
                          checked={field.value === "Female"}
                        />
                        Female
                      </label>
                      <label>
                        <input
                          {...field}
                          type="radio"
                          value="Male"
                          checked={field.value === "Male"}
                        />
                        Male
                      </label>
                    </div>
                  )}
                />
              </div>
                {errors.gender && <span className="text-red-600">{errors.gender.message}</span>}
            </section>
            <Button
              size="md"
              variant="outline"
              text="Submit"
              disabled={false}
              fullWidth={false}
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
