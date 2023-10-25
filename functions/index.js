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
const { payRequest } = require("./pay");

const logger = require("firebase-functions/logger");
const stripeClient = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { Client } = require("@googlemaps/google-maps-services-js");
const googleClient = new Client({});

exports.geocode = onRequest((req, res) => {
  logger.info("geocode function trigged", { structuredData: true });
  geocodeRequest(req, res, googleClient);
});

exports.placesNearby = onRequest((req, res) => {
  logger.info("placesNearby function trigged", { structuredData: true });
  placesRequest(req, res, googleClient);
});

exports.pay = onRequest((req, res) => {
  logger.info("pay function trigged", { structuredData: true });
  payRequest(req, res, stripeClient);
});
