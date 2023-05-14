import React, { useState } from "react";
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

import keyboardShow from "../../util/keyboard";
import FormTitle from "./FormTitle";
import Avatar from "./Avatar";
import TextInputCustom from "./TextInputCustom";
import ButtonForm from "../ButtonForm";
import AvatarBtn from "../AvatarBtn";
import * as ImagePicker from "expo-image-picker";

const imagePlaseholder = require("../../assets/img/pngegg.png");

export default function Form({ title, navigation, initialInputState }) {
  const [proveTitle, setProveTitle] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const isShowKeyboard = keyboardShow();
  const [stateInput, setStateInput] = useState(initialInputState);
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [onInput, setOnInput] = useState(false);

  let btnText = "Registr";
  let linkText = "Already have an account. Log In";
  const chengeBtnText = () => {
    if (title === "Login") {
      btnText = "Login";
      linkText = "No account yet? Registr";
    }

    return;
  };
  chengeBtnText();

  let NavigateToAuthScreen = "Login";

  const navigateTo = () => {
    // let navigaToAuthScree = title;
    if (title === NavigateToAuthScreen) {
      return (NavigateToAuthScreen = "Registration");
    }
    return (NavigateToAuthScreen = "Login");
  };
  navigateTo();
 

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setStateInput((prevState) => ({
        ...prevState,
        avatar: selectedImage,
      }));
    } else {
      alert("You did not select any image.");
    }
  };

   const handlSubmit = () => {
    console.log(stateInput);
    setOnInput(false);
    setStateInput(initialInputState);
    navigation.navigate("Home");
  };
  return (
    <View
      style={[
        styles.form,
        { paddingTop: title === "Registration" ? 92 : 32 },
        {
          paddingBottom: isShowKeyboard ? 33 : 45,
        },
      ]}
    >
      {title === "Registration" ? (
        <View
          style={[
            styles.avatarBox,
            {
              transform: [{ translateX: -40 }],
            },
          ]}
        >
          <Avatar
            selectedImage={selectedImage}
            imagePlaseholder={imagePlaseholder}
            size={120}
          >
            <AvatarBtn onPress={pickImageAsync} />
          </Avatar>
        </View>
      ) : (
        ""
      )}
      <FormTitle title={title} />
      {title === "Registration" ? (
        <TextInputCustom
          margin={{ marginBottom: 16 }}
          value={stateInput.login}
          placeholder={"Login"}
          secureTextEntry={false}
          onChangeText={(value) =>
            setStateInput((prevState) => ({
              ...prevState,
              login: value,
            }))
          }
        />
      ) : (
        ""
      )}
      <TextInputCustom
        margin={{ marginBottom: 16 }}
        value={stateInput.email}
        placeholder={"Email"}
        secureTextEntry={false}
        onChangeText={(value) =>
          setStateInput((prevState) => ({
            ...prevState,
            email: value,
          }))
        }
      />
      <TextInputCustom
        margin={{ marginBottom: isShowKeyboard ? 0 : 43 }}
        value={stateInput.password}
        placeholder={"Password"}
        onChangeText={(value) =>
          setStateInput((prevState) => ({
            ...prevState,
            password: value,
          }))
        }
        secureTextEntry={secureTextEntry}
      />

      {!isShowKeyboard ? (
        <>
          <ButtonForm title={btnText} onPress={handlSubmit} />
          <TouchableOpacity
            onPress={() => navigation.navigate(NavigateToAuthScreen)}
          >
            <Text
              style={[
                styles.linkText,
                { marginBottom: title === "Registration" ? 0 : 66 },
              ]}
            >
              {linkText}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        ""
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    position: "relative",
    marginTop: 60,
    paddingHorizontal: 16,

    backgroundColor: "#fff",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formRegistr: {
    paddingTop: 92,
    paddingBottom: 45,
  },
  formLogin: {
    paddingTop: 32,
    paddingBottom: 111,
  },

  inputText: {
    paddingHorizontal: 16,
    justifyContent: "center",

    height: 50,

    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 8,
  },
  inputFocused: {
    backgroundColor: "#fff",
    borderColor: "#ff6c00",
  },
  btn: {
    padding: 16,
    marginBottom: 16,
    alignItems: "center",

    backgroundColor: "#ff6c00",
    borderRadius: 100,
  },
  btnText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,

    color: "#fff",
  },
  linkText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,

    textAlign: "center",

    color: "#1B4371",
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
});
