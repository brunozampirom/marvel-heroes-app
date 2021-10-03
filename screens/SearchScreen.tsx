import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { Character, RootTabScreenProps } from "../types";
import { height, width } from "../constants";
import { CardCharacter } from "../components/CardCharacter";
import { FullScreenLoading } from "../components/FullScreenLoading";
import { useAppSelector } from "../store";
import { SearchInput } from "../components/SearchInput";
import { searchCharacterByName } from "../services/marvelService";

const numColumns = 3;
const numLines = 4;

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<"Search">) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const searchCharacter = async () => {
    try {
      setLoading(true);
      const { heroes } = await searchCharacterByName(input);
      setCharacters(heroes);
    } catch {
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SearchInput
        buttonText={"Find"}
        placeholder="Capitain America"
        returnKeyType="done"
        onChangeText={setInput}
        value={input}
        onPress={searchCharacter}
        onSubmitEditing={searchCharacter}
      />
      <FullScreenLoading loading={loading}>
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
                image={`${item.thumbnail?.path}/portrait_xlarge.${item.thumbnail?.extension}`}
                imageProps={styles.image}
                textProps={{ fontSize: 14 }}
                viewProps={styles.card}
              />
            )}
          />
        ) : (
          <View style={styles.containerEmpty}>
            <Text style={styles.message}>{"No characters found."}</Text>
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
    fontSize: 14,
    marginLeft: 25,
    marginTop: 10,
  },
  message: {
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
