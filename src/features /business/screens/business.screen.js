import React, { useState, useContext } from "react";
import { Searchbar, MD2Colors } from "react-native-paper";

import { BusinessInfoCard } from "../components/businessInfoCard.component";
import {
  SearchContainer,
  BusinessList,
  LoadingContainer,
  LoadingIcon,
} from "./business.screen.styles";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";

export const BusinessScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const { restaurants, isLoading, error } = useContext(RestaurantContext);
  return (
    <SafeAreaViewContainer>
      <SearchContainer>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </SearchContainer>
      {isLoading && (
        <LoadingContainer>
          <LoadingIcon size={50} animating={true} color={MD2Colors.red800} />
        </LoadingContainer>
      )}
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
