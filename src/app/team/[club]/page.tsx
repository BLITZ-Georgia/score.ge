import UserLists from "@/components/userLists/UserLists";
import Predictions from "@/components/predictions/Predictions";
import ClubMatchesInfo from "@/components/clubMatchesInfo/ClubMatchesInfo";

export default function Home() {
  return (
    <main className=" flex  py-4 pb-0 container gap-x-4 mobailmain">
      <div className="mobileNone">
        <UserLists />
      </div>
      <ClubMatchesInfo />
      <div className="mobileNone">
        <Predictions />
      </div>
    </main>
  );
}
