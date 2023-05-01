import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";

export default function Auth() {
  return (
    <>
      {/* <TouchableWithoutFeedback> */}
      {/* <RegistrationScreen /> */}
      <LoginScreen />
      {/* </TouchableWithoutFeedback> */}
    </>
  );
}

const styles = StyleSheet.create({});
