import Image from "next/image";
import React from "react";
import Logo from "@/asets/GritoLogo.svg";
import Button from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className=" px-11 h-[70px]">
      <Image src={Logo} height={70} width={70} alt="logo" />
    </div>
  );
};

export default Navbar;
