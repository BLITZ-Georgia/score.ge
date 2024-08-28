import React from "react";
import style from "./style.module.css";
import PlayerInfo from "./playerInfo/PlayerInfo";
import Image from "next/image";
import ParamInfo from "../paramInfo/ParamInfo";
import LastPlayerEvents from "./lastPlayerMatches/LastPlayerMatches";
import PlayerCareer from "./playerCareer/PlayerCareer";
import PlayerTransfers from "./playerTransfers/PlayerTransfers";

const PlayerSection: React.FC = () => {
  return (
    <section className={`${style.playerSection} flex flex-col  `}>
      <div className=" p-4 mobilePadding8">
        <div className="bg-white rounded-lg p-4 mb-3 ">
          <ParamInfo />
          <PlayerInfo />
        </div>

        <LastPlayerEvents />
        <PlayerCareer />
        <PlayerTransfers />

        <div className="bg-white rounded-lg p-2 mt-3">
          <Image
            src="/images/ad/matchAd.png"
            alt="ad"
            width={658}
            height={100}
          />
        </div>
      </div>
    </section>
  );
};

export default PlayerSection;
