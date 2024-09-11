"use client";
import React, { useState } from "react";
import { SearchICon } from "@/common/svg/navigation";
import style from "./style.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Modal, Skeleton, Tooltip } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTheme } from "@/components/store/ThemeContext";
import { sportNavigation } from "@/lib/sportNavigation";
import dynamic from "next/dynamic";
const NoSSRButton = dynamic(() => import("./DarkModeBtn"), { ssr: false });

type Inputs = {
  search: string;
};

const Search = () => {
  const [searchItems, setSearchItems] = useState<string | null | undefined>("");
  const [searchedData, setSearchedData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const sport = useSportIdHandler();
  const { mode, toggleDarkMode } = useTheme();
  const [changeDarkMode, setChangeDarkMode] = useState(mode === "dark");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/search/multi-search",
    params: {
      locale: "en_INT",
      query: searchItems,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["searchItems", searchItems],
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
      enabled: !!searchItems,
      onSuccess: (data) => {
        const filteredData = data?.filter((el: any) => el.SPORT_ID <= 4);
        setSearchedData(filteredData);
      },
    }
  );

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setSearchItems(data.search);
    setOpen(true);
  };

  return (
    <section className={`flex items-center ${style.search}`}>
      <div
        className={`flex ${style.mobailSearchIcon} desktopNo`}
        onClick={() => setOpen(true)}
      >
        <SearchICon />
      </div>
      <form
        className={`${style.searchInput} relative w-60 h-9 mr-3 desktopYes `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Search..."
          className={` w-full h-full rounded-full pl-5 pr-7  mr outline-none text-xs ${
            errors.search ? style.error : ""
          }`}
          {...register("search", {
            required: {
              value: true,
              message: "გრაფა ცარიელია",
            },
            minLength: {
              value: 2,
              message: "მინიმუმ 2 ასო",
            },
          })}
        />
        {/* {errors.search && (
          <p className={style.error}>{errors.search.message}</p>
        )} */}

        <div className="absolute right-3 top-2">
          <button type="submit" aria-label="Search">
            <SearchICon />
          </button>
        </div>
      </form>
      <div className="cursor-pointer flex justify-center items-center mobileNone">
        <Tooltip title="Dark Mode">
          <NoSSRButton
            setChangeDarkMode={setChangeDarkMode}
            toggleDarkMode={toggleDarkMode}
            changeDarkMode={changeDarkMode}
          />
        </Tooltip>
      </div>

      <Modal
        title="Search result"
        open={open}
        onCancel={handleCancel}
        footer={false}
        classNames={{ content: style.modalContent, header: style.modalHeader }}
      >
        <form
          className={`${style.mobileSearchForm} relative w-60 h-9 mr-3 desktopNo`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Search..."
            className={` w-full h-full rounded-full pl-5 pr-7  mr outline-none text-xs ${
              errors.search ? style.error : ""
            }`}
            {...register("search", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
              minLength: {
                value: 2,
                message: "მინიმუმ 2 ასო",
              },
            })}
          />
          <div className="absolute right-3 top-2">
            <button type="submit" aria-label="Search">
              <SearchICon />
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="p-4">
            <Skeleton active />
          </div>
        )}

        {searchedData?.map((searched: any) => {
          const defaultImage =
            searched.TYPE === "playersInTeam"
              ? "/images/default/person.gif"
              : "/images/default/club.gif";
          const stageId = searched.TOURNAMENT_STAGE_IDS_WITH_STATS_DATA
            ? searched.TOURNAMENT_STAGE_IDS_WITH_STATS_DATA[0]
            : [];

          const [sportData] = sportNavigation.filter(
            (el: any) => el.id == searched.SPORT_ID
          );
          const sportCategory = sportData?.id || searched.SPORT_ID;

          const url =
            searched.TYPE === "playersInTeam"
              ? `/player/${searched.URL}?playerId=${searched.ID}&sportId=${sportCategory}`
              : searched.TYPE === "participants"
              ? `/team/${searched.URL}?id=${searched.ID}&sportId=${sportCategory}`
              : `${sportCategory?.href}/${searched.COUNTRY_NAME}/${searched.URL}?seasonStageId=${stageId}&name=${searched.NAME}&tournamentId=${searched.ID}`;

          return (
            <Link
              href={url}
              className={style.searchedItemLink}
              target="_blank"
              key={searched.ID}
            >
              <article className={style.serachItem}>
                <div className={`${style.searchImage}`}>
                  <Image
                    src={searched.IMAGE ? searched.IMAGE : defaultImage}
                    alt="img"
                    width={30}
                    height={30}
                  />
                </div>
                <div className={style.searchInfo}>
                  <h4>{searched.NAME}</h4>
                  <p>
                    {sportCategory?.text},<span>{searched.COUNTRY_NAME}</span>
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </Modal>
    </section>
  );
};

export default Search;
