"use client";
import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import { Skeleton } from "antd";
import { getDatesItem, getAgeAndFormattedDate } from "@/utils/getDate";
import { notFound } from "next/navigation";

const PlayerInfo = () => {
  const searchParams = useSearchParams();
  const playerId = searchParams.get("playerId");

  const sportId = searchParams.get("sportId");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/players/data",
    params: {
      player_id: playerId,
      sport_id: sportId,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching, error } = useQuery(
    ["playerInfo", playerId, sportId],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching result events", error);
        throw new Error("Error fetching player info");
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton active />
      </div>
    );
  }

  if (error) {
    return notFound();
  }

  const age = getAgeAndFormattedDate(data?.DATA.BIRTHDAY_TIME);
  const { formatted } = getDatesItem(data?.DATA.PCE);

  return (
    <section
      className={`${style.playerInfo}  w-full px-3 flex justify-between items-center`}
    >
      <div className={`flex gap-x-4 ${style.playerTitles}`}>
        <div className={style.img}>
          <Image
            src={
              data?.DATA.IMAGE_PATH
                ? data?.DATA.IMAGE_PATH
                : "/images/default/person.gif"
            }
            alt="player"
            width={72}
            height={72}
          />
        </div>
        <div className={`${style.info}`}>
          <h3 className="mb-1">{data?.DATA.NAME}</h3>
          <div>
            <p>
              {data?.DATA.TYPE_NAME}:<span>({data?.DATA.TEAM_NAME})</span>
            </p>
            <p>
              Age:<span>{age}</span>
            </p>
            <p>
              Market value:<span>{data?.DATA.PMV}</span>
            </p>
            <p>
              Contract expires:<span>{data?.DATA.PCE ? formatted : ""}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={`${style.img}`}>
        <Image src={data?.DATA.TEAM_IMAGE} alt="team" width={72} height={72} />
      </div>
    </section>
  );
};

export default PlayerInfo;
