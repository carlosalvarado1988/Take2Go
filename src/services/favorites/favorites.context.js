import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorites = (restaurant) => {
    setFavorites([...favorites, restaurant]);
  };

  const removeFromFavorites = (restaurant) => {
    const newFavorites = favorites.filter(
      (x) => x.placeId !== restaurant.placeId
    );
    setFavorites(newFavorites);
  };

  const storeFavorites = async (value) => {
    try {
      const jsonValueAsString = JSON.stringify(value);
      await AsyncStorage.setItem("@favorites", jsonValueAsString);
    } catch (e) {
      console.error("Error saving favorites", e);
    }
  };

  const retrieveFavorites = async () => {
    try {
      const jsonValueAsString = await AsyncStorage.getItem("@favorites");
      if (jsonValueAsString != null) {
        setFavorites(JSON.parse(jsonValueAsString));
      }
    } catch (e) {
      console.error("Error retrieving favorites", e);
    }
  };

  useEffect(() => {
    retrieveFavorites();
  }, []);

  useEffect(() => {
    storeFavorites(favorites);
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
