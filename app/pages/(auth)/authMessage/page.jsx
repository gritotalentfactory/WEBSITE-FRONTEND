"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "@/asets/GritoLogo.svg";
const AuthMessage = () => {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row gap-5 px-6 max-sm:px-3">
      <div className="min-h-[300px] w-full md:w-[48%] bg-white flex items-center flex-col justify-center gap-3">
        <h1>Almost There</h1>
        <p>An email with your code has been sent to your email</p>
        <p>
          Already confirmed?{" "}
          <Link href="/pages/login" className="text-blue-400 underline px-1">
            click to login
          </Link>
          if not
          <Link
            href="/pages/verifyEmail"
            className="text-blue-400 underline px-1"
          >
            verify email
          </Link>
        </p>
        <Link href={""} className="text-center pt-12">
          Having Trouble?
        </Link>
      </div>
      <div className="hidden bg-black min-h-screen w-full md:w-[48%] border-4 md:flex items-center justify-center border-black">
        <Image src={Logo} height={350} width={350} alt="logo" />
      </div>
    </div>
  );
};

export default AuthMessage;
