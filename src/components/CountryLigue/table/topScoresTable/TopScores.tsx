"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import { useQuery } from "react-query";
import axios, { isAxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "antd";

interface tableProps {
  setApiMenuRequest: any;
  apiMenuRequest: string;
  seasonId: string | null;
  leagueId: string | null;
}

const TopScoresTable: React.FC<tableProps> = ({ seasonId, leagueId }) => {
  const matchesLength = 43;
  const [showMore, setShowMore] = useState(matchesLength);

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/standings",
    params: {
      tournament_season_id: seasonId,
      standing_type: "top_scores",
      locale: "en_INT",
      tournament_stage_id: leagueId,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["topScoresTable", leagueId, seasonId],
    async () => {
      try {
        const response = await axios.request(options).catch((error) => {
          if (isAxiosError(error)) {
            switch (error.response?.status) {
              case 404:
                return { data: { DATA: [] } };

              default:
                break;
            }
          }

          throw error;
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching table data ", error);
        throw new Error("Error fetching table data");
      }
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!leagueId || !!seasonId,
    }
  );

  if (isLoading) {
    return (
      <div className="p-5 ">
        <Skeleton active />
      </div>
    );
  }

  if (!data?.ROWS?.length) {
    return (
      <div>
        <p style={{ color: "var(--black-color)" }}>There is no information</p>
      </div>
    );
  }

  return (
    <section className={`${style.info}`}>
      <article>
        <div>
          <div
            className={`${style.infoTableTitle} flex items-center  p-2 gap-x-2`}
          >
            <p className="flex items-center justify-center font-bold">
              #
              <svg
                width="6"
                height="4"
                viewBox="0 0 6 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-0.5"
              >
                <path d="M3 0L6 4H0L3 0Z" fill="var(--table-text-color)" />
              </svg>
            </p>
            <p className="">PLAYER</p>

            <p className="flex items-center justify-center font-normal">TEAM</p>

            <p className="flex items-center justify-center font-bold">G</p>
          </div>
        </div>
        {data?.ROWS?.slice(0, showMore).map((el: any) => {
          return (
            <div
              className={`${style.matchItem} p-2  gap-x-2`}
              key={el.TS_PLAYER_ID}
            >
              <div className={`  flex justify-center items-center`}>
                <p
                  className={`${style.num}  flex justify-start items-center font-bold`}
                >
                  {el?.TS_RANK}.
                </p>
              </div>
              <div className="flex justify-start items-center font-bold gap-x-2">
                {el?.TS_IMAGE_PATH && (
                  <Image
                    src={el?.TS_IMAGE_PATH}
                    alt="flag"
                    width={20}
                    height={20}
                  />
                )}
                <Link href={"/team/arsenal"} className={style.teamLink}>
                  {el?.TS_PLAYER_NAME}
                </Link>
              </div>

              <p className="flex items-center justify-center font-normal">
                {el?.TEAM_NAME}
              </p>

              <p className="flex items-center justify-center font-bold">
                {el?.TS_PLAYER_GOALS}
              </p>
            </div>
          );
        })}
      </article>

      <div className={style.moreMatches}>
        {showMore === matchesLength && (
          <button onClick={() => setShowMore(data?.ROWS.length)}>
            Show More
          </button>
        )}
        {showMore !== matchesLength && (
          <button onClick={() => setShowMore(matchesLength)}>Show Less</button>
        )}
      </div>
    </section>
  );
};

export default TopScoresTable;
