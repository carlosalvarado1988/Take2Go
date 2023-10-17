import React from "react";
import { ThemeProvider } from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ToastProvider } from "react-native-toast-notifications";

import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import {
  DB_SOURCE,
  FIREBASE_API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";

import { Navigation } from "./src/infrastructure/navigation";
import { AuthenticationProvider } from "./src/services/authentication/authentication.context";
import { theme } from "./src/infrastructure/theme";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { FIREBASE_DB } from "./src/services/utils/env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
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

  console.log("## DB_SOURCE:", DB_SOURCE);
  if (DB_SOURCE === FIREBASE_DB) {
    console.log(
      "## NODE_ENV (Google Functions in productions will charge)",
      process.env.NODE_ENV
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationProvider>
          <ToastProvider
            placement="bottom"
            duration={5000}
            animationType="slide-in"
            animationDuration={250}
            successColor="green"
            dangerColor="red"
            warningColor="orange"
            normalColor="gray"
            offsetTop={30}
            offsetBottom={40}
            swipeEnabled={true}
          >
            <Navigation />
          </ToastProvider>
        </AuthenticationProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
