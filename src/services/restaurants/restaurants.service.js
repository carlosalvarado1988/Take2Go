import { DB_SOURCE } from "@env";
import camelize from "camelize";

import { mocks, mockImages } from "./mock";
import { getFunctionsHost, FIREBASE_DB } from "../utils/env";

const fetchMockRestaurants = (loc) =>
  new Promise((resolve, reject) => {
    const mock = mocks[loc];
    if (!mock) {
      reject("Not found");
    }
    resolve(mock);
  });

export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
  if (DB_SOURCE === FIREBASE_DB) {
    const host = getFunctionsHost("placesnearby");
    console.log("firebase api call - placesNearby - host", host);
    return fetch(`${host}?location=${location}`).then((res) => res.json());
  } else {
    return fetchMockRestaurants(location);
  }
};

export const restaurantsTransform = ({ results = [] }) =>
  camelize(
    results.map((restaurant) => {
      const enhancedRestaurant = {
        ...restaurant,
        isOpenNow:
          restaurant.opening_hours && restaurant.opening_hours.open_now,
        isClosedTemporarily:
          restaurant.business_status === "CLOSED_TEMPORARILY",
        address: restaurant.vicinity,
      };
      if (DB_SOURCE !== FIREBASE_DB) {
        enhancedRestaurant.photos = restaurant.photos.map(
          (p) => mockImages[Math.ceil(Math.random() * (mockImages.length - 1))]
        );
      }
      return enhancedRestaurant;
    })
  );
