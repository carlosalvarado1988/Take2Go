import React from "react";
import { ThemeProvider } from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { initializeApp } from "firebase/app";

import { Navigation } from "./src/infrastructure/navigation";
import { AuthenticationProvider } from "./src/services/authentication/authentication.context";
import { theme } from "./src/infrastructure/theme";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";

const firebaseConfig = {
  apiKey: "AIzaSyBQ0UUsWHbSoV5DgjPfVhlRzlHXgu-6-Gc",
  authDomain: "take2go-93862.firebaseapp.com",
  projectId: "take2go-93862",
  storageBucket: "take2go-93862.appspot.com",
  messagingSenderId: "390361688647",
  appId: "1:390361688647:web:b990b918909e89d5379f62",
};

// Initialize Firebase
initializeApp(firebaseConfig);

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
