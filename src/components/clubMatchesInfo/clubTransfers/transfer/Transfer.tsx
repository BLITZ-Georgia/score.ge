import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

interface transferProps {
  id: string;
  transferDirection: string;
  transferType: string;
  tj: string;
  toValue: string;
  toImage: string;
  fromValue: string;
  fromImage: string;
  transferDate: number;
  player: string;
  playerID: string;
  playerImg: string;
}

function formatDate(unixTimestamp: number) {
  // Convert the Unix timestamp to milliseconds
  const date = new Date(unixTimestamp * 1000);

  // Get the day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  // Format the date as dd.mm.yyyy
  return `${day}.${month}.${year}`;
}

const Transfer: React.FC<transferProps> = ({
  transferDate,
  transferDirection,
  transferType,
  tj,
  toValue,
  toImage,
  id,
  fromValue,
  fromImage,
  player,
  playerID,
  playerImg,
}) => {
  const searchParams = useSearchParams();
  const sportId = searchParams.get("sportId");
  const formattedDate = formatDate(transferDate);
  let oppositeTeam = "";
  let oppositeTeamImage = "";

  if (transferDirection === "in") {
    oppositeTeam = fromValue;
    oppositeTeamImage = fromImage;
  } else if (transferDirection === "out") {
    oppositeTeam = toValue;
    oppositeTeamImage = toImage;
  }

  return (
    <div
      className={` ${style.infoItem} flex items-center justify-between py-3 `}
    >
      <p className={`${style.infoIndex} font-semibold mobileNone`}>
        {formattedDate}
      </p>
      <div className={`${style.infoNumber}  `}>
        <Link
          href={`/player/${player}?playerId=${playerID}&sportId=${sportId}`}
        >
          {player}
        </Link>
      </div>

      <div className={`${style.infoNumber}  `}>
        {transferDirection === "in" ? (
          <FaArrowLeft />
        ) : (
          <FaArrowRight fill="red" />
        )}
        <Image src={oppositeTeamImage} alt="teamLogo" width={16} height={16} />
        <p>{oppositeTeam} </p>
      </div>
      <div className={`${style.infoNumber}  flex-col ${style.reason}`}>
        <p>{transferType}</p>
        <p className={`${style.infoNumber} `}>{tj}</p>
      </div>
    </div>
  );
};

export default Transfer;
