import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function AvatarBtn({ onPress }) {
  return (
    <View style={styles.btn}>
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    zIndex: 2,
    position: "absolute",
    bottom: 14,
    right: -12,
  },
});
