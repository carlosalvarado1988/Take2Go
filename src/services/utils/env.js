import { Platform } from "react-native";
import { DB_SOURCE } from "@env";

export const FIREBASE_DB = "FIREBASE_DB";
export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = true;

export const liveFunctionsHost = (func) => {
  console.log("## We use Live Firebase functions");
  return `https://${func}-4pua46p62a-uc.a.run.app`;
};
export const localFunctionsHost = (func) => {
  console.log("## We use local dev functions");
  return `http://127.0.0.1:5001/catalog-12a8d/us-central1/${func}`;
};

// export const getFunctionsHost = (func) =>
//   !isDevelopment || isAndroid
//     ? liveFunctionsHost(func)
//     : localFunctionsHost(func);

// DEBUG PURPOSES IN LIVE CGP FUNCIONS
// export const getFunctionsHost = (func) => liveFunctionsHost(func);
export const getFunctionsHost = (func) => localFunctionsHost(func);

console.log("## DB_SOURCE:", DB_SOURCE);
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log(
  "process.env.NODE_ENV === development (isDevelopment)",
  process.env.NODE_ENV === "development"
);

if (DB_SOURCE === FIREBASE_DB) {
  if (!isDevelopment) {
    console.log("## Google Functions in production could charge");
  }
}
