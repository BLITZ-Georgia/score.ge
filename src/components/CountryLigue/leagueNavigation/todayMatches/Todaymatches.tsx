import React from "react";
import style from "./style.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import League from "@/components/allMatchInfoSection/leagueMatchlist/matchLeague/MatchLeague";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "antd";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import useGMTOffset from "@/components/hooks/useTimeZone";

const Todaymatches = () => {
  const sportIdCheck = useSportIdHandler();
  const searchParams = useSearchParams();
  const { gmtOffset } = useGMTOffset();

  const tournamentId = searchParams.get("tournamentId");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/events/list",
    params: {
      sport_id: sportIdCheck?.id,
      indent_days: "0",
      locale: "en_INT",
      timezone: gmtOffset.replace("+", ""),
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["todayMatches", sportIdCheck?.id, gmtOffset],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    },
    {
      enabled: !!gmtOffset,
    }
  );

  if (isLoading) {
    return (
      <div className="p-5 ">
        <Skeleton />
      </div>
    );
  }

  const currentLeague = data?.DATA.filter(
    (el: any) => el.TOURNAMENT_ID === tournamentId
  );

  if (currentLeague?.length === 0 && !isLoading) {
    return <div></div>;
  }

  return (
    <section className={` py-4 px-3 bg-white mb-4 rounded-lg`}>
      <h2 className={`font-bold ${style.title}`}>Todays Matches</h2>
      {currentLeague?.map((eventMatch: any) => {
        return (
          <League
            tournamentStageId={eventMatch.TOURNAMENT_STAGE_ID}
            NAME1={eventMatch.NAME_PART_1}
            NAME2={eventMatch.NAME_PART_2}
            url={eventMatch.URL}
            events={eventMatch.EVENTS}
            countryId={eventMatch.COUNTRY_ID}
            tournamentId={eventMatch.TOURNAMENT_ID}
            key={eventMatch.TOURNAMENT_STAGE_ID}
            countryName={eventMatch.COUNTRY_NAME}
            showMatchesDefault={true}
            ShowFullDate={false}
            ShowFullDateHour={false}
          />
        );
      })}
    </section>
  );
};

export default Todaymatches;
