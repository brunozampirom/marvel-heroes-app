import * as React from "react";
import {
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

import { Text, View } from "../components/Themed";

type CardCharacterProps = {
  name: string;
  image: ImageSourcePropType;
  viewProps: StyleProp<ViewStyle>;
  imageProps: StyleProp<ImageStyle>;
  onPress: () => void;
};

export function CardCharacter({
  image,
  name,
  viewProps,
  imageProps,
  onPress,
}: CardCharacterProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, viewProps]}>
        {image && <Image style={[styles.image, imageProps]} source={image} />}
        <Text numberOfLines={1} style={styles.title}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 20,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
});
