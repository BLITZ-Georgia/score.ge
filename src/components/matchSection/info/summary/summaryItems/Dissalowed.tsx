import React from "react";
import style from "../style.module.css";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import Link from "next/link";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { HiMiniVideoCamera } from "react-icons/hi2";

const Dissalowed = ({
  type,
  time,
  id,
  name,
  incidentName,
  side,
}: {
  type: string;
  time: string;
  id: string;
  name: string;
  incidentName: string;
  side: string;
}) => {
  const sportId = useSportIdHandler();
  return (
    <div className={`${style.incidentItem} flex items-center gap-x-2`}>
      <p className={style.incidentTime}>{time}</p>
      <div className={`${style.card} `}>
        <HiMiniVideoCamera />
      </div>
      <div className={`flex items-center ${style.incidentName}`}>
        {incidentName}
        <Link
          href={`/player/${name}?playerId=${id}&sportId=${sportId?.id}`}
          className="flex items-center ml-1 font-normal"
        >
          ({name})
        </Link>
      </div>
    </div>
  );
};

export default Dissalowed;
