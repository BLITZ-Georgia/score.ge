import React from "react";
import style from "../style.module.css";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import Link from "next/link";
import { IoFootballOutline } from "react-icons/io5";
import { RiAlertFill } from "react-icons/ri";

const Penalty = ({
  type,
  time,
  id,
  name,
  incidentName,
  awayScore,
  homeScore,
  stageName,
}: {
  type: string;
  time: string;
  id: string;
  name: string;
  incidentName: string;
  awayScore?: string;
  homeScore?: string;
  stageName: string;
}) => {
  const sportId = useSportIdHandler();
  return (
    <div className={`${style.incidentItem} flex items-center gap-x-2`}>
      {type === "PENALTY_KICK" && <p className={style.incidentTime}>{time}</p>}

      {type === "PENALTY_MISSED" && (
        <div className="flex items-center gap-x-2">
          <span className={style.incidentTipInfo}>({incidentName})</span>
          <div className={`${style.card} `}>
            <RiAlertFill fill="red" />
          </div>
        </div>
      )}

      {type === "PENALTY_SCORED" && (
        <div className="flex items-center gap-x-2">
          <span className={style.incidentTipInfo}>({incidentName})</span>
          <div className={`${style.card} gap-x-1`}>
            <IoFootballOutline />
            {stageName !== "Penalties" && (
              <div className={style.penaltyScored}>
                {homeScore}-{awayScore}
              </div>
            )}
          </div>
        </div>
      )}

      {type === "PENALTY_KICK" && (
        <Link
          href={`/player/${name}?playerId=${id}&sportId=${sportId?.id}`}
          className="flex items-center"
        >
          {name}
        </Link>
      )}
    </div>
  );
};

export default Penalty;
