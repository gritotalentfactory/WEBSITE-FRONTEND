import React from "react";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/asets/menu.svg";
import styles from "./home.module.css";
import Button from "@/components/ui/button";

const GritoAcademy = React.forwardRef((props, ref) => {
  return (
    <div className={styles.academyContainer} ref={ref} id="academy">
      <div className="w-[82%] mx-auto">
        <h1 className="text-[#CBB26A] text-center pt-7">
          WHY YOU SHOULD ENROLL AT GRITO ACADEMY?
        </h1>
        <div
          className={`flex max-sm:flex-col items-center flex-wrap ${styles.academyWrapper}`}
        >
          <div className="flex gap-4 items-center pt-12">
            <Image src={Menu} height={40} width={40} alt="" />
            <p>
              Learn in milestones at your own pace and build your first software
              product within 60days with Your Expert Tech Guide.
            </p>
          </div>{" "}
          <div className="flex gap-4 pt-12 items-center">
            <Image src={Menu} height={40} width={40} alt="" />
            <p>Learn HTML, CSS and Javascript in your African local dialect.</p>
          </div>{" "}
          <div className="flex gap-4 pt-12 items-center">
            <Image src={Menu} height={40} width={40} alt="" />
            <p>
              Enroll at GRITO Academy on our flexible payment plans and win
              bonuses on referrals
            </p>
          </div>{" "}
          <div className="flex gap-4 pt-12 items-center">
            <Image src={Menu} height={40} width={40} alt="" />
            <p>
              Join our Virtual Internship Program (VIP) to prepare for your
              dream tech job.
            </p>
          </div>
        </div>
        <div className="pt-7 mx-auto text-center">
          <Link
            href="https://wa.me/message/TNLOASZ7HVDVP1"
            className="hover:text-[#CBB26A] text-white cursor-pointer mt-5 rounded-full px-10 py-5  border border-[#CBB26A] "
          >
            Click to get started
          </Link>
        </div>
      </div>
    </div>
  );
});
GritoAcademy.displayName = "GritoAcademy";
export default GritoAcademy;
