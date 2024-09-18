"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import { Skeleton, Tooltip } from "antd";
import Career from "./career/Career";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import axios, { AxiosError, isAxiosError } from "axios";
import { IoShirtOutline, IoFootballOutline } from "react-icons/io5";
import { TbPlayFootball } from "react-icons/tb";
import { GiVibratingBall } from "react-icons/gi";

const PlayerCareer = () => {
  const [active, setActive] = useState("League");
  const searchParams = useSearchParams();
  const playerId = searchParams.get("playerId");
  const sportId = searchParams.get("sportId");

  const menu = [
    "League",
    "Domestic Cups",
    "International Cups",
    "National Team",
  ];

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/players/career",
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

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["playerCareer", playerId, sportId],
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
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 429) {
          throw axiosError;
        }

        console.error("Error fetching player career ", error);
        throw new Error("Error fetching player career");
      }
    },
    {
      retry: (failureCount, error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 429) {
          return true;
        }
        return false;
      },
      retryDelay: (retryAttempt) => {
        return 300;
      },
      refetchOnWindowFocus: false,
      enabled: !!playerId,
    }
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton active />
      </div>
    );
  }

  return (
    <article
      className={`${style.playerStats} bg-white rounded-lg p-4  mobilePadding8`}
    >
      <h4 className={style.matchesTitle}>Career</h4>
      {data?.DATA.length === 0 && (
        <div className="p3">
          <p
            className="text-l font-bold"
            style={{ color: "var(--black-color)" }}
          >
            No Data
          </p>
        </div>
      )}

      {data?.DATA.length !== 0 && (
        <>
          <div className={`flex items-center  gap-x-3 ${style.nav}`}>
            {menu.map((el, id) => (
              <button
                className={`${active === el ? style.active : ""}`}
                onClick={() => setActive(el)}
                key={id}
              >
                {el.toUpperCase()}
              </button>
            ))}
          </div>

          <article className={` mb-6`}>
            <div className={style.titles}>
              <p>Season</p>
              <p>Team</p>
              <p className={style.titleCompetition}>Competition</p>

              <Tooltip title="Rating">
                <p className={style.iconMenu}>
                  <GiVibratingBall />
                </p>
              </Tooltip>

              <Tooltip title="Matches Played">
                <p className={style.iconMenu}>
                  <IoShirtOutline />
                </p>
              </Tooltip>
              <Tooltip title="Goals">
                <p className={style.iconMenu}>
                  <IoFootballOutline />
                </p>
              </Tooltip>
              <Tooltip title="Assist">
                <p className={style.iconMenu}>
                  <TbPlayFootball />
                </p>
              </Tooltip>

              <div className={`${style.card} ${style.cardYellow}`}></div>

              <div className={`${style.card} ${style.cardRed}`}></div>
            </div>

            <div className={`${style.infoItemSection} `}>
              {data?.DATA.map((career: any) => {
                if (career.TAB_LABEL === active) {
                  return career.ROWS.map((el: any) => {
                    return (
                      <Career
                        key={el.TOURNAMENT_STAGE_ID}
                        id={el.TEAM_ID}
                        name={el.TEAM_NAME}
                        tournamentName={el.TOURNAMENT_NAME}
                        image={el.TEAM_IMAGE_URL}
                        seasonLabel={el.SEASON_LABEL}
                        stats={el.STATS}
                      />
                    );
                  });
                }
                return null;
              })}
            </div>
          </article>
        </>
      )}
    </article>
  );
};

export default PlayerCareer;
