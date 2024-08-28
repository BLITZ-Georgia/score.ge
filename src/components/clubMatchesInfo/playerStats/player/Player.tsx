import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface playerProps {
  id: string;
  name: string;
  image: string;
  number: number;
  playerEvents: any[];
  isLoading: boolean;
  typeId: string;
}

const Player: React.FC<playerProps> = ({
  id,
  image,
  name,
  number,
  playerEvents,
  isLoading = true,
  typeId,
}) => {
  const searchParams = useSearchParams();
  const sportId = searchParams.get("sportId");

  const gamesPlayed = playerEvents.filter((event: any) => event?.STATS);

  const statsArray = gamesPlayed.flatMap((item) => {
    const stats = [Object.values(item.STATS)];
    return stats;
  });

  const totalMinutesPlayed = statsArray
    .flatMap((array) => array)
    .filter((item: any) => item.TYPE === "minutes-played")
    .reduce(
      (total: any, item: any) =>
        total + parseInt(item.VALUE.replace("'", ""), 10),
      0
    );

  const totalGoals = statsArray
    .flatMap((array) => array)
    .filter((item: any) => item.TYPE === "goal")
    .reduce(
      (total: any, item: any) =>
        total + parseInt(item.VALUE.replace("'", ""), 10),
      0
    );

  const totalAssist = statsArray
    .flatMap((array) => array)
    .filter((item: any) => item.TYPE === "assist")
    .reduce(
      (total: any, item: any) =>
        total + parseInt(item.VALUE.replace("'", ""), 10),
      0
    );

  const totalYellowCard = statsArray
    .flatMap((array) => array)
    .filter((item: any) => item.TYPE === "yellow-card")
    .reduce(
      (total: any, item: any) =>
        total + parseInt(item.VALUE.replace("'", ""), 10),
      0
    );

  const totalRedCard = statsArray
    .flatMap((array) => array)
    .filter((item: any) => item.TYPE === "red-card")
    .reduce(
      (total: any, item: any) =>
        total + parseInt(item.VALUE.replace("'", ""), 10),
      0
    );

  return (
    <div
      className={` ${style.infoItem} flex items-center justify-between p-4 mb-4`}
    >
      <p className={`${style.infoIndex} font-semibold`}>{number}</p>
      <div className=" flex items-center">
        <span className={`${style.infoIcon} mr-2`}>
          <Image
            src={image ? image : "/images/default/person.gif"}
            width={20}
            height={20}
            alt="player"
          />
        </span>
        <Link href={`/player/${name}/?playerId=${id}&sportId=${sportId}`}>
          <h3 className={`${style.infoTitle} font-semibold `}>{name}</h3>
        </Link>
      </div>
      {typeId === "COACH" ? (
        <div></div>
      ) : !isLoading ? (
        <Spin indicator={<LoadingOutlined spin />} />
      ) : (
        <>
          <p className={`${style.infoNumber} font-semibold `}>
            {gamesPlayed.length}
          </p>
          <p className={`${style.infoNumber} font-semibold `}>
            {totalMinutesPlayed ? totalMinutesPlayed.toString() : "0"}
          </p>
          <p className={`${style.infoNumber} font-semibold `}>
            {totalGoals ? totalGoals.toString() : "0"}
          </p>
          <p className={`${style.infoNumber} font-semibold `}>
            {totalAssist ? totalAssist.toString() : "0"}
          </p>
          <p className={`${style.infoNumber} font-semibold `}>
            {totalYellowCard ? totalYellowCard.toString() : "0"}
          </p>
          <p className={`${style.infoNumber} font-semibold `}>
            {totalRedCard ? totalRedCard.toString() : "0"}
          </p>{" "}
        </>
      )}
    </div>
  );
};

export default Player;
