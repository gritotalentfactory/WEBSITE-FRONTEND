"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Carousel from "@/components/carousel";
import style from "./home.module.css";
import Button from "@/components/ui/button";
import { Talent } from "@/components/carousel/data";
import { useGetLandingTalent } from "../../../services/talentAdmin/adminApi";
import FormModal from "../../../components/modal/formModal";
const CarouselSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, isError, data: mytalent } = useGetLandingTalent();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" id="hire-talent-section">
      <div>
        <div>
          {isLoading ? (
            <p className="text-center font-bold text-[#CBB26A]">Loading..</p>
          ) : (
            <Carousel title={"Talent Details"} info={mytalent} />
          )}
        </div>
        <div
          className="flex items-center justify-center mt-16"
          style={{ marginTop: "120px" }}
        >
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
