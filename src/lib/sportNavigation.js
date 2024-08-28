import {
  FootballIcon,
  TennisIcon,
  FavouriteIcon,
  HockeyIcon,
  BasketballIcon,
} from "@/common/svg/navigation";

export const sportNavigation = [
  {
    img: <FootballIcon />,
    alt: "/football",
    w: 20,
    h: 20,
    href: "/football",
    text: "FOOTBALL",
    id: "1",
  },
  {
    img: <TennisIcon />,
    alt: "/tennis",
    w: 19,
    h: 19,
    href: "/tennis",
    text: "TENNIS",
    id: "2",
  },
  {
    img: <BasketballIcon />,
    alt: "/basketball",
    w: 18,
    h: 18,
    href: "/basketball",
    text: "BASKETBALL",
    id: "3",
  },
  {
    img: <HockeyIcon />,
    alt: "/hockey",
    w: 18,
    h: 18,
    href: "/hockey",
    text: "HOCKEY",
    id: "4",
  },
];
