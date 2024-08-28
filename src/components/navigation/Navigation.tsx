"use client";
import React from "react";
import Search from "./search/Search";
import style from "./nav/style.module.css";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./nav/Nav"), { ssr: false });

const Navigation = () => {
  const isNavFixed = useSelector(
    (state: any) => state.headerNavReducer.fixedNav
  );
  const pathName = usePathname();
  const matchRouteHandler = pathName.includes("match");
  return (
    <section
      className={`  ${style.navContainer} ${matchRouteHandler ? "hide" : ""}`}
      style={{ marginTop: isNavFixed ? "57px" : "" }}
    >
      <div className={`container flex items-center justify-between h-16`}>
        <NoSSR />
        <div className="desktopYes">
          <Search />
        </div>
      </div>
    </section>
  );
};

export default Navigation;
