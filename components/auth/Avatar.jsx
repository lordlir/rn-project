import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
// import AvatarBtn from "../AvatarBtn";

const imagePlaseholder = require("../../assets/img/pngegg.png");
export default function Avatar({
  children,
  selectedImage,
  // imagePlaseholder,
  size,
}) {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : imagePlaseholder;
  console.log("imageSource==>", imageSource);
  return (
    <View style={{ position: "relative" }}>
      <Image
        source={imageSource}
        style={{
          resizeMode: "cover",
          height: size,
          width: size,
          overflow: "hidden",
          borderRadius: 16,
        }}
      />
      {children}
      {/* <AvatarBtn /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
