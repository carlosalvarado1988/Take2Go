export const parseErrorMsg = (err, func) => {
  let msg = `error in ${func}`;
  if (typeof err === "string") {
    msg = `${func}: ${err}`;
  }
  if (typeof err === "object") {
    msg = `${func}: ${err.message}`;
  }
  return msg;
};
