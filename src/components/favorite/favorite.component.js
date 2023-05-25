import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
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
  console.log(
    "🚀 ~ file: favorite.component.js:18 ~ Favorite ~ favorites, addFavorites, removeFavorites:",
    favorites,
    addFavorites,
    removeFavorites
  );

  return (
    <FavoriteButton>
      <AntDesign name="hearth" size={24} color="red" />
    </FavoriteButton>
  );
};
