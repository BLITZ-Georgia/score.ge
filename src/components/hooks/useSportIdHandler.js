import { usePathname, useSearchParams } from "next/navigation";
import { sportNavigation } from "@/lib/sportNavigation";
import { FootballIcon } from "@/common/svg/navigation";

export const useSportIdHandler = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const sportIdCheck = searchParams.get("sportId");
  if (sportIdCheck) {
    return sportNavigation.find((el) => el.id === sportIdCheck);
  }

  if (pathName === "/") {
    return {
      img: <FootballIcon />,
      alt: "/football",
      w: 20,
      h: 20,
      href: "/football",
      text: "FOOTBALL",
      id: 1,
    };
  }

  const foundSport = sportNavigation.find((el) => {
    const regex = new RegExp(`^${el.alt}(\/|$)`, "i");
    return regex.test(pathName);
  });

  return foundSport ? foundSport : null;
};
