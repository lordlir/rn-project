import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import Form from "../components/auth/Form";
import { useDispatch } from "react-redux";
import { authSingInUser } from "../redax/auth/authOperation";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const initialInputState = {
    email: "",
    password: "",
  };
  const [onInput, setOnInput] = useState(false);

  const onBlurInput = () => {
    setOnInput(false);
    Keyboard.dismiss();
  };

  // const onSubmit = () => {
  //   console.log(stateInput);
  //   dispatch(authSingInUser(stateInput));
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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <Form
              title={"Login"}
              navigation={navigation}
              initialInputState={initialInputState}
              authMethod={authSingInUser}
            />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
