import { DB_SOURCE, FIREBASE_API_URL } from "@env";
import camelize from "camelize";

import { mocks, mockImages } from "./mock";
import { FIREBASE_DB } from "../../utils/constants";

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
    return fetch(`${FIREBASE_API_URL}/placesNearby?location=${location}`).then(
      (res) => res.json()
    );
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
