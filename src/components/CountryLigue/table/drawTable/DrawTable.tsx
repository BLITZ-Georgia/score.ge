"use client";
import React from "react";
import style from "./style.module.css";
import DrawItem from "./drawItems/DrawItem";

interface tableProps {
  data: any;
}

const DrawTable: React.FC<tableProps> = ({ data }) => {
  function createTennisCompetitionObject(data: any) {
    if (!data || data.length === 0) return [];

    const {
      DRAW_EVENT_PARTICIPANTS,
      DRAW_PARTICIPANT_IDS,
      DRAW_ROUNDS,
      PARTICIPANT_SIDE,
    } = data?.TABS;
    const { ROUNDS } = data;

    return ROUNDS.map((roundData: any) => {
      const roundName = DRAW_ROUNDS[roundData.DRAW_ROUND];

      const blocks = roundData.BLOCKS.map((block: any) => {
        const homeId = block.DRAW_ROUND_HOME_EVENT_PARTICIPANT;
        const awayId = block.DRAW_ROUND_AWAY_EVENT_PARTICIPANT;
        return {
          home: {
            id: DRAW_PARTICIPANT_IDS[homeId],
            name: DRAW_EVENT_PARTICIPANTS[homeId],
            side: PARTICIPANT_SIDE[homeId],
            number: block.DRAW_EVENT_PARTICIPANT_INFO_HOME || "",
            results: block.DRAW_ROUND_HOME_RESULTS || [],
          },
          away: {
            id: DRAW_PARTICIPANT_IDS[awayId],
            name: DRAW_EVENT_PARTICIPANTS[awayId],
            side: PARTICIPANT_SIDE[awayId],
            number: block.DRAW_EVENT_PARTICIPANT_INFO_AWAY || "",
            results: block.DRAW_ROUND_AWAY_RESULTS || [],
          },
          winnerOverall: block.DRAW_ROUND_EVENT_WINNER_OVERALL || "",
          eventId: block.DRAW_ROUND_EVENT_ID || "",
          eventStart: block.DRAW_ROUND_EVENT_START || "",
          eventIds: block.DRAW_ROUND_EVENT_IDS || [],
        };
      });

      return {
        roundName,
        roundNumber: roundData.DRAW_ROUND,
        blocks,
      };
    });
  }

  const dataObj = createTennisCompetitionObject(data);

  return (
    <section className={`${style.info}`}>
      <div className={style.drawContainer}>
        <div className={style.tableWrapper}>
          {dataObj.map((draw: any, index: number) => {
            return (
              <article className={style.drawTable} key={index}>
                <div
                  className={`${style.infoTableTitle} flex items-center  p-2 gap-x-2`}
                >
                  <p className="flex items-center justify-center font-normal">
                    {draw.roundName}
                  </p>
                </div>
                <div
                  className={style.drawTableList}
                  style={{
                    gridTemplateRows: `repeat(${draw?.blocks.length},62px)`,
                  }}
                >
                  {draw?.blocks.map((block: any) => {
                    const homeResult = Array.isArray(block?.home?.results)
                      ? block.home.results
                      : [];
                    const awayResult = Array.isArray(block?.away?.results)
                      ? block.away.results
                      : [];

                    return (
                      <DrawItem
                        homeNumber={block.home.number}
                        homeResuls={homeResult}
                        homeName={block.home.name}
                        homeSide={block.home.side}
                        awayNumber={block.away.number}
                        awayResuls={awayResult}
                        awayName={block.away.name}
                        awaySide={block.away.side}
                        eventId={block.eventId}
                        key={block.roundName}
                        eventIds={block.eventIds}
                      />
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DrawTable;
