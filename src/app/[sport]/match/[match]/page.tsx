import ParamInfo from "@/components/paramInfo/ParamInfo";
import MatchSection from "@/components/matchSection/MatchSection";

export default function match() {
  return (
    <main className=" flex flex-col py-4 pb-0 matchContainer gap-x-4 bg-white ">
      <ParamInfo />
      <MatchSection />
    </main>
  );
}
