"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import style from "./style.module.css";

const Advertisement: React.FC = () => {
  const pathName = usePathname();
  const matchRouteHandler = pathName.includes("match");

  return (
    <section
      className={`${
        matchRouteHandler ? "matchContainer" : ""
      } flex justify-center items-center my-4 ${style.ad}`}
    >
      <Image
        src="/images/adversitment.jpg"
        alt="AD"
        width={1160}
        height={100}
        className="max-w-full mobileNone"
      />
      <div className={` ${style.mobileAd} desktopNo`}>
        <Image
          src="/images/ad/mainMobileAd.png"
          alt="AD"
          width={965}
          height={800}
          className="max-w-full "
        />
      </div>
    </section>
  );
};

export default Advertisement;
