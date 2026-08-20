import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../theme/colors";
import { vs } from "react-native-size-matters";

// Yüklenme sırasında (API isteği beklerken) gösterilen ortak spinner bileşeni.
// Birden çok ekranda tekrar kullanılıyor.
const CustomLoading = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={colors.activeColor} />
      <Text
        style={{
          color: colors.textColor,
          marginTop: vs(4),
          textAlign: "center",
        }}
      >
        Loading
      </Text>
    </View>
  );
};

export default CustomLoading;

const styles = StyleSheet.create({});
