import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { Entypo, MaterialIcons, EvilIcons } from "@expo/vector-icons";

import Header from "../../components/main/Header";
import ButtonForm from "../../components/ButtonForm";
import keyboardShow from "../../util/keyboard";

const postState = {
  photo: false,
  title: "",
  name: "",
  latitude: "",
  longitude: "",
};

export default function CreatePossScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const [type, setType] = useState(CameraType.back);
  const [location, setLocation] = useState(postState);

  const [hasPermission, setHasPermission] = useState(null);

  const [onInput, setOnInput] = useState(false);
  const [disable, setDisable] = useState(true);

  const isShowKeyboard = keyboardShow();

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
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const { uri } = await camera.takePictureAsync();
      let local = await Location.getCurrentPositionAsync();
      setLocation((prevState) => ({
        ...prevState,
        photo: uri,
        latitude: local.coords.latitude,
        longitude: local.coords.longitude,
      }));

      setShowCamera(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const toPublishPost = () => {
    navigation.navigate("Posts", { location });
    console.log(location);
    setShowCamera(true);

    setLocation(postState);
  };

  const chengeDis = () => {
    if (
      location.photo !== false &&
      location.title !== "" &&
      location.name !== ""
    ) {
      setTimeout(() => {
        setDisable(false);
      }, 300);
    } else {
      setTimeout(() => {
        setDisable(true);
      }, 300);
    }
  };
  chengeDis();

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
      <View
        style={{
          paddingTop: 32,
          paddingHorizontal: 16,
        }}
      >
        {!isShowKeyboard && (
          <View style={styles.cameraBox}>
            <View style={styles.containerCamera}>
              {location.photo && (
                <View
                  style={{
                    position: "relative",
                    height: 240,
                  }}
                >
                  <Image
                    source={{ uri: location.photo }}
                    style={styles.imageFromCamera}
                  />
                  <TouchableOpacity
                    style={[styles.iconCamera, styles.iconCameraOnImage]}
                    onPress={() => {
                      setShowCamera(true);
                      setLocation((prevState) => ({
                        ...prevState,
                        photo: false,
                      }));
                    }}
                    activeOpacity={0.8}
                  >
                    <Entypo name="camera" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                </View>
              )}
              {showCamera && (
                <Camera style={styles.camera} ref={setCamera} type={type}>
                  <TouchableOpacity
                    style={styles.iconCamera}
                    onPress={takePhoto}
                    activeOpacity={0.8}
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
            <Text style={styles.textUnderCamera}>
              {location.photo ? "Change photo?" : "Please download a photo"}
            </Text>
          </View>
        )}
        <View style={{ marginBottom: 16 }}>
          <TextInput
            value={location.title}
            style={[
              styles.inputTitle,
              onInput === "Title" && styles.inputOnFocus,
            ]}
            placeholder="Title"
            placeholderTextColor={"#BDBDBD"}
            onChangeText={(value) =>
              setLocation((prevState) => ({
                ...prevState,
                title: value,
              }))
            }
            onFocus={() => setOnInput("Title")}
            onBlur={() => setOnInput(false)}
          />
        </View>
        <View style={{ marginBottom: 32 }}>
          <TextInput
            value={location.name}
            style={[
              styles.inputLocation,
              onInput === "Location" && styles.inputOnFocus,
            ]}
            placeholder="Location"
            placeholderTextColor={"#BDBDBD"}
            onChangeText={(value) =>
              setLocation((prevState) => ({
                ...prevState,
                name: value,
              }))
            }
            onFocus={() => setOnInput("Location")}
            onBlur={() => setOnInput(false)}
          />
          <EvilIcons
            name="location"
            size={24}
            style={styles.iconInputLocation}
          />
        </View>

        <ButtonForm
          title={"To Publish"}
          onPress={toPublishPost}
          disable={disable}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cameraBox: {
    height: 267,
    marginBottom: 32,
  },
  containerCamera: {
    borderRadius: 8,
    overflow: "hidden",
    height: 240,
    marginBottom: 8,
  },
  camera: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",

    height: 240,

    backgroundColor: "#E8E8E8",
  },
  imageFromCamera: {
    height: 240,
    resizeMode: "cover",
  },
  iconCamera: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#ffffff60",
    justifyContent: "center",
    alignItems: "center",
  },
  iconCameraOnImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  textUnderCamera: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  inputTitle: {
    height: 50,
    color: "#212121",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontFamily: "RobotoMedium",
  },
  inputLocation: {
    position: "relative",
    height: 50,
    paddingLeft: 28,
    color: "#212121",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontFamily: "RobotoRegular",
  },
  iconInputLocation: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -12 }],
    color: "#bdbdbd",
  },
  inputOnFocus: {
    borderBottomColor: "#ff6c00",
  },
});
