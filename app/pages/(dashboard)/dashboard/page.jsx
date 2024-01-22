"use client";
import Cookies from "js-cookie";
import React from "react";
import Marquee from "react-fast-marquee";
import { getCurrentDate } from "@/utils/dateFormat";
import Card from "@/components/card";

const page = () => {
  const userData = JSON.parse(Cookies.get("userData"));
  const time = getCurrentDate();
  return (
    <div>
      <h1>{`Hello ${userData.name}`}</h1>

      <Marquee speed={60}>
        <p>
          {userData.name} {time}
        </p>
      </Marquee>

      <div className="flex justify-between">
        <Card Text={"Total Talent"} Number={"20"} />
        <Card Text={"Deleted Talent"} Number={"20"} />
        <Card Text={"Active Talent"} Number={"20"} />
        <Card Text={"Inactive Talent"} Number={"20"} />
      </div>
    </div>
  );
};

export default page;
