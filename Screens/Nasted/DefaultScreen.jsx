import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "../Home/PostsScreen";
import CommentScreen from "./CommentScreen";
import MapScreen from "./MapScreen";

const NestedStack = createStackNavigator();

export default function DefaultScreen() {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <NestedStack.Screen name="Comments" component={CommentScreen} />
      <NestedStack.Screen name="Map" component={MapScreen} />
    </NestedStack.Navigator>
  );
}

const styles = StyleSheet.create({});
