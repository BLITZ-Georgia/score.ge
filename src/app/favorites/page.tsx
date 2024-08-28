import Predictions from "@/components/predictions/Predictions";
import UserTeams from "@/components/userLists/userTeams/UserTeams";
import dynamic from "next/dynamic";
import { getPrediction } from "@/utils/getPredictions";

export default async function Favorites() {
  const NoSSR = dynamic(() => import("@/components/favourite/Favorites"), {
    ssr: false,
  });

  const res = await getPrediction();

  const parsedData = res.props.rssData.rss.channel.item;

  return (
    <main className=" flex  py-4 pb-0 container gap-x-4 mobailmain">
      <div className="mobileNone">
        <UserTeams />
      </div>
      <NoSSR />
      <div className="mobileNone">
        <Predictions data={parsedData} />
      </div>
    </main>
  );
}
