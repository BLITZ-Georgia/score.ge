"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import H2hNavigation from "./h2h2Navigation/H2hNavigation";
import MatchInfoList from "./matchInfoList/MatchInfoList";

const H2h = ({
  data,
  homeTeamName,
  awayTeamName,
}: {
  data: any;
  awayTeamName: string;
  homeTeamName: string;
}) => {
  const [selectedTeamId, setSelectedTeamId] = useState(0);

  const filteredData = data?.DATA[selectedTeamId];
  return (
    <section className={`${style.h2h} p-3 pt-0`}>
      <H2hNavigation
        awayTeamName={awayTeamName}
        homeTeamName={homeTeamName}
        setSelectedTeamId={setSelectedTeamId}
      />
      <section className={`mt-5`}>
        <MatchInfoList filteredData={filteredData} />
      </section>
    </section>
  );
};

export default H2h;
