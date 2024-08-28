"use client";
import React from "react";
import style from "./style.module.css";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

type infoProps = {
  setActiveSection: (section: string) => void;
  activeMenu: string;
};

const TeamsMatchNavigation: React.FC<infoProps> = ({
  setActiveSection,
  activeMenu,
}) => {
  const sportId = useSportIdHandler();
  const menu = [
    { title: "INFO" },
    { title: "LINE-UPS" },
    { title: "TABLE" },
    { title: "H2H" },
  ];

  const filteredMenu =
    sportId?.id === "2"
      ? menu.filter(
          (item) => item.title !== "LINE-UPS" && item.title !== "TABLE"
        )
      : menu;

  return (
    <section className={`${style.clubMenu} p-4`}>
      <ul className="flex items-center gap-x-4">
        {filteredMenu.map((el, index) => {
          return (
            <li key={index} onClick={() => setActiveSection(el.title)}>
              <button className={activeMenu === el.title ? style.active : ""}>
                {el.title}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TeamsMatchNavigation;
