import React from "react";
import style from "./style.module.css";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import Image from "next/image";
import { Skeleton } from "antd";

const NotPlay = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/events/missing-players",
    params: {
      event_id: eventId,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["eventMissingPlayers", eventId],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching missingPlayers events", error);
        throw new Error("Error fetching missingPlayers events");
      }
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!eventId,
    }
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton active />
      </div>
    );
  }

  const team1Players = data?.DATA.filter((el: any) => el.TEAM === 1);
  const team2Players = data?.DATA.filter((el: any) => el.TEAM === 2);

  return (
    <section
      className={`${style.formInfo}  flex justify-between p-3 px-0 gap-x-3 flex-col`}
    >
      <div className={`${style.title} mb-4 `}>
        <p>WILL NOT PLAY</p>
      </div>
      {data?.DATA.length !== 0 ? (
        <div className={`${style.playList}  mb-4`}>
          <article>
            {team1Players?.map((el: any) => {
              return (
                <div className={` flex items-center mb-3 `} key={el.PLAYER_ID}>
                  <div className={`${style.flag} mr-2  `}>
                    <div className={`${style.flagBorder} `}>
                      <Image
                        src={`${
                          el.STL
                            ? `https://www.flashscore.com/res/image/data/${el.STL}`
                            : "/images/default/person.gif"
                        }`}
                        alt="img"
                        width={18}
                        height={11}
                      />
                    </div>
                  </div>
                  <div className={`${style.player} `}>
                    <h2>{el.PLAYER_NAME}</h2>
                    <p>({el.ABSENCE_REASON})</p>
                  </div>
                </div>
              );
            })}
          </article>

          <article className={style.missingTeamTwoPlayers}>
            {team2Players?.map((el: any) => {
              return (
                <div
                  className={` flex items-center mb-3 flex-row-reverse`}
                  key={el.PLAYER_ID}
                >
                  <div className={`${style.flag} ml-2  `}>
                    <div className={`${style.flagBorder} `}>
                      <Image
                        src={`${
                          el.STL
                            ? `https://www.flashscore.com/res/image/data/${el.STL}`
                            : "/images/default/person.gif"
                        }`}
                        alt="img"
                        width={18}
                        height={11}
                      />
                    </div>
                  </div>
                  <div className={`${style.player} `}>
                    <h2>{el.PLAYER_NAME}</h2>
                    <p className="text-right">({el.ABSENCE_REASON})</p>
                  </div>
                </div>
              );
            })}
          </article>
        </div>
      ) : (
        <div>
          <p className={style.noMissedPlayer}>All Players Included</p>
        </div>
      )}
    </section>
  );
};

export default NotPlay;
