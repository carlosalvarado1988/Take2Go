const url = require("url");
const { mocks, addMockImage } = require("./mock");

module.exports.placesRequest = (req, res, client) => {
  const { location, mock } = url.parse(req.url, true).query;
  if (mock) {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMockImage);
      return res.json(data);
    }
  }
  client
    .placesNearby({
      params: {
        location,
        radius: 1500, // represents metters
        type: "restaurants",
        key: process.env.MAPS_API_KEY_GCP,
      },
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
