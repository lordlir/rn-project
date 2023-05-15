import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import Home from "../Screens/Home/Home";

export default function Auth() {
  const AuthStack = createNativeStackNavigator();

  return (
    <>
      <AuthStack.Navigator
        initialRouteName="Registration"
        screenOptions={{ headerShown: false }}
      >
        <AuthStack.Screen name="Registration" component={RegistrationScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        {/* <AuthStack.Screen name="Home" component={Home} /> */}
      </AuthStack.Navigator>
    </>
  );
}
