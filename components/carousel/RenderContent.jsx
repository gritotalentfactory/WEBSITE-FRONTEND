import React from "react";
import styles from "./carousel.module.css";
import Link from "next/link";
import Image from "next/image";
import flag from "@/asets/kenya.png";
import person from "@/asets/profile.png";

const RenderContent = ({ item }) => {
  return (
    <section classNam={styles.carouselContainer}>
      <main
        className={`flex flex-col md:flex-row gap-5 ${styles.mainContainer}`}
      >
        <div>
          <div className="flex  pt-4 gap-10 items-center">
            <label htmlFor="">Name:</label>
            <p>{item?.user?.name}</p>
          </div>
          {item?.user?.country ? (
            <div className="flex pt-4 gap-10 items-center">
              <label htmlFor="">Country:</label>
              <p>{item?.user?.country}</p>
            </div>
          ) : (
            ""
          )}
          <div className="flex pt-4 gap-10 items-center">
            <label htmlFor="">Skill Set</label>
            <p>{item?.skill_set}</p>
            {/* {item?.skill_set ? (
              <p>{item?.skill_set}</p>
            ) : (
              <p>Dancing, singing</p>
            )} */}
          </div>
          <div className="flex pt-4 gap-10 items-center">
            <label htmlFor="">Level: </label>
            <p>{item?.skill_level}</p>
          </div>
          <div className="flex pt-4 gap-10 items-center">
            <label htmlFor="">Gender:</label>
            <p>{item?.user?.gender}</p>
          </div>
          <div className="flex py-4 gap-10 items-center">
            <label htmlFor=""> Portfolio</label>
            <Link href="mailto:support@grito.africa">
              To onboard Talent, send email to: support@grito.africa
            </Link>
          </div>
        </div>
        <div>
          {item?.user?.image_url ? (
            <Image
              src={item?.user?.image_url}
              height={200}
              width={200}
              alt="profile"
              className={styles.CarouselImage}
              style={{ objectFit: "cover", height: "250px" }}
            />
          ) : (
            <Image src={person} alt="" height={200} width={200} />
          )}
          <h4 className="text-[#CBB26A] flex justify-end max-sm:justify-center">
            {item?.user?.name}
          </h4>
        </div>
      </main>
    </section>
  );
};

export default RenderContent;
