export const parseErrorMsg = (err, func) => {
  let msg = `error in ${func}`;
  if (Array.isArray(err)) {
    msg = `${func}: ${err[0].message}`;
  }
  if (typeof err === "string") {
    msg = `${func}: ${err}`;
  }
  if (typeof err === "object") {
    msg = `${func}: ${err.message}`;
  }
  return msg;
};
