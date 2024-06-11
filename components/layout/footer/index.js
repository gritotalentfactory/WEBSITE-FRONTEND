import React from "react";
import NavBar from "/components/layout/navbar";
import Logo from "/assets/logo.png";
import Youtube from "/assets/youtube.png";
import Linkedin from "/assets/linkedin.png";
import Link from "next/link";
import Image from "next/image";
import Line from "/assets/line.png";
const Footer = () => {
  return (
    <div>
      <footer className="px-4 py-8 bg-black w-full text-white max-sm:text-center" id="contactFooter">
        <div className="container lg:flex sm:block md:flex  justify-between mx-auto gap-x-3 gap-y-5 ">
          <div className=" ">
            <Link href="./">
              <Image
                src={Logo}
                alt="Some text"
                className="lg:inline-flex items-center p-2 mr-4"
              />
            </Link>
            <div className="mt-4">
              <p className="text-xs">Carrer Sicilia 190 1ero 2°, </p>
              <p className="text-xs">08013, Ciudad de Barcelona,</p>
              <p className="text-xs">Espana.</p>
            </div>
            <div className="mt-4">
              <p className="text-xs"> Africa: +234 802 919 7097</p>
              <p className="text-xs">Email: emeka@grito.africa</p>
            </div>
            <div className="mt-4">
              <p className="text-xs">USA (whatsapp): +346 310 385 88</p>
              <p className="text-xs">Europe (call): +5492645069142</p>
              <p className="text-xs">Email: gustavo@grito.africa</p>
            </div>
          </div>
          <span className=" max:sm-hidden">
            {" "}
            <Image src={Line} alt="Line" className="max-sm:hidden " />
          </span>
          <div className="  ">
            <h3 className="text-[#CBB26A] p-6 text-bold ">OFFICE HOUR</h3>
            <div className="mt-4 ">
              <p className="text-xs mb-14">9am - 4pm (Mon - Sat, WAT) </p>
              <a class="text-[#CBB26A] hover:text-white cursor-pointer rounded-full px-10 py-5  border border-[#CBB26A] " href="https://wa.me/message/TNLOASZ7HVDVP1">Chat With Us</a>
            </div>
          </div>
          <span className="max:sm-hidden">
            {" "}
            <Image src={Line} alt="Line" className=" max-sm:hidden  " />
          </span>

          <div className=" ">
            <div className="mt-4 pt-14">
              <p className="text-xs w-60 pr-8 leading-7 max-sm:text-center max-sm:w-full">
                At GRITO Talent Agency, our motto says: ‘Never Waste Talent’, 
                because we bring International Tech Jobs closer to the 
                Top 1% African Tech Talents.
              </p>

              <div className="flex ml-32 mt-16 ">
                <Link href="https://youtube.com/@gritotalentagency">
                  <Image
                    src={Youtube}
                    alt="Youtube icon"
                    className=" items-center p-2 w-20 "
                  />
                </Link>

                <Link href="https://linkedin.com/company/grito-talent-agency">
                  <Image
                    src={Linkedin}
                    alt="Linkedin icon"
                    className="items-center p-2 w-20 "
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-6 pt-12 text-sm">
          <span className="text-white">
            © ALL RIGHTS RESERVED 2024 | GRITO TALENT AGENCY.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
