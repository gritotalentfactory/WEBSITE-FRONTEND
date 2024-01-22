import React from 'react'
import Logo from '/assets/logo.png';
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <div>
            <nav className="w-full bg-black fixed text-[#CBB26A]">
    <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
    <Link href="./">
    <Image src={Logo} alt="Some text" className="lg:inline-flex items-center p-2 mr-4" />
              </Link>
              <ul className="md:flex items-center justify-between pt-4 md:pt-0">
                <li><a className="md:p-4 py-3 px-0 block text-md hover:text-white" href="#">Hire Talents</a></li>
                <li><a className="md:p-4 py-3 px-0 block text-md hover:text-white" href="#">GRITO Academy</a></li>
                <li><a className="md:p-4 py-3 px-0 block text-md hover:text-white" href="#">Contact Us</a></li>
               
            </ul>
              
           
              </div>
          
              </nav>  
    </div>
  )
}

export default NavBar;