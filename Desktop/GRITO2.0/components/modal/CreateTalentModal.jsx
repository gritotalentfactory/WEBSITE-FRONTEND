import React from "react";
import { useForm, Controller } from "react-hook-form";
import CountrySelector from "../ui/input/countryInput";
import RadioInput from "../ui/input/radioInput";
import Button from "../ui/button";
import style from "./modal.module.css";

const CreateTalentModal = ({ isOpen, closeCreateModal, handleCreate }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      country: "",
      countryCode: "",
      skillSet: "",
      level: "",
      gender: "",
      portfolio: "",
      image: null,
      createdAt: new Date().toISOString(),
    },
  });

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      country: data.country.label, // Extract the label from the selected country object
      countryCode: data.country.value, // Extract the value from the selected country object
    };
    // Prepare form data
    const formData = new FormData();
    // formData.append("countryCode", countryCode);
    Object.keys(formattedData).forEach((key) => {
      formData.append(key, formattedData[key]);
    });

    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]); // Append image file
    }


    try {
      const response = await fetch("http://localhost:5000/admin/talents", {
        method: "POST",
        body: formData, // Send formData instead of JSON
      });

      if (response.ok) {
        const newTalent = await response.json();
        console.log("Talent created successfully:", newTalent);
        handleCreate(newTalent);
        closeCreateModal();
      } else {
        const errorData = await response.json();
        console.error("Error creating talent:", errorData);
      }
    } catch (error) {
      console.error("Network error creating talent:", error);
    }
  };

  return (
    isOpen && (
      <div style={{ zIndex: "1000" }}>
        <div className="absolute h-screen w-screen bottom-0 flex items-center justify-center">
          <div className="bg-black min-h-[600px] min-w-[600px] mx-auto p-4">
            <h1
              className="text-red-600 flex justify-end cursor-pointer pr-4"
              onClick={closeCreateModal}
            >
              X
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className={style.carouselForm}>
              <section className="mb-2 w-[100%]">
                <div className={style.inputContainer}>
                  <label htmlFor="name">Name:</label>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field }) => <input {...field} />}
                  />
                </div>
                  {errors.name && <span className="text-red-600">{errors.name.message}</span>}
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
                  <label htmlFor="level">Level:</label>
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
                <div className={style.inputContainer}>
                  <label htmlFor="portfolio">Portfolio:</label>
                  <Controller
                    name="portfolio"
                    control={control}
                    rules={{ required: "Portfolio is required" }}
                    render={({ field }) => <input {...field} />}
                  />
                </div>
                  {errors.name && <span className="text-red-600">{errors.portfolio.message}</span>}
                  <div className={style.inputContainer}>
                  <label htmlFor="image">Image:</label>
                  <Controller
                    name="image"
                    control={control}
                    rules={{ required: "Image is required" }}
                    render={({ field }) => (
                      <input
                        type="file"
                        onChange={(e) => setValue("image", e.target.files)}
                      />
                    )}
                  />
                </div>
                  {errors.image && <span className="text-red-600">{errors.image.message}</span>}
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
    )
  );
};

export default CreateTalentModal;
