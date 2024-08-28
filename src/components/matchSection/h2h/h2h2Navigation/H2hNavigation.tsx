"use client";
import React, { useState } from "react";
import style from "./style.module.css";

const H2hNavigation = ({
  awayTeamName,
  homeTeamName,
  setSelectedTeamId,
}: {
  homeTeamName: string;
  awayTeamName: string;
  setSelectedTeamId: any;
}) => {
  const [selected, setSelected] = useState("H2H");

  const nav = [
    { title: "H2H" },
    { title: homeTeamName.replace("*", "").trim() },
    { title: awayTeamName.replace("*", "").trim() },
  ];
  return (
    <section className={`flex items-center gap-x-2 mt-3 ${style.navContainer}`}>
      {nav.map((el, id) => (
        <div
          className={`${
            selected === el.title ? style.selected : ""
          } cursor-pointer ${style.navLink}`}
          onClick={() => {
            setSelected(el.title);
            setSelectedTeamId(id);
          }}
          key={id}
        >
          <p>{el.title}</p>
        </div>
      ))}
    </section>
  );
};

export default H2hNavigation;
