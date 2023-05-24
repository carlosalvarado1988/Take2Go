import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { SearchContainer } from "./search.styles";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </SearchContainer>
  );
};
