import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/main/Header";

export default function PostsScreen({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Header>
          <Text style={{ marginHorizontal: 10 }}>Publications</Text>
          <MaterialIcons
            name="logout"
            size={24}
            color="#BDBDBD"
            style={{
              position: "absolute",
              right: 16,
              bottom: 10,
            }}
            onPress={() => navigation.navigate("Login")}
          />
        </Header>
        <View styles={{ flex: 1 }}></View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
