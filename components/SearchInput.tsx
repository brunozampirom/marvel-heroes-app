import * as React from "react";
import { StyleSheet, TextInputProps, TouchableOpacity } from "react-native";
import { width } from "../constants";

import { Text, TextInput, View } from "./Themed";

interface SearchInputProps extends TextInputProps {
  buttonText: string;
  onPress: () => void;
}

export function SearchInput({
  buttonText,
  onPress,
  ...props
}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} maxLength={30} {...props} />
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: width - 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E11C22",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  textInput: {
    width: "80%",
  },
  buttonText: {
    fontSize: 16,
    color: "#E11C22",
    marginHorizontal: 4,
    fontWeight: "bold",
  },
});
