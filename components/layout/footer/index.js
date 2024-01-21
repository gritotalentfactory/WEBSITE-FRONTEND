import React from 'react';
import Logo from '/assets/logo.png';
const Footer = () => {
  return (
    <div>
            <footer className=" px-8 divide-y bg-black  max-h-128 text-white dark:text-gray-100">
	<div className="container flex flex-col p-10  mx-auto space-y-8 lg:flex-row lg:space-y-0">

  <div className="mb-6 md:mb-0 p-6 max-w-1/3">
  <Link href="./">
    <Image src={Logo} alt="Some text" className="lg:inline-flex items-center p-2 mr-4" />
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
<p className="text-xs">Europe: +346 310 385 88</p>
<p className="text-xs">Email: gustavo@grito.africa</p>
</div>
        </div>
        <div class=" left-1/2 ml-6 w-0.5 h-70  bg-white"></div>
      <div className="p-6 ">
       <h3 className="text-[#CBB26A] p-6 text-bold">OFFICE HOUR</h3>
              <div className="mt-4">
    <p className="text-xs">9am - 4pm (Mon - Sat, WAT) </p>
 <button type="button"  className="text-[#CBB26A] hover:text-white cursor-pointer rounded-full px-8 py-2 border border-[#CBB26A] mt-14">Chat With Us</button>
</div>
   
 
    </div>
    <div class=" left-1/2 ml-6 w-0.5 h-70 bg-white"></div>
    <div className="p-6">
      
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
    <div className="absolute pt-80  pl-44"><p className=" text-sm text-center mt-8 mb-10 ">© ALL RIGHTS RESERVED 2023 | GRITO TALENT FACTORY.</p></div>
    </div>
   
   

		

    </footer>
    </div>
  )
}

export default Footer