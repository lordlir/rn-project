import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "../util/routing";
// import { useRoute } from "./util/routing";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../redax/auth/authReducer";
import { getCurrentUser } from "../redax/auth/authOperation";

export default function Main() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const routing = useRoute(isAuth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
