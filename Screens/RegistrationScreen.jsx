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

export default function RegistrationScreen({ navigation }) {
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
          <ScrollView style={styles.scrollBoxx}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : ""}
            >
              <Form title={"Registration"} navigation={navigation} />
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
