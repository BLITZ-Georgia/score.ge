import React from "react";
import style from "./style.module.css";
import { Venue, Flag, Capacity, Referee } from "@/common/svg/match";

const StadiumInfo = ({ summaryData }: { summaryData: any }) => {
  return (
    <section
      className={`${style.formInfo}  flex justify-between p-3 gap-x-3 flex-col`}
    >
      <div className={`${style.title} mb-4 `}>
        <p>MATCH INFORMATION</p>
      </div>

      <article className={`${style.matchInformation} mb-4 `}>
        <div className={`${style.matchInfoItem} mb-4 `}>
          <div className="flex">
            <Referee />
            <h4>REFEREE:</h4>
          </div>
          <h3>{summaryData?.INFO?.REFEREE}</h3>
        </div>
        <div className={`${style.matchInfoItem} mb-4 `}>
          <div className="flex">
            <Venue />
            <h4>VENUE:</h4>
          </div>
          <h3>{summaryData?.INFO?.VENUE}</h3>
        </div>
        <div className={`${style.matchInfoItem} mb-4 `}>
          <div className="flex">
            <Capacity />
            <h4>CAPACITY:</h4>
          </div>
          <h3>{summaryData?.INFO?.MIV}</h3>
        </div>
        {summaryData?.INFO?.ATTENDANCE && (
          <div className={`${style.matchInfoItem} mb-4 `}>
            <div className="flex">
              <Capacity />
              <h4>ATTENDANCE:</h4>
            </div>
            <h3>{summaryData?.INFO?.ATTENDANCE}</h3>
          </div>
        )}
      </article>
    </section>
  );
};

export default StadiumInfo;
