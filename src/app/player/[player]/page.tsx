import PlayerSection from "@/components/playerSection/PlayerSection";
import Predictions from "@/components/predictions/Predictions";
import UserLists from "@/components/userLists/UserLists";

export default function player() {
  return (
    <main className=" flex  py-4 pb-0 container gap-x-4 mobailmain">
      <div className="mobileNone">
        <UserLists />
      </div>
      <PlayerSection />
      <div className="mobileNone">
        <Predictions />
      </div>
    </main>
  );
}
