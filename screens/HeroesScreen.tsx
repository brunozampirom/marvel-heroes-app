import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { ActivityIndicator, View } from "../components/Themed";
import { Character, RootTabScreenProps } from "../types";
import { height, width } from "../constants";
import { getAllCharacters } from "../services/marvelService";
import { CardCharacter } from "../components/CardCharacter";
import { FullScreenLoading } from "../components/FullScreenLoading";

const numColumns = 4;
const numLines = 6;

export default function HeroesScreen({
  navigation,
}: RootTabScreenProps<"Heroes">) {
  const [characters, setCharacter] = useState<Character[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  const getHeroes = async () => {
    const { heroes, offset: newOffset } = await getAllCharacters(offset);
    const newList = [...characters, ...heroes];
    setCharacter(newList);
    setOffset(newOffset);
  };

  useEffect(() => {
    getHeroes();
  }, []);

  const loadMoreResults = async () => {
    getHeroes();
  };

  const refreshData = async () => {
    try {
      setRefreshing(true);
      await getHeroes();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <FullScreenLoading loading={!characters?.length}>
        <FlatList
          numColumns={numColumns}
          data={characters}
          keyExtractor={(item, key) => item.id.toString() + key}
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={250}
          onEndReachedThreshold={0.01}
          onEndReached={loadMoreResults}
          onRefresh={refreshData}
          refreshing={isRefreshing}
          renderItem={({ item }) => (
            <CardCharacter
              onPress={() =>
                navigation.navigate("HeroDetails", { id: item.id })
              }
              id={item.id}
              name={item.name}
              image={`${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`}
              imageProps={styles.image}
              viewProps={styles.card}
            />
          )}
          ListFooterComponent={
            <ActivityIndicator
              size="large"
              lightColor={"#000"}
              darkColor={"#fff"}
            />
          }
        />
      </FullScreenLoading>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 8,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
