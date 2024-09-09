"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { checkPage } from "@/components/helper/checkMainPage";
import { GrAnalytics } from "react-icons/gr";
import { getPrediction } from "@/utils/getPredictions";
import { Skeleton } from "antd";

const Predictions = () => {
  const path = usePathname();
  const [parsedData, setParsedData] = useState<[]>([]);
  const isMainPage = checkPage(path);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPredictionData = async () => {
      const res = await getPrediction();
      setParsedData(res.props.rssData.rss.channel.item);
      setIsLoading(false);
    };

    fetchPredictionData();
  }, []);

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
          {isLoading && (
            <div className="p-5 ">
              <Skeleton active />
            </div>
          )}
          {parsedData &&
            parsedData
              ?.filter((item: any) => item.category.includes("მიმდინარე"))
              .map((prediction: any, id: number) => {
                const predictionLinkUrl = prediction?.link;
                const img = prediction?.description.match(
                  /https?:\/\/[^"]+\.(jpg|jpeg|png|gif)/i
                );
                const title = prediction?.title;

                return (
                  <Link
                    href={predictionLinkUrl}
                    className="mb-3 block"
                    title={title}
                    key={id}
                  >
                    <Image
                      src={img !== null ? img[0] : "/images/prediction.jfif"}
                      alt="prediction"
                      width={220}
                      height={200}
                    />
                  </Link>
                );
              })}
        </div>

        <div className={`${style.seeAlLink} mobileNone`}>
          <Link href="https://predictions.score.ge/" target="_blank">
            See All{" "}
          </Link>
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
