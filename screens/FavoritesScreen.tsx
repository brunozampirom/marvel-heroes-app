import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { height, width } from "../constants";
import { CardCharacter } from "../components/CardCharacter";
import { FullScreenLoading } from "../components/FullScreenLoading";
import { useAppSelector } from "../store";

const numColumns = 3;
const numLines = 4;

export default function FavoritesScreen({
  navigation,
}: RootTabScreenProps<"Favorites">) {
  const characters = useAppSelector(
    (state) => state.FavoriteHeroesReducer.heroes
  );

  return (
    <View style={styles.container}>
      <FullScreenLoading loading={!characters}>
        {characters?.length ? (
          <FlatList
            numColumns={numColumns}
            data={characters}
            keyExtractor={(item, key) => item.id.toString() + key}
            contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CardCharacter
                onPress={() =>
                  navigation.navigate("HeroDetails", { id: item.id })
                }
                id={item.id}
                name={item.name}
                image={item.image}
                preview={item.image}
                imageProps={styles.image}
                textProps={{ fontSize: 14 }}
                viewProps={styles.card}
              />
            )}
          />
        ) : (
          <View style={styles.containerEmpty}>
            <Text style={styles.title}>
              {"You don't have any saved characters yet."}
            </Text>
          </View>
        )}
      </FullScreenLoading>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerEmpty: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
  },
  image: {
    height: height / numLines - 50,
    width: width / numColumns - 20,
  },
  card: {
    height: height / numLines - 5,
    width: width / numColumns - 5,
  },
});
