"use client";
import Link from "next/link";
import React from "react";

const AuthMessage = () => {
  return (
    <div className="w-screen h-screen bg-blue-400 flex items-center justify-center">
      <div className="h-[300px] w-[400px] bg-white flex items-center flex-col justify-center gap-3">
        <h1>Almost there</h1>
        <p>An email wit your code has been sent to your email</p>
        <p>
          Already confirmed?{" "}
          <Link href="/pages/login" className="text-blue-400 underline">
            click to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthMessage;
