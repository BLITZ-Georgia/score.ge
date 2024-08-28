import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface playerProps {
  id: string;
  name: string;
  image: string;
  tournamentName: number;
  seasonLabel: string;
  stats: any;
}

const Career: React.FC<playerProps> = ({
  id,
  image,
  name,
  tournamentName,
  seasonLabel,
  stats,
}) => {
  const searchParams = useSearchParams();
  const sportId = searchParams.get("sportId");

  return (
    <div
      className={` ${style.infoItem} flex items-center justify-between py-3 `}
    >
      <p className={`${style.infoIndex} font-semibold mr-5`}>{seasonLabel}</p>
      <div className=" flex items-center ml-1">
        <span className={`${style.infoIcon} mr-2`}>
          <Image src={image} width={20} height={20} alt="player" />
        </span>
        <Link
          className={`${style.infoTitle} font-semibold `}
          href={`/team/${name}?id=${id}&sportId=${sportId} `}
        >
          {name}
        </Link>
      </div>

      <p className={`${style.tournamentName} font-semibold text-center px-3`}>
        {tournamentName}
      </p>
      <p className={`${style.infoNumber}  `}>{stats["13"]}</p>
      <p className={`${style.infoNumber}  `}>{stats["4"]}</p>
      <p className={`${style.infoNumber} font-bold `}>{stats["1"]}</p>
      <p className={`${style.infoNumber}  `}>{stats["8"]}</p>
      <p className={`${style.infoNumber}  `}>{stats["2"]}</p>
      <p className={`${style.infoNumber}  `}>{stats["3"]}</p>
    </div>
  );
};

export default Career;
