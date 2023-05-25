import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorites = (restaurant) => {
    setFavorites([...favorites, restaurant]);
  };

  const removeFavorites = (restaurant) => {
    const newFavorites = favorites.filter(
      (x) => x.placeId === restaurant.placeId
    );
    setFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider
      values={{
        favorites,
        addFavorites,
        removeFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
