import { mocks } from "./mock";
import camelize from "camelize";

export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("Not found");
    }
    resolve(mock);
  });
};

export const restaurantsTransform = ({ results = [] }) =>
  camelize(
    results.map((restaurant) => ({
      ...restaurant,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    }))
  );

restaurantsRequest()
  .then(restaurantsTransform)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
