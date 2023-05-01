import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Children, useState } from "react";

export default function TextInputCustom({
  margin,
  value,
  placeholder,
  onChangeText,
  child,
  text,
}) {
  const [onInput, setOnInput] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const passwordText = secureTextEntry ? "show" : "hide";
  return (
    <View style={margin}>
      <TextInput
        style={[
          styles.inputText,
          onInput === placeholder && styles.inputFocused,
        ]}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#BDBDBD"}
        onFocus={() => setOnInput(placeholder)}
        onBlur={() => setOnInput(false)}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {placeholder === "Password" ? (
        <TouchableOpacity
          style={styles.showPass}
          onPress={() => {
            setSecureTextEntry((state) => !state);
          }}
        >
          <Text style={styles.showPassText}>{passwordText}</Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  showPass: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  showPassText: {
    fontSize: 16,
    color: "#1B4371",
  },
});
