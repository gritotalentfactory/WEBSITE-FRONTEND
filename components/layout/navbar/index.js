"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Logo from "/assets/logo.png";

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuToggle = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <div>
      <nav className="w-full bg-black fixed text-[#CBB26A] z-30">
        <div className="flex items-center justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <Link href="./">
            <Image
              src={Logo}
              alt="Some text"
              className="lg:inline-flex items-center p-2 mr-4"
            />
          </Link>
          <ul className="hidden md:flex items-center justify-between pt-4 md:pt-0">
            <li>
              <a
                className="md:p-4 py-3 px-0 block text-md hover:text-white"
                href="#hire-talent-section"
              >
                Hire Talent
              </a>
            </li>
            <li>
              <a
                className="md:p-4 py-3 px-0 block text-md hover:text-white"
                href="#academy"
              >
                GRITO Academy
              </a>
            </li>
            <li>
              <a
                className="md:p-4 py-3 px-0 block text-md hover:text-white"
                href="#contactFooter"
              >
                Contact Us
              </a>
            </li>
          </ul>
          <p
            className="text-[#C4AC66] text-[30px] block md:hidden cursor-pointer"
            onClick={menuToggle}
          >
            {openMenu ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </p>
        </div>
      </nav>
      {openMenu && (
        <ul
          className="flex flex-col gap-3 pl-4 bg-black text-white min-h-[70px]"
          style={{ paddingTop: "100px" }}
        >
          <li>
            <a
              className="md:p-4 py-3 px-0 block text-md hover:text-white"
              href="#hire-talent-section"
            >
              Hire Talent
            </a>
          </li>
          <li>
            <a
              className="md:p-4 py-3 px-0 block text-md hover:text-white"
              href="#academy"
            >
              GRITO Academy
            </a>
          </li>
          <li>
            <a
              className="md:p-4 py-3 px-0 block text-md hover:text-white"
              href="#contactFooter"
            >
              Contact Us
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
