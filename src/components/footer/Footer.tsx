"use client";
import React from "react";
import style from "./style.module.css";
import FooterMenu from "./footerMenu/FooterMenu";
import Support from "./support/Support";
import Copyright from "./copyright/Copyright";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathName = usePathname();
  const matchRouteHandler = pathName.includes("match");

  const menuItem = [
    "Football news",
    "Premier league",
    "Fa sports",
    "SERIES A",
    "Bundesliga",
  ];
  return (
    <section
      className={`${style.footer}  mt-5  pt-9 ${
        matchRouteHandler ? "hide" : ""
      }`}
    >
      <div className={`flex gap-x-6 ${style.footerItem} container`}>
        <FooterMenu title={"FOOTBALL"} menuItems={menuItem} />{" "}
        <FooterMenu title={"TENNIS"} menuItems={menuItem} />
      </div>
      <Support />
      <Copyright />
    </section>
  );
};

export default Footer;
