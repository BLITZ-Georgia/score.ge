import React from "react";
import { IoFootballOutline } from "react-icons/io5";

export const NoMatchFound = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center flex-col p-3 h-max">
      <IoFootballOutline
        style={{
          fontSize: "80px",
          color: "var(--match-league-title-color)",
        }}
      />
      <p
        style={{ color: "var(--black-color)", fontSize: "13px" }}
        className="mt-3"
      >
        {title}
      </p>
    </div>
  );
};
