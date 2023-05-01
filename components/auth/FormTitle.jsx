import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function FormTitle({ title }) {
  return (
    <View>
      <Text style={styles.titleAuth}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleAuth: {
    marginHorizontal: "auto",

    marginBottom: 33,

    fontFamily: "RobotoBold",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,

    color: "#212121",
  },
});
