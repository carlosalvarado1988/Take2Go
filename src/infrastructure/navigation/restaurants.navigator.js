import React from "react";
import { Text } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { BusinessScreen } from "../../features /business/screens/business.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantNavigator = () => {
  return (
    <RestaurantStack.Navigator
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantStack.Screen name="Restaurants" component={BusinessScreen} />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        // eslint-disable-next-line react/no-unstable-nested-components
        component={() => <Text>Detail page</Text>}
      />
    </RestaurantStack.Navigator>
  );
};
