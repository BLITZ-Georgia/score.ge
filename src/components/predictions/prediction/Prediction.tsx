import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";

const Prediction = ({ border }: { border: boolean }) => {
  return (
    <section
      className={`${style.prediction} p-4 flex flex-col ${
        border ? style.borderItem : ""
      }`}
    >
      <article className="flex justify-between mb-2">
        <div className="flex flex-col items-center">
          <Image
            src="/images/home/predictionTeamLogo.png"
            alt="team"
            width={34}
            height={34}
            className="object-contain"
          />
          <p
            className={`text-xs  ${style.predictionTitleColor} mt-2 font-semibold`}
          >
            SEVILLA
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/home/predictionLogo.png"
            alt="logo"
            width={21}
            height={21}
            className="object-contain"
          />
          <p className={style.hour}>23:00</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/home/predictionTeamLogo.png"
            alt="team"
            width={34}
            height={34}
            className="object-contain"
          />
          <p
            className={`text-xs ${style.predictionTitleColor} mt-2 font-semibold`}
          >
            ROMA
          </p>
        </div>
      </article>
      <div
        className={`flex justify-center items-center ${style.predictionLink}`}
      >
        <Link href="/prediction" className={` text-xs`}>
          PREDICTION
        </Link>
      </div>
    </section>
  );
};

export default Prediction;
