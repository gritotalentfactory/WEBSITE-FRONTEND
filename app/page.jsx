import React from "react";
import SignUp from "./pages/(auth)/signUp/page";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "./pages/_homePage/heroSection";
import CarouselSection from "./pages/_homePage/carouselSection";
import GritoAcademy from "./pages/_homePage/gritoAcademy";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const page = () => {
  return (
    <>
      <NavBar />
      <div
        className="min-h-[1000px] bg-gradientPrimary pt-14"
        style={{ paddingTop: "120px" }}
      >
        <HeroSection />
        <CarouselSection />
        <GritoAcademy />
      </div>
      <Footer />
    </>
  );
};

export default page;
