import React from "react";
import style from "./style.module.css";
import WillNotPlay from "../../info/notPlay/NotPlay";
import Image from "next/image";

const Injuries = ({ coaches }: { coaches: any }) => {
  if (!coaches) {
    return <WillNotPlay />;
  }
  const [formation1, formation2] = coaches?.FORMATIONS;

  return (
    <article
      className={`${style.injuries}  flex justify-between p-3 gap-x-3 flex-col px-0`}
    >
      <WillNotPlay />

      <div className={`${style.title} mb-4 `}>
        <p>COACHES</p>
      </div>

      <article className={`${style.coaches} mb-4 `}>
        <div>
          {formation1?.MEMBERS.map((el: any) => {
            return (
              <div
                className={`${style.coach}  flex items-center `}
                key={el.PLAYER_ID}
              >
                <div className={`${style.flag} mr-2 `}>
                  <div className={`${style.flagBorder} `}>
                    <Image
                      width={16}
                      height={16}
                      alt="player"
                      src={"/images/default/person.gif"}
                    />
                  </div>
                </div>
                <div className={`${style.player}  `}>
                  <h2>{el.PLAYER_FULL_NAME}</h2>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          {formation2?.MEMBERS.map((el: any) => {
            return (
              <div
                className={`${style.coach}  ${style.coachTwo} flex items-center `}
                key={el.PLAYER_ID}
              >
                <div className={`${style.flag} ml-2 `}>
                  <div className={`${style.flagBorder} `}>
                    <Image
                      width={16}
                      height={16}
                      alt="player"
                      src={"/images/default/person.gif"}
                    />
                  </div>
                </div>
                <div className={`${style.player}  `}>
                  <h2>{el.PLAYER_FULL_NAME}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </article>
  );
};

export default Injuries;
