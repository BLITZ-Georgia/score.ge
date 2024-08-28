import React from "react";
import FormInfo from "./formInfo/FormInfo";
import NotPlay from "./notPlay/NotPlay";
import StadiumInfo from "./stadiumInfo/StadiumInfo";
import Summary from "./summary/Summary";

interface props {
  eventData: any;
  h2hData: any;
  summaryData: any;
}

const MatchInfo: React.FC<props> = ({ eventData, h2hData, summaryData }) => {
  return (
    <section>
      {eventData.STAGE && (
        <div className="px-3">
          <Summary data={summaryData} />
        </div>
      )}

      <FormInfo eventData={eventData} h2hData={h2hData} />

      <div className="px-3">
        <NotPlay />
      </div>

      <StadiumInfo summaryData={summaryData} />
    </section>
  );
};

export default MatchInfo;
