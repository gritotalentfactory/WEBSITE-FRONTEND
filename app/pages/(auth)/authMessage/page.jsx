"use client";
import Link from "next/link";
import React from "react";

const AuthMessage = () => {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      <div className="min-h-[300px] w-full md:w-[48%] bg-white flex items-center flex-col justify-center gap-3 border-4">
        <h1>Almost there</h1>
        <p>An email wit your code has been sent to your email</p>
        <p>
          Already confirmed?{" "}
          <Link href="/pages/verifyEmail" className="text-blue-400 underline">
            click to login
          </Link>
        </p>
      </div>
      <div className="bg-black min-h-screen w-full md:w-[48%] border-4 border-black"></div>
    </div>
  );
};

export default AuthMessage;
