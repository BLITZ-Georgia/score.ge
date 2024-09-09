"use client";
import React from "react";
import style from "./style.module.css";
import { Skeleton } from "antd";
import Transfer from "./transfer/Transfer";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import axios, { isAxiosError } from "axios";

const PlayerTransfers = () => {
  const searchParams = useSearchParams();
  const playerId = searchParams.get("playerId");
  const sportId = searchParams.get("sportId");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/players/transfers",
    params: {
      player_id: playerId,
      sport_id: sportId,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["playerTransfers", playerId, sportId],
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
        console.error("Error fetching player transfers", error);
        throw new Error("Error fetching player transfers");
      }
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!playerId,
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
      {data?.DATA.length === 0 && (
        <div className="p3">
          <p
            className="text-l font-bold"
            style={{ color: "var(--black-color)" }}
          >
            No Information
          </p>
        </div>
      )}

      {data?.DATA.length !== 0 && (
        <article className={` mb-6`}>
          <div className={style.titles}>
            <p className="mobileNone">Date</p>
            <p>From</p>
            <p className="mobileNone">Type</p>
            <p>To</p>
            <p className={style.mobileFee}>FEE</p>
          </div>

          <div className={`${style.infoItemSection} `}>
            {data?.DATA.map((transfer: any) => {
              return (
                <Transfer
                  key={transfer.TOURNAMENT_STAGE_ID}
                  id={transfer.TEAM_ID}
                  reason={transfer.TRANSFER_REASON}
                  transferDate={transfer.TRANSFER_DATE}
                  fromTeamId={transfer.FROM_TEAM_ID}
                  fromTeamName={transfer.FROM_TEAM_NAME}
                  fromTeamLogo={transfer.FROM_TEAM_LOGO}
                  toTeamId={transfer.TO_TEAM_ID}
                  toTeamName={transfer.TO_TEAM_NAME}
                  toTeamLogo={transfer.TO_TEAM_LOGO}
                  par={transfer.PAR}
                />
              );
            })}
          </div>
        </article>
      )}
    </article>
  );
};

export default PlayerTransfers;
