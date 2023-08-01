import camelize from "camelize";
import { DB_SOURCE, FIREBASE_API_URL } from "@env";

import { locations } from "./location.mock";
import { FIREBASE_DB } from "../../utils/constants";

const fetchMockLocation = (term) =>
  new Promise((resolve, reject) => {
    const locationMock = locations[term];
    if (!locationMock) {
      reject("not found");
    }
    resolve(locationMock);
  });

export const locationRequest = (searchTerm) => {
  if (DB_SOURCE === FIREBASE_DB) {
    return fetch(`${FIREBASE_API_URL}/geocode?city=${searchTerm}`).then((res) =>
      res.json()
    );
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
