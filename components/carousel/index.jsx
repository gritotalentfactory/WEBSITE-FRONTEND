"use client";
import React, { Children } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import ArrowLeft from "@/asets/arrowLeft.svg";
import ArrowRight from "@/asets/arrowRight.svg";
import styles from "./carousel.module.css";

const Carousel = ({ info, title, renderContent }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 600) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(1);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup the event listener on component unmount
    };
  }, []);
  const previousSlide = () => {
    setCurrentSlide((prev) => {
      if (prev === 0) {
        return info.length - itemsPerSlide;
      } else {
        return prev - itemsPerSlide;
      }
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev >= info.length - itemsPerSlide) {
        return 0;
      } else {
        return prev + itemsPerSlide;
      }
    });
  };

  return (
    <div>
      <div>
        <h1>{title}</h1>
        <div className={styles.caro}>
          <div className={styles.carousel}>
            {info
              .slice(currentSlide, currentSlide + itemsPerSlide)
              .map((item) => (
                <div key={item.id} className={styles.carouselItem}>
                  {renderContent(item)}
                </div>
              ))}
          </div>
          <div className={styles.tesBtn}>
            <Image
              src={ArrowLeft}
              alt=""
              height={60}
              width={60}
              onClick={previousSlide}
            />

            <Image
              src={ArrowRight}
              height={60}
              width={60}
              onClick={nextSlide}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
