import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function ButtonForm({ title, onPress, disable }) {
  return (
    <TouchableOpacity
      style={[styles.btn, disable && { backgroundColor: "#F6F6F6" }]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disable}
    >
      <Text style={[styles.btnText, disable && { color: "#bdbdbd" }]}>
        {title}
      </Text>
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
