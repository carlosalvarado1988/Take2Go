export const FIREBASE_DB = "FIREBASE_DB";
export const liveFunctionsHost = (func) => {
  console.log("## We use Live Firebase functions");
  return `https://${func}-4pua46p62a-uc.a.run.app`;
};
export const localFunctionsHost = (func) => {
  console.log("## We use local dev functions");
  return `http://127.0.0.1:5001/catalog-12a8d/us-central1/${func}`;
};

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log(
  "process.env.NODE_ENV === development (isDevelopment)",
  process.env.NODE_ENV === "development"
);

export const isDevelopment = process.env.NODE_ENV === "development";

export const getFunctionsHost = (func) =>
  !isDevelopment ? liveFunctionsHost(func) : localFunctionsHost(func);
// export const getFunctionsHost = (func) => localFunctionsHost(func);
