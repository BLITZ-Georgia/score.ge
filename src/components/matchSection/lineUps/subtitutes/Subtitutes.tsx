import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import Link from "next/link";

interface props {
  homeTeamImg: string[];
  awayTeamImg: string[];
  subtitiles: any;
}

const Subtitutes: React.FC<props> = ({
  subtitiles,
  awayTeamImg,
  homeTeamImg,
}) => {
  const [teamOneFormation, teamTwoFormation] = subtitiles?.FORMATIONS;
  const sportId = useSportIdHandler();

  return (
    <article
      className={`${style.lineUP}  flex justify-between p-3 pt-0 gap-x-3 flex-col px-0`}
    >
      <div className={`${style.title} mb-4  `}>
        <p>SUBSTITUTES</p>
      </div>

      <article className={`${style.info} mb-4 `}>
        <div>
          {teamOneFormation?.MEMBERS.map((el: any) => {
            return (
              <div className={`  flex items-center py-2 `} key={el.PLAYER_ID}>
                <div className={`${style.img} mr-2 flex items-center`}>
                  <div className={`${style.num} mr-2 `}>{el.PLAYER_NUMBER}</div>
                  <div className={`${style.imgBorder} `}>
                    <Image
                      src={
                        homeTeamImg
                          ? homeTeamImg[0]
                          : "/images/default/person.gif"
                      }
                      width={31}
                      height={31}
                      alt="flag"
                    />
                  </div>
                </div>
                <div className={`${style.player}  `}>
                  <Link
                    href={`/player/${el.PLAYER_FULL_NAME}?playerId=${el.PLAYER_ID}&sportId=${sportId?.id}`}
                  >
                    {" "}
                    <h2>{el.PLAYER_FULL_NAME}</h2>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          {teamTwoFormation?.MEMBERS.map((el: any) => {
            return (
              <div
                className={` py-2  ${style.playerTwo} flex items-center `}
                key={el.PLAYER_ID}
              >
                <div className={`${style.img} ml-2 flex items-center `}>
                  <div className={`${style.num} mr-2 `}>{el.PLAYER_NUMBER}</div>
                  <div className={`${style.imgBorder} `}>
                    <Image
                      src={
                        awayTeamImg
                          ? awayTeamImg[0]
                          : "/images/default/person.gif"
                      }
                      width={31}
                      height={31}
                      alt="flag"
                    />
                  </div>
                </div>
                <div className={`${style.player}  `}>
                  <Link
                    href={`/player/${el.PLAYER_FULL_NAME}?playerId=${el.PLAYER_ID}&sportId=${sportId?.id}`}
                  >
                    <h2>{el.PLAYER_FULL_NAME}</h2>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </article>
  );
};

export default Subtitutes;
