"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import MatchItem from "../tableTeamInfo/TableTeamInfo";
import { useQuery } from "react-query";
import axios, { isAxiosError } from "axios";
import { Skeleton } from "antd";

interface tableProps {
  setApiMenuRequest: any;
  apiMenuRequest: string;
  seasonId: string | null;
  leagueId: string | null;
}

const FormTable: React.FC<tableProps> = ({ seasonId, leagueId }) => {
  const [tableMenu, setTableMenu] = useState(5);
  const menu = [5, 10, 15, 20, 25, 30];

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/standings",
    params: {
      tournament_season_id: seasonId,
      standing_type: "form",
      locale: "en_INT",
      tournament_stage_id: leagueId,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, refetch } = useQuery(
    ["formTable", leagueId, seasonId],
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

  function filterTeamsRankedFirst(groups: any) {
    const newArr = groups?.map((el: any) => {
      const groupName = el.GROUP;
      const id = el.GROUP_ID;

      const groupedTeams: any = [];
      let currentGroup: any = [];

      for (let i = 0; i < el.ROWS.length; i++) {
        const team = el.ROWS[i];
        const nextTeam = el.ROWS[i + 1];

        currentGroup.push(team);

        if (!nextTeam || nextTeam.RANKING === 1) {
          groupedTeams.push(currentGroup);
          currentGroup = [];
        }
      }

      return {
        GROUP: groupName,
        GROUP_ID: id,
        ROWS: groupedTeams,
      };
    });

    return newArr;
  }

  const groups = filterTeamsRankedFirst(data?.DATA) || [];

  if (!data?.DATA?.length) {
    return (
      <div>
        <p style={{ color: "var(--black-color)" }}>There is no information</p>
      </div>
    );
  }

  return (
    <section className={`${style.info}`}>
      <ul className="flex items-center gap-x-2 pb-3 p-2">
        {menu.slice(0, groups[0]?.ROWS?.length).map((el, index) => (
          <li
            key={index}
            className={`${tableMenu === el ? style.activeMenu : ""} ${
              style.menuITem
            } flex items-center justify-center`}
            onClick={() => {
              setTableMenu(el);
            }}
          >
            <button>{el}</button>
          </li>
        ))}
      </ul>

      {groups?.map((el: any) => {
        const findMenuIndex = menu.findIndex((id: any) => id === tableMenu);
        return (
          <article key={el.GROUP_ID}>
            <div>
              <div
                className={`${style.infoTableTitle} flex items-center  p-2 gap-x-2`}
              >
                <p className="flex items-center justify-center font-bold mobileNone">
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
                <p className="font-bold">{el.GROUP}</p>
                <p className="flex items-center justify-center font-normal">
                  MP
                </p>
                <p className="flex items-center justify-center font-normal">
                  W
                </p>
                <p className="flex items-center justify-center font-normal">
                  D
                </p>
                <p className="flex items-center justify-center font-normal">
                  L
                </p>
                <p className="flex items-center justify-center font-normal">
                  G
                </p>
                <p className="flex items-center justify-center font-normal">
                  GD
                </p>
                <p className="flex items-center justify-center font-bold">
                  PTS
                </p>
                {/* <p className="flex items-center justify-center font-normal">
                  FORM
                </p> */}
              </div>
            </div>
            {el?.ROWS[findMenuIndex]?.map((teamArray: any) => {
              return (
                <MatchItem
                  key={teamArray?.TEAM_ID}
                  id={teamArray?.TEAM_ID}
                  name={teamArray?.TEAM_NAME}
                  mp={teamArray?.MATCHES_PLAYED}
                  wins={teamArray?.WINS}
                  goals={teamArray?.GOALS}
                  points={teamArray?.POINTS}
                  rank={teamArray?.RANKING}
                  image={teamArray?.TEAM_IMAGE_PATH}
                />
              );
            })}
          </article>
        );
      })}
    </section>
  );
};

export default FormTable;
