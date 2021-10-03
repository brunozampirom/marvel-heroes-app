import { FavoriteHeroProps } from "./../store/ducks/favoriteHeroes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CHARACTER_KEY = "@character_key";

export const getStoredFavoritesCharacters = async (): Promise<
  FavoriteHeroProps[]
> => {
  try {
    const jsonValue = await AsyncStorage.getItem(CHARACTER_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const storeFavoritesCharacters = async ({
  id,
  name,
  image,
}: FavoriteHeroProps) => {
  try {
    const favoritesListCharacters = await getStoredFavoritesCharacters();
    favoritesListCharacters.push({ id, name, image });
    const jsonValue = JSON.stringify(favoritesListCharacters);
    await AsyncStorage.setItem(CHARACTER_KEY, jsonValue);
  } catch (err) {
    console.error(err);
  }
};

export const removeStoredFavoritesCharacters = async ({
  id,
}: {
  id: number;
}) => {
  try {
    const favoritesList = await getStoredFavoritesCharacters();
    const newfavoritesList = favoritesList.filter((item) => item.id !== id);
    const jsonValue = JSON.stringify(newfavoritesList);
    await AsyncStorage.setItem(CHARACTER_KEY, jsonValue);
  } catch (err) {
    console.error(err);
  }
};
