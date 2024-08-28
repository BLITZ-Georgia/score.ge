"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Flag from "react-world-flags";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import { countries } from "@/lib/countriesList";

const CountryLeaguesList = () => {
  const sportId = useSportIdHandler();
  const caountryStageList = useSelector(
    (state: any) => state.matches.allTournaments
  );
  const [showItemCount, setShowItemCount] = useState(10);
  const path = usePathname();
  const [, , countryName] = path.split("/");
  const country = `${countryName[0].toLocaleUpperCase()}${countryName.slice(
    1,
    caountryStageList.length
  )}`;

  const data = caountryStageList?.DATA || [];
  const filteredList = data.filter(
    (stages: any) => stages.COUNTRY_NAME === country
  );
  const countryCode = countries.find((el: any) => el.name === country);

  return (
    <section
      className={`${style.CountryLeaguesList} rounded-lg bg-white mb-4 p-2 py-4`}
    >
      <article className="pl-2">
        <div className={`${style.pinnedLeague} flex items-center pb-3 `}>
          {countryCode?.countryCode ? (
            <Flag
              code={countryCode.countryCode}
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
          <h2 className="ml-2   font-extrabold ">{country}</h2>
        </div>
      </article>
      <article>
        {filteredList?.slice(0, showItemCount).map((tournament: any) => {
          const stageId = tournament.STAGES.filter(
            (el: any) => el.STAGE_NAME === "Main"
          );
          const stageSeasonId =
            stageId.length > 0 ? stageId[0] : tournament.STAGES[0];

          const url = `${sportId?.href}/${tournament.COUNTRY_NAME}/${tournament.LEAGUE_NAME}?seasonStageId=${stageSeasonId.STAGE_ID}&name=${tournament.LEAGUE_NAME}&tournamentId=${tournament.ACTUAL_TOURNAMENT_SEASON_ID}`;
          return (
            <div
              className={`flex items-center justify-between   ${style.league} h-9`}
              key={tournament.ACTUAL_TOURNAMENT_SEASON_ID}
            >
              <Link href={url} className="flex items-center gap-x-2">
                <p className="text-xs   font-medium tracking-wider  truncate max-w-40">
                  {tournament.LEAGUE_NAME}
                </p>
              </Link>
            </div>
          );
        })}
      </article>

      {showItemCount === 10 && (
        <div
          className={style.showMoreBtn}
          onClick={() => setShowItemCount(filteredList.length)}
        >
          <p className="flex items-center">Show More </p>
          <span>
            <svg
              width="11"
              height="7"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6317 0.355291C13.5157 0.242666 13.3779 0.153312 13.2262 0.0923468C13.0745 0.0313812 12.9119 0 12.7477 0C12.5835 0 12.4209 0.0313812 12.2692 0.0923468C12.1175 0.153312 11.9798 0.242666 11.8638 0.355291L6.99891 5.06911L2.13404 0.355291C1.89961 0.128132 1.58164 0.000514428 1.2501 0.000514428C0.918549 0.000514428 0.60058 0.128132 0.366142 0.355291C0.131703 0.582451 -1.19209e-07 0.890546 -1.19209e-07 1.2118C-1.19209e-07 1.53305 0.131703 1.84114 0.366142 2.0683L6.12123 7.64471C6.23722 7.75734 6.375 7.84669 6.52668 7.90766C6.67836 7.96862 6.84096 8 7.00518 8C7.16939 8 7.33199 7.96862 7.48367 7.90766C7.63535 7.84669 7.77313 7.75734 7.88913 7.64471L13.6442 2.0683C14.1207 1.60664 14.1207 0.829104 13.6317 0.355291Z"
                fill=" var(--user-list-color)"
              />
            </svg>
          </span>
        </div>
      )}
    </section>
  );
};

export default CountryLeaguesList;
