"use client";
import React, { useState } from "react";
import style from "./style.module.css";

const MatchNavigation = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: any;
}) => {
  const filterLinks = [
    { title: "ALL", name: "all" },
    { title: "LIVE", name: "live" },
    // { title: "ODDS", name: "odds" },
    { title: "FINISHED", name: "finished" },
    { title: "SCHEDULED", name: "scheduled" },
  ];

  const handleClick = (title: string) => {
    if (title === "ODDS") {
      return;
    }
    setSelected(title);
  };

  return (
    <section className={`${style.navLinkItems} flex items-center gap-x-2 mt-3`}>
      {filterLinks.map((el, id) => (
        <div
          className={`
            ${selected === el.title ? style.selected : ""} cursor-pointer ${
            style.navLink
          } 
          ${el.title === "ODDS" ? style.disabled : ""}`}
          onClick={() => handleClick(el.title)}
          key={id}
        >
          <p>{el.title}</p>
        </div>
      ))}
    </section>
  );
};

export default MatchNavigation;
