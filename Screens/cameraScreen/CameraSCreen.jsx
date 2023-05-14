import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState, useRef, useCallback } from "react";
import { Camera, CameraType } from "expo-camera";
import { View, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const StackSettings = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [startCamera, setStartCamera] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef();

  const getLoationPerm = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    console.log("location", location);
    setLocation(location);
  };
  useFocusEffect(
    useCallback(() => {
      getLoationPerm();
    }, [navigation])
  );
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const makePhoto = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    console.log("photo :>> ", photo);
  };

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  console.log(location);
  return (
    <>
      <Text>{text}</Text>
      {startCamera ? (
        <>
          <View
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
              overflow: "hidden",
            }}
          >
            <Camera
              style={{ flex: 1, width: 200, height: 200 }}
              ref={cameraRef}
            >
              <Button title="Photo" onPress={makePhoto} />
            </Camera>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
            keyboardVerticalOffset={200}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="Input something..."
                style={{
                  borderBottomColor: "black",
                  backgroundColor: "white",
                }}
                onChangeText={(value) => {
                  console.log(value);
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: "#14274e",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
export default StackSettings;
