"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Carousel from "@/components/carousel";
import style from "./home.module.css";
import Button from "@/components/ui/button";
import { CustomInput } from "@/components/ui/input/customInput";
import { Talent } from "@/components/carousel/data";
import CountrySelector from "@/components/ui/input/countryInput";
import RadioInput from "@/components/ui/input/radioInput";

const CarouselSection = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const info = Talent;
  const renderContent = (item) => (
    <section classNam={style.carouselContainer}>
      <Image src={item.flag} height={60} width={60} alt="flag" />
      <main className="flex flex-col md:flex-row gap-5">
        <div>
          <div className="flex gap-10 items-center">
            <label htmlFor="">Name:</label>
            <p>{item.Name}</p>
          </div>
          <div className="flex gap-10 items-center">
            <label htmlFor="">Country:</label>
            <p>{item.Country}</p>
          </div>
          <div className="flex gap-10 items-center">
            <label htmlFor="">Skill Set</label>
            <p>{item.skill}</p>
          </div>
          <div className="flex gap-10 items-center">
            <label htmlFor="">Level: </label>
            <p>{item.leve}</p>
          </div>
          <div className="flex gap-10 items-center">
            <label htmlFor="">Gender:</label>
            <p>{item.gender}</p>
          </div>
          <div className="flex gap-10 items-center">
            <label htmlFor="">Portfolio:</label>
            <Link href={item.portfolio}>{item.portfolio}</Link>
          </div>
        </div>
        <div>
          <Image
            src={item.profileImage}
            height={300}
            width={300}
            alt="profile"
          />
          <h4 className="text-[#CBB26A]">{item.profileTitle}</h4>
        </div>
      </main>
    </section>
  );
  return (
    <div className="relative">
      <div>
        <div>
          <Carousel
            title={"Talent Details"}
            info={info}
            renderContent={renderContent}
          />
        </div>
        <div
          className="flex items-center justify-center mt-16"
          style={{ marginTop: "120px" }}
        >
          <Button
            size="md"
            variant="primary"
            text={"Custom Request"}
            disabled={false}
            fullWidth={false}
            onClick={openModal}
          />
        </div>
      </div>

      {isOpen && (
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
      )}
    </div>
  );
};

export default CarouselSection;
