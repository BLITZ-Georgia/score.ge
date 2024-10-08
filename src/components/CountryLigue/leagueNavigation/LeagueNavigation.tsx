"use client";
import React from "react";
import style from "./style.module.css";
import LeagueTitle from "./leagueTitle/LeagueTitle";
import LeagueMenu from "./menu/LeagueMenu";
import ParamInfo from "@/components/paramInfo/ParamInfo";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "antd";
import axios, { AxiosError } from "axios";

const LeagueNavigation = ({
  setActiveMenu,
  activeMenu,
}: {
  activeMenu: string;
  setActiveMenu: any;
}) => {
  const searchParams = useSearchParams();
  const seasonStageId = searchParams.get("seasonStageId");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/stages/data",
    params: {
      tournament_stage_id: seasonStageId,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["tournamentInformation", seasonStageId],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 429) {
          throw axiosError;
        }

        console.error("Error fetching league info", error);
        throw new Error("Error fetching league info");
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
    }
  );

  if (isLoading) {
    return (
      <div className="p-5 ">
        <Skeleton active />
      </div>
    );
  }

  return (
    <section className={`${style.leagueNavigaion} flex flex-col`}>
      <div className="bg-white rounded-lg  mb-7">
        <div className="p-4 pb-0">
          <ParamInfo />
          <LeagueTitle
            leagueName={data?.DATA?.LEAGUE_NAME}
            leagueImage={data?.DATA?.TOURNAMENT_IMAGE}
          />
        </div>
        <LeagueMenu setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      </div>
    </section>
  );
};

export default LeagueNavigation;
