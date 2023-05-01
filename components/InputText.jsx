import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

import PropTypes from "prop-types";

export default function CustomTextInput({
  onChangeText,
  value,
  placeholder,
  marginBottom = 16,
  isPrimaryInput = true,
  paddingLeft = 16,
  secureTextEntry = false,
}) {
  const [onInput, setOnInput] = useState(false);

  const { primaryInput, secondaryInput } = styles;

  const onFocusBlurPrimaryTextInputStyles = {
    backgroundColor: onInput ? "#FFFFFF" : "#F6F6F6",
    borderColor: onInput ? "#FF6C00" : "#E8E8E8",
  };

  const onFocusBlurSecondaryTextInputStyles = {
    backgroundColor: "transparent",
    borderBottomColor: onInput ? "#FF6C00" : "#E8E8E8",
  };

  const isPrimaryInputStyles = isPrimaryInput
    ? {
        ...primaryInput,
        ...onFocusBlurPrimaryTextInputStyles,
        marginBottom,
        paddingLeft,
      }
    : {
        ...secondaryInput,
        ...onFocusBlurSecondaryTextInputStyles,
        marginBottom,
        paddingLeft,
      };

  return (
    <TextInput
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      style={isPrimaryInputStyles}
      onFocus={() => setOnInput(true)}
      onBlur={() => setOnInput(false)}
      selectionColor="#FF6C00"
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  inputText: {
    // flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    // textAlign: "center",
    // padding: 16,

    height: 50,

    // fontFamily: 'Roboto',
    // fontStyle: "normal",
    // fontWeight: 400,
    fontSize: 16,
    // lineHeight: 19,
    // borderColor: "#ff6c00",
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 8,
  },
});
