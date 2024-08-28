export function mutateLeagueMatchRounds(data: any) {
  const combinedData = data.flat();

  // Assuming the first item has the common league information
  const leagueInfo = {
    CATEGORY_NAME: combinedData[0].CATEGORY_NAME,
    COUNTRY_ID: combinedData[0].COUNTRY_ID,
    COUNTRY_NAME: combinedData[0].COUNTRY_NAME,
    NAME: combinedData[0].NAME,
    NAME_PART_1: combinedData[0].NAME_PART_1,
    NAME_PART_2: combinedData[0].NAME_PART_2,
    TOURNAMENT_ID: combinedData[0].TOURNAMENT_ID,
    TOURNAMENT_IMAGE: combinedData[0].TOURNAMENT_IMAGE,
    TOURNAMENT_SEASON_ID: combinedData[0].TOURNAMENT_SEASON_ID,
    TOURNAMENT_STAGE_ID: combinedData[0].TOURNAMENT_STAGE_ID,
    TOURNAMENT_STAGE_TYPE: combinedData[0].TOURNAMENT_STAGE_TYPE,
    URL: combinedData[0].URL,
  };

  // Combine and group events by their round
  const eventsByRoundObject = combinedData
    .flatMap((dataItem: any) => dataItem.EVENTS)
    .reduce((acc: any, event: any) => {
      const round = event.ROUND || "Unknown Round";
      if (!acc[round]) {
        acc[round] = [];
      }
      acc[round].push(event);
      return acc;
    }, {});

  // Transform the eventsByRoundObject into an array of objects
  const eventsByRound = Object.keys(eventsByRoundObject).map((round) => ({
    round,
    events: eventsByRoundObject[round],
  }));

  // Create the final combined object
  const finalData = {
    ...leagueInfo,
    EVENTS: eventsByRound,
  };

  const sortedRoundsArray = finalData?.EVENTS?.sort((a: any, b: any) => {
    return extractRoundNumber(a.round) - extractRoundNumber(b.round);
  });

  const sortedResultsArray = finalData?.EVENTS?.sort((a: any, b: any) => {
    return extractRoundNumber(b.round) + extractRoundNumber(a.round);
  });

  return { finalData, sortedRoundsArray, sortedResultsArray };
}

function extractRoundNumber(roundString: any) {
  return parseInt(roundString.split(" ")[1]);
}
