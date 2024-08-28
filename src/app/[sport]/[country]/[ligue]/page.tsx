import UserLists from "@/components/userLists/UserLists";
import Predictions from "@/components/predictions/Predictions";
import CountryLeague from "@/components/CountryLigue/CountryLeague";
import CountryLeaguesList from "@/components/CountryLigue/countryLeaguesList/CountryLeaguesList";

export default function Home() {
  return (
    <main className=" flex  py-4 pb-0 container gap-x-4 mobailmain">
      <div className="mobileNone">
        <CountryLeaguesList />
        <UserLists />
      </div>
      <CountryLeague />
      <div className="mobileNone">
        <Predictions />
      </div>
    </main>
  );
}
