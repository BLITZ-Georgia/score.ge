"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { EmptyFavouriteStarIcon, LeagueArrowIcon } from "@/common/svg/home";
import Image from "next/image";
import Event from "./event/Event";
import Flag from "react-world-flags";
import {
  useFavouriteLeagues,
  isFavoritedLeague,
} from "@/components/hooks/useFavouriteLeagues ";
import { usePinnedLeagues } from "@/components/hooks/usePineedLeagues";
import axios from "axios";
import { Skeleton } from "antd";

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
  sportHref: string;
  img: string;
  sportId: number;
}

const FavLeague: React.FC<leagueProps> = ({
  NAME1,
  NAME2,
  countryId,
  events,
  tournamentStageId,
  ShowFullDate = false,
  tournamentId,
  countryName,
  url,
  sportHref,
  showMatchesDefault = false,
  img,
  sportId,
}) => {
  const [showMatches, setShowMatches] = useState(showMatchesDefault);
  const [eventData, setEventData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    favouriteLeagues,
    removeLeague,
    removeEventFromLeague,
  } = useFavouriteLeagues();

  const { pinnedLeagueIds, addLeagueToLocalStorage } = usePinnedLeagues();

  const isLeagueFavorited = isFavoritedLeague(
    tournamentStageId,
    favouriteLeagues
  );

  const newUrl = `${url}?seasonStageId=${tournamentId}&name=${NAME2}&tournamentId=${tournamentStageId}`;

  async function getPlayerInfo(eventId: string) {
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

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error("Error fetching result events", error);
      throw new Error("Error fetching result events");
    }
  }

  const delay = async (ms: number) =>
    await new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function fetchPlayerInfo() {
      if (events.length !== 0) {
        for (let i = 0; i < events.length; i++) {
          try {
            const data = await getPlayerInfo(events[i]);
            await delay(250);
            if (data) {
              setLoading(false);
              setEventData((pevEventData) => [
                ...pevEventData,
                { ...data.DATA },
              ]);
            }
          } catch (error) {
            console.error(`Error fetching player ${events[i]} info:`, error);
          }
        }
      }
    }

    if (events.length !== 0) {
      fetchPlayerInfo();
    }
  }, []);

  const filteredEventData = Array.from(
    new Map(eventData.map((event) => [event.EVENT.EVENT_ID, event]))
  ).map(([key, value]) => value);

  const filteredFavEvents = filteredEventData.filter((event) =>
    events.includes(event?.EVENT?.EVENT_ID)
  );

  return (
    <div className={``}>
      <div className="mb-1">
        <div className={`flex justify-between ${style.premierTitle} p-2`}>
          <div className={`flex items-center `}>
            <div
              className={`mr-3 cursor-pointer ${style.starIcon} ${
                isLeagueFavorited ? style.favorited : ""
              }`}
              onClick={() => removeLeague(tournamentStageId)}
            >
              <EmptyFavouriteStarIcon />
            </div>

            {img ? (
              <Flag code={img} style={{ width: "18px", height: "13px" }} />
            ) : (
              <Image
                src="/images/match/world.png"
                alt="flag"
                width={18}
                height={13}
                className="max-w-none max-h-none h-3"
              />
            )}
            <h2 className="ml-2">{NAME1}:</h2>
            <Link href={newUrl} className={`mr-2 ${style.nameLink}`}>
              {NAME2}
            </Link>
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
              <span className={`${style.displayText} `}>
                Display Matches ({events.length})
              </span>
            ) : (
              <span className={`${style.standings} `}>Standings</span>
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
          {filteredFavEvents.length !== 0 ? (
            filteredFavEvents?.map((match) => {
              return (
                <Event
                  key={match.EVENT.EVENT_ID}
                  awayTeam={match.EVENT.AWAY_NAME}
                  awayImage={match.EVENT.AWAY_IMAGES}
                  homeImage={match.EVENT.HOME_IMAGES}
                  homeTeam={match.EVENT.HOME_NAME}
                  homeScore={match.EVENT.HOME_SCORE_CURRENT}
                  awayScore={match.EVENT.AWAY_SCORE_CURRENT}
                  status={match.EVENT.STAGE}
                  ShowFullDate={ShowFullDate}
                  time={match.EVENT.START_TIME}
                  id={match.EVENT.EVENT_ID}
                  sportHref={sportHref}
                  removeEventFromLeague={() =>
                    removeEventFromLeague(
                      tournamentStageId,
                      match.EVENT.EVENT_ID
                    )
                  }
                  tournamentId={tournamentId}
                />
              );
            })
          ) : (
            <div>
              {loading ? (
                <Skeleton active />
              ) : (
                <p style={{ color: "var(--black-color)" }}>No Data</p>
              )}
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default FavLeague;
