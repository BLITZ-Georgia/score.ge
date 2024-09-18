"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import ClubInfo from "./clubInfo/ClubInfo";
import ClubMatches from "./clubMatches/ClubMatches";
import PlayerStats from "./playerStats/PlayerStats";
import { useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Skeleton } from "antd";

const ClubMatchesInfo = () => {
  const [activeSection, setActiveSection] = useState<string>("SUMMARY");
  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");
  const sportIdCheck = searchParams.get("sportId");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/teams/data",
    params: {
      locale: "en_INT",
      sport_id: sportIdCheck,
      team_id: teamId,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["teamInfo", teamId, sportIdCheck],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 429) {
          throw axiosError;
        }

        console.error("Error fetching team info", error);
        throw new Error("Error fetching team info");
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
      <div className="p-4">
        <Skeleton active />
      </div>
    );
  }

  return (
    <section className={`${style.clubMatches} `}>
      <ClubInfo
        setActiveSection={setActiveSection}
        activeMenu={activeSection}
        clubInfoData={data?.DATA}
      />

      {activeSection === "SUMMARY" && <ClubMatches />}
      {activeSection === "PLAYER STATS" && (
        <PlayerStats countryName={data?.DATA.NAME} />
      )}
    </section>
  );
};

export default ClubMatchesInfo;
