import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { BusinessScreen } from "./src/features /business/screens/business.screen";

export default function App() {
  return (
    <>
      <BusinessScreen />

      <ExpoStatusBar style="auto" />
    </>
  );
}
