import UserLists from "@/components/userLists/UserLists";
import AllMatchInfos from "@/components/allMatchInfoSection/AllMatchInfos";
import Predictions from "@/components/predictions/Predictions";
import { sportNavigation } from "@/lib/sportNavigation";
import { notFound } from "next/navigation";

export default function Home(props: any) {
  const isValidRoute = sportNavigation.some(
    (el: any) => el.href.replace("/", "") === props.params.sport
  );

  if (!isValidRoute) {
    notFound();
  }

  return (
    <main className=" flex  py-4 pb-0 container gap-x-4 mobailmain">
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
