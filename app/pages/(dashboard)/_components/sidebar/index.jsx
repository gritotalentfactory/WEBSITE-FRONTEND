"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./side.module.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomeOutlined } from "@ant-design/icons";
import { useLogout } from "@/services/auth/authApi";
import { IoSettingsOutline } from "react-icons/io5";
const SideBar = () => {
  const navList = [
    {
      name: "Requested Talent",
      icon: <HomeOutlined />,
      link: "/pages/dashboard",
    },
    {
      name: "Available Talent",
      icon: <HomeOutlined />,
      link: "/pages/availableTalent",
    },
  ];
  const [activeIdx, setActiveIdx] = useState(-1);
  const router = useRouter();
  const useLogoutMutation = useLogout();
  const handleMenuItemClick = (idx) => {
    setActiveIdx(idx);
  };
  const onhandleClick = async () => {
    Cookies.remove("tokeny");
    try {
      const response = await useLogoutMutation.mutateAsync();
      if (response) {
        setTimeout(() => {
          toast.success("Logout successful");
          router.push("/pages/login");
          console.log("Removing token cookie...");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      setTimeout(() => {
        toast.error(errorMessage);
      }, 2000);
    }
  };
  return (
    <div className="min-h-screen bg-gradientPrimary text-white border-2 border-black w-[17%]  ">
      <ToastContainer />
      <ul className={styles.item}>
        {navList.map((menu, idx) => (
          <div
            key={menu.href}
            onClick={() => handleMenuItemClick(idx)}
            className={`cursor-pointer ${
              idx === activeIdx ? "text-[#cbb26a]" : ""
            }`}
          >
            <div className="flex gap-4 items-center">
              <p className="text-white ">{menu.icon}</p>
              <Link href={menu.link}>
                <li className="text-white">{menu.name}</li>
              </Link>
            </div>
          </div>
        ))}
        <li onClick={onhandleClick} className="cursor-pointer">
          <IoSettingsOutline />
          <a className="active:text-[#cbb26a]">Log Out</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
