"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import FixturesMatches from "./fixutresClubMatches/FixturesMatches";
import ResultMatches from "./resultClubMatches/ResultMatches";
import ClubTransfers from "../clubTransfers/ClubTransfers";

const ClubMatches = () => {
  const [active, setActive] = useState("TOTAL");

  return (
    <article className={`${style.clubmatches}   `}>
      <div className={`${style.menu} bg-white  p-4 `}>
        <div className={`flex items-center mb-4 gap-x-3 ${style.nav}`}>
          <button
            className={`${active === "TOTAL" ? style.active : ""}`}
            onClick={() => setActive("TOTAL")}
          >
            TOTAL
          </button>
          <button
            className={`${active === "FIXTURES" ? style.active : ""}`}
            onClick={() => setActive("FIXTURES")}
          >
            FIXTURES
          </button>
          <button
            className={`${active === "RESULTS" ? style.active : ""}`}
            onClick={() => setActive("RESULTS")}
          >
            RESULTS
          </button>
        </div>
      </div>

      {active === "TOTAL" && (
        <>
          <FixturesMatches pages={1} />
          <ResultMatches pages={1} />
          <ClubTransfers />
        </>
      )}
      {active === "FIXTURES" && <FixturesMatches pages={4} />}
      {active === "RESULTS" && <ResultMatches pages={5} />}
    </article>
  );
};

export default ClubMatches;
