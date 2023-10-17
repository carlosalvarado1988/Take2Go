import camelize from "camelize";
import { DB_SOURCE } from "@env";

import { locations } from "./location.mock";
import { getFunctionsHost, FIREBASE_DB } from "../utils/env";

const fetchMockLocation = (term) =>
  new Promise((resolve, reject) => {
    console.log("## fetchMockLocation");
    const locationMock = locations[term];
    console.log(
      "🚀 ~ file: location.service.js:11 ~ newPromise ~ locationMock:",
      locationMock
    );
    if (!locationMock) {
      console.log("are we in reject????");
      return reject("not found");
    }
    return resolve(locationMock);
  });

export const locationRequest = (searchTerm) => {
  if (DB_SOURCE === FIREBASE_DB) {
    const host = getFunctionsHost("geocode");
    const searchUrl = `${host}?city=${searchTerm}`;
    console.log(
      "location.service.js:22 ~ locationRequest ~ searchUrl:",
      searchUrl
    );
    return fetch(searchUrl).then((res) => res.json());
  } else {
    return fetchMockLocation(searchTerm);
  }
};

export const locationTransform = (result) => {
  console.log(
    "🚀 ~ file: location.service.js:27 ~ locationTransform ~ result:",
    result.results[0]
  );
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  return { lat, lng, viewport: geometry.viewport };
};
