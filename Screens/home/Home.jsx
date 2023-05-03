import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePossScreen from "./CreatePossScreen";

export default function home() {
  const MainTab = createBottomTabNavigator();
  return (
    // <NavigationContainer>
    <MainTab.Navigator initialRouteName="Posts">
      <MainTab.Screen name="Posts" component={PostsScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
      <MainTab.Screen name="CreatePosts" component={CreatePossScreen} />
    </MainTab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
