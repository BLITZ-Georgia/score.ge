import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";

import { EmptyFavouriteStarIcon } from "@/common/svg/home";
import {
  useFavouriteLeagues,
  isFavoriteEvent,
} from "@/components/hooks/useFavouriteLeagues ";

interface matchProps {
  homeTeam: any;
  awayTeam: any;
  homeScore: any;
  awayScore: any;
  status: any;
  awayImage: [string];
  homeImage: [string];
  ShowFullDate?: boolean;
  time: number;
  id: string;
  tournamentId: string;
  sportHref: string;
  removeEventFromLeague: any;
}

const Match: React.FC<matchProps> = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  ShowFullDate = false,
  awayImage,
  homeImage,
  time,
  id,
  sportHref,
  tournamentId,
  removeEventFromLeague,
}) => {
  const timeStamp = time * 1000;
  const date = new Date(timeStamp);

  const { favouriteLeagues } = useFavouriteLeagues();

  const allStageIds = favouriteLeagues.reduce((acc: any, league: any) => {
    return acc.concat(league.stageIds);
  }, []);

  const hour = date.getHours();
  const minute = date.getMinutes();

  const formattedDate = date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const isEventFavourited = isFavoriteEvent(id, allStageIds);

  return (
    <div className={`flex ${style.matchContainer} p-2`}>
      <div
        className={`flex items-center justify-center mr-7  ${style.starIcon} ${
          isEventFavourited ? style.favorited : ""
        }`}
        onClick={removeEventFromLeague}
      >
        <EmptyFavouriteStarIcon />
      </div>
      <Link
        href={`${sportHref}/match/event?id=${id}`}
        target="_blank"
        className="w-full"
      >
        <section className={` items-center ${style.match}`}>
          <article className={`flex   items-center `}>
            <div className={`${style.dateInfo} mr-7 w-16 `}>
              {!ShowFullDate && (
                <h4>
                  {status == "SCHEDULED" ||
                  status == "SECOND_HALF" ||
                  status == "FIRST_HALF" ||
                  status == "HALF_TIME" ? (
                    <span>
                      {hour}:{minute === 0 ? "00" : minute}
                    </span>
                  ) : (
                    <span
                      className={`font-xs font-medium ${style.predictionTitleColor}`}
                    >
                      {status}
                    </span>
                  )}
                </h4>
              )}

              {ShowFullDate && <h4>{formattedDate}</h4>}
            </div>
            <div className={`flex  flex-col ${style.matchesItems}`}>
              <div className="flex  flex-row mb-1">
                <p className="mr-2">
                  <Image
                    src={
                      homeImage && homeImage !== null
                        ? homeImage[0]
                        : "/images/default/club.gif"
                    }
                    alt="club"
                    width={16}
                    height={16}
                    priority
                  />
                </p>
                <p>{homeTeam}</p>
              </div>

              <div className="flex  flex-row mb-1">
                <p className="mr-2">
                  <Image
                    src={
                      awayImage && awayImage !== null
                        ? awayImage[0]
                        : "/images/default/club.gif"
                    }
                    alt="club"
                    width={16}
                    height={16}
                    priority
                  />
                </p>
                <p>{awayTeam}</p>
              </div>
            </div>
          </article>
          <div className={`flex  flex-col ${style.scoreInfo}`}>
            <p className="text-xs font-semibold mb-2 ">
              {homeScore ? homeScore : "-"}
            </p>
            <p className="text-xs font-semibold ">
              {awayScore ? awayScore : "-"}
            </p>
          </div>

          <div
            className={`flex ${style.moreBtn} px-2 py-1 items-center justify-center`}
          >
            <p>MORE INFO</p>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default Match;
