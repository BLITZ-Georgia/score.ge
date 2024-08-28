"use client";
import React, { useState } from "react";
import style from "../style.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const LastEventStatistic = ({
  items,
  winner,
}: {
  items: any;
  winner: string;
}) => {
  const getTypeValue = (type: string) => {
    const item = items.find((el: any) => el.TYPE === type);
    return item ? item.VALUE : "N/A";
  };

  const winnerStat = winner.toUpperCase();

  const type6Value = getTypeValue("6");

  if (type6Value !== "N/A") {
    return (
      <div className={` ${style.type6}`}>
        <p className="text-center">{type6Value.toUpperCase()}</p>
        <div className={`${style.winners} ${style[winnerStat]} `}>
          <p className={`text-white`}>{winner.toUpperCase()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={style.itemsStatistic}>
      <p>{getTypeValue("5").replace("'", "")}</p>
      <p>{getTypeValue("1")}</p>
      <p>{getTypeValue("8")}</p>
      <p>{getTypeValue("2")}</p>
      <p>{getTypeValue("3")}</p>
      <div className={`${style.winners} ${style[winnerStat]}`}>
        <p className={`text-white`}>{winner.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default LastEventStatistic;
