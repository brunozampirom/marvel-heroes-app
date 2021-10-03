import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { HeroesActions } from "../store/ducks/favoriteHeroes";
import { getStoredFavoritesCharacters } from "./AsyncStorageFunctions";

interface UseStoredInfoProps {
  children: any;
}

export function UseStoredInfo({ children }: UseStoredInfoProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setStoredFavorites = async () => {
      const storedFavorites = await getStoredFavoritesCharacters();
      dispatch(HeroesActions.setAllFavoriteHeroesAction(storedFavorites));
    };
    setStoredFavorites();
  }, []);

  return children;
}
