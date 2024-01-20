import React from "react";
import styles from "./home.module.css";
import Button from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row gap-3">
      <div className={`w-[100%] md:w-[42%] ${styles.heroText}`}>
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
      <div className="w-[100%] md:w-[42%]"></div>
    </section>
  );
};

export default HeroSection;
