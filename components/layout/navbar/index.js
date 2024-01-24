import React from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Logo from "/assets/logo.png";

const NavBar = () => {
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
            <Link href="/pages/signUp">Sign Up</Link>

            <li>
              <a
                className="md:p-4 py-3 px-0 block text-md hover:text-white"
                href="#"
              >
                GRITO Academy
              </a>
            </li>
            <li>
              <a
                className="md:p-4 py-3 px-0 block text-md hover:text-white"
                href="#"
              >
                Contact Us
              </a>
            </li>
          </ul>
          <GiHamburgerMenu className="text-white text-[30px] block md:hidden" />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
