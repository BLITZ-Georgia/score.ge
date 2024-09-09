"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Skeleton, Tooltip } from "antd";
import Player from "./player/Player";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import { IoShirtOutline, IoFootballOutline } from "react-icons/io5";
import { TbPlayFootball } from "react-icons/tb";

const PlayerStats = ({ countryName }: { countryName: string }) => {
  const [active, setActive] = useState("All");
  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");
  const sportId = searchParams.get("sportId");
  const [playerData, setPlayerData] = useState<any[]>([]);

  const menu = [
    "All",
    "Goalkeepers",
    "Defenders",
    "Midfielders",
    "Forwards",
    "Coach",
  ];

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/teams/squad",
    params: {
      sport_id: sportId,
      team_id: teamId,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["teamSquad", teamId, sportId],
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
  const playersArray =
    data?.DATA.flatMap((el: any) => {
      if (el.GROUP_LABEL !== "Coach") {
        return el.ITEMS.filter((item: any) => item.PLAYER_ID).map(
          (item: any) => item.PLAYER_ID
        );
      } else {
        return [];
      }
    }) || [];

  async function getPlayerInfo(playerId: string) {
    const playeroptions = (page: any) => ({
      method: "GET",
      url: "https://flashlive-sports.p.rapidapi.com/v1/players/alt-events",
      params: {
        sport_id: sportId,
        player_id: playerId,
        locale: "en_INT",
        page: page.toString(),
      },
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
        "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
      },
    });

    try {
      const responses = await Promise.all([
        axios.request(playeroptions(0)),
        axios.request(playeroptions(1)),
      ]);
      const data = responses.map((response) => response.data);
      const combinedData = data.flat();

      const mergedObject = combinedData.reduce(
        (acc, current) => {
          acc.DATA = [...acc.DATA, ...current.DATA];

          return acc;
        },
        { DATA: [] }
      );

      return mergedObject;
    } catch (error) {
      console.error("Error fetching result events", error);
      throw new Error("Error fetching result events");
    }
  }

  const delay = async (ms: number) =>
    await new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function fetchPlayerInfo() {
      if (playersArray.length !== 0) {
        for (let i = 0; i < playersArray.length; i++) {
          try {
            const data = await getPlayerInfo(playersArray[i]);
            await delay(190);
            if (data) {
              setPlayerData((prevPlayerData) => [
                ...prevPlayerData,
                { playerId: playersArray[i], data: data.DATA },
              ]);
            }
          } catch (error) {
            console.error(
              `Error fetching player ${playersArray[i]} info:`,
              error
            );
          }
        }
      }
    }

    if (playersArray.length !== 0) {
      fetchPlayerInfo();
    }
  }, [playersArray.length]);

  // Merging function
  const mergePlayerEvents = (playerGroups: any, eventsData: any) => {
    return playerGroups?.map((group: any) => {
      return {
        ...group,
        ITEMS: group.ITEMS.map((player: any) => {
          const playerEvents =
            eventsData.find((event: any) => event.playerId === player.PLAYER_ID)
              ?.data || [];
          return { ...player, events: playerEvents };
        }),
      };
    });
  };

  const mergedPlayerData = mergePlayerEvents(data?.DATA, playerData) || [];

  const filteredData = mergedPlayerData?.filter((data: any) => {
    if (active === "All") {
      return true;
    } else {
      return data.GROUP_LABEL === active;
    }
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton active />
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div>
        <p className="text-xs font-bold">No player data</p>
      </div>
    );
  }

  return (
    <article className={`${style.playerStats} bg-white rounded-lg p-4 `}>
      <div className="mb-5">
        <h2 className={`font-bold ${style.sectionTitle}`}>
          Last game statistic
        </h2>
      </div>
      <div>
        <div className={`flex items-center mb-4 gap-x-3 ${style.nav}`}>
          {menu.map((el, id) => (
            <button
              className={`${active === el ? style.active : ""}`}
              onClick={() => setActive(el)}
              key={id}
            >
              {el}
            </button>
          ))}
        </div>
      </div>

      {filteredData?.map((el: any) => {
        return (
          <article className={` mb-6`} key={el.GROUP_ID}>
            <h4 className={`font-semibold text-xl mb-3 ${style.sectionTitle}`}>
              {el.GROUP_LABEL}
            </h4>
            <div className={style.titles}>
              <p>#</p>
              <p>NAME</p>
              {el.GROUP_LABEL !== "Coach" && (
                <>
                  <Tooltip title="Matches Played">
                    <p>
                      <IoShirtOutline />
                    </p>
                  </Tooltip>
                  <p>MIN</p>
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
                </>
              )}
            </div>
            <div className={`${style.infoItemSection} `}>
              {el?.ITEMS.map((player: any) => {
                const filteredEvents = player.events.filter(
                  (event: any) =>
                    event.HOME_PARTICIPANT_NAME === countryName ||
                    event.AWAY_PARTICIPANT_NAME === countryName
                );

                const isLoading =
                  player.PLAYER_TYPE_ID === "COACH"
                    ? true
                    : filteredEvents.length !== 0;

                return (
                  <Player
                    key={player.PLAYER_ID}
                    id={player.PLAYER_ID}
                    name={player.PLAYER_NAME}
                    number={player.PLAYER_JERSEY_NUMBER}
                    image={player.PLAYER_IMAGE_PATH}
                    playerEvents={filteredEvents}
                    isLoading={isLoading}
                    typeId={player.PLAYER_TYPE_ID}
                  />
                );
              })}
            </div>
          </article>
        );
      })}
    </article>
  );
};

export default PlayerStats;
