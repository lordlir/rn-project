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
import Home from "../Screens/home/Home";

export default function Auth() {
  const AuthStack = createNativeStackNavigator();

  return (
    <>
      <AuthStack.Navigator
        initialRouteName="Registration"
        screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <AuthStack.Screen name="Registration" component={RegistrationScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Home" component={Home} />
      </AuthStack.Navigator>
      {/* <TouchableWithoutFeedback> */}
      {/* <RegistrationScreen /> */}
      {/* <LoginScreen /> */}
      {/* </TouchableWithoutFeedback> */}
    </>
  );
}

const styles = StyleSheet.create({});
