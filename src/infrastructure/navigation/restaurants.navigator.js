import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { BusinessScreen } from "../../features /business/screens/business.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantNavigator = () => {
  return (
    <RestaurantStack.Navigator headerMode="none">
      <RestaurantStack.Screen name="restaurants" component={BusinessScreen} />
    </RestaurantStack.Navigator>
  );
};
