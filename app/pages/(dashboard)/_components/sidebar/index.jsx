import React from "react";
import styles from "./side.module.css";
import { HomeOutlined } from "@ant-design/icons";
import { MdPersonAddAlt } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
const SideBar = () => {
  return (
    <div className="min-h-screen bg-gradientPrimary text-white border-2 border-black w-[17%]  ">
      <ul className={styles.item}>
        <li>
          <HomeOutlined />
          <a href="">Admin</a>
        </li>
        <li>
          <MdPersonAddAlt />
          <a href="">Merchant</a>
        </li>
        <li>
          <BsPeople />
          <a href="">SuperMerchants</a>
        </li>
        <li>
          <CgProfile />
          <a href="">Profile</a>
        </li>{" "}
        <li>
          <IoSettingsOutline />
          <a href="">Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
