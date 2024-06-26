import React from "react";
import { useForm, Controller } from "react-hook-form";
import CountrySelector from "../ui/input/countryInput";
import RadioInput from "../ui/input/radioInput";
import Button from "../ui/button";
import style from "./modal.module.css";

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
      country: data.country.label,  // Extract the value from the selected country object
    };
    console.log("Form data:", formattedData);

    try {
      const response = await fetch("http://localhost:5000/talent-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        closeModal();
      } else {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData);
      }
    } catch (error) {
      console.error("Network error submitting form:", error);
    }
  };

  return (
    <div style={{ zIndex: "1000" }}>
      <div className="absolute h-screen w-screen bottom-0 flex items-center justify-center">
        <div className="bg-black min-h-[600px] min-w-[600px] mx-auto">
          <h1
            className="text-red-600 flex justify-end cursor-pointer pr-4"
            onClick={closeModal}
          >
            X
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className={style.carouselForm}>
            <section className="mb-2 w-[100%]">
              <div className={style.inputContainer}>
                <label htmlFor="clientName">Name of Client:</label>
                <Controller
                  name="clientName"
                  control={control}
                  rules={{ required: "Name of client is required" }}
                  render={({ field }) => <input {...field} />}
                />
              </div>
                {errors.clientName && <span className="text-red-600">{errors.clientName.message}</span>}

              <div className={style.inputContainer}>
                <label htmlFor="clientEmail">Client's Email</label>
                <Controller
                  name="clientEmail"
                  control={control}
                  rules={{ required: "Client's Email is required" }}
                  render={({ field }) => <input {...field} />}
                />
              </div>
                {errors.clientEmail && <span className="text-red-600">{errors.clientEmail.message}</span>}

              <div className={style.inputContainer}>
                <label htmlFor="clientWnum">Client's Whatsapp Number</label>
                <Controller
                  name="clientWnum"
                  control={control}
                  rules={{ required: "Client's Whatsapp Number is required" }}
                  render={({ field }) => <input {...field} />}
                />
              </div>
                {errors.clientWnum && <span className="text-red-600">{errors.clientWnum.message}</span>}

              <div className={style.inputContainer}>
                <label htmlFor="country">Country:</label>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => <CountrySelector {...field} />}
                />
              </div>
                {errors.country && <span className="text-red-600">{errors.country.message}</span>}
              <div className={style.inputContainer}>
                <label htmlFor="skillSet">Skill Set:</label>
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
              <div className={`${style.inputContainer} text-black mx-3`}>
                <label htmlFor="level">Level</label>
                <Controller
                  name="level"
                  control={control}
                  rules={{ required: "Level is required" }}
                  render={({ field }) => (
                    <>
                      <RadioInput
                        {...field}
                        text="Beginner"
                        value="Beginner"
                        checked={field.value === "Beginner"}
                      />
                      <RadioInput
                        {...field}
                        text="Intermediate"
                        value="Intermediate"
                        checked={field.value === "Intermediate"}
                      />
                      <RadioInput
                        {...field}
                        text="Professional"
                        value="Professional"
                        checked={field.value === "Professional"}
                      />
                    </>
                  )}
                />
              </div>
                {errors.level && <span className="text-red-600">{errors.level.message}</span>}
              <div className={`${style.inputContainer} text-black mx-3`}>
                <label htmlFor="gender">Gender:</label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <>
                      <RadioInput
                        {...field}
                        text="Female"
                        value="Female"
                        checked={field.value === "Female"}
                      />
                      <RadioInput
                        {...field}
                        text="Male"
                        value="Male"
                        checked={field.value === "Male"}
                      />
                    </>
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
