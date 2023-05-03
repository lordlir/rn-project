import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Avatar() {
  return (
    <View
      style={[
        styles.avatarBox,
        {
          transform: [{ translateX: -40 }],
        },
      ]}
    ></View>
  );
}

const styles = StyleSheet.create({
  avatarBox: {
    position: "absolute",
    top: -60,
    left: "50%",

    height: 120,
    width: 120,
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
  },
});
