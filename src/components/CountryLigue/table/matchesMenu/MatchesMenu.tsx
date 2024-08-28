"use client";
import React from "react";
import style from "./style.module.css";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

const MatchesMenu = ({
  setApiMenuRequest,
  activeMenu,
  setActiveMenu,
  isDraw,
}: {
  setApiMenuRequest: any;
  activeMenu: string;
  setActiveMenu: any;
  isDraw: boolean;
}) => {
  const sportId = useSportIdHandler();
  const menu = [
    { title: "STANDINGS", api: "overall" },
    { title: "FORM", api: "form" },
    // { title: "OVER/UNDER", api: "overall" },
    // { title: "HT/FT", api: "overall" },
    { title: "TOP SCORES", api: "top_scores" },
    { title: "DRAW", api: "draw" },
  ];

  const filteredMenu =
    sportId?.id === "2"
      ? menu.filter((item) => item.title == "DRAW")
      : menu.filter((item) => item.title !== "DRAW");

  return (
    <section className={`${style.menu} mb-4`}>
      <ul className="flex items-center gap-x-2">
        {filteredMenu.map((el, index) => (
          <li
            key={index}
            className={`${activeMenu === el.title ? style.activeMenu : ""}`}
            onClick={() => {
              setActiveMenu(el.title);
              setApiMenuRequest(el.api);
            }}
          >
            <button>{el.title}</button>
          </li>
        ))}
        {isDraw && sportId?.id !== "2" && (
          <li
            className={`${activeMenu === "DRAW" ? style.activeMenu : ""}`}
            onClick={() => {
              setActiveMenu("DRAW");
              setApiMenuRequest("DRAW");
            }}
          >
            <button>DRAW</button>
          </li>
        )}
      </ul>
    </section>
  );
};

export default MatchesMenu;
