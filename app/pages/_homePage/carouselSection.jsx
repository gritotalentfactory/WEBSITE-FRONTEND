"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Carousel from "@/components/carousel";
import style from "./home.module.css";
import Button from "@/components/ui/button";
// import FormModal from "@/components/modal/FormModal";
import FormModal from "../../components/modal/FormModal";
import Flag from "react-world-flags"; 

const CarouselSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [talents, setTalents] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const fetchTalents = async () => {
      try { 
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/talents`, {
        withCredentials: true 
    });
        setTalents(response.data);
      } catch (error) {
        console.error("Error fetching talents:", error);
      }
    };

    fetchTalents();
  }, []);

  const renderContent = (item) => (
    <section className={style.carouselContainer} id="hire-talent-section">
      <Flag code={item.countryCode} height={60} width={60} alt="flag" />
      <main className={`flex flex-col md:flex-row gap-5 ${style.mainContainer}`}>
        <div>
          <div className="flex gap-10 items-center">
            <label htmlFor="">Name:</label>
            <p>{item.name}</p>
          </div>
          <div className="flex gap-10 items-center">
            <label htmlFor="">Country:</label>
            <p>{item.country}</p>
          </div>
          <div className="flex gap-10 items-center">
            <label htmlFor="">Skill Set:</label>
            <p>{item.skillSet.join(", ")}</p>
          </div>
          <div className="flex gap-10 items-center">
            <label htmlFor="">Level:</label>
            <p>{item.level}</p>
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
            src= {item.image}
            height={200}
            width={200}
            alt="profile"
            className={style.CarouselImage}
          />
          <h4 className="text-[#CBB26A] flex justify-end">
            {item.profileTitle}
          </h4>
        </div>
      </main>
    </section>
  );
  return (
    <div className="relative">
      <div>
        <div>
          <Carousel width={20} height={100} title={"Talent Details"} info={talents} renderContent={renderContent} />
        </div>
        <div className="flex items-center justify-center mt-16" style={{ marginTop: "120px" }}>
          <Button
            size="md"
            variant="primary"
            text={"Talent Request"}
            disabled={false}
            fullWidth={false}
            onClick={openModal}
          />
        </div>
      </div>
      {isOpen && <FormModal openModal={openModal} closeModal={closeModal} />}
    </div>
  );
};

export default CarouselSection;
