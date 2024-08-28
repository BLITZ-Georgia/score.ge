import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { defaultPinnedLeagues } from "@/lib/pinnedLeaguesData";

type leagueId = string;

type PinnedLeagues = {
  [key: number]: string[];
};

export const usePinnedLeagues = () => {
  const [pinnedLeagueIds, setPinnedLeagueIds] = useLocalStorage<PinnedLeagues>(
    "leagueIds",
    defaultPinnedLeagues
  );

  useEffect(() => {
    const storedPinnedIds = JSON.parse(
      localStorage.getItem("leagueIds") || "{}"
    );

    if (!Object.keys(storedPinnedIds).length) {
      setPinnedLeagueIds(defaultPinnedLeagues);
      return;
    }

    setPinnedLeagueIds(storedPinnedIds);
  }, []);

  const addLeagueToLocalStorage = (sportId: number, tournamentId: leagueId) => {
    setPinnedLeagueIds((prevPinnedLeagues) => {
      const currentLeagues = prevPinnedLeagues[sportId] || {};
      const isLeaguePinned = currentLeagues.includes(tournamentId);

      const updatedLeagues = isLeaguePinned
        ? currentLeagues.filter((id: string) => id !== tournamentId)
        : [...currentLeagues, tournamentId];

      return {
        ...prevPinnedLeagues,
        [sportId]: updatedLeagues,
      };
    });
  };

  const removePinnedLeague = (sportId: number, tournamentId: leagueId) => {
    setPinnedLeagueIds((prevPinnedLeagues) => {
      const currentLeagues = prevPinnedLeagues[sportId] || [];
      const updatedLeagues = currentLeagues.filter(
        (id: string) => id !== tournamentId
      );

      return {
        ...prevPinnedLeagues,
        [sportId]: updatedLeagues,
      };
    });
  };

  return { pinnedLeagueIds, addLeagueToLocalStorage, removePinnedLeague };
};
