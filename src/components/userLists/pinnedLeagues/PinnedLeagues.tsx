"use client";
import React from "react";
import Image from "next/image";
import style from "./style.module.css";
import { LeaguePinIcon, PinIcon } from "@/common/svg/home";
import Link from "next/link";
import { useSelector } from "react-redux";
import { countries } from "@/lib/countriesList";
import Flag from "react-world-flags";
import { usePinnedLeagues } from "@/components/hooks/usePineedLeagues";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

const PinnedLeagues = () => {
  const allTournament = useSelector(
    (state: any) => state.matches.allTournaments
  );
  const sportId = useSportIdHandler();

  const { pinnedLeagueIds, removePinnedLeague } = usePinnedLeagues();
  const id = sportId?.id ? Number(sportId?.id) : 1;

  const filteredLeagues = allTournament?.DATA?.filter((league: any) =>
    pinnedLeagueIds[id]?.includes(league.ACTUAL_TOURNAMENT_SEASON_ID)
  )
    .map((league: any) => {
      const country = countries.find(
        (c: any) => c.name === league.COUNTRY_NAME
      );
      return {
        ...league,
        countryCode: country ? country.countryCode : null,
      };
    })
    .sort((a: any, b: any) => {
      const importantCountries = ["Europe", "World", "South America"];
      const isACountryImportant = importantCountries.includes(a.COUNTRY_NAME);
      const isBCountryImportant = importantCountries.includes(b.COUNTRY_NAME);

      if (!isACountryImportant && isBCountryImportant) {
        return -1;
      } else if (isACountryImportant && !isBCountryImportant) {
        return 1;
      } else {
        return a.COUNTRY_NAME.localeCompare(b.COUNTRY_NAME);
      }
    });

  const filtered = allTournament?.DATA?.filter(
    (league: any) => league.COUNTRY_NAME === "USA"
  );

  return (
    <section className={`mb-7 `}>
      <article className=" p-4">
        <div className={`${style.pinnedLeague} flex items-center pb-3 `}>
          <PinIcon />
          <h2 className="ml-2   font-extrabold ">
            <span className="font-semibold">PINNED</span> LEAGUES
          </h2>
        </div>
      </article>
      <article className="pl-2 pr-2">
        {filteredLeagues?.map((tournament: any) => {
          const stageId = tournament.STAGES.filter((el: any) =>
            el.STAGE_NAME.includes("Main")
          );
          const stageSeasonId =
            stageId.length > 0 ? stageId[0] : tournament.STAGES[0];

          const url = `${sportId?.href}/${tournament.COUNTRY_NAME}/${tournament.LEAGUE_NAME}?seasonStageId=${stageSeasonId.STAGE_ID}&name=${tournament.LEAGUE_NAME}&tournamentId=${tournament.ACTUAL_TOURNAMENT_SEASON_ID}`;
          return (
            <div
              className={`flex items-center justify-between  mb-2 ${style.league} h-9`}
              key={tournament.ACTUAL_TOURNAMENT_SEASON_ID}
            >
              <Link href={url} className="flex items-center gap-x-2">
                {tournament.countryCode ? (
                  <Flag
                    code={tournament.countryCode}
                    style={{ width: "18px", height: "13px" }}
                  />
                ) : (
                  <Image
                    src="/images/match/world.png"
                    alt="flag"
                    width={18}
                    height={13}
                    className="max-w-none max-h-none h-3"
                  />
                )}
                <p
                  className={`text-xs  ${style.leagueTitleColor} font-medium tracking-wider  truncate max-w-40`}
                >
                  {tournament.LEAGUE_NAME}
                </p>
              </Link>

              <div className={style.pinImgContainer}>
                <div
                  className={`${style.pinIcon} cursor-pointer`}
                  onClick={() =>
                    sportId?.id &&
                    removePinnedLeague(
                      Number(sportId?.id),
                      tournament.ACTUAL_TOURNAMENT_SEASON_ID
                    )
                  }
                >
                  <LeaguePinIcon />
                </div>
              </div>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default PinnedLeagues;
