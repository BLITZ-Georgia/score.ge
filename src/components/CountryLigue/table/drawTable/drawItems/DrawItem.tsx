"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

interface draw {
  homeNumber: string;
  homeResuls: string[];
  homeName: string;
  homeSide: string;
  awayNumber: string;
  awayResuls: string[];
  awayName: string;
  awaySide: string;
  eventId: string;
  eventIds: string[] | [];
}

const DrawItem: React.FC<draw> = ({
  awayName,
  awayNumber,
  awayResuls,
  awaySide,
  homeName,
  homeNumber,
  homeResuls,
  homeSide,
  eventId,
  eventIds,
}) => {
  const sportId = useSportIdHandler();
  const [showMatches, setShowMatches] = useState<boolean>(false);

  return (
    <div className={`${style.draw}  flex flex-col justify-between`}>
      <Link
        href={`${sportId?.href}/match/event?id=${eventId}`}
        target="_blank"
        onClick={(e: any) => {
          if (!eventId || eventIds.length) e.preventDefault();
          if (eventIds.length != 0) setShowMatches((state: boolean) => !state);
        }}
        className={style.drawLink}
      >
        <div
          className={`${style.drawPlayers}`}
          style={{
            cursor: !eventId ? "not-allowed" : "pointer",
            backgroundColor: showMatches ? "var(--black-color)" : "",
            color: showMatches ? "var(--white-color)" : "",
            borderBottomRightRadius: showMatches ? 0 : "",
            borderBottomLeftRadius: showMatches ? 0 : "",
          }}
        >
          {homeName && (
            <div className={`${style.homePlayer}`}>
              <span className="mr-1">({homeSide})</span>

              {homeName}
            </div>
          )}
          <div className={`${style.homeScore}`}>
            {homeResuls?.map((num: string, id: number) => (
              <span key={id} style={{ width: "12px" }}>
                {num}
              </span>
            ))}
          </div>
          {awayName && (
            <div className={`${style.awayPlayer}`}>
              <span className="mr-1">({awaySide})</span>

              {awayName}
            </div>
          )}
          <div className={`${style.awayScore}`}>
            {awayResuls?.map((num: string, id: number) => (
              <span key={id} style={{ width: "12px" }}>
                {num}
              </span>
            ))}
          </div>
        </div>
      </Link>
      {showMatches ? (
        <div className={` ${style.drawPlayers} ${style.eventsDropDown}`}>
          <div className={`${style.dropDownList} `}>
            {eventIds.map((event: any, id: number) => {
              const [dropDownEventId, visit, , time, score] = event.split(";");

              const timestamp = time * 1000;
              const date = new Date(timestamp);
              const day = String(date.getDate()).padStart(2, "0");
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const formattedDate = `${day}.${month}`;

              return (
                <div
                  className={`${style.dropDownItem} flex items-center gap-x-2 py-2`}
                  style={{
                    borderBottom:
                      id === 0 ? " 1px solid var(--grey-color)" : "",
                  }}
                  key={id}
                >
                  <span className="w-12 pl-2">{formattedDate}</span>
                  <Link
                    href={`${sportId?.href}/match/event?id=${dropDownEventId}`}
                    className="flex items-center gap-x-2 justify-between w-full"
                    target="_blank"
                  >
                    <p
                      className={`flex items-center`}
                      style={{
                        flexDirection: id == 1 ? "row-reverse" : "row",
                      }}
                    >
                      <span>{homeSide}</span> - <span>{awaySide}</span>
                    </p>
                    <p className="pr-2">{score}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DrawItem;
