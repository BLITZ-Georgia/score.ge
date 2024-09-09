"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import TeamMatchInfo from "./teamInfo/TeamInfo";
import Nav from "./teamsMatchNavigation/TeamsMatchNavigation";
import Info from "./info/MatchInfo";
import LineUps from "./lineUps/LineUps";
import H2h from "./h2h/H2h";
import Table from "../CountryLigue/table/Table";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import { Skeleton } from "antd";

const MatchSection: React.FC = () => {
  const [activeMenu, setActiveSection] = useState("INFO");
  const searchParams = useSearchParams();

  const eventId = searchParams.get("id");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/events/data",
    params: {
      event_id: eventId,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["eventInfo", eventId],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching result events", error);
        throw new Error("Error fetching result events");
      }
    }
  );

  const h2hOption = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/events/h2h",
    params: {
      event_id: eventId,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const h2hData = useQuery(["h2hData", eventId], async () => {
    try {
      const response = await axios.request(h2hOption);
      return response.data;
    } catch (error) {
      console.error("Error fetching result events", error);
      throw new Error("Error fetching result events");
    }
  });

  const summaryIncidents = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/events/summary-incidents",
    params: {
      event_id: eventId,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const summaryData = useQuery(["summaryDataIncidents", eventId], async () => {
    try {
      const response = await axios.request(summaryIncidents);
      return response.data;
    } catch (error) {
      console.error("Error fetching summary incidents events", error);
      throw new Error("Error fetching summary incidents events");
    }
  });

  if (isLoading || h2hData.isLoading) {
    return (
      <div className="p-4">
        <Skeleton active />
      </div>
    );
  }

  const stageId = data?.DATA?.TOURNAMENT.TOURNAMENT_STAGE_ID;
  const seasonId = data?.DATA?.TOURNAMENT.TOURNAMENT_SEASON_ID;

  return (
    <section className={` flex flex-col `}>
      <TeamMatchInfo data={data?.DATA.EVENT} />
      <Nav activeMenu={activeMenu} setActiveSection={setActiveSection} />

      {activeMenu === "INFO" && (
        <Info
          eventData={data?.DATA.EVENT}
          h2hData={h2hData?.data?.DATA}
          summaryData={summaryData?.data}
        />
      )}

      {activeMenu === "TABLE" && (
        <Table leagueId={stageId} seasonId={seasonId} />
      )}

      {activeMenu === "H2H" && (
        <H2h
          data={h2hData?.data}
          homeTeamName={data?.DATA.EVENT.HOME_NAME}
          awayTeamName={data?.DATA.EVENT.AWAY_NAME}
        />
      )}

      {activeMenu === "LINE-UPS" && (
        <LineUps
          homeTeamName={data?.DATA.EVENT.HOME_NAME}
          awayTeamName={data?.DATA.EVENT.AWAY_NAME}
          homeTeamImg={data?.DATA.EVENT.HOME_IMAGES}
          awayTeamImg={data?.DATA.EVENT.AWAY_IMAGES}
        />
      )}

      <div className="p-3">
        <Image src="/images/ad/matchAd.png" alt="ad" width={658} height={100} />
      </div>
    </section>
  );
};

export default MatchSection;
