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

import keyboardShow from "../util/keyboard";
import Form from "../components/auth/Form";

export default function RegistrationScreen() {
  const [onInput, setOnInput] = useState(false);

  const onBlurInput = () => {
    setOnInput(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={onBlurInput}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.img}
          source={require("../assets/img/img_auth.png")}
        >
          {/* <ScrollView> */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <Form title={"Registration"} />
          </KeyboardAvoidingView>
          {/* </ScrollView> */}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    // justifyContent: "flex-end",
    // alignItems: "flex-end",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
