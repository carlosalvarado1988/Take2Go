const url = require("url");
const { mocks, addMockImage } = require("./mock");
const { log } = require("firebase-functions/logger");

module.exports.placesRequest = (req, res, client) => {
  const { location, mock } = url.parse(req.url, true).query;
  if (mock) {
    log("## geocodeRequest has used locationMock");
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMockImage);
      return res.json(data);
    }
  }

  log("### placesRequest using Google API geocode with Client");
  const params = {
    location,
    radius: 1500, // represents metters
    type: "restaurant",
    key: process.env.MAPS_API_KEY_GCP,
  };

  client
    .placesNearby({
      params,
      timeout: 1000,
    })
    .then((response) => {
      // adding images as needed for UI
      response.data.results = response.data.results.map(
        getGooglePhotoFromPlaceApi
      );
      return res.json(response.data);
    })
    .catch((err) => {
      log("## client GOOGLE API err", err);
      res.status(400);
      return res.send(err.response.data.error_message);
    });
};

function getGooglePhotoFromPlaceApi(restaurant) {
  // Original object from places api
  // ------
  // restaurant.photos : [
  //   {
  //      "html_attributions" : [],
  //      "height" : 853,
  //      "width" : 1280,
  //      "photo_reference" : "AUacShh3_Dd8yvV2JZMtNjjbbSbFhSv-0VmUN-uasQ2Oj00XB63irPTks0-A_1rMNfdTunoOVZfVOExRRBNrupUf8TY4Kw5iQNQgf2rwcaM8hXNQg7KDyvMR5B-HzoCE1mwy2ba9yxvmtiJrdV-xBgO8c5iJL65BCd0slyI1"
  //   }
  // ]
  const { photo_reference } = restaurant?.photos[0];
  const mockImgUrl =
    "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-oranges-ice-600x750.jpg";
  const liveGoogleImgUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${process.env.MAPS_API_KEY_GCP}`;

  // check photo_reference exists to use liveUrl, if not, mock img
  restaurant.photos = [!photo_reference ? mockImgUrl : liveGoogleImgUrl];
  log("## getGooglePhotoFromPlaceApi - restaurant.photos", restaurant.photos);
  return restaurant;
}
