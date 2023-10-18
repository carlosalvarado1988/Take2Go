import camelize from "camelize";
import { DB_SOURCE } from "@env";

import { mocks, mockImages } from "./mock";
import { getFunctionsHost, FIREBASE_DB } from "../utils/env";

const fetchMockRestaurants = (loc) =>
  new Promise((resolve, reject) => {
    console.log("## fetchMockRestaurants");
    const mock = mocks[loc];
    if (!mock) {
      return reject("Not found");
    }
    return resolve(mock);
  });

export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
  console.log("## restaurantsRequest ~ location:", location);
  console.log(
    "## restaurantsRequest DB_SOURCE === FIREBASE_DB",
    DB_SOURCE === FIREBASE_DB
  );
  if (DB_SOURCE === FIREBASE_DB) {
    const host = getFunctionsHost("placesNearby");
    const searchUrl = `${host}?location=${location}`;
    console.log("restaurantsRequest ~ searchUrl:", searchUrl);
    return fetch(searchUrl).then(async (res) => {
      const response = await res.json();
      return response;
    });
  } else {
    return fetchMockRestaurants(location);
  }
};

export const restaurantsTransform = ({ results = [] }) => {
  return camelize(
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
        // for local mocked data only
        enhancedRestaurant.photos = restaurant.photos.map(
          (p) => mockImages[Math.ceil(Math.random() * (mockImages.length - 1))]
        );
      }
      return enhancedRestaurant;
    })
  );
};
