import React, { useContext } from "react";
import { MD2Colors } from "react-native-paper";
import { TouchableOpacity } from "react-native";

import { Search } from "../components/search.component";
import { BusinessInfoCard } from "../components/businessInfoCard.component";
import {
  BusinessList,
  LoadingContainer,
  LoadingIcon,
} from "./business.screen.styles";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";
import { FavoritesContext } from "../../../services/favorites/favorites.context";

export const BusinessScreen = ({ navigation }) => {
  const { restaurants, isLoading } = useContext(RestaurantContext);
  const { favorites } = useContext(FavoritesContext);
  console.log(
    "🚀 ~ file: business.screen.js:19 ~ BusinessScreen ~ favorites:",
    favorites
  );
  return (
    <SafeAreaViewContainer>
      {isLoading && (
        <LoadingContainer>
          <LoadingIcon size={50} animating={true} color={MD2Colors.red800} />
        </LoadingContainer>
      )}
      <Search />
      <BusinessList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", { business: item })
              }
            >
              <BusinessInfoCard business={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaViewContainer>
  );
};
