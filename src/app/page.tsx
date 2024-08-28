import UserLists from "@/components/userLists/UserLists";
import AllMatchInfos from "@/components/allMatchInfoSection/AllMatchInfos";
import Predictions from "@/components/predictions/Predictions";

export default function Home() {
  return (
    <main className={`flex  py-4 pb-0 container gap-x-4 mobailmain`}>
      <div className="mobileNone">
        <UserLists />
      </div>
      <AllMatchInfos />
      <div className="mobileNone">
        <Predictions />
      </div>
    </main>
  );
}
