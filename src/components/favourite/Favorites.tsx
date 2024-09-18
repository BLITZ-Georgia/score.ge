"use client";
import React from "react";
import style from "./style.module.css";
import { NoMatchFound } from "../noMatchFound/NoMatchFound";

import { useFavouriteLeagues } from "@/components/hooks/useFavouriteLeagues ";

import FavLeagues from "./favLeagues/FavLeagues";
import { IoFootballOutline } from "react-icons/io5";

const Favorites = () => {
  const { favouriteLeagues } = useFavouriteLeagues();

  if (favouriteLeagues.length === 0)
    return <NoMatchFound title="No favorite matches found" />;

  return (
    <section
      className={`${style.favorites}    w-full`}
      suppressHydrationWarning
    >
      <div
        className={`bg-white rounded-lg  p-3 w-full `}
        suppressHydrationWarning
      >
        {favouriteLeagues ? (
          favouriteLeagues?.map((eventMatch: any) => {
            const eventIds =
              eventMatch.stageIds.length !== 0 ? eventMatch.stageIds : [];

            return (
              <FavLeagues
                tournamentStageId={eventMatch.mainLeagueID}
                NAME1={eventMatch.leagueInfo.NAME1}
                NAME2={eventMatch.leagueInfo.NAME2}
                url={eventMatch.leagueInfo.url}
                events={eventIds}
                countryId={eventMatch.leagueInfo.countryId}
                tournamentId={eventMatch.tournamentStageId}
                key={eventMatch.mainLeagueID}
                sportHref={eventMatch.leagueInfo.sportHref}
                countryName={eventMatch.COUNTRY_NAME}
                ShowFullDate={true}
                showMatchesDefault={true}
                img={eventMatch.leagueInfo.img}
                sportId={eventMatch.leagueInfo.sportId}
              />
            );
          })
        ) : (
          <div className="flex items-center justify-center flex-col p-3">
            <IoFootballOutline
              style={{
                fontSize: "80px",
                color: "var(--match-league-title-color)",
              }}
            />
            <p
              style={{ color: "var(--black-color)", fontSize: "13px" }}
              className="mt-3"
            >
              There Is No Favorite Matches
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Favorites;
