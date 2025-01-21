"use client";
import React, { useState, useMemo, useCallback } from "react";
import style from "./style.module.css";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Skeleton } from "antd";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import { setAllTournament } from "@/components/store/slices/matchesSlice";
import { useDispatch } from "react-redux";
import { CountriesArrowIcon, CountriesListIcon } from "@/common/svg/home";
import CountryItem from "./country/Country";
import { usePinnedLeagues } from "@/components/hooks/usePineedLeagues";
import { Country, League } from "@/types/countries";

const INITIAL_COUNTRIES_SHOWN = 50;
const CACHE_STALE_TIME = 60 * 60 * 1000; // 1 hour
const CACHE_TIME = 12 * 60 * 60 * 1000; // 12 hours
const RETRY_DELAY = 300;

const Countries = () => {
  const [listOpen, setListOpen] = useState<Set<number>>(new Set());
  const [countrieShowNumber, setCountrieShowNumber] = useState(
    INITIAL_COUNTRIES_SHOWN
  );
  const sportIdCheck = useSportIdHandler();
  const dispatch = useDispatch();
  const { pinnedLeagueIds, addLeagueToLocalStorage } = usePinnedLeagues();

  const sportChekedId = useMemo(() => Number(sportIdCheck?.id ?? 1), [
    sportIdCheck?.id,
  ]);

  const fetchTournaments = useCallback(async () => {
    const options = {
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
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        throw axiosError;
      }
      throw new Error("Error fetching tournament list");
    }
  }, [sportChekedId]);

  const { data, isLoading } = useQuery(
    ["stagesList", sportChekedId],
    fetchTournaments,
    {
      refetchOnWindowFocus: false,
      staleTime: CACHE_STALE_TIME,
      cacheTime: CACHE_TIME,
      onSuccess: (data) => dispatch(setAllTournament(data)),
      retry: (_, error) => (error as AxiosError).response?.status === 429,
      retryDelay: () => RETRY_DELAY,
    }
  );

  const result = useMemo(() => {
    if (!data?.DATA) return [];

    const aggregatedData: Record<number, Country> = {};

    data.DATA.forEach((item: any) => {
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

      const stageSeasonId =
        STAGES.find((el: any) => el.STAGE_NAME === "Main") ?? STAGES[0];

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

  const toggleCountryList = useCallback((countryId: number) => {
    setListOpen((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(countryId)) {
        newSet.delete(countryId);
      } else {
        newSet.add(countryId);
      }
      return newSet;
    });
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 px-6">
        <Skeleton active />
      </div>
    );
  }

  const sportName = sportIdCheck?.text?.toLowerCase() ?? "";

  return (
    <section className="p-4">
      <div className={`${style.countriesTitle} flex items-center pb-3`}>
        <h2 className="font-bold">COUNTRIES</h2>
      </div>
      <section>
        {result.slice(0, countrieShowNumber).map((country) => {
          const isOpen = listOpen.has(country.COUNTRY_ID);
          const countryName = country.COUNTRY_NAME.toLowerCase();

          return (
            <div
              className={`${isOpen ? style.blockOpened : ""} mb-2`}
              key={country.COUNTRY_ID}
            >
              <article
                className={`flex items-center justify-between mb-1 ${style.country} cursor-pointer`}
                onClick={() => toggleCountryList(country.COUNTRY_ID)}
              >
                <span>{country.COUNTRY_NAME}</span>
                <div className={style.arrowIcon}>
                  <CountriesArrowIcon />
                </div>
              </article>

              <article className={`flex flex-col ${style.blockList} mb-2`}>
                {country.leagues.map((league) => (
                  <CountryItem
                    key={league.ACTUAL_TOURNAMENT_SEASON_ID}
                    countryName={countryName}
                    sportName={sportName}
                    sportChekedId={sportChekedId}
                    leagueName={league.LEAGUE_NAME.toLowerCase()
                      .split(" ")
                      .join("-")}
                    name={league.LEAGUE_NAME}
                    seasonId={league.stageSeasonId.STAGE_ID}
                    stageId={league.ACTUAL_TOURNAMENT_SEASON_ID}
                    pinnedLeagueIds={pinnedLeagueIds}
                    addLeagueToLocalStorage={addLeagueToLocalStorage}
                  />
                ))}
              </article>
            </div>
          );
        })}
      </section>
      {countrieShowNumber === INITIAL_COUNTRIES_SHOWN && (
        <div
          className={style.showMoreBtn}
          onClick={() => setCountrieShowNumber(result.length)}
        >
          <p className="flex items-center">Show More</p>
          <span>
            <CountriesListIcon />
          </span>
        </div>
      )}
    </section>
  );
};

export default Countries;
