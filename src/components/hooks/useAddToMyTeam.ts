"use client";
import { useLocalStorage } from "usehooks-ts";

interface team {
  image: string;
  name: string;
  id: string | undefined;
  url: string;
  sportId: string | number | undefined;
}

export const useAddToMyTeams = () => {
  const [myTeamsList, setMyTeamsList] = useLocalStorage<team[]>(
    "myTeamsList",
    []
  );

  function addToMyTeam(
    name: string,
    image: string,
    id: string,
    url: string,
    sportId: string | number | undefined
  ) {
    const itemIndex = myTeamsList?.findIndex((el) => el.id === id);

    if (itemIndex !== -1) {
      setMyTeamsList(myTeamsList.filter((el) => el.id !== id));
    } else {
      setMyTeamsList([...myTeamsList, { name, image, id, url, sportId }]);
    }
  }

  function removeFromMyTeam(id: string) {
    const filteredList = myTeamsList.filter((el: team) => el.id !== id);

    setMyTeamsList(filteredList);
  }

  function isFavorited(id: string): boolean {
    return myTeamsList.some((team) => team.id === id);
  }

  return { addToMyTeam, removeFromMyTeam, isFavorited };
};
