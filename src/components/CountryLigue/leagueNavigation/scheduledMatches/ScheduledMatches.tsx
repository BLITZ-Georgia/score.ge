"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import CountryLeagueEvents from "../../countryLeagueEvents/CountryLeagueEvents";
import { Skeleton } from "antd";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { IoFootballOutline } from "react-icons/io5";
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
        console.error(`Error fetching data for page ${page}:`, error);

        if (error) setShowMoreBtn(false);
      }
    }
    return successfulResponses;
  };

  const { isLoading, isError, isFetching } = useQuery(
    ["scheduledMatchesLeague", sportId, seasonStageId, currentPage],
    () => fetchMatches(currentPage, currentPage + pages - 1),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!seasonStageId,
      onSuccess: (data) => {
        setAllDataInfo((prevState) => [...prevState, ...data]);
      },
      onError: (err) => {
        console.log("Error occurred:", err);
      },
    }
  );

  if (isFetching && allDataInfo.length === 0) {
    return (
      <div className="p-5 ">
        <Skeleton />
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
          <Skeleton />
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
