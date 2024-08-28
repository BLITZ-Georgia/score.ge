import { sportNavigation } from "@/lib/sportNavigation";

export const checkPage = (path: string) => {
  const isMainPage = sportNavigation.find((el: any) => el.href === path);

  if (path === "/") {
    return true;
  } else if (!!isMainPage) {
    return true;
  } else {
    return false;
  }
};
