export function mergeClubMatches(leagues: any[], leagueInfo: string) {
  const mergedLeagues: any = [];

  leagues?.forEach((league) => {
    const existingLeague = mergedLeagues.find(
      (l: any) => l.NAME === league.NAME
    );

    if (existingLeague) {
      existingLeague.EVENTS = existingLeague.EVENTS.concat(league.EVENTS);
    } else {
      mergedLeagues.push({ ...league });
    }
  });

  // Sort the EVENTS array within each league by START_TIME
  mergedLeagues.forEach((league: any) => {
    if (leagueInfo == "fixtures") {
      league.EVENTS.sort((a: any, b: any) => a.START_TIME - b.START_TIME);
    } else {
      league.EVENTS.sort((a: any, b: any) => b.START_TIME - a.START_TIME);
    }
  });

  return mergedLeagues;
}
