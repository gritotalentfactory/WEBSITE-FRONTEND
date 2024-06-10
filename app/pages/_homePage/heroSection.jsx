"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./home.module.css";
import Button from "@/components/ui/button";
import heroImage from "@/asets/heroImage.png";

const HeroSection = ({ scrollToSection }) => {
  const router = useRouter();
  const playVideo = () => {
    router.push("/pages/signUp");
  };
  return (
    <section className="flex flex-col md:flex-row justify-between pl-12">
      <div className={`w-[100%] md:w-[42%] pt-1 ${styles.heroText}`}>
        <h2>
          Hire <span>African</span> Tech Talents!
        </h2>
        <div>
          <p className={styles.textOne}>Vetted Quality and Affordable Rates</p>{" "}
          <p className={styles.textTwo}>Flexible Timezones</p>
          <p className={styles.textThree}>Negotiable Work Plan</p>
        </div>
        <div className="flex gap-3 pt-6">
          <Button
            size="md"
            variant="primary"
            text={"Hire Talent"}
            disabled={false}
            fullWidth={false}
            onClick={playVideo}
          />
          <Button
            size="md"
            variant="outline"
            text={"Scroll"}
            disabled={false}
            fullWidth={false}
            onClick={scrollToSection}
          />
        </div>
      </div>

      <div className="w-[100%] md:w-[42%] relative max:sm-mt-6 ">
        <div className="h-[200px] w-[250px] border-2 border-[#cbb26a] max-sm:hidden rounded-[10px] pt-3 absolute left-[-100px]">
          <div className={`w-[92%] mx-auto ${styles.videoText}`}>
            <p>Hi, I’m Gustavo, founder at GRITO talent factory.....</p>
          </div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/A8AdS92qmhg"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style={{
              height: "140px",
              width: "100%",
              objectFit: "cover",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          ></iframe>
        </div>
        <Image src={heroImage} height={100} width={300} alt="heroImage" />
      </div>
    </section>
  );
};

export default HeroSection;
