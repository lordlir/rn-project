import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import Header from "../../components/main/Header";
import TextInputCustom from "../../components/auth/TextInputCustom";
import ButtonForm from "../../components/ButtonForm";
import { TextInput } from "react-native";

const locationState = {
  name: "",
  latitude: "",
  longitude: "",
};

export default function CreatePossScreen({ navigation }) {
  const [photo, setPhoto] = useState(false);
  const [camera, setCamera] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  // const [location, setLocation] = useState(null);
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(locationState);
    const [isInputDescriptionInFocus, setIsInputDescriptionInFocus] =
    useState(false);
  const [isInputLocationInFocus, setIsInputLocationInFocus] = useState(false);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const locationPermission =
        await Location.requestForegroundPermissionsAsync();

      setHasPermission(
        cameraPermission.status === "granted" &&
          locationPermission.status === "granted"
      );
      // console.log("cameraPermission", cameraPermission.status);
      // console.log("locationPermission", locationPermission.status);
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const { uri } = await camera.takePictureAsync();
      let { coords } = await Location.getCurrentPositionAsync();
      setLocation((prevState) => ({
        ...prevState,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }));
      console.log("Location", coords.latitude);
      console.log("Location", coords.longitude);
      // console.log(uri);
      setShowCamera(false);
      setPhoto(uri);
    } catch (error) {
      console.log("error", error);
    }
  };

  // const toPublishPost = () => {
  //   navigation.navigate("Posts", { photo });

  // };

  const hasData = () => {
    if (photo && description && location.name) {
      return true;
    }
    return false;
  };

    const toPublishPost = () => {
    if ((photo && description && location.name)) {
      return
    } else {
     
      navigation.navigate("Posts", { photo, description, location });
          setPhoto(false);
    setShowCamera(true);
    }
  };

  return (
    <View style={styles.container}>
      <Header>
        <Text style={{ marginHorizontal: 10 }}>Create a Post</Text>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="#BDBDBD"
          style={{
            position: "absolute",
            left: 16,
            bottom: 10,
          }}
          onPress={navigation.goBack}
        />
      </Header>
      <View style={{ paddingTop: 32, paddingHorizontal: 16 }}>
        <View style={styles.cameraBox}>
          <View
            style={{
              borderRadius: 8,
              overflow: "hidden",
              height: 240,
              marginBottom: 8,
            }}
          >
            {photo && (
              <View
                style={{
                  position: "relative",
                  // justifyContent: "center",
                  // alignItems: "center",
                  height: 240,
                }}
              >
                <Image
                  source={{ uri: photo }}
                  style={{ height: 240, resizeMode: "cover" }}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: [{ translateX: -30 }, { translateY: -30 }],
                    height: 60,
                    width: 60,
                    borderRadius: 50,
                    backgroundColor: "#ffffff60",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    setShowCamera(true);
                    setPhoto(false);
                  }}
                  activeOpacity={0.8}
                  // style={iconContainer}
                >
                  <Entypo name="camera" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </View>
            )}
            {showCamera && (
              <Camera style={styles.camera} ref={setCamera} type={type}>
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 50,
                    backgroundColor: "#ffffff60",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={takePhoto}
                  activeOpacity={0.8}
                  // style={iconContainer}
                >
                  <Entypo name="camera" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ position: "absolute", left: 0 }}
                  onPress={toggleCameraType}
                >
                  <MaterialIcons
                    name="flip-camera-android"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </Camera>
            )}
          </View>
          <Text>{photo ? "Change photo?" : "Please download a photo"}</Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          <TextInput
            style={{
              height: 50,
              borderBottomColor: "#E8E8E8",
              borderBottomWidth: 1,
            }}
            placeholder="Title"
            placeholderTextColor={"#BDBDBD"}
          />
        </View>
        <View style={{ marginBottom: 32 }}>
          <TextInput
            style={{
              height: 50,
              borderBottomColor: "#E8E8E8",
              borderBottomWidth: 1,
            }}
            placeholder="Location"
            placeholderTextColor={"#BDBDBD"}
            onChangeText={(value) => setDescription(value)}
              onFocus={() => setIsInputDescriptionInFocus(true)}
              onBlur={() => setIsInputDescriptionInFocus(false)}
          />
        </View>

        <ButtonForm title={"To Publish"} onPress={toPublishPost} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  cameraBox: {
    height: 267,
    marginBottom: 32,
  },
  camera: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",

    height: 240,

    backgroundColor: "#E8E8E8",
  },
});
