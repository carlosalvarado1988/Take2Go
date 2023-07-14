import camelize from "camelize";
// import { locations } from "./location.mock";

export const locationRequest = (searchTerm) => {
  return fetch(
    `http://127.0.0.1:5001/catalog-12a8d/us-central1/geocode?city=${searchTerm}`
  ).then((res) => res.json());
  // .then((res) => {
  //   const results = res.json();
  //   console.log(
  //     "🚀 ~ file: location.service.js:9 ~ ).then ~ results:",
  //     results
  //   );
  //   if (results.length === 0) {
  //     throw "Not Found";
  //   }
  //   return results;
  // })
};

// export const locationRequest = (searchTerm) => {
//   return new Promise((resolve, reject) => {
//     const locationMock = locations[searchTerm];
//     if (!locationMock) {
//       reject("not found");
//     }
//     resolve(locationMock);
//   });
// };

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  return { lat, lng, viewport: geometry.viewport };
};
