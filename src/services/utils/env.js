export const FIREBASE_DB = "FIREBASE_DB";
export const liveFunctionsHost = (func) =>
  `https://${func}-4pua46p62a-uc.a.run.app`;
export const localFunctionsHost = (func) =>
  `http://127.0.0.1:5001/catalog-12a8d/us-central1/${func}`;

export const isDevelopment = process.env.NODE_ENV === "development";
console.log("🚀 ~ file: env.js:8 ~ isDevelopment:", isDevelopment);

export const getFunctionsHost = (func) =>
  isDevelopment ? localFunctionsHost(func) : liveFunctionsHost(func);
