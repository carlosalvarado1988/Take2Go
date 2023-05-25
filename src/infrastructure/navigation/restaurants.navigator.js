import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { BusinessScreen } from "../../features/business/screens/business.screen";
import { BusinessDetailsScreen } from "../../features/business/screens/business-details.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
      }}
    >
      <RestaurantStack.Screen name="Restaurants" component={BusinessScreen} />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={BusinessDetailsScreen}
      />
    </RestaurantStack.Navigator>
  );
};
