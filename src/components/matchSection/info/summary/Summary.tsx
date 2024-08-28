import React from "react";
import style from "./style.module.css";
import Link from "next/link";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import Substition from "./summaryItems/Substition";
import Penalty from "./summaryItems/Penalty";
import Goal from "./summaryItems/Goal";
import Dissalowed from "./summaryItems/Dissalowed";

const Summary = ({ data }: { data: any }) => {
  return (
    <section className={`${style.formInfo}`}>
      <div className={`${style.playList}  mb-4`}>
        {data?.DATA?.map((el: any) => {
          return (
            <div
              className={` flex items-center mb-3 w-full flex-col`}
              key={el.STAGE_NAME}
            >
              <div
                className={`${style.title} mb-4  w-full flex justify-between`}
              >
                <p>{el.STAGE_NAME}</p>
                <div className={`${style.scoreInfo} flex items-center `}>
                  <p>{el.RESULT_HOME}</p>
                  <p>-</p>
                  <p>{el.RESULT_AWAY}</p>
                </div>
              </div>
              <div
                className={` ${style.incidentList} flex items-center mb-3 w-full flex-col`}
              >
                {!!el?.ITEMS &&
                  el?.ITEMS.map((incident: any) => {
                    return (
                      <div
                        key={incident.INCIDENT_ID}
                        className={`w-full flex items-center gap-x-2 ${
                          style.incidentListItem
                        } ${
                          incident.INCIDENT_TEAM === 1 ||
                          incident.SIDE_NEW === "1"
                            ? style.firstTeam
                            : style.secondTeam
                        }`}
                      >
                        {/* {!incident?.INCIDENT_PARTICIPANTS?.length ? <div></div>:""} */}

                        {incident.INCIDENT_NAME_NEW === "Goal Disallowed" && (
                          <Dissalowed
                            id={incident.PARTICIPANT_ID_NEW}
                            name={incident.PARTICIPANT_NAME_NEW}
                            time={incident.TIME_NEW}
                            type={incident.INCIDENT_TYPE_NEW}
                            key={incident.INCIDENT_ID}
                            incidentName={incident.INCIDENT_NAME_NEW}
                            side={incident.SIDE_NEW}
                          />
                        )}

                        {incident?.INCIDENT_PARTICIPANTS?.map((item: any) => {
                          return (
                            <>
                              {(item.INCIDENT_TYPE === "YELLOW_CARD" ||
                                item.INCIDENT_TYPE === "RED_CARD") && (
                                <CardIncidents
                                  id={item.PARTICIPANT_ID}
                                  name={item.PARTICIPANT_NAME}
                                  time={incident.INCIDENT_TIME}
                                  type={item.INCIDENT_TYPE}
                                  key={item.PARTICIPANT_ID}
                                />
                              )}

                              {(item.INCIDENT_TYPE === "SUBSTITUTION_OUT" ||
                                item.INCIDENT_TYPE === "SUBSTITUTION_IN") && (
                                <Substition
                                  id={item.PARTICIPANT_ID}
                                  name={item.PARTICIPANT_NAME}
                                  time={incident.INCIDENT_TIME}
                                  type={item.INCIDENT_TYPE}
                                  key={item.PARTICIPANT_ID}
                                />
                              )}

                              {(item.INCIDENT_TYPE === "PENALTY_KICK" ||
                                item.INCIDENT_TYPE === "PENALTY_MISSED" ||
                                item.INCIDENT_TYPE === "PENALTY_SCORED") && (
                                <Penalty
                                  id={item.PARTICIPANT_ID}
                                  name={item.PARTICIPANT_NAME}
                                  time={incident.INCIDENT_TIME}
                                  type={item.INCIDENT_TYPE}
                                  key={item.PARTICIPANT_ID}
                                  incidentName={item.INCIDENT_NAME}
                                  awayScore={item.AWAY_SCORE}
                                  homeScore={item.HOME_SCORE}
                                  stageName={el.STAGE_NAME}
                                />
                              )}

                              {(item.INCIDENT_TYPE === "GOAL" ||
                                item.INCIDENT_TYPE === "ASSISTANCE") && (
                                <Goal
                                  id={item.PARTICIPANT_ID}
                                  name={item.PARTICIPANT_NAME}
                                  time={incident.INCIDENT_TIME}
                                  type={item.INCIDENT_TYPE}
                                  key={item.PARTICIPANT_ID}
                                  incidentName={item.INCIDENT_NAME}
                                  awayScore={item.AWAY_SCORE}
                                  homeScore={item.HOME_SCORE}
                                  stageName={el.STAGE_NAME}
                                />
                              )}
                            </>
                          );
                        })}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const CardIncidents = ({
  type,
  time,
  id,
  name,
}: {
  type: string;
  time: string;
  id: string;
  name: string;
}) => {
  const sportId = useSportIdHandler();
  return (
    <div className={`${style.incidentItem} flex items-center gap-x-2`}>
      <p className={style.incidentTime}>{time}</p>
      <div
        className={`${style.card} ${
          type === "YELLOW_CARD" ? style.yellowCard : style.redCard
        }`}
      >
        <div></div>
      </div>
      <Link href={`/player/${name}?playerId=${id}&sportId=${sportId?.id}`}>
        {name}
      </Link>
    </div>
  );
};

export default Summary;
