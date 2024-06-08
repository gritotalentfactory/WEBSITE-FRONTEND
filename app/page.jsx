"use client";
import React, { useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "./pages/_homePage/heroSection";
import CarouselSection from "./pages/_homePage/carouselSection";
import GritoAcademy from "./pages/_homePage/gritoAcademy";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const Page = () => {
  const sectionRef = useRef(null);
  const scrollToSection = () => {
    if (sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <NavBar />
      <div
        className="min-h-[1000px] bg-gradientPrimary pt-14"
        style={{ paddingTop: "120px" }}
      >
        <HeroSection scrollToSection={scrollToSection} />
        <CarouselSection />
        <GritoAcademy ref={sectionRef} />
      </div>
      <Footer />
    </>
  );
};

export default Page;
