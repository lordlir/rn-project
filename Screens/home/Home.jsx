import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CreatePossScreen from "./CreatePossScreen";
import { MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";
import DefaultScreen from "../Nasted/DefaultScreen";

export default function Home() {
  const MainTab = createBottomTabNavigator();
  return (
    // <NavigationContainer>
    <MainTab.Navigator
      initialRouteName="Default"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#FF6C00",
        headerShown: false,
      }}
    >
      <MainTab.Screen
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-gallery"
              size={size}
              color={color}
            />
          ),
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Comments" || routeName === "Map") {
              return { display: "none" };
            }
            return { height: 50 };
          })(route),
        })}
        name="Default"
        component={DefaultScreen}
      />
      <MainTab.Screen
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        }}
        name="CreatePosts"
        component={CreatePossScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
