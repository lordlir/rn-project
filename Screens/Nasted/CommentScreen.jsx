import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectUserAvatar, selectUserId } from "../../redax/auth/authReducer";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";

import { db } from "../../firebase/config";
import Avatar from "../../components/auth/Avatar";
import { useFocusEffect } from "@react-navigation/native";

export default function CommentScreen({ route }) {
  const [comment, setComment] = useState(null);
  const [allComments, setAllComments] = useState([]);

  const { photo, postId } = route.params;

  const userAvatar = useSelector(selectUserAvatar);
  const userId = useSelector(selectUserId);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const comments = await getAllComment(postId);
  //       setAllComments(comments);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    (async () => {
      setAllComments(await getAllComment());
    })();
  }, []);

  // useEffect(() => {
  //   setAllComments(getAllComment());
  // }, []);

  const formatDate = (date) => {
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    return formattedDate;
  };

  // useFocusEffect(
  //   useCallback(async () => {
  //     console.log("useeffect commentScreen");
  //     const comments = await getAllComment(postId);
  //     setAllComments(comments);
  //   }, [])
  // );

  // console.log(allComments);
  const uploadCommentToServer = async () => {
    try {
      const newComment = { userAvatar, userId, postId, comment };
      const commRef = await addDoc(
        collection(db, `posts/${newComment.postId}`, "comments"),
        {
          ...newComment,
          createAt: moment().format("DD MMMM, YYYY | HH:mm"),
        }
      );
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, { comments: allComments.length + 1 });
      // setAllComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllComment = async () => {
    try {
      const q = query(
        collection(db, `posts/${postId}`, "comments")
        // orderBy("createdAt")
        // orderBy("createdAt", "asc")
      );

      const querySnapshot = await getDocs(q);

      const comments = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        commentId: doc.id,
        // createdAt: createdAt.toDate(),
        // createdAt: moment(doc.data().createdAt.toDate()).format(
        //   "DD-MM-YYYY HH:mm"
        // ),
        // createdAt: doc.data().createdAt.toDate(),
      }));
      console.log(comments);

      return comments;
    } catch (error) {
      alert(error.message);
    }
  };

  const handleComment = async () => {
    if (!comment) return alert("Comment cannot be empty.");
    await uploadCommentToServer();
    setComment("");
  };
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 32,
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ marginBottom: 32 }}>
        <Image
          source={{ uri: photo }}
          style={{ height: 240, resizeMode: "cover", borderRadius: 8 }}
        ></Image>
      </View>
      <FlatList
        // style={{ paddingBottom: 16 }}
        data={allComments}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              userId === item.userId ? styles.commentBox : styles.commentBoxR,
            ]}
          >
            <View
              style={[
                userId === item.userId
                  ? { marginLeft: 16 }
                  : { marginRight: 16 },
              ]}
            >
              <Avatar size={28} selectedImage={item.userAvatar} />
            </View>
            <View
              style={{
                padding: 16,
                backgroundColor: "#efeded",
                flexGrow: 1,
                borderTopRightRadius: 6,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
                // alignItems: ''

                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: "RobotoRegular",
                  marginBottom: 8,
                  fontSize: 13,
                  color: "#212121",
                }}
              >
                {item.comment}
              </Text>
              <Text
                style={{
                  textAlign: "right",

                  fontFamily: "RobotoRegular",
                  fontSize: 10,
                  color: "#bdbdbd",
                }}
              >
                {item.createAt}
              </Text>
              {/* <Text>{moment(item.createdAt).format("DD-MM-YYYY HH:mm")}</Text> */}
              {/* <Text>time</Text> */}
            </View>
          </View>
        )}
      />
      <View style={{ flexShrink: 0, position: "relative" }}>
        <TextInput
          style={{
            height: 50,
            // minHeight: 50,
            // maxHeight: 100,
            width: "100%",
            borderRadius: 100,
            backgroundColor: "#f6f6f6",
            borderWidth: 1,
            borderColor: "#e8e8e8",
            padding: 16,
          }}
          multiline
          textAlignVertical="top"
          placeholder="Comment..."
          placeholderTextColor="#BDBDBD"
          value={comment}
          onChangeText={(value) => setComment(value)}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: [{ translateY: -17 }],
          }}
          onPress={handleComment}
        >
          <Ionicons name="md-arrow-up-circle" size={34} color="#ff6c00" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentBox: {
    flexDirection: "row-reverse",
    marginBottom: 24,
  },
  commentBoxR: {
    flexDirection: "row",
    marginBottom: 24,
  },
});
