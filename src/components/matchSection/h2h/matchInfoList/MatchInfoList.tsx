import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { Tooltip } from "antd";
import Image from "next/image";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

const MatchInfoList = ({ filteredData }: { filteredData: any }) => {
  const [matchLengths, setMatchLengths] = useState(
    filteredData?.GROUPS.map(() => 5) // Initial length of 5 for each group
  );

  const showMoreMatches = (index: number) => {
    setMatchLengths((prev: any) =>
      prev.map((length: any, i: any) => (i === index ? length + 5 : length))
    );
  };

  const sportIdCheck = useSportIdHandler();

  return (
    <>
      {filteredData?.GROUPS.map((matches: any, index: number) => {
        return (
          <section key={index}>
            <div className={`${style.title}`}>{matches.GROUP_LABEL}</div>

            {matches.ITEMS.slice(0, matchLengths[index]).map((match: any) => {
              const date = new Date(match.START_TIME * 1000);
              const formattedDate = `${date.getDate()}.${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}.${date.getFullYear().toString().slice(-2)}`;

              const result =
                match.H_RESULT === "WIN"
                  ? "W"
                  : match.H_RESULT === "DRAW"
                  ? "D"
                  : match.H_RESULT === "LOST"
                  ? "L"
                  : match.H_RESULT === "WIN_OVERTIME"
                  ? "w"
                  : null;

              const whoWin =
                Number(match.HOME_SCORE_FULL) > Number(match.AWAY_SCORE_FULL)
                  ? match.HOME_PARTICIPANT
                  : Number(match.HOME_SCORE_FULL) <
                    Number(match.AWAY_SCORE_FULL)
                  ? match.AWAY_PARTICIPANT
                  : null;

              return (
                <article
                  className={`flex ${style.matchContainer} p-2`}
                  key={match.EVENT_ID}
                >
                  <Link
                    href={`${sportIdCheck?.alt}/match/event?id=${match.EVENT_ID}`}
                    target="_blank"
                    className="w-full"
                  >
                    <section className={` items-center ${style.match}`}>
                      <article
                        className={`flex   items-center ${style.matchInfoTitle} `}
                      >
                        <div className={`mr-7 ${style.dateTitle}`}>
                          <h4>{formattedDate}</h4>
                        </div>
                        <Tooltip title={match.COUNTRY}>
                          <div className="mr-7 font-bold ">
                            <h4>{match.EVENT_ACRONYM}</h4>
                          </div>
                        </Tooltip>
                        <div className={`flex  flex-col ${style.matchesItems}`}>
                          <div className="flex  flex-row mb-1">
                            <p className={`mr-2 ${style.clubImg}`}>
                              <Image
                                src={
                                  match.HOME_IMAGES &&
                                  match.HOME_IMAGES !== null
                                    ? match.HOME_IMAGES[0]
                                    : "/images/default/club.gif"
                                }
                                alt="club"
                                width={16}
                                height={16}
                                priority
                              />
                            </p>
                            <p
                              className={`${style.partificant} ${
                                whoWin === match.HOME_PARTICIPANT
                                  ? style.winner
                                  : ""
                              }`}
                            >
                              {match.HOME_PARTICIPANT.replace("*", "").trim()}
                            </p>
                          </div>

                          <div className="flex  flex-row mb-1">
                            <p className={`mr-2 ${style.clubImg}`}>
                              <Image
                                src={
                                  match.AWAY_IMAGES &&
                                  match.AWAY_IMAGES !== null
                                    ? match.AWAY_IMAGES[0]
                                    : "/images/default/club.gif"
                                }
                                alt="club"
                                width={16}
                                height={16}
                                priority
                              />
                            </p>
                            <p
                              className={`${style.partificant} ${
                                whoWin === match.AWAY_PARTICIPANT
                                  ? style.winner
                                  : ""
                              }`}
                            >
                              {match.AWAY_PARTICIPANT.replace("*", "").trim()}
                            </p>
                          </div>
                        </div>
                      </article>
                      <div className={`flex  flex-col ${style.scoreInfo}`}>
                        <p className="text-xs font-semibold mb-2 ">
                          {match.HOME_SCORE_FULL}
                        </p>
                        <p className="text-xs font-semibold ">
                          {match.AWAY_SCORE_FULL}
                        </p>
                      </div>

                      {result && (
                        <div
                          className={`flex ${style.moreBtn} px-2 py-1 items-center justify-center`}
                        >
                          <p className={`${style[result]}`}>
                            {result.toUpperCase()}
                          </p>
                        </div>
                      )}
                    </section>
                  </Link>
                </article>
              );
            })}
            {matchLengths[index] < matches.ITEMS.length && (
              <div className={style.moreMatches}>
                <button onClick={() => showMoreMatches(index)}>
                  Show More Matches
                </button>
              </div>
            )}
          </section>
        );
      })}
    </>
  );
};

export default MatchInfoList;
