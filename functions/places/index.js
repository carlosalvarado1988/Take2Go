const url = require("url");
const { mocks, addMockImage } = require("./mock");

module.exports.placesRequest = (req, res) => {
  const { location } = url.parse(req.url, true).query;
  const data = mocks[location];
  if (data) {
    data.results = data.results.map(addMockImage);
  }
  res.json(data);
};
