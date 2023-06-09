import React, { useContext, useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";

import { SearchContainer } from "./search.styles";
import { LocationContext } from "../../../services/location/location.context";

export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyWord, setSearchKeyWord] = useState(keyword);

  useEffect(() => {
    setSearchKeyWord(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        icon="map"
        onChangeText={setSearchKeyWord}
        value={searchKeyWord}
        onSubmitEditing={() => {
          search(searchKeyWord);
        }}
      />
    </SearchContainer>
  );
};
