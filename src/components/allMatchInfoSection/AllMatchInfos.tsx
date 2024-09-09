"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Calendar from "./calendar/Calendar";
import MatchNavigation from "./matchNavigation/MatchNavigation";
import MatchLists from "./leagueMatchlist/MatchLists";
import InfoText from "./infoText/InfoText";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "react-query";
import { Skeleton } from "antd";
import { useSportIdHandler } from "../hooks/useSportIdHandler";
import useGMTOffset from "../hooks/useTimeZone";

const AllMatchInfos = () => {
  const [selectedMatchNav, setSelected] = useState("ALL");
  const defaultActiveIndex = 0;
  const [activeDateIndex, setActiveDateIndex] = useState(defaultActiveIndex);
  const { gmtOffset } = useGMTOffset();

  const sportIdCheck = useSportIdHandler();

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/events/list",
    params: {
      sport_id: sportIdCheck?.id,
      indent_days: activeDateIndex,
      locale: "en_INT",
      timezone: gmtOffset.replace("+", ""),
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["sportEvents", activeDateIndex, sportIdCheck?.id, gmtOffset],
    async () => {
      try {
        const response = await axios.request(options);

        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    },
    {
      enabled: !!gmtOffset,
    }
  );
  return (
    <section className={`${style.events}`}>
      <article className={`bg-white rounded-lg  p-3 w-full `}>
        <Calendar
          activeIndex={activeDateIndex}
          setActiveIndex={setActiveDateIndex}
        />
        <MatchNavigation
          selected={selectedMatchNav}
          setSelected={setSelected}
        />
        {isLoading ? (
          <div className="p-5 ">
            <Skeleton active />
          </div>
        ) : (
          <MatchLists selectedMatchNav={selectedMatchNav} data={data} />
        )}
      </article>
      <article className={`${style.ad} mt-4   w-full`}>
        <Image
          src="/images/home/baner(688).png"
          alt="ad"
          width={704}
          height={100}
          className="w-full"
        />
      </article>
      <article className="w-full mt-3 ">
        <InfoText />
      </article>
    </section>
  );
};

export default AllMatchInfos;
