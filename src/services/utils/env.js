import { Platform } from "react-native";
import { DB_SOURCE } from "@env";

// export const isDevelopment = process.env.NODE_ENV === "development";
export const isDevelopment = true;
export const isMock = true;

export const FIREBASE_DB = "FIREBASE_DB";
export const isAndroid = Platform.OS === "android";

const liveFunctionsHost = (func) => {
  return `https://${func}-4pua46p62a-uc.a.run.app`;
};
const localFunctionsHost = (func) => {
  return `http://127.0.0.1:5001/catalog-12a8d/us-central1/${func}`;
};

export const getFunctionsHost = (func) =>
  !isDevelopment || isAndroid
    ? liveFunctionsHost(func)
    : localFunctionsHost(func);

// LOGS
console.log("## DB_SOURCE: ", DB_SOURCE);
console.log("## process.env.NODE_ENV: ", process.env.NODE_ENV);
console.log("## isDevelopment: ", isDevelopment);
if (!isDevelopment && DB_SOURCE === FIREBASE_DB) {
  console.log("## Google Functions in production could charge");
}
