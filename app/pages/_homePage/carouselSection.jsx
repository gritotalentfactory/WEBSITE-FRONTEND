"use client";
import React from "react";
import { Talent } from "@/components/carousel/data";
import Link from "next/link";
import Image from "next/image";
import Carousel from "@/components/carousel";
import style from "./home.module.css";
import Button from "@/components/ui/button";

const CarouselSection = () => {
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
    <div>
      <div>
        <Carousel
          title={"Talent Details"}
          info={info}
          renderContent={renderContent}
        />
      </div>
      <div className="flex items-center justify-center mt-16">
        <Button
          size="md"
          variant="primary"
          text={"Play Video"}
          disabled={false}
          fullWidth={false}
        />
      </div>
    </div>
  );
};

export default CarouselSection;
