import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
// import { TextInput } from "react-native-paper";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";

import keyboardShow from "../util/keyboard";
import Form from "../components/auth/Form";
import { authSingUpUser } from "../redax/auth/authOperation";

export default function RegistrationScreen({ navigation }) {
  const dispatch = useDispatch();

  const initialInputState = {
    login: "",
    email: "",
    password: "",
    avatar: null,
  };
  const [onInput, setOnInput] = useState(false);

  const onBlurInput = () => {
    setOnInput(false);
    Keyboard.dismiss();
  };
  console.log("Platform ==>", Platform);

  // const onSubmit = () => {
  //   console.log(stateInput);
  //   dispatch(authSingUpUser(stateInput));
  //   setOnInput(false);
  //   setStateInput(initialInputState);
  //   navigation.navigate("Home");
  // };
  return (
    <TouchableWithoutFeedback onPress={onBlurInput}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.img}
          source={require("../assets/img/img_auth.png")}
        >
          <ScrollView style={styles.scrollBoxx}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : ""}
            >
              <Form
                title={"Registration"}
                navigation={navigation}
                initialInputState={initialInputState}
                authMethod={authSingUpUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollBoxx: {
    backfaceVisibility: "visible",
    flexShrink: 0,
    flexGrow: 0,
  },
  container: {
    flex: 1,

    backgroundColor: "#fff",
    justifyContent: "flex-end",
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
});
