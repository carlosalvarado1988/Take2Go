import React, { useState } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { StatusBar } from "react-native";

import { BusinessInfoCard } from "../components/businessInfoCard.component";

const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;

const SearchContainer = styled.View`
  padding: 10px;
`;

const ListContainer = styled.View`
  flex: 1;
  padding: 10px;
  background-color: green;
`;

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
      <ListContainer>
        <BusinessInfoCard />
      </ListContainer>
    </SafeAreaViewContainer>
  );
};
