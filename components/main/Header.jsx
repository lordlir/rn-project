import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Header({ children }) {
  return (
    <View style={styles.header}>
      {/* <View style={styles.headerContent}> */}
      {children}
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 88,
    paddingTop: 44,
    paddingBottom: 11,
    // paddingHorizontal
    paddingHorizontal: 10,

    backgroundColor: "#fff",

    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },

//   headerContent: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     // flex: 1,
//   },
});
