"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import Image from "next/image";
import { Mark } from "@/common/svg/mark";
import { usePinnedLeagues } from "@/components/hooks/usePineedLeagues";
import { useSearchParams } from "next/navigation";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

const LeagueTitle = ({
  leagueName,
  leagueImage,
}: {
  leagueName: string;
  leagueImage: string;
}) => {
  const currentYear = new Date().getFullYear();
  const { pinnedLeagueIds, addLeagueToLocalStorage } = usePinnedLeagues();
  const searchParams = useSearchParams();
  const sportIdCheck = useSportIdHandler();
  const sportId = sportIdCheck?.id ? Number(sportIdCheck?.id) : 1;

  const tournamentId = searchParams.get("tournamentId") || "";

  const isActivePin = pinnedLeagueIds[sportId]?.includes(tournamentId);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActivePin) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isActivePin]);

  const imageUrl = leagueImage
    ? leagueImage
    : `/images/leagueMiddle/emptyLeagueLogo.gif`;

  return (
    <section className={`${style.leagueTitle} flex  items-center`}>
      <div className={style.img}>
        <Image src={imageUrl} alt="img" width={60} height={60} />
      </div>

      <div className={style.title}>
        <h3 className="flex items-center gap-x-4">
          {leagueName}{" "}
          <span
            className={`${isActive ? style.activePin : style.notActive}`}
            onClick={() => addLeagueToLocalStorage(sportId, tournamentId)}
          >
            <Mark />
          </span>
        </h3>
        <p>{currentYear}</p>
      </div>
    </section>
  );
};

export default LeagueTitle;
