import React from "react";
import SignUp from "./pages/(auth)/signUp/page";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "./pages/_homePage/heroSection";
import CarouselSection from "./pages/_homePage/carouselSection";

const page = () => {
  return (
    <div className="min-h-[1800px] bg-gradientPrimary pt-14 px-4">
      <HeroSection />
      <CarouselSection />
    </div>
    // <div>
    //   <SignUp />
    // </div>
  );
};

export default page;
