import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";
export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthenticationContext);

  const addFavorites = (restaurant) => {
    setFavorites([...favorites, restaurant]);
  };

  const removeFromFavorites = (restaurant) => {
    const newFavorites = favorites.filter(
      (x) => x.placeId !== restaurant.placeId
    );
    setFavorites(newFavorites);
  };

  const storeFavorites = async (value, uid) => {
    try {
      const jsonValueAsString = JSON.stringify(value);
      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValueAsString);
    } catch (e) {
      console.error("Error saving favorites", e);
    }
  };

  const retrieveFavorites = async (uid) => {
    try {
      const jsonValueAsString = await AsyncStorage.getItem(`@favorites-${uid}`);
      if (jsonValueAsString != null) {
        setFavorites(JSON.parse(jsonValueAsString));
      }
    } catch (e) {
      console.error("Error retrieving favorites", e);
    }
  };

  useEffect(() => {
    if (user) {
      retrieveFavorites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      storeFavorites(favorites, user.uid);
    }
  }, [favorites, user]);

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
