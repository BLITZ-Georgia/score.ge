import React from "react";
import style from "./style.module.css";
import LineUp from "./lineUp/LineUp";
import Injuries from "./injuries/Injuries";
import { Skeleton } from "antd";
import axios, { isAxiosError, AxiosError } from "axios";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import StartingLineUp from "./startingLineUp/StartingLineUp";
import Subtitutes from "./subtitutes/Subtitutes";

interface lineUpProp {
  homeTeamName: string;
  awayTeamName: string;
  homeTeamImg: string[];
  awayTeamImg: string[];
}

const LineUps: React.FC<lineUpProp> = ({
  awayTeamName,
  homeTeamName,
  homeTeamImg,
  awayTeamImg,
}) => {
  const searchParams = useSearchParams();

  const eventId = searchParams.get("id");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/events/lineups",
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
    ["eventLineUp", eventId],
    async () => {
      try {
        const response = await axios.request(options).catch((error) => {
          if (isAxiosError(error)) {
            switch (error.response?.status) {
              case 404:
                return { data: { DATA: [] } };

              default:
                break;
            }
          }

          throw error;
        });
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 429) {
          throw axiosError;
        }

        console.error("Error fetching match lineUp ", error);
        throw new Error("Error fetching match lineUp");
      }
    },
    {
      retry: (failureCount, error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 429) {
          return true;
        }
        return false;
      },
      retryDelay: (retryAttempt) => {
        return 300;
      },
      refetchOnWindowFocus: false,
      enabled: !!eventId,
    }
  );

  if (isLoading) {
    return (
      <div className="p-5 ">
        <Skeleton active />
      </div>
    );
  }

  if (data.DATA.length === 0) {
    return (
      <div className="p-5 ">
        <p className="text-sm" style={{ color: "var(--black-color)" }}>
          There is no information
        </p>
      </div>
    );
  }

  const [startingLineUp, subtitiles, coaches] = data?.DATA;
  const [teamOneFormation, teamTwoFormation] = startingLineUp?.FORMATIONS;

  return (
    <section className={`${style.lineUps}`}>
      <LineUp
        data={data}
        teamOneFormation={teamOneFormation}
        teamTwoFormation={teamTwoFormation}
        awayTeamName={awayTeamName}
        homeTeamName={homeTeamName}
      />
      <StartingLineUp
        teamOneFormation={teamOneFormation}
        teamTwoFormation={teamTwoFormation}
      />
      {subtitiles && subtitiles?.length !== 0 && (
        <Subtitutes
          subtitiles={subtitiles}
          homeTeamImg={homeTeamImg}
          awayTeamImg={awayTeamImg}
        />
      )}
      <Injuries coaches={coaches} />
    </section>
  );
};

export default LineUps;
