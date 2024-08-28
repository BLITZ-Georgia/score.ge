import React from "react";
import style from "./style.module.css";
import PinnedLeagues from "./pinnedLeagues/PinnedLeagues";
import UserTeams from "./userTeams/UserTeams";
import Countries from "./countries/Countries";

const UserLists = () => {
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
