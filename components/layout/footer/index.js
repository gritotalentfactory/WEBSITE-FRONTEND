import React from "react";
import NavBar from "/components/layout/navbar";
import Logo from "/assets/logo.png";
import Youtube from "/assets/youtube.png";
import Linkedin from "/assets/linkedin.png";
import Link from "next/link";
import Image from "next/image";
import Line from "/assets/Line.svg";
const Footer = () => {
  return (
    <div id="contactFooter">
      <footer className="px-4 py-8 bg-black w-full text-white max-sm:text-center">
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
              <p className="text-xs">International: +12248080804</p>
              <p className="text-xs">Email: gustavo@grito.africa</p>
            </div>
          </div>
          <span className=" max:sm-hidden">
            {" "}
            <Image
              src={Line}
              height={20}
              width={2}
              alt="Line"
              className="max-sm:hidden h-[350px] "
            />
          </span>
          <div className="  ">
            <h3 className="text-[#CBB26A] p-6 text-bold ">OFFICE HOUR</h3>
            <div className="mt-4 ">
              <p className="text-xs pb-10">9am - 4pm (Mon - Sat, WAT) </p>
              <Link
                href="https://wa.me/message/TNLOASZ7HVDVP1"
                className="text-[#CBB26A] hover:text-white cursor-pointer rounded-full px-10 py-5  border border-[#CBB26A] "
              >
                Chat With Us
              </Link>
            </div>
          </div>
          <span className="max:sm-hidden">
            {" "}
            <Image
              src={Line}
              height={0}
              width={2}
              alt="Line"
              className=" max-sm:hidden h-[350px]  "
            />
          </span>

          <div className=" ">
            <div className="mt-4 pt-14">
              <p className="text-xs w-60 pr-8 leading-7 max-sm:text-center max-sm:w-full">
                At GRITO Talent Agency, our motto says, ‘Never Waste Talent’. We
                take Professional African Tech talents one step closer to their
                dream tech jobs with top International Companies.
              </p>

              <div className="flex items-center ml-32 mt-16 ">
                <Link href="https://youtube.com/@gritotalentagency">
                  <Image
                    src={Youtube}
                    height={0}
                    width={30}
                    alt="Youtube icon"
                    className=" items-center p-2 w-8 "
                  />
                </Link>

                <Link href="https://linkedin.com/company/grito-talent-agency">
                  <Image
                    src={Linkedin}
                    alt="Linkedin icon"
                    height={30}
                    width={30}
                    className="items-center p-2 w-8  "
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
