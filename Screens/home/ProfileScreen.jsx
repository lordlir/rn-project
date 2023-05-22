import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  EvilIcons,
  SimpleLineIcons,
  MaterialIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/auth/Avatar";
import {
  selectUserAvatar,
  selectUserId,
  selectUserName,
} from "../../redax/auth/authReducer";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { authSingOutUser } from "../../redax/auth/authOperation";

export default function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [userAvatar, setUserAvatar] = useState(useSelector(selectUserAvatar));
  const userName = useSelector(selectUserName);
  const userId = useSelector(selectUserId);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      getAllPost();
    }, [])
  );

  const getAllPost = async () => {
    try {
      const q = query(collection(db, "posts"), where("userId", "==", userId));

      const querySnap = await getDocs(q);

      const posts = querySnap.docs.map((doc) => ({
        ...doc.data(),
        postId: doc.id,
      }));

      setPosts(posts);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const loguot = () => [dispatch(authSingOutUser)];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/img/img_auth.png")}
        style={styles.img}
      >
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 92,
            marginTop: 100,
            maxHeight: 700,
            backgroundColor: "#fff",
            position: "relative",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <View
            style={[
              styles.avatarBox,
              {
                transform: [{ translateX: -40 }],
              },
            ]}
          >
            <Avatar size={120} selectedImage={userAvatar} />
          </View>
          <TouchableOpacity
            onPress={loguot}
            style={{ position: "absolute", top: 22, right: 16 }}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontFamily: "RobotoMedium",
              marginBottom: 32,
            }}
          >
            name
          </Text>
          <FlatList
            style={{ height: 300 }}
            data={posts}
            keyExtractor={(item, i) => i.toString()}
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
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 24,
                      }}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          photo: item.photo,
                          postId: item.postId,
                        })
                      }
                    >
                      <View>
                        {item.comments > 0 ? (
                          <FontAwesome
                            name="comment"
                            size={24}
                            color="#ff6c00"
                            style={{ transform: [{ scaleX: -1 }] }}
                          />
                        ) : (
                          <FontAwesome
                            name="comment-o"
                            size={24}
                            color="#bdbdbd"
                            style={{ transform: [{ scaleX: -1 }] }}
                          />
                        )}
                      </View>

                      <Text style={styles.countComment}>{item.comments}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View>
                        <EvilIcons
                          name="like"
                          size={24}
                          color={item.likes > 0 ? "#ff6c00" : "#bdbdbd"}
                        />
                      </View>

                      <Text style={styles.countComment}>{item.likes}</Text>
                    </TouchableOpacity>
                  </View>
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  img: {
    resizeMode: "cover",
    justifyContent: "flex-end",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  avatarBox: {
    position: "absolute",
    top: -60,
    left: "50%",

    height: 120,
    width: 120,
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
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
