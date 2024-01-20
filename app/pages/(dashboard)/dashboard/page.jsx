"use client";
import Cookies from "js-cookie";
import React from "react";

const page = () => {
  const userData = JSON.parse(Cookies.get("userData"));
  return <div>{`Hello ${userData.name}`} </div>;
};

export default page;
