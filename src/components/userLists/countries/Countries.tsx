"use client";
import React, { useState, useMemo, useCallback } from "react";
import style from "./style.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Skeleton } from "antd";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import { setAllTournament } from "@/components/store/slices/matchesSlice";
import { useDispatch } from "react-redux";
import { CountriesArrowIcon, CountriesListIcon } from "@/common/svg/home";
import CountryItem from "./country/Country";
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

  const sportChekedId = useMemo(
    () => (sportIdCheck?.id ? Number(sportIdCheck?.id) : 1),
    [sportIdCheck?.id]
  );

  // Memoize the options object
  const options = useMemo(
    () => ({
      method: "GET",
      url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/list",
      params: {
        sport_id: sportChekedId,
        locale: "en_INT",
      },
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
        "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
      },
    }),
    [sportChekedId]
  );

  // Memoize the API request function
  const fetchTournaments = useCallback(async () => {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error("Error fetching featured products", error);
      throw new Error("Error fetching featured products");
    }
  }, [options]);

  const { data, isLoading, isError, isFetched } = useQuery(
    ["stagesList", sportChekedId],
    fetchTournaments,

    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 60 * 1000,
      cacheTime: 12 * 60 * 60 * 1000,
      onSuccess: (data) => {
        dispatch(setAllTournament(data));
      },
    }
  );

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
                  <CountriesArrowIcon />
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
                    <CountryItem
                      countryName={countryName}
                      sportName={sportName}
                      sportChekedId={sportChekedId}
                      leagueName={leagueName}
                      name={name}
                      seasonId={seasonId}
                      stageId={stageId}
                      key={leagues.ACTUAL_TOURNAMENT_SEASON_ID}
                      pinnedLeagueIds={pinnedLeagueIds}
                      addLeagueToLocalStorage={addLeagueToLocalStorage}
                    />
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
            <CountriesListIcon />
          </span>
        </div>
      )}
    </section>
  );
};

export default Countries;
