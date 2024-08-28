"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { Skeleton, Tooltip } from "antd";
import Image from "next/image";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import { IoFootballOutline } from "react-icons/io5";
import { TbPlayFootball } from "react-icons/tb";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import LastEventStatistic from "./lastEventsStatistic/LastEventStatistic";
import { HiOutlineClock } from "react-icons/hi";

const LastPlayerEvents = () => {
  const searchParams = useSearchParams();
  const playerId = searchParams.get("playerId");
  const sportId = searchParams.get("sportId");
  const sportIdCheck = useSportIdHandler();
  const [showMorematches, setShowMoreMatches] = useState(10);

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/players/last-events",
    params: {
      sport_id: sportId,
      locale: "en_INT",
      player_id: playerId,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["lastPlayerEvents", playerId, sportId],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching result events", error);
        throw new Error("Error fetching result events");
      }
    },
    { refetchOnWindowFocus: false }
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      <section className="bg-white rounded-lg p-4  mb-3 mobilePadding8">
        <h4 className={style.matchesTitle}>Last Matches</h4>
        <div className={`${style.title}`}>
          <div></div>
          <div></div>
          <div className={style.titlesMenu}>
            <Tooltip title="Minutes Played">
              <p>
                <HiOutlineClock />
              </p>
            </Tooltip>
            <Tooltip title="Goals">
              <p>
                <IoFootballOutline />
              </p>
            </Tooltip>
            <Tooltip title="Assist">
              <p>
                <TbPlayFootball />
              </p>
            </Tooltip>

            <div className={`${style.card} ${style.cardYellow}`}></div>

            <div className={`${style.card} ${style.cardRed}`}></div>
          </div>
        </div>

        {data?.DATA.slice(0, showMorematches).map((event: any) => {
          const timeStamp = event.START_TIME * 1000;
          const date = new Date(timeStamp);

          const formattedDate = date.toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          });

          return (
            <article
              className={`flex ${style.matchContainer} p-2`}
              key={event.EVENT_ID}
            >
              <Link
                href={`${sportIdCheck?.alt}/match/event?id=${event.EVENT_ID}`}
                target="_blank"
                className="w-full"
              >
                <section className={` items-center ${style.match}`}>
                  <article
                    className={`flex   items-center ${style.matchInfoTitle} `}
                  >
                    <div className={`mr-7 ${style.dateTitle}`}>
                      <h4>{formattedDate}</h4>
                    </div>

                    <div className={`flex  flex-col ${style.matchesItems}`}>
                      <div className="flex  flex-row mb-1">
                        <p className="mr-2">
                          <Image
                            src={
                              event.HOME_IMAGE_ID
                                ? event.HOME_IMAGE_ID
                                : "/images/default/club.gif"
                            }
                            alt="club"
                            width={16}
                            height={16}
                            priority
                          />
                        </p>
                        <p className={``}>{event.HOME_NAME}</p>
                      </div>

                      <div className="flex  flex-row mb-1">
                        <p className="mr-2">
                          <Image
                            src={
                              event.AWAY_IMAGE_ID
                                ? event.AWAY_IMAGE_ID
                                : "/images/default/club.gif"
                            }
                            alt="club"
                            width={16}
                            height={16}
                            priority
                          />
                        </p>
                        <p className={``}>{event.AWAY_NAME}</p>
                      </div>
                    </div>
                  </article>
                  <div className={`flex  flex-col ${style.scoreInfo}`}>
                    <p className="text-xs font-semibold mb-2 ">
                      {event.HOME_SCORE}
                    </p>
                    <p className="text-xs font-semibold ">{event.AWAY_SCORE}</p>
                  </div>
                  <LastEventStatistic
                    items={event.ITEMS}
                    winner={event.WINNER_ICON_SUFFIX}
                  />
                </section>
              </Link>
            </article>
          );
        })}

        {showMorematches !== data?.DATA.length && (
          <div className={style.moreMatches}>
            <button onClick={() => setShowMoreMatches(data?.DATA.length)}>
              Show More Matches
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default LastPlayerEvents;
