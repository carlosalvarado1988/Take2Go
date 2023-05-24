import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

import { BusinessInfoCard } from "../components/businessInfoCard.component";
import {
  SafeAreaViewContainer,
  SearchContainer,
  BusinessList,
} from "./business.screen.styles";

export const BusinessScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

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
        data={[
          { name: 1 },
          { name: 2 },
          { name: 3 },
          { name: 4 },
          { name: 5 },
          { name: 6 },
          { name: 7 },
          { name: 8 },
          { name: 9 },
          { name: 10 },
          { name: 11 },
          { name: 12 },
          { name: 13 },
          { name: 14 },
        ]}
        renderItem={() => <BusinessInfoCard />}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaViewContainer>
  );
};
