import React, { useEffect, useState } from "react";
import { Image, Share, StyleSheet } from "react-native";

import { Text, ScrollView, View } from "../components/Themed";
import { Character, RootTabScreenProps } from "../types";
import { height, width } from "../constants";
import { getCharacterInfo } from "../services/marvelService";
import { ButtonIcon } from "../components/ButtonIcon";
import { FullScreenLoading } from "../components/FullScreenLoading";
import { useAppDispatch, useAppSelector } from "../store";
import { HeroesActions } from "../store/ducks/favoriteHeroes";
import {
  removeStoredFavoritesCharacters,
  storeFavoritesCharacters,
} from "../storage/AsyncStorageFunctions";

export default function HeroDetailScreen({
  route,
  navigation,
}: RootTabScreenProps<"HeroDetails">) {
  const characterId = route.params.id;

  const dispatch = useAppDispatch();
  const favoritesCharacters = useAppSelector(
    (state) => state.FavoriteHeroesReducer.heroes
  );

  const [character, setCharacter] = useState<Character>();
  const [isFavorited, setFavorited] = useState<boolean>(false);

  useEffect(() => {
    const getHeroDetail = async () => {
      try {
        const hero = await getCharacterInfo(characterId);
        setCharacter(hero);
      } catch (err) {
        console.log(err);
      }
    };
    getHeroDetail();
  }, [characterId]);

  useEffect(() => {
    const isThisCharacterFavorited = favoritesCharacters.some(
      (character) => character.id === characterId
    );
    setFavorited(isThisCharacterFavorited);
  }, [characterId]);

  const shareOnPress = async () => {
    try {
      Share.share({
        message: `Hey, did you know "${character?.name}" from Marvel?`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const favoriteOnPress = () => {
    if (character) {
      const setFavorite = !isFavorited;
      setFavorited(setFavorite);

      setTimeout(() => {
        if (setFavorite) {
          const saveObj = {
            id: character.id,
            name: character.name,
            image: `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`,
          };

          dispatch(HeroesActions.addFavoriteHeroAction(saveObj));
          storeFavoritesCharacters(saveObj);
        } else {
          dispatch(
            HeroesActions.deleteFavoriteHeroAction({
              id: character.id,
            })
          );
          removeStoredFavoritesCharacters({ id: character.id });
        }
      }, 200);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <FullScreenLoading loading={!character}>
        <Text numberOfLines={2} style={styles.title}>
          {character?.name}
        </Text>
        <Image
          style={styles.image}
          source={{
            uri: `${character?.thumbnail?.path}/portrait_xlarge.${character?.thumbnail?.extension}`,
          }}
        />
        <View style={styles.containerIcons}>
          <ButtonIcon
            icon={isFavorited ? "star" : "star-o"}
            text={"Favorite"}
            onPress={favoriteOnPress}
          />
          <ButtonIcon icon="share" text={"Share"} onPress={shareOnPress} />
        </View>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={{ ...styles.description, fontWeight: "bold" }}>
          {"Description"}
        </Text>
        <Text numberOfLines={4} style={styles.description}>
          {character?.description !== "" ? character?.description : "N/A"}
        </Text>
      </FullScreenLoading>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  containerIcons: {
    width: width - 100,
    justifyContent: "space-around",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginVertical: 10,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  description: {
    marginVertical: 10,
    fontSize: 12,
    fontWeight: "normal",
  },
  buttonText: {
    color: "#E11C22",
    fontSize: 14,
  },
  separator: {
    marginVertical: 22,
    height: 1,
    width: "80%",
  },
  image: {
    borderRadius: 25,
    height: height - 450,
    width: width - 100,
  },
});
