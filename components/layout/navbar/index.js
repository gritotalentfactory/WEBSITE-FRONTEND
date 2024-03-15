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
            <Link href="#hire-talent-section">Hire Talent</Link>

            <li>
              <Link className="md:p-4 py-3 px-0 block text-md" href="#academy">
                GRITO Academy
              </Link>
            </li>
            <li>
              <Link
                className="md:p-4 py-3 px-0 block text-md"
                href="#contactFooter"
              >
                Contact Us
              </Link>
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
          className="md:hidden flex flex-col gap-3 pl-4 fixed z-30 bg-black  min-h-[70px] w-full top-[60px]"
          style={{ paddingTop: "100px" }}
        >
          <Link href="#hire-talent-section">Hire Talent</Link>
          <li>
            <Link className="md:p-4 py-3 px-0 block text-md" href="#academy">
              GRITO Academy
            </Link>
          </li>
          <li>
            <Link
              className="md:p-4 py-3 px-0 block text-md"
              href="#contactFooter"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
