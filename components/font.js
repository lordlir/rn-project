import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),

    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
  });
};
