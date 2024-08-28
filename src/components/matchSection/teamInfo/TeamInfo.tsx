import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import { Live } from "@/common/svg/match";
import { EmptyFavouriteStarIcon } from "@/common/svg/home";
import { useAddToMyTeams } from "@/components/hooks/useAddToMyTeam";

interface props {
  data: any;
}

const TeamInfo: React.FC<props> = ({ data }) => {
  const START_TIME = data?.START_TIME;
  const sportIdCheck = useSportIdHandler();
  const date = new Date(START_TIME * 1000);
  const { addToMyTeam, isFavorited } = useAddToMyTeams();

  const formattedDate = date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  const [homeTeamId] = data?.HOME_PARTICIPANT_IDS;
  const [awayTeamId] = data?.AWAY_PARTICIPANT_IDS;

  const isEventFavouritedFirstTeam = isFavorited(homeTeamId);
  const isEventFavouritedSecondTeam = isFavorited(awayTeamId);

  return (
    <section className={`${style.teamInfo}  w-full px-3`}>
      <article className="flex justify-around">
        <div className={`${style.infoItem} flex flex-col`}>
          <div
            className={`flex items-center justify-center mr-4
          ${style.starIcon} ${isEventFavouritedFirstTeam ? style.favorited : ""}
           `}
            onClick={() =>
              addToMyTeam(
                data?.HOME_NAME,
                data?.HOME_IMAGES
                  ? data?.HOME_IMAGES[0]
                  : "/images/default/club.gif",
                homeTeamId,
                `${data?.HOME_NAME}`,
                sportIdCheck?.id
              )
            }
          >
            <EmptyFavouriteStarIcon />
          </div>

          <Link
            href={`/team/${data?.SHORTNAME_HOME}?id=${homeTeamId}&sportId=${sportIdCheck?.id}`}
          >
            <>
              <div className={`${style.infoImage}`}>
                <Image
                  src={
                    data?.HOME_IMAGES
                      ? data?.HOME_IMAGES[0]
                      : "/images/default/club.gif"
                  }
                  alt="club"
                  width={55}
                  height={55}
                />
              </div>

              <h3 className="text-center font-bold">
                {data?.HOME_NAME.replace("*", "").trim()}
              </h3>
            </>
          </Link>
        </div>

        <div className={`${style.infoTime} flex flex-col items-center`}>
          <p className={`${data.STAGE_TYPE === "LIVE" ? "mb-1" : "mb-5"} `}>
            {formattedDateTime}
          </p>
          {data.STAGE_TYPE === "LIVE" && (
            <div className={`w-6 h-6`}>
              <Live />
            </div>
          )}
          <div
            className={`flex items-center gap-x-2 ${
              data.STAGE_TYPE == "LIVE" ? style.live : ""
            }`}
          >
            <h3 className={`text-4xl `}>
              {data?.HOME_SCORE_CURRENT && data?.HOME_SCORE_CURRENT}
            </h3>
            <h4>
              <svg
                width="13"
                height="5"
                viewBox="0 0 13 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5581 -0.00142133V4.81818H0.438743V-0.00142133H12.5581Z"
                  fill={`var(--match-league-title-color)`}
                />
              </svg>
            </h4>
            <h3 className="text-4xl">
              {data?.AWAY_SCORE_CURRENT && data?.AWAY_SCORE_CURRENT}
            </h3>
          </div>

          {data.STAGE_TYPE === "LIVE" && (
            <p className={style.live}>
              {" "}
              {`${data?.STAGE.slice(0, 1)}${data?.STAGE.slice(1)
                .toLowerCase()
                .replace("_", " ")}`}
            </p>
          )}
          {data?.STAGE === "FINISHED" && (
            <p className={style.stageTitle}>{data?.STAGE}</p>
          )}
        </div>

        <div className={`${style.infoItem} flex flex-col`}>
          <div
            className={`flex items-center justify-center mr-4
          ${style.starIcon} ${
              isEventFavouritedSecondTeam ? style.favorited : ""
            }
           ${style.starIconRight}`}
            onClick={() =>
              addToMyTeam(
                data?.AWAY_NAME,
                data?.AWAY_IMAGES
                  ? data?.AWAY_IMAGES[0]
                  : "/images/default/club.gif",
                awayTeamId,
                `${data?.AWAY_NAME}`,
                sportIdCheck?.id
              )
            }
          >
            <EmptyFavouriteStarIcon />
          </div>
          <Link
            href={`/team/${data?.SHORTNAME_AWAY}?id=${awayTeamId}&sportId=${sportIdCheck?.id}`}
          >
            <>
              <div className={`${style.infoImage}`}>
                <Image
                  src={
                    data?.AWAY_IMAGES
                      ? data?.AWAY_IMAGES[0]
                      : "/images/default/club.gif"
                  }
                  alt="club"
                  width={55}
                  height={55}
                />
              </div>

              <h3 className="text-center font-bold">
                {data?.AWAY_NAME.replace("*", "").trim()}
              </h3>
            </>
          </Link>
        </div>
      </article>
    </section>
  );
};

export default TeamInfo;
