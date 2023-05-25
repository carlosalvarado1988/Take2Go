import React, { useContext } from "react";
import { AntDesing } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { FavoritesContext } from "../../services/favorites/favorites.context";

import styled from "styled-components/native";

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9;
`;

export const Favorite = () => {
  const { favorites, addFavorites, removeFavorites } =
    useContext(FavoritesContext);

  return (
    <FavoriteButton>
      <AntDesing name="hearth" size={24} color="red" />
    </FavoriteButton>
  );
};
