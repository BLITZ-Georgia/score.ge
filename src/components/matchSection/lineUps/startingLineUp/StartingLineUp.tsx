import React from "react";
import style from "./style.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

const StartingLineUp = ({
  teamOneFormation,
  teamTwoFormation,
}: {
  teamOneFormation: any;
  teamTwoFormation: any;
}) => {
  const sportId = useSportIdHandler();

  return (
    <article
      className={`${style.lineUP}  flex justify-between p-3 gap-x-3 flex-col px-0`}
    >
      <div className={`${style.title} mb-4 `}>
        <p>Starting Line Up</p>
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
                      width={16}
                      height={16}
                      alt="player"
                      src={"/images/default/person.gif"}
                    />
                  </div>
                </div>
                <div className={`${style.player}  `}>
                  <Link
                    href={`/player/${el.PLAYER_FULL_NAME}?playerId=${el.PLAYER_ID}&sportId=${sportId?.id}`}
                  >
                    <h2>{el.PLAYER_FULL_NAME}</h2>{" "}
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
                      width={16}
                      height={16}
                      alt="player"
                      src={"/images/default/person.gif"}
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

export default StartingLineUp;
