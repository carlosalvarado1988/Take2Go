import React, { useState, createContext, useEffect, useContext } from "react";
import { useToast } from "react-native-toast-notifications";

import {
  restaurantsRequest,
  restaurantsTransform,
} from "./restaurants.service";
import { LocationContext } from "../location/location.context";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();
  const { location } = useContext(LocationContext);

  const fetchRestaurantsData = (loc) => {
    setIsLoading(true);
    setRestaurants([]);
    restaurantsRequest(`${loc.lat},${loc.lng}`)
      .then(restaurantsTransform)
      .then((results) => {
        setIsLoading(false);
        setRestaurants(results);
      })
      .catch((err) => {
        toast.show(err, {
          type: "danger",
        });
        setIsLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    if (location) {
      fetchRestaurantsData(location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
