import React from "react";
import NavBar from "/components/layout/navbar";
import Logo from '/assets/logo.png';
import Youtube from '/assets/youtube.png'
import Linkedin from '/assets/linkedin.png'
import Link from "next/link";
import Image from "next/image";
import Line from '/assets/line.png'


const page = () => {
  return <div>
    <footer className="p-6 bg-black text-white h-full dark:text-gray-100">
	<div className="container grid lg:grid-cols-6 mx-auto gap- sm:grid-cols-2 md:grid-cols-2">
		<div className="flex flex-col space-y-4">
    <Link href="./">
    <Image src={Logo} alt="Some text" className="lg:inline-flex items-center p-2 mr-4" />
              </Link>
      <div>
 
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
<p className="text-xs">Europe: +346 310 385 88</p>
<p className="text-xs">Email: gustavo@grito.africa</p>


 
   
</div>

</div>
		</div>
    <div className="flex space-y-4 ml-" > <Image src={Line} alt="Line" className="" /></div>
		<div className="flex flex-col space-y-4  ">
    <p className="text-[#CBB26A]  font-bold">OFFICE HOUR</p>
      <div className="mt-4">
    <p className="text-xs">9am - 4pm (Mon - Sat, WAT) </p>
 <button type="button"  className=" text-[#CBB26A] hover:text-white cursor-pointer rounded-full lg:p-1 w-36 md:p-1  border border-[#CBB26A] mt-14">Chat With Us</button>
</div>
		</div>
    <div className="flex flex-col"> <Image src={Line} alt="Line" className="" /></div>
		<div className="flex flex-col space-y-4">
		
    <div className="mt-4 pt-14">
    <p className="text-xs w-64 leading-7">At GRITO Talent Factory, our motto says,
‘Never Waste Talent’. We take African Tech
talents one step closer to their dream tech 
jobs with top European Companies.</p>

<div className="flex ml-32 mt-16 ">
  <Link href="https://youtube.com/@gritotalentagency">
    <Image src={Youtube} alt="Youtube icon" className=" items-center p-2 w-8 " />
              </Link>
              
              <Link href="https://linkedin.com/company/grito-talent-agency">
    <Image src={Linkedin} alt="Linkedin icon" className="items-center p-2 w-8 " />
              </Link></div>

    
        
        
 
    </div>
		</div>
		
	</div>
	<div className="flex items-center justify-center px-6 pt-12 text-sm">
		<span className="dark:text-gray-400 sm:text-xs">© ALL RIGHTS RESERVED 2023 | GRITO TALENT FACTORY.</span>
	</div>
</footer>
            
  </div>;
  
  
};

export default page;
