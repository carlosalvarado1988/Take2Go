import React from "react";
import { ThemeProvider } from "styled-components";
import { Text } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { Ionicons } from "@expo/vector-icons";

import { BusinessScreen } from "./src/features /business/screens/business.screen";
import { SafeAreaViewContainer } from "./src/components/utilities/safe-area.component";
import { LocationContextProvider } from "./src/services/location/location.context";

import { RestaurantContextProvider } from "./src/services/restaurants/restaurants.context";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";

import { theme } from "./src/infrastructure/theme";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Business: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

function SettingsScreen() {
  return (
    <SafeAreaViewContainer
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Settings!</Text>
    </SafeAreaViewContainer>
  );
}

function MapScreen() {
  return (
    <SafeAreaViewContainer
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Map!</Text>
    </SafeAreaViewContainer>
  );
}

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  };
};

export default function App() {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded && !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocationContextProvider>
          <RestaurantContextProvider>
            <NavigationContainer>
              <Tab.Navigator screenOptions={createScreenOptions}>
                <Tab.Screen name="Business" component={BusinessScreen} />
                <Tab.Screen name="Map" component={MapScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </RestaurantContextProvider>
        </LocationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
