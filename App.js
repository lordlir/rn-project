import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";
import Auth from "./components/Auth";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { loadFonts } from "./components/font";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsLoad, setAppIsReadyLoad] = useState(false);

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
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Auth />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
