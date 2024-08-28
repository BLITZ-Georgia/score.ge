"use client";
import React, { useEffect } from "react";
import Logo from "./logo/Logo";
import style from "./style.module.css";
import Navigation from "./navigation/Navigation";
import Socials from "./socials/Socials";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setNavFixed } from "../store/slices/headerNavSlice";
import Search from "../navigation/search/Search";
import MobileBurgerCotnent from "./mobileBurgerContent/MobileBurgerCotnent";

const Header = () => {
  const pathName = usePathname();
  const matchRouteHandler = pathName.includes("match");
  const dispatch = useDispatch();
  const isNavFixed = useSelector(
    (state: any) => state.headerNavReducer.fixedNav
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 110) {
        dispatch(setNavFixed(true));
      } else {
        dispatch(setNavFixed(false));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  return (
    <section
      className={`${style.header} ${
        matchRouteHandler ? "matchContainer" : ""
      }    w-full
      ${isNavFixed ? style.fixed : ""}  transition-3`}
    >
      <div
        className={`${style.mobileResponsiveLogo} container flex justify-between items-center h-full`}
      >
        <Logo matchRouteHandler={matchRouteHandler} isNavFixed={isNavFixed} />

        <div className="mobileNone h-full">
          <Navigation />
        </div>

        <div
          className={`flex items-center gap-x-3 pr-3 ${style.mainMenuContainer}`}
        >
          <div className="desktopNo">
            <Search />
          </div>

          <Socials isNavFixed={isNavFixed} />

          <MobileBurgerCotnent />
        </div>
      </div>
    </section>
  );
};

export default Header;
