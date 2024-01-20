import React from "react";
import SignUp from "./pages/(auth)/signUp/page";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "./pages/_homePage/heroSection";

const page = () => {
  return (
    <div className="min-h-[600px] bg-gradientPrimary pt-14 px-4">
      <HeroSection />
    </div>
  );
};

export default page;
