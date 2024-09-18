"use client";
import React from "react";
import PinnedLeagues from "./pinnedLeagues/PinnedLeagues";
import Countries from "./countries/Countries";
import dynamic from "next/dynamic";

const UserLists = () => {
  const UserTeams = dynamic(() => import("./userTeams/UserTeams"), {
    ssr: false,
  });

  return (
    <section className={`   w-full `}>
      <div className="bg-white w-full rounded-lg">
        <PinnedLeagues />
        <UserTeams />
        <Countries />
      </div>
    </section>
  );
};

export default UserLists;
