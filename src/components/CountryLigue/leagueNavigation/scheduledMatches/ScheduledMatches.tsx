"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import CountryLeagueEvents from "../../countryLeagueEvents/CountryLeagueEvents";
import { Skeleton } from "antd";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { mutateLeagueMatchRounds } from "@/components/helper/mutateLeagueMatchesRounds";
import { NoMatchFound } from "@/components/noMatchFound/NoMatchFound";

const ScheduledMatches = ({
  setActiveMenu,
  activeMenu,
  pages,
}: {
  setActiveMenu?: any;
  activeMenu: string;
  pages: number;
}) => {
  const sportId = useSelector((state: any) => state.navigationReducer.sportId);
  const searchParams = useSearchParams();
  const seasonStageId = searchParams.get("seasonStageId");
  const [allDataInfo, setAllDataInfo] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMoreBtn, setShowMoreBtn] = useState(true);

  const fetchMatches = async (startPage: number, endPage: number) => {
    const successfulResponses: any[] = [];

    for (let page = startPage; page <= endPage; page++) {
      try {
        const response = await axios.request({
          method: "GET",
          url:
            "https://flashlive-sports.p.rapidapi.com/v1/tournaments/fixtures",
          params: {
            tournament_stage_id: seasonStageId,
            page: page.toString(),
            locale: "en_INT",
          },
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
            "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
          },
        });
        if (response.data?.DATA) {
          successfulResponses.push(response.data.DATA);
        }
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 429) {
          throw axiosError;
        }

        if (error) setShowMoreBtn(false);
        throw new Error("Error fetching schedule matches");
      }
    }
    return successfulResponses;
  };

  const { isLoading, isError, isFetching } = useQuery(
    ["scheduledMatchesLeague", sportId, seasonStageId, currentPage],
    () => fetchMatches(currentPage, currentPage + pages - 1),
    {
      refetchOnWindowFocus: false,
      enabled: !!seasonStageId,
      onSuccess: (data) => {
        setAllDataInfo((prevState) => [...prevState, ...data]);
      },

      retry: (failureCount, error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 429) {
          return true;
        }
        return false;
      },
      retryDelay: (retryAttempt) => {
        return 500;
      },
    }
  );

  if (isFetching && allDataInfo.length === 0) {
    return (
      <div className="p-5 ">
        <Skeleton active />
      </div>
    );
  }

  if (activeMenu === "FIXTURES" && allDataInfo.length === 0) {
    return <NoMatchFound title="No matches found" />;
  }

  if (allDataInfo.length === 0) {
    return <div></div>;
  }

  const { finalData, sortedRoundsArray } = mutateLeagueMatchRounds(allDataInfo);

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + pages);
  };

  return (
    <section className={` py-4 px-3 bg-white mb-4 rounded-lg`}>
      <h2 className={`font-bold ${style.title}`}>Scheduled</h2>

      <CountryLeagueEvents
        tournamentStageId={finalData?.TOURNAMENT_STAGE_ID}
        NAME1={finalData?.NAME_PART_1}
        NAME2={finalData?.NAME_PART_2}
        url={finalData?.URL}
        events={sortedRoundsArray || []}
        countryId={finalData?.COUNTRY_ID}
        tournamentId={finalData?.TOURNAMENT_ID}
        key={finalData?.TOURNAMENT_STAGE_ID}
        countryName={finalData?.COUNTRY_NAME}
        showMatchesDefault={true}
        ShowFullDate={true}
        ShowFullDateHour={true}
        setActiveMenu={setActiveMenu}
      />

      {isLoading && allDataInfo.length !== 0 ? (
        <div className="p-5 ">
          <Skeleton active />
        </div>
      ) : (
        ""
      )}

      {activeMenu !== "FIXTURES" && (
        <div
          className={style.moreMatches}
          onClick={() => setActiveMenu("FIXTURES")}
        >
          <button>Show More Matches</button>
        </div>
      )}

      {activeMenu === "FIXTURES" && showMoreBtn ? (
        <div
          className={`${style.moreMatches} ${style.fixMoreMatchesBtn}`}
          onClick={handleShowMore}
        >
          <button>Show More Matches</button>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default ScheduledMatches;
