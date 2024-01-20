import React from "react";
import Image from "next/image";
import styles from "./home.module.css";
import Button from "@/components/ui/button";
import heroImage from "@/asets/heroImage.png";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between">
      <div className={`w-[100%] md:w-[42%] pt-11 ${styles.heroText}`}>
        <h2>
          Hire <span>African</span> Tech Talents!
        </h2>
        <div>
          <p p className={styles.textOne}>
            Vetted Quality and Affordable Rates
          </p>{" "}
          <p className={styles.textTwo}>Flexible Timezones</p>
          <p className={styles.textThree}>Negotiable Work Plan</p>
        </div>
        <div className="flex gap-3 pt-6">
          <Button
            size="md"
            variant="primary"
            text={"Play Video"}
            disabled={false}
            fullWidth={false}
          />
          <Button
            size="md"
            variant="outline"
            text={"Scroll"}
            disabled={false}
            fullWidth={false}
          />
        </div>
      </div>

      <div className="w-[100%] md:w-[42%] relative ">
        <div className="h-[200px] w-[250px] border-2 border-[#cbb26a] absolute left-[-100px]">
          <div className={`w-[92%] mx-auto ${styles.videoText}`}>
            <p>Hi, I’m Gustavo, founder at GRITO talent factory.....</p>
          </div>
        </div>
        <Image src={heroImage} height={100} width={350} alt="heroImage" />
      </div>
    </section>
  );
};

export default HeroSection;
