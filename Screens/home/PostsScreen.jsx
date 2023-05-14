import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons, EvilIcons, FontAwesome } from "@expo/vector-icons";
import Header from "../../components/main/Header";
import Avatar from "../../components/auth/Avatar";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [route.params.location, ...prevState]);
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
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 32,
            paddingBottom: 180,
          }}
        >
          <View style={styles.userConteiner}>
            <View style={styles.avatarConteiner}>
              <Avatar size={60} />
            </View>
            <View>
              <Text style={styles.userNameText}>name</Text>
              <Text style={styles.userMailText}>email@mail.com</Text>
            </View>
          </View>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 32,
                }}
              >
                <View style={styles.imageConteiner}>
                  <Image
                    source={{ uri: item.photo }}
                    style={{ height: 240 }}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.imageTitleText}>{item.title}</Text>
                <View style={styles.touchableBox}>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => navigation.navigate("Comments", { item })}
                  >
                    {/* <FontAwesome
                      name="comment"
                      size={24}
                      color="#ff6c00"
                      style={{ transform: [{ scaleX: -1 }] }}
                    /> */}
                    <View>
                      <FontAwesome
                        name="comment-o"
                        size={24}
                        color="#bdbdbd"
                        style={{ transform: [{ scaleX: -1 }] }}
                      />
                    </View>

                    <Text style={styles.countComment}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => navigation.navigate("Map", item)}
                  >
                    <EvilIcons
                      name="location"
                      size={24}
                      color="#bdbdbd"
                      // style={styles.iconInputLocation}
                    />
                    <Text style={styles.location}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
  },
  userConteiner: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarConteiner: {
    height: 60,
    width: 60,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
    marginRight: 8,
  },
  userNameText: {
    fontFamily: "RobotoBold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userMailText: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121cc",
  },
  imageConteiner: {
    height: 240,

    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  imageTitleText: {
    fontFamily: "RobotoMedium",
    fontSize: 16,
    marginBottom: 8,
  },
  touchableBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countComment: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    marginLeft: 9,
    color: "#212121",
  },
  location: {
    textDecorationLine: "underline",
    fontFamily: "RobotoRegular",
    fontSize: 16,
    marginLeft: 9,
    color: "#212121",
  },
});
