import { useLocalStorage } from "usehooks-ts";

interface LeagueInfo {
  NAME1: string;
  NAME2: string;
  url: string;
  countryId: number;
  countryName: string;
  sportHref: string | undefined;
  img: string;
  sportId: number;
}

interface FavouriteLeague {
  mainLeagueID: string;
  tournamentStageId: string;
  leagueInfo: LeagueInfo;
  stageIds: string[];
}

export const useFavouriteLeagues = () => {
  const [favouriteLeagues, setFavouriteLeagues] = useLocalStorage<
    FavouriteLeague[]
  >("favouriteLeagues", []);

  const addToFavourite = (
    tournamentId: string,
    events: any[],
    leagueInfo: LeagueInfo,
    tournamentStageId: string,
    eventId?: string | undefined
  ) => {
    const existingLeague = favouriteLeagues.find(
      (fav) => fav.mainLeagueID === tournamentId
    );

    if (eventId) {
      if (existingLeague) {
        const updatedStageIds = existingLeague.stageIds?.includes(eventId)
          ? existingLeague.stageIds.filter((id) => id !== eventId)
          : [...existingLeague.stageIds, eventId];

        setFavouriteLeagues(
          updatedStageIds.length === 0
            ? favouriteLeagues.filter(
                (fav) => fav.mainLeagueID !== tournamentId
              )
            : favouriteLeagues.map((fav) =>
                fav.mainLeagueID === tournamentId
                  ? { ...fav, stageIds: updatedStageIds }
                  : fav
              )
        );
      } else {
        setFavouriteLeagues([
          ...favouriteLeagues,
          {
            mainLeagueID: tournamentId,
            leagueInfo,
            stageIds: [eventId],
            tournamentStageId: tournamentStageId,
          },
        ]);
      }
    } else {
      const eventIds = events.map((event) => event.EVENT_ID);

      if (existingLeague) {
        const allEventsIncluded = eventIds.every((id) =>
          existingLeague.stageIds.includes(id)
        );

        setFavouriteLeagues(
          allEventsIncluded
            ? favouriteLeagues.filter(
                (fav) => fav.mainLeagueID !== tournamentId
              )
            : favouriteLeagues.map((fav) =>
                fav.mainLeagueID === tournamentId
                  ? { ...fav, stageIds: eventIds }
                  : fav
              )
        );
      } else {
        setFavouriteLeagues([
          ...favouriteLeagues,
          {
            mainLeagueID: tournamentId,
            leagueInfo,
            stageIds: eventIds,
            tournamentStageId: tournamentStageId,
          },
        ]);
      }
    }
  };

  const removeLeague = (tournamentId: string) => {
    setFavouriteLeagues(
      favouriteLeagues.filter((fav) => fav.mainLeagueID !== tournamentId)
    );
  };

  const removeEventFromLeague = (tournamentId: string, eventId: string) => {
    setFavouriteLeagues(
      favouriteLeagues.flatMap((fav) => {
        if (fav.mainLeagueID === tournamentId) {
          const updatedStageIds = fav.stageIds.filter((id) => id !== eventId);

          if (updatedStageIds.length === 0) {
            return [];
          }

          return { ...fav, stageIds: updatedStageIds };
        }
        return fav;
      })
    );
  };

  return {
    favouriteLeagues,
    addToFavourite,
    removeLeague,
    removeEventFromLeague,
  };
};

export const isFavoritedLeague = (
  tournamentId: string,
  favouriteLeagues?: any
): boolean => {
  if (favouriteLeagues.length === 0) return false;

  const favoriteLeague = favouriteLeagues.find(
    (el: any) => el.tournamentStageId === tournamentId
  );

  if (favoriteLeague) {
    return true;
  }

  return false;
};

export const isFavoriteEvent = (
  eventId: string,
  favouriteLeagues: any[] = []
): boolean => {
  if (favouriteLeagues.length === 0) return false;

  const favoriteLeague = favouriteLeagues?.includes(eventId);

  if (favoriteLeague) {
    return true;
  }

  return false;
};
