import React from "react";
import { ThemeProvider } from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { initializeApp } from "firebase/app";

import { Navigation } from "./src/infrastructure/navigation";
import { AuthenticationProvider } from "./src/services/authentication/authentication.context";
import { theme } from "./src/infrastructure/theme";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";

const firebaseConfig = {
  apiKey: "AIzaSyAnPSaWsG-XmuFA0Qar4V-IdN9Mm-IP-So",
  authDomain: "catalog-25e27.firebaseapp.com",
  projectId: "catalog-25e27",
  storageBucket: "catalog-25e27.appspot.com",
  messagingSenderId: "300029222865",
  appId: "1:300029222865:web:e79b2680ad4b76e9a78af0",
  measurementId: "G-NY7T419GGR",
};

// Initialize Firebase
initializeAuth(initializeApp(firebaseConfig), {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default function App() {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded && !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationProvider>
          <Navigation />
        </AuthenticationProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
