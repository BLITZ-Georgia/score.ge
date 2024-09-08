"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { EmptyFavouriteStarIcon, LeagueArrowIcon } from "@/common/svg/home";
import Image from "next/image";
import Match from "./match/Match";
import { countries } from "@/lib/countriesList";
import Flag from "react-world-flags";
import {
  useFavouriteLeagues,
  isFavoritedLeague,
} from "@/components/hooks/useFavouriteLeagues ";
import { usePinnedLeagues } from "@/components/hooks/usePineedLeagues";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import { usePathname, useSearchParams } from "next/navigation";

interface leagueProps {
  tournamentStageId: string;
  NAME1: string;
  NAME2: string;
  url: string;
  events: any[];
  countryId: number;
  tournamentId: string;
  countryName: string;
  showMatchesDefault?: boolean;
  ShowFullDate?: boolean;
  ShowFullDateHour?: boolean;
}

const MatchLeague: React.FC<leagueProps> = ({
  NAME1,
  NAME2,
  countryId,
  events,
  tournamentStageId,
  ShowFullDate = false,
  tournamentId,
  countryName,
  url,
  showMatchesDefault = false,
  ShowFullDateHour = false,
}) => {
  const [showMatches, setShowMatches] = useState(showMatchesDefault);
  const params = useSearchParams();
  const path = usePathname();
  const currentCountryIcon = countries.filter((el) => el.name === countryName);
  const [countryObject] = currentCountryIcon;

  const { favouriteLeagues, addToFavourite } = useFavouriteLeagues();

  const sportIdCheck = useSportIdHandler();

  const { pinnedLeagueIds, addLeagueToLocalStorage } = usePinnedLeagues();

  const isLeagueFavorited = isFavoritedLeague(
    tournamentStageId,
    favouriteLeagues
  );

  const isLeagueRoute = path.includes("/team");
  const newUrl = `${url}?seasonStageId=${tournamentStageId}&name=${NAME2}&tournamentId=${tournamentId}`;
  const teamId = isLeagueRoute && params.get("id");
  const id = sportIdCheck?.id ? Number(sportIdCheck?.id) : 1;

  return (
    <section className={``}>
      <article className="mb-1">
        <div className={`flex justify-between ${style.premierTitle} p-2`}>
          <div className={`flex items-center `}>
            <div
              className={`mr-3 cursor-pointer ${style.starIcon} ${
                isLeagueFavorited ? style.favorited : ""
              }`}
              onClick={() =>
                addToFavourite(
                  tournamentId,
                  events,
                  {
                    NAME1,
                    NAME2,
                    url,
                    countryId,
                    countryName,
                    sportHref: sportIdCheck?.href,
                    img: countryObject?.countryCode,
                    sportId: id,
                  },
                  tournamentStageId,

                  undefined
                )
              }
            >
              <EmptyFavouriteStarIcon />
            </div>

            {countryObject && countryObject?.countryCode ? (
              <Flag
                code={countryObject?.countryCode}
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
            <div className={`flex items-center ${style.matchNames}`}>
              <h2 className="ml-2">{NAME1}</h2>
              <span className="m-0.5 mobileNone">:</span>
              <Link href={newUrl} className="mr-2">
                {NAME2}
              </Link>
            </div>
            <div
              className={`${style.pinImage} ${
                pinnedLeagueIds[id]?.includes(tournamentId)
                  ? style.pinActive
                  : ""
              }`}
              onClick={() => {
                addLeagueToLocalStorage(id, tournamentId);
              }}
            >
              <Image
                src={`/images/match/${
                  !pinnedLeagueIds[id]?.includes(tournamentId)
                    ? "pin"
                    : "pinActive"
                }.png`}
                alt="pin"
                width={14}
                height={18}
              />
            </div>
          </div>
          <button
            onClick={() => setShowMatches(!showMatches)}
            className={`flex items-center gap-x-2 ${style.showMatchesBtn}`}
          >
            {!showMatches ? (
              <span className={`${style.displayText} mobileNone`}>
                Display Matches ({events.length})
              </span>
            ) : (
              <span className={`${style.standings} mobileNone`}>
                Hide Matches
              </span>
            )}
            <span
              className={`${style.arrowIconBtn} ${
                showMatches ? style.arrowIconRotate : ""
              }`}
            >
              <LeagueArrowIcon />
            </span>
          </button>
        </div>
        <article
          className={`${showMatches ? style.showMatcher : "hidden"} mb-5`}
        >
          {events?.map((match, index) => {
            const [awayId] = match?.AWAY_PARTICIPANT_IDS;
            const [homeId] = match?.HOME_PARTICIPANT_IDS;

            let matchResult = "";
            if (match.WINNER === 0) {
              matchResult = "D";
            } else if (match.WINNER === 1 && teamId === homeId) {
              matchResult = "W";
            } else if (match.WINNER === 2 && teamId === awayId) {
              matchResult = "W";
            } else if (!match.WINNER) {
              matchResult = "";
            } else {
              matchResult = "L";
            }
            return (
              <Match
                key={match.EVENT_ID}
                awayTeam={match.AWAY_NAME}
                awayImage={match.AWAY_IMAGES}
                homeImage={match.HOME_IMAGES}
                homeTeam={match.HOME_NAME}
                homeScore={match.HOME_SCORE_CURRENT}
                awayScore={match.AWAY_SCORE_CURRENT}
                status={match.STAGE}
                ShowFullDate={ShowFullDate}
                ShowFullDateHour={ShowFullDateHour}
                stageType={match.STAGE_TYPE}
                time={match.START_TIME}
                id={match.EVENT_ID}
                winner={matchResult}
                addToFavourite={() =>
                  addToFavourite(
                    tournamentId,
                    events,
                    {
                      NAME1,
                      NAME2,
                      url,
                      countryId,
                      countryName,
                      sportHref: sportIdCheck?.href,
                      img: countryObject?.countryCode,
                      sportId: id,
                    },
                    tournamentStageId,
                    match.EVENT_ID
                  )
                }
                sportId={sportIdCheck}
                tournamentId={tournamentStageId}
              />
            );
          })}
        </article>
      </article>
    </section>
  );
};

export default MatchLeague;
