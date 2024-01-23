import React from "react";
import SignUp from "./pages/(auth)/signUp/page";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "./pages/_homePage/heroSection";
import CarouselSection from "./pages/_homePage/carouselSection";
import GritoAcademy from "./pages/_homePage/gritoAcademy";

const page = () => {
  return (
    <div
      className="min-h-[1000px] bg-gradientPrimary pt-14"
      style={{ paddingTop: "120px" }}
    >
      <HeroSection />
      <CarouselSection />
      <GritoAcademy />
    </div>
    // <div>
    //   <SignUp />
    // </div>
  );
};

export default page;
