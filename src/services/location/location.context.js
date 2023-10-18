import React, { createContext, useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const toast = useToast();
  const [location, setLocation] = useState({});
  const [keyword, setKeyword] = useState("San Francisco");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (!keyword.length) {
      // don't do the search
      return;
    }

    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        console.log("err", err);
        if (typeof err === "string") {
          toast.show(err, {
            type: "danger",
          });
        }
        setIsLoading(false);
        setError(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoading,
        error,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
