import React, { useState, useContext } from "react";
import { Searchbar } from "react-native-paper";

import { BusinessInfoCard } from "../components/businessInfoCard.component";
import { SearchContainer, BusinessList } from "./business.screen.styles";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";

export const BusinessScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const { restaurants } = useContext(RestaurantContext);
  return (
    <SafeAreaViewContainer>
      <SearchContainer>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </SearchContainer>
      <BusinessList
        data={restaurants}
        renderItem={() => <BusinessInfoCard />}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaViewContainer>
  );
};
