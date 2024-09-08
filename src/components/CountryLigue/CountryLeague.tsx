"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import LeagueNavigation from "./leagueNavigation/LeagueNavigation";
import Table from "./table/Table";
import Todaymatches from "./leagueNavigation/todayMatches/Todaymatches";
import LatestScores from "./leagueNavigation/latestScores/LatestScores";
import ScheduledMatches from "./leagueNavigation/scheduledMatches/ScheduledMatches";
import { useSearchParams } from "next/navigation";

const CountryLeague = () => {
  const [activeMenu, setActiveMenu] = useState("SUMMARY");
  const searchParams = useSearchParams();
  const seasonId = searchParams.get("tournamentId");
  const seasonStageId = searchParams.get("seasonStageId");

  return (
    <section className={`${style.countryLeague}`}>
      <LeagueNavigation activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {activeMenu === "SUMMARY" && (
        <div>
          <Todaymatches />

          <LatestScores
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
            pages={1}
          />

          <ScheduledMatches
            pages={1}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          />

          <Table leagueId={seasonStageId} seasonId={seasonId} />
        </div>
      )}

      {activeMenu === "RESULTS" && (
        <LatestScores activeMenu={activeMenu} pages={3} />
      )}

      {activeMenu === "FIXTURES" && (
        <ScheduledMatches pages={4} activeMenu={activeMenu} />
      )}

      {activeMenu === "STANDINGS" && (
        <Table leagueId={seasonStageId} seasonId={seasonId} />
      )}
    </section>
  );
};

export default CountryLeague;
