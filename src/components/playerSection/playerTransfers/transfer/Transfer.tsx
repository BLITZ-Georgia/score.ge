import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

interface transferProps {
  id: string;
  reason: string;
  transferDate: string;
  fromTeamId: string;
  fromTeamName: string;
  fromTeamLogo: string;
  toTeamId: string;
  toTeamName: string;
  toTeamLogo: string;
  par: string;
}

const Transfer: React.FC<transferProps> = ({
  transferDate,
  reason,
  fromTeamId,
  fromTeamLogo,
  fromTeamName,
  id,
  toTeamId,
  toTeamLogo,
  toTeamName,
  par,
}) => {
  const searchParams = useSearchParams();
  const sportId = searchParams.get("sportId");

  return (
    <div
      className={` ${style.infoItem} flex items-center justify-between py-3 `}
    >
      <p className={`${style.infoIndex} font-semibold mobileNone`}>
        {transferDate}
      </p>
      <p className={`${style.infoNumber}  ${style.mobileFromSection}`}>
        <Image src={fromTeamLogo} alt="teamLogo" width={16} height={16} />
        <Link
          href={`/team/${fromTeamName}?id=${fromTeamId}&sportId=${sportId}`}
        >
          {fromTeamName}
        </Link>
        <span className={`desktopNo `}>{transferDate}</span>
      </p>
      <p className={`${style.infoNumber} uppercase font-mono mobileNone `}>
        <FaArrowRight />
        <span className="flex items-center">{reason}</span>
      </p>
      <p className={`${style.infoNumber}  `}>
        <Image src={toTeamLogo} alt="teamLogo" width={16} height={16} />
        <Link href={`/team/${toTeamName}?id=${toTeamId}&sportId=${sportId}`}>
          {toTeamName}
        </Link>
      </p>
      <p className={`${style.infoNumber} mobileNone`}>{par}</p>
      <p
        className={`${style.infoNumber} uppercase font-mono  justify-end  desktopNo ${style.reason}`}
      >
        {reason}
      </p>
    </div>
  );
};

export default Transfer;
