import * as React from "react";
import { StyleSheet } from "react-native";

import { View, ActivityIndicator } from "./Themed";

interface FullScreenLoadingProps {
  loading: boolean;
  children: any;
}

export function FullScreenLoading({
  loading,
  children,
}: FullScreenLoadingProps) {
  if (!loading) return children;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" lightColor={"#000"} darkColor={"#fff"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
