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

const initialInputState = {
  login: "",
  email: "",
  password: "",
};

export default function Form({ title }) {
  const [proveTitle, setProveTitle] = useState(true);
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

  const handlSubmit = () => {
    console.log(stateInput);
    setOnInput(false);
    setStateInput(initialInputState);
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
      {title === "Registration" ? <Avatar /> : ""}
      <FormTitle title={title} />
      {title === "Registration" ? (
        <TextInputCustom
          margin={{ marginBottom: 16 }}
          value={stateInput.login}
          placeholder={"Login"}
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
        onChangeText={(value) =>
          setStateInput((prevState) => ({
            ...prevState,
            email: value,
          }))
        }
        secureTextEntry={false}
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
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.7}
            onPress={handlSubmit}
          >
            <Text style={styles.btnText}>{btnText}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
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
    // paddingTop: {title === "Registration" ? 92 : 32},

    paddingHorizontal: 16,
    // paddingBottom: 45,
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
});
