import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/main/Header";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [route.params, ...prevState]);
    }
  }, [route.params]);
  console.log("post", posts);
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
        <View style={{ paddingHorizontal: 16 }}>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri: item.photo }}
                  style={{ height: 240, width: 343 }}
                  resizeMode="cover"
                />
              </View>
            )}
          />
        </View>
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
