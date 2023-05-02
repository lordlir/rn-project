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
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Auth() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator
        initialRouteName="Registration"
        screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
      {/* <TouchableWithoutFeedback> */}
      {/* <RegistrationScreen /> */}
      {/* <LoginScreen /> */}
      {/* </TouchableWithoutFeedback> */}
    </>
  );
}

const styles = StyleSheet.create({});
