export interface League {
  LEAGUE_NAME: string;
  SPORT_ID: number;
  ACTUAL_TOURNAMENT_SEASON_ID: string;
  COUNTRY_ID: string;
  stageSeasonId: {
    STAGE_ID: string;
    STAGE_NAME?: string;
  };
}

export interface Country {
  COUNTRY_ID: number;
  COUNTRY_NAME: string;
  leagues: League[];
}

export interface CountryItemProps {
  sportChekedId: number;
  sportName: string;
  countryName: string;
  leagueName: string;
  stageId: string;
  name: string;
  seasonId: string;
  pinnedLeagueIds: Record<number, string[]>;
  addLeagueToLocalStorage: (sportId: number, stageId: string) => void;
}
