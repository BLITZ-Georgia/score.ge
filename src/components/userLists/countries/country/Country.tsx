"use client";
import React from "react";
import style from "../style.module.css";
import Link from "next/link";
import { CountriesPinIcon } from "@/common/svg/home";

interface Country {
  sportChekedId: number;
  sportName: string;
  countryName: string;
  leagueName: string;
  stageId: string;
  name: string;
  seasonId: string;
  pinnedLeagueIds: any;
  addLeagueToLocalStorage: any;
}

const Country: React.FC<Country> = ({
  countryName,
  sportChekedId,
  sportName,
  leagueName,
  name,
  seasonId,
  stageId,
  pinnedLeagueIds,
  addLeagueToLocalStorage,
}) => {
  return (
    <div
      className={`flex items-center justify-between ${
        pinnedLeagueIds[sportChekedId]?.includes(stageId)
          ? style.pinActive
          : null
      }`}
    >
      <span className={`${style.blockLink} tracking-wider  truncate max-w-40`}>
        <Link
          href={`/${sportName}/${countryName}/${leagueName}?seasonStageId=${seasonId}&name=${name}&tournamentId=${stageId}`}
        >
          {name}
        </Link>
      </span>
      <span
        className={`${style.pinIcon} `}
        onClick={() => {
          addLeagueToLocalStorage(sportChekedId, stageId);
        }}
      >
        <CountriesPinIcon />
      </span>
    </div>
  );
};

export default Country;
