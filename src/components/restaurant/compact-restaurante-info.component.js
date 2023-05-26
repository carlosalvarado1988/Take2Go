import React from "react";
import { Platform } from "react-native";

import { Text } from "../typography/text.component";
import {
  Item,
  CompactWebViewAndroid,
  CompactImageIOS,
} from "./compact.restaurant-info.styles";

export const CompactRestaurantInfo = ({ restaurant, isMap }) => {
  const isAndroid = Platform.OS === "android";
  const Image = isAndroid && isMap ? CompactWebViewAndroid : CompactImageIOS;
  return (
    <Item>
      <Image source={{ uri: restaurant.photos[0] }} />
      <Text center variant="caption" numberOfLines={3}>
        {restaurant.name}
      </Text>
    </Item>
  );
};
