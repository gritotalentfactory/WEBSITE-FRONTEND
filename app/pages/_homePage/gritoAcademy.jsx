import React from "react";
import Image from "next/image";
import Menu from "@/asets/menu.svg";
import styles from "./home.module.css";

const GritoAcademy = React.forwardRef((props, ref) => {
  return (
    <div className={styles.academyContainer} ref={ref}>
      <div className="w-[80%] mx-auto">
        <h1 className="text-[#CBB26A] text-center pt-7">
          WHY YOU SHOULD ENROLL AT GRITO ACADEMY?
        </h1>
        <div
          className={`flex max-sm:flex-col justify-between flex-wrap ${styles.academyWrapper}`}
        >
          <div className="flex gap-4 items-center pt-12">
            <Image src={Menu} height={40} width={40} alt="" />
            <p>
              Learn in milestones at your own pace and build your first software
              product within 60days with Your Expert Tech Guide.
            </p>
          </div>{" "}
          <div className="flex gap-4 pt-12">
            <Image src={Menu} height={40} width={40} alt="" />
            <p>
              Learn in milestones at your own pace and build your first software
              product within 60days with Your Expert Tech Guide.
            </p>
          </div>{" "}
          <div className="flex gap-4 pt-12">
            <Image src={Menu} height={40} width={40} alt="" />
            <p>
              Learn in milestones at your own pace and build your first software
              product within 60days with Your Expert Tech Guide.
            </p>
          </div>{" "}
          <div className="flex gap-4 pt-12">
            <Image src={Menu} height={40} width={40} alt="" />
            <p>
              Learn in milestones at your own pace and build your first software
              product within 60days with Your Expert Tech Guide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

// Add display name to the component
GritoAcademy.displayName = 'GritoAcademy';

export default GritoAcademy;
