import React from "react";
import style from "./style.module.css";

const SignSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
      stroke="var(--navItems-color)"
    />
    <path
      d="M8 4.5H8.0065"
      stroke="var(--navItems-color)"
      strokeLinecap="round"
    />
    <path
      d="M6.6001 7.30005H8.0001V10.8M6.6001 10.8H9.4001"
      stroke="var(--navItems-color)"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MatchesInfoTips = ({
  qualification = {},
  decisionData,
}: {
  qualification: any;
  decisionData: any;
}) => {
  const arrayOfObjects = Object.entries(qualification).map((el: any) => {
    const [key, value] = el;
    return {
      id: key,
      category: value[0],
      text: value[1],
      color: value[2],
    };
  });

  return (
    <article className={`${style.info} mt-4 flex flex-rows justify-between`}>
      <div className="flex flex-col ">
        {arrayOfObjects?.map((el: any, id: any) => {
          return (
            <div className="flex items-center gap-x-3 mb-2" key={id}>
              <span
                className="rounded-xl"
                style={{
                  backgroundColor: `#${el.color}`,
                  width: "14px",
                  height: "14px",
                }}
              ></span>
              <p className={`text-xs ${style.textColor}`}>{el.text}</p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col">
        {decisionData?.slice(1).map((el: any, id: any) => (
          <div className="flex items-center gap-x-2 mb-2" key={id}>
            <span className={`text-xs ${style.textColor}`}>
              <SignSvg />
            </span>
            <p className={`text-xs ${style.textColor}`}>{el}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default MatchesInfoTips;
