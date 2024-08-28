import React from "react";
import style from "./style.module.css";

interface props {
  data: any;
  teamOneFormation: any;
  teamTwoFormation: any;
  homeTeamName: string;
  awayTeamName: string;
}

interface Player {
  PLAYER_FULL_NAME: string;
  PLAYER_POSITION: number;
  PLAYER_NUMBER: number;
  PLAYER_ID: string;
}

const LineUp: React.FC<props> = ({
  teamOneFormation,
  data,
  teamTwoFormation,
  awayTeamName,
  homeTeamName,
}) => {
  const isLineUp = teamOneFormation?.FORMATION_DISPOSTION;

  const renderFormation = (formation: string, players: Player[]) => {
    const lines = formation.split("-").map(Number);
    let playerIndex = 0;

    return lines.map((count, lineIndex) => (
      <div key={lineIndex} className={style.line}>
        {Array.from({ length: count }).map((_, playerPos) => {
          const player = players[playerIndex];
          playerIndex++;
          return (
            <div key={player?.PLAYER_ID} className={style.player}>
              <div className={style.playerNumber}>{player?.PLAYER_NUMBER}</div>
              <div className={style.playerName}>
                <p>{player?.PLAYER_FULL_NAME}</p>
              </div>
            </div>
          );
        })}
      </div>
    ));
  };

  const sortingPlayers = (members: Player[]) => {
    return members.sort((a, b) => a.PLAYER_POSITION - b.PLAYER_POSITION);
  };

  return (
    <section className={`${style.lineUp}`}>
      <div className={`${style.title}`}>
        <p>Possible line up</p>
      </div>
      {data.DATA.length !== 0 && isLineUp ? (
        <article
          style={{ backgroundImage: "/images/match/stadium.jpg" }}
          className={`${style.stadium}`}
        >
          <div className={`${style.teamOne}`}>
            <p className={`${style.teamTitle}`}>
              {homeTeamName.replace("*", "").trim()}{" "}
              <span>{teamOneFormation?.FORMATION_DISPOSTION.slice(2)}</span>
            </p>
            <div className={`pt-6 ${style.teamOnePlayers}`}>
              {renderFormation(
                teamOneFormation.FORMATION_DISPOSTION,
                sortingPlayers(teamOneFormation.MEMBERS)
              )}
            </div>
          </div>
          <div className={`${style.teamTwo}`}>
            <p className={`${style.teamTitle}`}>
              {awayTeamName.replace("*", "").trim()}{" "}
              <span>{teamTwoFormation?.FORMATION_DISPOSTION.slice(2)}</span>
            </p>
            <div className={`pb-6 ${style.teamTwoPlayers}`}>
              {renderFormation(
                teamTwoFormation.FORMATION_DISPOSTION,
                sortingPlayers(teamTwoFormation.MEMBERS)
              )}
            </div>
          </div>
        </article>
      ) : (
        <div className="pl-2">
          <p className={style.noData} style={{ color: "var(--black-color)" }}>
            There is no information
          </p>
        </div>
      )}
    </section>
  );
};

export default LineUp;
