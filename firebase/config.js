// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";

import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzCvp-1poAawC1BOO4jFYKvQkP12KfG0o",
  authDomain: "rn-project-6e4c5.firebaseapp.com",
  projectId: "rn-project-6e4c5",
  storageBucket: "rn-project-6e4c5.appspot.com",
  messagingSenderId: "904928809820",
  appId: "1:904928809820:web:f2c956c1f76e4c5001a799",
  measurementId: "G-TQ1XPZ4XQ9",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyAVkFNFscwtfNxvim7CazcBSOf6u2VTQdQ",
//   authDomain: "rn-project-4a119.firebaseapp.com",
//   projectId: "rn-project-4a119",
//   storageBucket: "rn-project-4a119.appspot.com",
//   messagingSenderId: "626799093709",
//   appId: "1:626799093709:web:f5f84fbf3a18ca87fb4684",
//   measurementId: "G-LPRW901TTR",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
