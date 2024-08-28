"use client";
import React, { useEffect, useState, memo, useMemo } from "react";
import style from "./style.module.css";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "react-query";
import { Skeleton } from "antd";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import { setAllTournament } from "@/components/store/slices/matchesSlice";
import { useDispatch } from "react-redux";
import { usePinnedLeagues } from "@/components/hooks/usePineedLeagues";

interface League {
  LEAGUE_NAME: string;
  SPORT_ID: number;
  ACTUAL_TOURNAMENT_SEASON_ID: string;
  COUNTRY_ID: string;
  stageSeasonId: any;
}

interface Country {
  COUNTRY_ID: number;
  COUNTRY_NAME: string;
  leagues: League[];
}

const Countries = () => {
  const [listOpen, setListOpen] = useState<number[]>([]);
  const [countrieShowNumber, setCountrieShowNumber] = useState(50);
  const sportIdCheck = useSportIdHandler();
  const dispatch = useDispatch();

  const { pinnedLeagueIds, addLeagueToLocalStorage } = usePinnedLeagues();

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/list",
    params: {
      sport_id: sportIdCheck?.id || 1,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["stagesList", sportIdCheck?.id],
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
      refetchOnWindowFocus: false,
      staleTime: 60 * 60 * 1000,
      cacheTime: 12 * 60 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setAllTournament(data));
    }
  }, [data, isLoading, dispatch]);

  const result = useMemo(() => {
    const aggregatedData: { [key: number]: Country } = {};

    data?.DATA.forEach((item: any) => {
      const {
        COUNTRY_ID,
        COUNTRY_NAME,
        LEAGUE_NAME,
        SPORT_ID,
        ACTUAL_TOURNAMENT_SEASON_ID,
        STAGES,
      } = item;

      if (!aggregatedData[COUNTRY_ID]) {
        aggregatedData[COUNTRY_ID] = {
          COUNTRY_ID,
          COUNTRY_NAME,
          leagues: [],
        };
      }

      const stageId = STAGES.filter((el: any) => el.STAGE_NAME === "Main");
      const stageSeasonId = stageId.length > 0 ? stageId[0] : STAGES[0];

      aggregatedData[COUNTRY_ID].leagues.push({
        LEAGUE_NAME,
        SPORT_ID,
        ACTUAL_TOURNAMENT_SEASON_ID,
        COUNTRY_ID,
        stageSeasonId,
      });
    });

    return Object.values(aggregatedData)
      .slice(7, -1)
      .sort((a, b) => a.COUNTRY_NAME.localeCompare(b.COUNTRY_NAME));
  }, [data]);

  const toggleCountryList = (countryId: number) => {
    setListOpen((prevOpen) => {
      if (prevOpen.includes(countryId)) {
        return prevOpen.filter((id) => id !== countryId);
      } else {
        return [...prevOpen, countryId];
      }
    });
  };

  if (isLoading) {
    return (
      <div className="p-4 px-6">
        <Skeleton active />{" "}
      </div>
    );
  }

  const sportChekedId = sportIdCheck?.id ? Number(sportIdCheck?.id) : 1;

  return (
    <section className={`p-4`}>
      <div className={`${style.countriesTitle} flex items-center pb-3  `}>
        <h2 className="  font-bold ">COUNTRIES</h2>
      </div>
      <section>
        {result.slice(0, countrieShowNumber).map((countrie: any) => {
          const isOpen = listOpen.includes(countrie.COUNTRY_ID);
          const countryName = countrie.COUNTRY_NAME.toLowerCase();
          const sportName = sportIdCheck
            ? sportIdCheck?.text.toLowerCase()
            : "";
          return (
            <div
              className={`${isOpen ? style.blockOpened : ""} mb-2`}
              key={countrie.COUNTRY_ID}
            >
              <article
                className={`flex items-center justify-between  mb-1 ${style.country} cursor-pointer `}
                onClick={() => toggleCountryList(countrie.COUNTRY_ID)}
              >
                <span>{countrie.COUNTRY_NAME}</span>
                <div className={`${style.arrowIcon} `}>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 6L-2.38418e-07 -2.38419e-07L10 -2.38419e-07L5 6Z"
                      fill={`var(--match-league-title-color)`}
                    />
                  </svg>
                </div>
              </article>

              <article className={`flex flex-col ${style.blockList} mb-2 `}>
                {countrie.leagues.map((leagues: any) => {
                  const leagueName = leagues.LEAGUE_NAME.toLowerCase()
                    .split(" ")
                    .join("-");
                  const stageId = leagues.ACTUAL_TOURNAMENT_SEASON_ID;
                  const name = leagues?.LEAGUE_NAME;
                  const seasonId = leagues?.stageSeasonId?.STAGE_ID;

                  return (
                    <div
                      className={`flex items-center justify-between ${
                        pinnedLeagueIds[sportChekedId]?.includes(stageId)
                          ? style.pinActive
                          : null
                      }`}
                      key={leagues.ACTUAL_TOURNAMENT_SEASON_ID}
                    >
                      <span
                        className={`${style.blockLink} tracking-wider  truncate max-w-40`}
                      >
                        <Link
                          href={`/${sportName}/${countryName}/${leagueName}?seasonStageId=${seasonId}&name=${name}&tournamentId=${stageId}`}
                        >
                          {leagues.LEAGUE_NAME}
                        </Link>
                      </span>
                      <span
                        className={`${style.pinIcon} `}
                        onClick={() => {
                          addLeagueToLocalStorage(sportChekedId, stageId);
                        }}
                      >
                        <svg
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.7922 5.81228C11.762 5.81228 11.7321 5.80632 11.7042 5.79474C11.6763 5.78316 11.6509 5.76619 11.6296 5.7448L8.04704 2.16225C8.02562 2.14086 8.00864 2.11546 7.99705 2.0875C7.98546 2.05954 7.97949 2.02957 7.97949 1.99931C7.97949 1.96904 7.98546 1.93908 7.99705 1.91112C8.00864 1.88316 8.02562 1.85776 8.04704 1.83637L9.02397 0.859665C9.06716 0.816491 9.12573 0.792236 9.18679 0.792236C9.24786 0.792236 9.30643 0.816491 9.34962 0.859665L12.9324 4.44245C12.9756 4.48564 12.9998 4.54421 12.9998 4.60528C12.9998 4.66634 12.9756 4.72491 12.9324 4.7681L11.9552 5.74503C11.9339 5.76645 11.9085 5.78344 11.8806 5.79502C11.8526 5.8066 11.8227 5.81254 11.7924 5.81251L11.7922 5.81228ZM8.53573 1.99965L11.7922 5.25611L12.4437 4.60482L9.18679 1.3479L8.53573 1.99965Z"
                            fill="#999999"
                          />
                          <path
                            d="M8.53562 7.76635C8.50539 7.76641 8.47544 7.7605 8.4475 7.74896C8.41956 7.73742 8.39417 7.72047 8.3728 7.6991L6.09282 5.41912C6.04965 5.37593 6.02539 5.31737 6.02539 5.2563C6.02539 5.19523 6.04965 5.13666 6.09282 5.09348L8.69844 2.48808C8.74163 2.44491 8.8002 2.42065 8.86126 2.42065C8.92233 2.42065 8.9809 2.44491 9.02409 2.48808L11.3041 4.76783C11.3472 4.81102 11.3715 4.86959 11.3715 4.93065C11.3715 4.99172 11.3472 5.05029 11.3041 5.09348L8.69821 7.6991C8.67683 7.72047 8.65145 7.73742 8.62351 7.74896C8.59557 7.7605 8.56585 7.76641 8.53562 7.76635ZM6.58129 5.2563L8.53562 7.2104L10.8156 4.93065L8.86126 2.97655L6.58129 5.2563Z"
                            fill="#999999"
                          />
                          <path
                            d="M7.55849 11.3492C7.49742 11.3491 7.43885 11.3249 7.39567 11.2817L2.5103 6.39609C2.46713 6.3529 2.44287 6.29433 2.44287 6.23326C2.44287 6.1722 2.46713 6.11363 2.5103 6.07044L3.48724 5.0935C3.87624 4.70535 4.40334 4.48737 4.95287 4.48737C5.5024 4.48737 6.0295 4.70535 6.4185 5.0935L8.69848 7.37348C9.08656 7.76248 9.3045 8.28952 9.3045 8.839C9.3045 9.38848 9.08656 9.91552 8.69848 10.3045L7.72154 11.2817C7.70014 11.3031 7.67472 11.3201 7.64674 11.3317C7.61876 11.3432 7.58877 11.3492 7.55849 11.3492ZM2.99854 6.23326L7.55849 10.7932L8.37284 9.97887C8.67475 9.6763 8.84431 9.26632 8.84431 8.83888C8.84431 8.41145 8.67475 8.00147 8.37284 7.6989L6.09286 5.41915C5.79023 5.11735 5.38027 4.94787 4.95287 4.94787C4.52547 4.94787 4.11551 5.11735 3.81288 5.41915L2.99854 6.23326Z"
                            fill="#999999"
                          />
                          <path
                            d="M0.230266 13.792C0.186679 13.792 0.143989 13.7796 0.107156 13.7563C0.0703234 13.733 0.0408611 13.6997 0.0221928 13.6603C0.0035244 13.621 -0.00358344 13.5771 0.00169529 13.5338C0.00697401 13.4906 0.0244225 13.4497 0.0520131 13.4159L4.44891 8.04186C4.46927 8.01693 4.49462 7.99654 4.52335 7.98202C4.55207 7.9675 4.58352 7.95917 4.61567 7.95756C4.64781 7.95596 4.67993 7.96111 4.70996 7.9727C4.73999 7.98428 4.76725 8.00204 4.78999 8.02482L5.76716 9.00199C5.78987 9.02476 5.80757 9.05203 5.81911 9.08205C5.83066 9.11207 5.83579 9.14417 5.83419 9.1763C5.83258 9.20842 5.82427 9.23985 5.80979 9.26857C5.79531 9.29729 5.77498 9.32267 5.75011 9.34306L0.376276 13.74C0.335111 13.7737 0.283498 13.7921 0.230266 13.792ZM4.64421 8.53033L1.86678 11.9252L5.26142 9.14777L4.64421 8.53033Z"
                            fill="#999999"
                          />
                        </svg>
                      </span>
                    </div>
                  );
                })}
              </article>
            </div>
          );
        })}
      </section>
      {countrieShowNumber === 50 && (
        <div
          className={style.showMoreBtn}
          onClick={() => setCountrieShowNumber(result.length)}
        >
          <p className="flex items-center">Show More </p>
          <span>
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6317 0.355291C13.5157 0.242666 13.3779 0.153312 13.2262 0.0923468C13.0745 0.0313812 12.9119 0 12.7477 0C12.5835 0 12.4209 0.0313812 12.2692 0.0923468C12.1175 0.153312 11.9798 0.242666 11.8638 0.355291L6.99891 5.06911L2.13404 0.355291C1.89961 0.128132 1.58164 0.000514428 1.2501 0.000514428C0.918549 0.000514428 0.60058 0.128132 0.366142 0.355291C0.131703 0.582451 -1.19209e-07 0.890546 -1.19209e-07 1.2118C-1.19209e-07 1.53305 0.131703 1.84114 0.366142 2.0683L6.12123 7.64471C6.23722 7.75734 6.375 7.84669 6.52668 7.90766C6.67836 7.96862 6.84096 8 7.00518 8C7.16939 8 7.33199 7.96862 7.48367 7.90766C7.63535 7.84669 7.77313 7.75734 7.88913 7.64471L13.6442 2.0683C14.1207 1.60664 14.1207 0.829104 13.6317 0.355291Z"
                fill=" var(--user-list-color)"
              />
            </svg>
          </span>
        </div>
      )}
    </section>
  );
};

export default Countries;
