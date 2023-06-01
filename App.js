import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default function App() {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("🚀 ~ file: App.js:37 ~ App ~ isAuthenticated:", isAuthenticated);

  useEffect(() => {
    signInWithEmailAndPassword(auth, "carlos@gmail.com", "testuser")
      .then((user) => {
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log("🚀 ~ file: App.js:41 ~ useEffect ~ err:", err);
      });
  }, []);

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
