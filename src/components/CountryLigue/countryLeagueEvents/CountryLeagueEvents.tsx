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

interface EventDetail {
  EVENT_ID: string;
  AWAY_NAME: string;
  AWAY_IMAGES: string;
  HOME_IMAGES: string;
  HOME_NAME: string;
  HOME_SCORE_CURRENT: number;
  AWAY_SCORE_CURRENT: number;
  STAGE: string;
  START_TIME: string;
  STAGE_TYPE: string;
}

interface Event {
  round: string;
  events: EventDetail[];
}

interface LeagueProps {
  tournamentStageId: string;
  NAME1: string;
  NAME2: string;
  url: string;
  events: Event[]; // Updated the type here
  countryId: number;
  tournamentId: string;
  countryName: string;
  showMatchesDefault?: boolean;
  ShowFullDate?: boolean;
  ShowFullDateHour?: boolean;
  setActiveMenu: any;
}

const CountryLeagueEvents: React.FC<LeagueProps> = ({
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
  setActiveMenu,
}) => {
  const [showMatches, setShowMatches] = useState(showMatchesDefault);

  const currentCountryIcon = countries.filter((el) => el.name === countryName);
  const [countryObject] = currentCountryIcon;

  const { favouriteLeagues, addToFavourite } = useFavouriteLeagues();

  const sportIdCheck = useSportIdHandler();

  const { pinnedLeagueIds, addLeagueToLocalStorage } = usePinnedLeagues();

  const isLeagueFavorited = isFavoritedLeague(
    tournamentStageId,
    favouriteLeagues
  );

  const newUrl = `${url}?seasonStageId=${tournamentStageId}&name=${NAME2}&tournamentId=${tournamentId}`;

  const combinedEvents: EventDetail[] = events.reduce<EventDetail[]>(
    (acc, current) => {
      return acc.concat(current.events);
    },
    []
  );

  const sportId = sportIdCheck?.id ? Number(sportIdCheck?.id) : 1;

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
                  combinedEvents,
                  {
                    NAME1,
                    NAME2,
                    url,
                    countryId,
                    countryName,
                    sportHref: sportIdCheck?.href,
                    img: countryObject?.countryCode,
                    sportId: sportId,
                  },
                  tournamentStageId,
                  undefined
                )
              }
            >
              <EmptyFavouriteStarIcon />
            </div>

            {countryObject ? (
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
                pinnedLeagueIds[sportId]?.includes(tournamentId)
                  ? style.pinActive
                  : ""
              }`}
              onClick={() => addLeagueToLocalStorage(sportId, tournamentId)}
            >
              <Image
                src={`/images/match/${
                  !pinnedLeagueIds[sportId]?.includes(tournamentId)
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
                Display Matches ({combinedEvents?.length})
              </span>
            ) : (
              <span
                className={`${style.standings} mobileNone`}
                onClick={() => setActiveMenu("STANDINGS")}
              >
                Standings
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
          {events?.map((event: any, index: number) => {
            return (
              <div key={index}>
                <p className={style.round}>{event.round}</p>
                <div>
                  {event?.events.map((el: any) => {
                    return (
                      <Match
                        key={el.EVENT_ID}
                        awayTeam={el.AWAY_NAME}
                        awayImage={el.AWAY_IMAGES}
                        homeImage={el.HOME_IMAGES}
                        homeTeam={el.HOME_NAME}
                        homeScore={el.HOME_SCORE_CURRENT}
                        awayScore={el.AWAY_SCORE_CURRENT}
                        status={el.STAGE}
                        ShowFullDate={ShowFullDate}
                        ShowFullDateHour={ShowFullDateHour}
                        stageType={el.STAGE_TYPE}
                        time={el.START_TIME}
                        id={el.EVENT_ID}
                        addToFavourite={() =>
                          addToFavourite(
                            tournamentId,
                            el,
                            {
                              NAME1,
                              NAME2,
                              url,
                              countryId,
                              countryName,
                              sportHref: sportIdCheck?.href,
                              img: countryObject?.countryCode,
                              sportId: sportId,
                            },
                            tournamentStageId,
                            el.EVENT_ID
                          )
                        }
                        sportId={sportIdCheck}
                        tournamentId={tournamentStageId}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </article>
      </article>
    </section>
  );
};

export default CountryLeagueEvents;
