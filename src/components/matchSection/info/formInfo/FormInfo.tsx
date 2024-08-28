import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { Skeleton } from "antd";
import { Tooltip } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

interface props {
  eventData: any;
  h2hData: any;
}

const FormInfo: React.FC<props> = ({ eventData, h2hData }) => {
  const searchParams = useSearchParams();

  const eventId = searchParams.get("id");
  const [overall, home, away] = h2hData;
  const [firstTeam, secondTeam] = overall.GROUPS;
  const firstTeamLastGames = firstTeam.ITEMS.slice(0, 5);
  const secondTeamLAstGames = secondTeam.ITEMS.slice(0, 5);

  const sportIdCheck = useSportIdHandler();

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/events/report",
    params: {
      locale: "en_INT",
      event_id: eventId,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["eventPreview", eventId],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching preview events", error);
        throw new Error("Error fetching result events");
      }
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!eventId,
    }
  );

  const [report] = data?.DATA || [];

  const reportText = report ? convertBBCodeToHTML(report.CONTENT) : "";

  function convertBBCodeToHTML(text: string) {
    return text
      .replace(/\[b\](.*?)\[\/b\]/g, "<strong>$1</strong>")
      .replace(/\[br\]/g, "<br>");
  }

  return (
    <>
      <div className={`${style.title} mx-3 mb-1`}>
        <p>FORM</p>
      </div>
      <article
        className={`${style.formInfo}  flex justify-between p-3 gap-x-3 flex-col`}
      >
        <div className={`${style.infoItem}  p-2`}>
          <div className={`${style.infoItemCont} flex flex-row items-center`}>
            <div className={`${style.infoImage} mr-4`}>
              <Image
                src={
                  eventData?.HOME_IMAGES
                    ? eventData?.HOME_IMAGES[0]
                    : "/images/default/club.gif"
                }
                alt="club"
                width={55}
                height={55}
              />
            </div>
            <div>
              <h3 className="text-left font-bold mb-2">
                {eventData?.HOME_NAME}
              </h3>
              <div
                className={` items-center font-normal ${style.tableWords} gap-x-1`}
              >
                {firstTeamLastGames.map((match: any) => {
                  const result =
                    match.H_RESULT === "WIN"
                      ? "W"
                      : match.H_RESULT === "DRAW"
                      ? "D"
                      : "L";

                  const tooltipTitle = `${match.CURRENT_RESULT} (${match.HOME_PARTICIPANT} - ${match.AWAY_PARTICIPANT})`;

                  return (
                    <Tooltip
                      title={tooltipTitle}
                      key={match.EVENT_ID}
                      className={style.tooltip}
                    >
                      <Link
                        href={`${sportIdCheck?.alt}/match/event?id=${match.EVENT_ID}`}
                        target="_blank"
                      >
                        <p className={`${style[result]}`}>{result}</p>
                      </Link>{" "}
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.vs} flex items-center justify-center`}>
          <p>VS</p>
        </div>

        <div className={`${style.infoItem} p-2`}>
          <div
            className={`${style.infoItemCont} flex  items-center flex-row-reverse`}
          >
            <div className={`${style.infoImage} ml-4`}>
              <Image
                src={
                  eventData?.AWAY_IMAGES
                    ? eventData?.AWAY_IMAGES[0]
                    : "/images/default/club.gif"
                }
                alt="club"
                width={55}
                height={55}
              />
            </div>

            <div>
              <h3 className=" font-bold mb-2 text-right">
                {eventData?.AWAY_NAME}
              </h3>
              <div
                className={` items-center font-normal ${style.tableWords} gap-x-1`}
              >
                {secondTeamLAstGames.map((match: any) => {
                  const result =
                    match.H_RESULT === "WIN"
                      ? "W"
                      : match.H_RESULT === "DRAW"
                      ? "D"
                      : "L";

                  const tooltipTitle = `${match.CURRENT_RESULT} (${match.HOME_PARTICIPANT} - ${match.AWAY_PARTICIPANT})`;

                  return (
                    <Tooltip
                      title={tooltipTitle}
                      key={match.EVENT_ID}
                      className={style.tooltip}
                    >
                      <Link href={"#"} target="_blank">
                        <p className={`${style[result]}`}>{result}</p>
                      </Link>{" "}
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </article>
      <div className={`${style.title} mx-3 mb-4`}>
        <p>PREVIEW</p>
      </div>
      {data ? (
        <div className={`${style.preview} mx-3 mb-1`}>
          <h4 className="mb-3 font-semibold">{report?.TITLE}</h4>
          <p
            className="mb-2"
            dangerouslySetInnerHTML={{ __html: reportText }}
          ></p>
        </div>
      ) : (
        <div className={`${style.preview} mx-3 mb-1`}>
          <p>No Preview Available</p>
        </div>
      )}
    </>
  );
};

export default FormInfo;
