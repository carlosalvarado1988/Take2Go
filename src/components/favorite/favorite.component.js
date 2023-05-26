import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { FavoritesContext } from "../../services/favorites/favorites.context";

import styled from "styled-components/native";

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favorite = ({ restaurant }) => {
  const { favorites, addFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  // TODO: performance improvement here, bottleneck in a large set of data
  const isFavorite = favorites.find((x) => x.placeId === restaurant.placeId);

  return (
    <FavoriteButton
      onPress={() =>
        !isFavorite ? addFavorites(restaurant) : removeFromFavorites(restaurant)
      }
    >
      <AntDesign
        name={isFavorite ? "heart" : "hearto"}
        size={24}
        color={isFavorite ? "red" : "white"}
      />
    </FavoriteButton>
  );
};
