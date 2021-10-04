import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import { Text, View } from "../components/Themed";
import {
  removeStoredFavoritesCharacters,
  storeFavoritesCharacters,
} from "../storage/AsyncStorageFunctions";
import { useAppDispatch, useAppSelector } from "../store";
import { HeroesActions } from "../store/ducks/favoriteHeroes";

type CardCharacterProps = {
  id: number;
  name: string;
  image: string;
  preview: string;
  viewProps?: StyleProp<ViewStyle>;
  imageProps?: StyleProp<ImageStyle>;
  textProps?: StyleProp<TextStyle>;
  onPress: () => void;
};

export function CardCharacter({
  id,
  image,
  preview,
  name,
  viewProps,
  imageProps,
  textProps,
  onPress,
}: CardCharacterProps) {
  const dispatch = useAppDispatch();
  const favoritesCharacters = useAppSelector(
    (state) => state.FavoriteHeroesReducer.heroes
  );

  const [isFavorited, setFavorited] = useState<boolean>(false);

  useEffect(() => {
    const isThisCharacterFavorited = favoritesCharacters.some(
      (character) => character.id === id
    );
    setFavorited(isThisCharacterFavorited);
  }, [id, favoritesCharacters]);

  const favoriteOnPress = () => {
    const setFavorite = !isFavorited;
    setFavorited(setFavorite);
    setTimeout(() => {
      if (setFavorite) {
        const saveObj = {
          id: id,
          name: name,
          image: image,
        };

        dispatch(HeroesActions.addFavoriteHeroAction(saveObj));
        storeFavoritesCharacters(saveObj);
      } else {
        dispatch(
          HeroesActions.deleteFavoriteHeroAction({
            id: id,
          })
        );
        removeStoredFavoritesCharacters({ id: id });
      }
    }, 200);
  };

  return (
    <View style={[styles.card, viewProps]}>
      <TouchableOpacity onPress={onPress}>
        {image && (
          <Image
            style={[styles.image, imageProps]}
            uri={image}
            preview={{
              uri: preview,
            }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={favoriteOnPress}
        style={styles.containerBottom}
      >
        <FontAwesome
          name={isFavorited ? "star" : "star-o"}
          size={12}
          color={"#E11C22"}
        />
        <Text numberOfLines={1} style={[styles.title, textProps]}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 9,
  },
  image: {
    borderRadius: 20,
  },
  containerBottom: {
    marginTop: 2,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
});
