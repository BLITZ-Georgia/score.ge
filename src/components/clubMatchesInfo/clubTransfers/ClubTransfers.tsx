"use client";
import React from "react";
import style from "./style.module.css";
import { Skeleton } from "antd";
import Transfer from "./transfer/Transfer";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import axios, { AxiosError, isAxiosError } from "axios";
import { IoFootballOutline } from "react-icons/io5";
import { NoMatchFound } from "@/components/noMatchFound/NoMatchFound";

const ClubTransfers = () => {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");
  const sportId = searchParams.get("sportId");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/teams/transfers",
    params: {
      team_id: teamId,
      page: 1,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["clubTransfers", teamId, sportId],
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

        console.error("Error fetching player transfers", error);
        throw new Error("Error fetching player transfers");
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
      enabled: !!teamId,
    }
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton active />
      </div>
    );
  }

  return (
    <article
      className={`${style.transfers} bg-white rounded-lg p-4  mobilePadding8`}
    >
      <h4 className={style.matchesTitle}>Transfers</h4>
      {data?.DATA.length === 0 && <NoMatchFound title="No matches found" />}

      {data?.DATA.length !== 0 && (
        <article className={` mb-6`}>
          <div className={style.titles}>
            <p className="mobileNone">Date</p>
            <p>PLayer</p>
            <p>Fom/To</p>
            <p className={style.mobileFee}>FEE</p>
          </div>

          <div className={`${style.infoItemSection} `}>
            {data?.DATA.map((transfer: any, id: number) => {
              return (
                <Transfer
                  key={id}
                  id={transfer.TEAM_ID}
                  transferDate={transfer.DATE}
                  transferDirection={transfer.TRANSFER_DIRECTION}
                  transferType={transfer.TRANSFER_TYPE}
                  tj={transfer.TJ}
                  toValue={transfer.TO.VALUE}
                  toImage={
                    transfer.TO.PARTICIPANT_IMAGE || "/images/default/club.gif"
                  }
                  fromValue={transfer.FROM.VALUE}
                  fromImage={
                    transfer.FROM.PARTICIPANT_IMAGE ||
                    "/images/default/club.gif"
                  }
                  player={transfer.PLAYER.VALUE}
                  playerID={transfer.PLAYER.PARTICIPANT_ID}
                  playerImg={transfer.PLAYER.PARTICIPANT_IMAGE}
                />
              );
            })}
          </div>
        </article>
      )}
    </article>
  );
};

export default ClubTransfers;
