import camelize from "camelize";
import { DB_SOURCE } from "@env";

import { locations } from "./location.mock";
import { getFunctionsHost, FIREBASE_DB, isMock } from "../utils/env";

const fetchMockLocation = (term) =>
  new Promise((resolve, reject) => {
    console.log("## fetchMockLocation");
    const locationMock = locations[term];

    if (!locationMock) {
      return reject("not found");
    }
    return resolve(locationMock);
  });

export const locationRequest = async (searchTerm) => {
  if (DB_SOURCE === FIREBASE_DB) {
    const host = getFunctionsHost("geocode");
    const searchUrl = `${host}?city=${searchTerm}&mock=${isMock}`;
    console.log("locationRequest ~ searchUrl:", searchUrl);
    return fetch(searchUrl)
      .then((res) => res.json())
      .catch((err) => console.error(err));
  } else {
    return fetchMockLocation(searchTerm);
  }
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  return { lat, lng, viewport: geometry.viewport };
};
