import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";

import { Text } from "../components/Themed";
import { FontAwesome } from "@expo/vector-icons";

interface ButtonIconProps {
  text: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
}

export function ButtonIcon({
  text,
  onPress,
  textStyle,
  icon,
}: ButtonIconProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      <FontAwesome name={icon} size={24} color={"#E11C22"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#E11C22",
    fontSize: 18,
    marginRight: 8,
  },
});
