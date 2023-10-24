const { locations: locationsMock } = require("./geocode.mock");
const url = require("url");
const { log } = require("firebase-functions/logger");

const parseErrorMsg = (err, func) => {
  let msg = `Error in ${func}`;
  if (typeof err === "string") {
    msg += ` ${err}`;
  }
  if (typeof err === "object") {
    msg += ` ${err.message}`;
  }
  return msg;
};

module.exports.geocodeRequest = (req, res, client) => {
  const { city, mock } = url.parse(req.url, true).query;
  if (mock === "true") {
    console.log("### geocodeRequest using mock!!");
    log("### geocodeRequest using mock!!");

    const locationMock = locationsMock[city?.toLocaleLowerCase()];
    return res.json(locationMock);
  }
  // here we use the SDK to fetch from google api
  console.log("### geocodeRequest using Google API geocode with Client");
  log("### geocodeRequest using Google API geocode with Client");

  const params = {
    address: city,
    key: process.env.MAPS_API_KEY_GCP,
  };

  client
    .geocode({
      params,
      timeout: 1000,
    })
    .then((response) => {
      log("### geocode returned response in then");
      return res.json(response.data);
    })
    .catch((err) => {
      const errMsg = parseErrorMsg(err, "geocode");
      log(errMsg);
      res.status(400);
      return res.send(err.response.data.error_message);
    });
};
