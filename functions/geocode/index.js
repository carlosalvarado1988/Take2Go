const { locations: locationsMock } = require("./geocode.mock");
const url = require("url");
require("firebase-functions/console.logger/compat");

module.exports.geocodeRequest = (req, res, client) => {
  const { city, mock } = url.parse(req.url, true).query;
  if (mock) {
    console.log("### geocodeRequest using mock");
    const locationMock = locationsMock[city?.toLocaleLowerCase()];
    return res.json(locationMock);
  }
  // here we use the SDK to fetch from google api
  console.log("### geocodeRequest using Google API geocode with Client");
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
      return res.json(response.data);
    })
    .catch((err) => {
      res.status(400);
      return res.send(err.response.data.error_message);
    });
};
