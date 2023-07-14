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

// PAY-AS-YOU-GO Firebase/Catalog
// const firebaseConfig = {
//   apiKey: "AIzaSyBFrYGYOWUeCGcqqPqm5PwmVCUAhS3NYwc",
//   authDomain: "catalog-12a8d.firebaseapp.com",
//   projectId: "catalog-12a8d",
//   storageBucket: "catalog-12a8d.appspot.com",
//   messagingSenderId: "580440551087",
//   appId: "1:580440551087:web:ac2fc3b9789532c975ae5a",
//   measurementId: "G-F2T5QEBV9P",
// };

// FREE Firebase/Catalog-dev
const firebaseConfig = {
  apiKey: "AIzaSyCbGFb4NzoGUOWLDX90o0V7eXbLMn5uCM4",
  authDomain: "catalog-dev-d9b6d.firebaseapp.com",
  projectId: "catalog-dev-d9b6d",
  storageBucket: "catalog-dev-d9b6d.appspot.com",
  messagingSenderId: "780296218276",
  appId: "1:780296218276:web:47c97a1a9a0c4b55102831",
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
