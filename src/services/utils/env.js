export const FIREBASE_DB = "FIREBASE_DB";
export const liveFunctionsHost = (func) =>
  `https://${func}-4pua46p62a-uc.a.run.app`;
export const localFunctionsHost = (func) =>
  `http://127.0.0.1:5001/catalog-12a8d/us-central1/${func}`;

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log(
  "process.env.NODE_ENV === development",
  process.env.NODE_ENV === "development"
);
export const isDevelopment = process.env.NODE_ENV === "development";

export const getFunctionsHost = (func) =>
  isDevelopment ? localFunctionsHost(func) : liveFunctionsHost(func);
// export const getFunctionsHost = (func) => localFunctionsHost(func);
