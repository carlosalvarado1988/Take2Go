/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");

const logger = require("firebase-functions/logger");

exports.geocode = onRequest((req, res) => {
  logger.info("geocode function trigged", { structuredData: true });
  geocodeRequest(req, res);
});

exports.placesNearby = onRequest((req, res) => {
  logger.info("placesNearby function trigged", { structuredData: true });
  placesRequest(req, res);
});
