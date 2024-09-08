"use client";
import React from "react";
import style from "./style.module.css";
import FooterMenu from "./footerMenu/FooterMenu";
import Support from "./support/Support";
import Copyright from "./copyright/Copyright";
import { usePathname } from "next/navigation";
import {
  livescoreMenu,
  footballInernational,
  footballLeagues,
  predictionsMenu,
  analyticsMenu,
} from "@/lib/footer";

const Footer = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const matchRouteHandler = pathName.includes("match");

  return (
    <section
      className={`${style.footer}  mt-5  pt-9 ${
        matchRouteHandler ? "hide" : ""
      }`}
    >
      <div className={`flex gap-x-6 gap-y-8 ${style.footerItem} container`}>
        <FooterMenu title={"LIVESCORE"} menuItems={livescoreMenu} />{" "}
        <FooterMenu
          title={"FOOTBALL International"}
          menuItems={footballInernational}
        />
        <FooterMenu title={"FOOTBALL Leagues"} menuItems={footballLeagues} />
        <FooterMenu title={"PREDICTIONS"} menuItems={predictionsMenu} />
        <FooterMenu title={"ANALYTICS"} menuItems={analyticsMenu} />
      </div>
      <Support />
      <Copyright>{children}</Copyright>
    </section>
  );
};

export default Footer;
