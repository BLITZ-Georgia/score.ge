import React from "react";
import style from "./style.module.css";
import ParamInfo from "@/components/paramInfo/ParamInfo";
import Image from "next/image";
import Link from "next/link";

interface Country {
  COUNTRY_ID: number;
  COUNTRY_NAME: string;
  GENDER_ID: number;
  ID: string;
  IMAGE_ID: string;
  IMAGE_PATH: string;
  IMAGE_TABLE_PATH: string;
  IMAGE_WIDTH: string;
  IME: string;
  IMM: string;
  LAYOUT: string;
  NAME: string;
  PCI: string;
  SHORT_NAME: string;
  SPORT_ID: number;
  TAB: string;
  TYPE_ID: number;
  TYPE_NAME: string;
}

type infoProps = {
  setActiveSection: (section: string) => void;
  activeMenu: string;
  clubInfoData: Country;
};

const ClubInfo: React.FC<infoProps> = ({
  setActiveSection,
  activeMenu,
  clubInfoData,
}) => {
  const menu = [
    { title: "SUMMARY", href: "#" },
    { title: "PLAYER STATS", href: "#" },
  ];

  return (
    <article className={`${style.clubInfo} bg-white rounded-lg `}>
      <div className="  mb-7">
        <div className="p-4 pb-0">
          <ParamInfo />
          <section className={`${style.leagueTitle} flex  items-center`}>
            <div className={style.img}>
              <Image
                src={clubInfoData?.IMAGE_PATH || "/images/default/club.gif"}
                alt="img"
                width={60}
                height={60}
              />
            </div>

            <div className={style.title}>
              <h3 className="flex items-center gap-x-4">
                {clubInfoData?.NAME}{" "}
              </h3>
              <p>Country: {clubInfoData?.COUNTRY_NAME}</p>
            </div>
          </section>
        </div>
        <section className={`${style.clubMenu} p-4`}>
          <ul className="flex items-center gap-x-4">
            {menu.map((el, index) => (
              <li key={index} onClick={() => setActiveSection(el.title)}>
                <Link
                  href={el.href}
                  className={activeMenu === el.title ? style.active : ""}
                >
                  {el.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
};

export default ClubInfo;
