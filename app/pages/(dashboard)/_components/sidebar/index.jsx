"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./side.module.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomeOutlined } from "@ant-design/icons";
import { IoSettingsOutline } from "react-icons/io5";

const SideBar = () => {
  const navList = [
    {
      name: "Available Talent",
      icon: <HomeOutlined />,
      link: "/pages/dashboard",
    },
    {
      name: "Requested Talent",
      icon: <HomeOutlined />,
      link: "/pages/requestedTalent",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(-1);
  const router = useRouter();

  const handleMenuItemClick = (idx) => {
    setActiveIdx(idx);
  };

  const onhandleClick = async () => {
    Cookies.remove("adminData");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/logout`, {
        method: "POST",
        credentials: "include", // Important to include cookies
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      const result = await response.json();
      setTimeout(() => {
        toast.success("Logout successful");
        router.push("/pages/login");
        console.log("Removing token cookie...");
      }, 2000);
    } catch (error) {
      console.error("Error during logout:", error);
      const errorMessage = error?.message || "An error occurred";
      setTimeout(() => {
        toast.error(errorMessage);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradientPrimary text-white border-2 border-black w-[17%]">
      <ToastContainer />
      <ul className={styles.item}>
        {navList.map((menu, idx) => (
          <div
            key={menu.link}
            onClick={() => handleMenuItemClick(idx)}
            className={`cursor-pointer ${
              idx === activeIdx ? "text-[#cbb26a]" : ""
            }`}
          >
            <div className="flex gap-4 items-center">
              <p className="text-white">{menu.icon}</p>
              <Link href={menu.link}>
                <li className="text-white">{menu.name}</li>
              </Link>
            </div>
          </div>
        ))}
        <li onClick={onhandleClick} className="cursor-pointer flex gap-4 items-center">
          <IoSettingsOutline />
          <a className="active:text-[#cbb26a]">Log Out</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
