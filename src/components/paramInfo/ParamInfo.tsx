"use client";
import React from "react";
import style from "./style.module.css";
import { usePathname } from "next/navigation";
import { sportNavigation } from "@/lib/sportNavigation";

const ParamInfo: React.FC = () => {
  const path = usePathname();
  const pathArray = path.split("/").filter((el) => el);

  const PathArr = sportNavigation.find((el) => el.href.includes(pathArray[0]));

  return (
    <section className={`${style.info}`}>
      <i className="fa-solid fa-house-chimney"></i>

      <div className={`${style.addedParams} flex items-center`}>
        <div className="mr-1"> {PathArr && PathArr.img}</div>

        {pathArray.map((el: any, id: number) => (
          <React.Fragment key={el}>
            <span>
              {el.replaceAll("%20", " ").replaceAll("-", " ").toUpperCase()}
            </span>
            {id !== pathArray.length - 1 ? (
              <span className={`${style.paramArrow}`}>{">"}</span>
            ) : (
              ""
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default ParamInfo;
