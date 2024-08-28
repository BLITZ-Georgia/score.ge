import React from "react";
import League from "./matchLeague/MatchLeague";
import { usePinnedLeagues } from "@/components/hooks/usePineedLeagues";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

interface matchProps {
  selectedMatchNav: string;
  data: any;
}

const MatchLists: React.FC<matchProps> = ({ selectedMatchNav, data }) => {
  const { pinnedLeagueIds } = usePinnedLeagues();
  const sportid = useSportIdHandler();

  const filterEvents = (events: any[]) => {
    switch (selectedMatchNav) {
      case "LIVE":
        return events.filter((event) => event.STAGE_TYPE === "LIVE");
      case "ODDS":
        return events.filter((event) => event.STAGE === "ODDS");
      case "FINISHED":
        return events.filter(
          (event) => event.STAGE === "FINISHED" || event.STAGE === "AWARDED"
        );
      case "SCHEDULED":
        return events.filter((event) => event.STAGE === "SCHEDULED");
      case "ALL":
      default:
        return events;
    }
  };

  const isPinnedLeague = (leagueId: string) => {
    const id = sportid?.id ? Number(sportid?.id) : 1;
    return pinnedLeagueIds[id]?.includes(leagueId);
  };

  const filteredMatchData = data?.DATA?.map((matchData: any) => {
    const filteredEvents = filterEvents(matchData.EVENTS);
    return { ...matchData, EVENTS: filteredEvents };
  })
    .filter((matchData: any) => matchData.EVENTS.length > 0)
    .sort((a: any, b: any) => {
      const isPinnedA = isPinnedLeague(a.TOURNAMENT_SEASON_ID);
      const isPinnedB = isPinnedLeague(b.TOURNAMENT_SEASON_ID);

      if (isPinnedA && !isPinnedB) return -1;
      if (!isPinnedA && isPinnedB) return 1;
      return 0;
    });

  return (
    <section className={` mt-5`}>
      {filteredMatchData?.map((eventMatch: any) => {
        const isTournamentP = eventMatch?.TOURNAMENT_TYPE === "p";
        const isPinnedTournament = isPinnedLeague(
          eventMatch.TOURNAMENT_SEASON_ID
        );

        return (
          <League
            tournamentStageId={eventMatch.TOURNAMENT_STAGE_ID}
            NAME1={eventMatch.NAME_PART_1}
            NAME2={eventMatch.NAME_PART_2}
            url={eventMatch.URL}
            events={eventMatch.EVENTS}
            countryId={eventMatch.COUNTRY_ID}
            tournamentId={eventMatch.TOURNAMENT_ID}
            key={eventMatch.TOURNAMENT_STAGE_ID}
            countryName={eventMatch.COUNTRY_NAME}
            showMatchesDefault={isTournamentP || isPinnedTournament}
          />
        );
      })}
    </section>
  );
};

export default MatchLists;
