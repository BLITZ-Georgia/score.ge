"use client";
import React, { memo } from "react";
import style from "../style.module.css";
import Link from "next/link";
import { CountriesPinIcon } from "@/common/svg/home";
import { CountryItemProps } from "@/types/countries";

const Country: React.FC<CountryItemProps> = memo(
  ({
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
    const isPinned = pinnedLeagueIds[sportChekedId]?.includes(stageId);
    const handlePin = () => addLeagueToLocalStorage(sportChekedId, stageId);

    return (
      <div
        className={`flex items-center justify-between ${
          isPinned ? style.pinActive : ""
        }`}
      >
        <span className={`${style.blockLink} tracking-wider truncate max-w-40`}>
          <Link
            href={`/${sportName}/${countryName}/${leagueName}?seasonStageId=${seasonId}&name=${name}&tournamentId=${stageId}`}
          >
            {name}
          </Link>
        </span>
        <span className={style.pinIcon} onClick={handlePin}>
          <CountriesPinIcon />
        </span>
      </div>
    );
  }
);

Country.displayName = "Country";

export default Country;
