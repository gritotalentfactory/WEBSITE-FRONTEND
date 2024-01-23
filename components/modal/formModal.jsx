import React from "react";
import { useForm } from "react-hook-form";
import CountrySelector from "../ui/input/countryInput";
import RadioInput from "../ui/input/radioInput";
import Button from "../ui/button";
import style from "./modal.module.css";

const FormModal = ({ openModal, closeModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  const onSubmit = async (values) => {};
  return (
    <div style={{ zIndex: "1000" }}>
      <div className="absolute h-screen w-screen  bottom-0 flex items-center justify-center">
        <div className="bg-black min-h-[600px] min-w-[600px] mx-auto">
          <h1
            className="text-red-600 flex justify-end cursor-pointer pr-4 "
            onClick={closeModal}
          >
            X
          </h1>
          <form action="" className={style.carouselForm}>
            <section className="mb-2  w-[100%]">
              <div className={style.inputContainer}>
                <label htmlFor="">Name of Client:</label>
                <input type="text" />
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="">Country:</label>
                <CountrySelector />
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="">Skill Set:</label>
                <textarea name="" id="" cols="30" rows="5"></textarea>
              </div>
              <div className={` ${style.inputContainer} text-black mx-3`}>
                <label htmlFor="">Level</label>
                <RadioInput text={"Beginner"} />
                <RadioInput text={"Intermediate"} />
                <RadioInput text={"Professional"} />
              </div>
              <div className={` ${style.inputContainer} text-black mx-3`}>
                <label htmlFor="">Gender:</label>
                <RadioInput text={"Female"} />
                <RadioInput text={"Male"} />
              </div>
            </section>
            <Button
              size="md"
              variant="outline"
              text={"Scroll"}
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
