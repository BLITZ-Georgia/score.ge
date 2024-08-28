"use client";
import React from "react";
import style from "./style.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { checkPage } from "@/components/helper/checkMainPage";
import { GrAnalytics } from "react-icons/gr";

const Predictions = ({ data }: { data?: any }) => {
  const path = usePathname();

  const isMainPage = checkPage(path);

  // console.log(data);

  const arr = [1, 2, 3];
  return (
    <section
      className={`${style.prediction}  w-full    ${
        isMainPage ? style.activePrediction : "mobileNone"
      }`}
    >
      <article className={`${style.predictionItem} bg-white w-full  mb-4`}>
        <div className="mb-5 flex gap-x-1 items-center p-4 pb-0 mobileNone">
          <GrAnalytics
            style={{
              color: "var(--black-color)",
              fontSize: "17px",
              objectFit: "contain",
            }}
          />
          <h3 className=" text-base  font-semibold">
            SPORT <span className="font-bold">PREDICTION</span>
          </h3>
        </div>
        <div className={`p-4 ${style.predictionList}`}>
          {arr.map((el, id) => (
            <div className="mb-3 " key={id}>
              <Image
                src="/images/prediction.jfif"
                alt="prediction"
                width={220}
                height={200}
              />
            </div>
          ))}
        </div>

        <div className={`${style.seeAlLink} mobileNone`}>
          <Link href="#">See All </Link>
        </div>
      </article>
      <article className={style.adImgSection}>
        <Image
          src="/images/ad/sideAd.png"
          width={272}
          height={100}
          alt="ad"
          className="mobileNone"
        />
        <Image
          src="/images/ad/sideAd2.png"
          width={400}
          height={100}
          alt="ad"
          className="w-full desktopNo h-full"
        />
      </article>
    </section>
  );
};

export default Predictions;
