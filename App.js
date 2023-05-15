import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
// import RegistrationScreen from "./Screens/RegistrationScreen";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { loadFonts } from "./components/font";
import { store } from "./redax/store";
import Main from "./components/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsLoad, setAppIsReadyLoad] = useState(false);

  // const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function load() {
      try {
        await loadFonts();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReadyLoad(true);
      }
    }
    load();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsLoad) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoad]);

  if (!appIsLoad) {
    return null;
  }

  return (
    <Provider store={store}>
      <View onLayout={onLayoutRootView} style={styles.container}>
        <Main />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
