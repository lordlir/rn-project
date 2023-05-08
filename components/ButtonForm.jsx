import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function ButtonForm({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 16,
    marginBottom: 16,
    alignItems: "center",

    backgroundColor: "#ff6c00",
    borderRadius: 100,
  },
  btnText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,

    color: "#fff",
  },
});
