import Image from "next/image";
import React from "react";
import Logo from "@/asets/GritoLogo.svg";
import Button from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="flex justify-between px-11 h-[50px]">
      <Image src={Logo} height={140} width={140} alt="logo" />
      <div className="flex gap-4">
        <Button
          size="sm"
          variant="outline"
          loadingText="loading"
          text={"Login"}
          disabled={false}
          fullWidth={false}
          loading={false}
        />
        <Button
          size="sm"
          variant="outline"
          loadingText="loading"
          text={"Sign Up"}
          disabled={false}
          fullWidth={false}
          loading={false}
        />
      </div>
    </div>
  );
};

export default Navbar;
