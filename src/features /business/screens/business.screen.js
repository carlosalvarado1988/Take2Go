import React, { useContext } from "react";
import { MD2Colors } from "react-native-paper";

import { Search } from "../components/search.component";
import { BusinessInfoCard } from "../components/businessInfoCard.component";
import {
  BusinessList,
  LoadingContainer,
  LoadingIcon,
} from "./business.screen.styles";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";

export const BusinessScreen = () => {
  const { restaurants, isLoading } = useContext(RestaurantContext);
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
          return <BusinessInfoCard business={item} />;
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaViewContainer>
  );
};
