"use client";
import Link from "next/link";
import React from "react";
import style from "./style.module.css";
import { usePathname } from "next/navigation";
import { SoccerIcon, PredictionIcon } from "@/common/svg/navigation";
import { useSelector } from "react-redux";

const Navigation = () => {
  const pathName = usePathname();
  const matchRouteHandler = pathName.includes("match");
  const isActiveSoccer = pathName.includes("prediction");
  const isNavFixed = useSelector(
    (state: any) => state.headerNavReducer.fixedNav
  );

  return (
    <section
      className={`flex items-center justify-center  h-full   ${style.nav} ${
        matchRouteHandler ? "hide" : ""
      } ${isNavFixed ? style.fixed : ""}`}
    >
      <div
        className={`${!isActiveSoccer ? style.active : ""} ${
          style.itemContainer
        }`}
      >
        <Link href={"/"} className="flex gap-x-2 items-center">
          <SoccerIcon />
          <h3>SCORES</h3>
        </Link>
      </div>
      <div
        className={`${pathName === "/prediction" ? style.active : ""} ${
          style.itemContainer
        }`}
      >
        <Link
          href={"https://predictions.score.ge"}
          className="flex gap-x-2 items-center"
        >
          <PredictionIcon />
          <h3>PREDICTIONS</h3>
        </Link>
      </div>
    </section>
  );
};

export default Navigation;
