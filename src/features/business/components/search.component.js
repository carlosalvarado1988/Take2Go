import React, { useContext, useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";

import { SearchContainer } from "./search.styles";
import { LocationContext } from "../../../services/location/location.context";

export const Search = ({ isFavoritesPress, setIsFavoritesPress }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyWord, setSearchKeyWord] = useState(keyword);

  useEffect(() => {
    setSearchKeyWord(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        icon={isFavoritesPress ? "heart" : "heart-outline"}
        onIconPress={() => setIsFavoritesPress(!isFavoritesPress)}
        placeholder="Search for a location"
        onChangeText={setSearchKeyWord}
        value={searchKeyWord}
        onSubmitEditing={() => {
          search(searchKeyWord);
        }}
      />
    </SearchContainer>
  );
};
