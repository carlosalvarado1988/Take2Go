# Running the local environment

### Guideline

[Udemy course](https://www.udemy.com/course/complete-react-native-mobile-development-zero-to-mastery-with-hooks/learn/lecture/24669058?components=add_to_cart%2Cavailable_coupons%2Cbase_purchase_section%2Cbuy_button%2Cbuy_for_team%2Ccacheable_buy_button%2Ccacheable_deal_badge%2Ccacheable_discount_expiration%2Ccacheable_price_text%2Ccacheable_purchase_text%2Ccurated_for_ufb_notice_context%2Ccurriculum_context%2Cdeal_badge%2Cdiscount_expiration%2Cgift_this_course%2Cincentives%2Cinstructor_links%2Clifetime_access_context%2Cmoney_back_guarantee%2Cprice_text%2Cpurchase_tabs_context%2Cpurchase%2Crecommendation%2Credeem_coupon%2Csidebar_container%2Cpurchase_body_container#overview)

### This is an Expo Project

> Why do I have a folder named ".expo" in my project?
> The ".expo" folder is created when an Expo project is started using "expo start" command.
> What do the files contain?

- "devices.json": contains information about devices that have recently opened this project. This is used to populate the "Development sessions" list in your development builds.
- "settings.json": contains the server configuration that is used to serve the application manifest.
  > Should I commit the ".expo" folder?
  > No, you should not share the ".expo" folder. It does not contain any information that is relevant for other developers working on the project, it is specific to your machine.
  > Upon project creation, the ".expo" folder is already added to your ".gitignore" file.

## React Native app

Its required to run: `node: '18', npm: '9'`
you need simulators to run the local environment,
make sure you have installed either IOS or Android emulators in your computer. Then refer to package.json file to run the corresponding command.

> npm run ios

or

> npm run android

## Users for testing

- users can be seen in firebase [url](https://console.firebase.google.com/u/4/project/catalog-dev-d9b6d/authentication/users)
  - for convention I have user emails like: user+1@test.com -> user1test

## Firebase functions

in case you receive the error message:

> [TypeError: Network request failed]

it means the local functions are not running.

In order to run firebase functions from the local enviroment, you need to do the following steps:

1. Open a new terminal shell
2. navigate to functions directory in the project
3. run the following command:

> npm run serve (into functions dir)

4. you will notice a new server instance starts running probably in the url: http://localhost:4000/functions, visit the page and check for logs and debugging.

### Keep Firebase functions up to date

Make sure to check for updates and fixes from firebase functions by running the following commands:

> npm install firebase-functions@latest firebase-admin@latest --save
> (sudo) npm install -g firebase-tools

## Managing fuctions.

### Deploying functions

- [docs](https://firebase.google.com/docs/functions/manage-functions?gen=2nd)

- command: `npm run deploy`

### Delete functions from firebase

- using the CLI: `firebase functions:delete myFunction`

### .env file

Use this as a template to configure your credentials

> DB_SOURCE=LOCAL_MOCK_DB or FIREBASE
> FIREBASE_API_KEY=AIzaSyCbGFb4NzoGUOWLDX90o0V7eXbLMn5uCM4
> AUTH_DOMAIN=catalog-dev-d9b6d.firebaseapp.com
> PROJECT_ID=catalog-dev-d9b6d
> STORAGE_BUCKET=catalog-dev-d9b6d.appspot.com
> MESSAGING_SENDER_ID=780296218276
> APP_ID=1:780296218276:web:47c97a1a9a0c4b55102831
> MEASUREMENT_ID=NULL

## Deploying functions to firebase

- use `npm run deploy`
- as they need billing info, they went to Catalog instance directly/
- check the [functions_url](https://console.firebase.google.com/u/4/project/catalog-12a8d/functions/list)

Note each function has its own base url:

- test with: `https://geocode-4pua46p62a-uc.a.run.app/?city=toronto`

## toggle which firebase api - local vs live (paid)

- `services/utils/env` is checking for NODE_ENV to decide what url to use, local functions vs live functions.
- npm run ios-prod vs ios-dev is adding NODE_ENV value, sometime sthe cache does not help, then go to env.js file to hardcode the resolution of the function.
- note: local functions running in development or google api funcitons in production

## Services

- note that services have been separated in concern, build as a context provider to have accees to data within the app at any level.
- the service is deciding to use mocked data or firebase data.
- firebase can use free account for users data and simple lambda functions
  - firebase pay-as-you-go instance is needed to integrate google maps api.

# Configuring Google Firebase functions to integrate with Google Maps

### RESTRICTING GCP and google functions to avoid unexpected bills.

### [Firebase Usage](https://console.firebase.google.com/u/4/project/catalog-12a8d/usage)

- Firebase is setup with EKOS [SV ACCOUNT](https://console.firebase.google.com/u/4/_gl=1*jgigb9*_ga*MTY1NDk2NzM4OC4xNjg1MTE2NTY3*_ga_CW55HF8NVT*MTY5NzQ3ODM5OS43OC4wLjE2OTc0NzgzOTkuNjAuMC4w)

- go to GCP Platform, create a project: [Catalog-api](https://console.cloud.google.com/home/dashboard?authuser=4&project=catalog-functions-check)

  - Enable the following services:

    - Places API
    - Geocode API

    #### WE NEED TO SET CREDENTIALS AND QUOTAS. to prevent billing crazy

    - set quotas of request per day, per minute and per user.
    - Credentials: refers to create an api_key, this key should be restricted to be used only for Places and Geocode api's.

  - Next we need an SDK, for nodejs to be used in our functions.
  - name: Nodejs Client for google maps services
  - library: [link](https://www.npmjs.com/package/@googlemaps/google-maps-services-js) - note for this project I've been using yarn
  - yarn add @googlemaps/google-maps-services-js into functions folder.
  - Attention: This library is designed for server-side Node.js applications. Attempting to use it client-side, in either the browser or any other environment like React Native, may in some cases work, but mostly will not.

  - we import this client in the root of the functions using the commonJS required

  > const { Client } = require("@googlemaps/google-maps-services-js");
  > const client = new Client({});

  - With these lines, we interact with the google api client we created to fetch real data instead of mock data.

  - to persist our mock work, you add a query param. eg= ?mock=true , to determine if use local mock data in the function

    - eg: `http://127.0.0.1:5001/catalog-12a8d/us-central1/geocode?city=toronto&mock=true`

  - To our function we add the client:
    `module.exports.geocodeRequest = (req, res, client) => {})` which is coming for the instance in index.js and now we can fetch using the SDK

  - #### [configure env variables for firebase](https://firebase.google.com/docs/functions/config-env?gen=2nd)

    - Using .env approach (different from videos)
    - now we can use as: ` key: process.env.MAPS_API_KEY_GCP,`

  - now we can get geo info from seattle even: `http://127.0.0.1:5001/catalog-12a8d/us-central1/geocode?city=seattle`

  ### Implementing client.placesNearby from googple api

  - taking a look to the module in the library [github](https://console.firebase.google.com/u/4/)
  - this local implementation is using a photos key as an array to get an image, you had to implement a function to parse the data, build the image url from the original reference.

  ## Cloud Run configuration needed to allow access.

  - to allow invocations to the cloud, firebase function, you add allUsers access with Cloud Run Invoker role.
  - ![Cloud Run](readme_files/allUsersAccess.png)
  - TODO: implement secure access to IOS app.

## Functions links

- ## Note changes in functions, need re-deploy to firebase functions

# Clear cache to run the app

- sometimes the app gets polluded and clear the cache helps a lot:
- run: `yarn cache clean` and `npx expo start --clear`

### Troubleshooting functions

When there are errors to deploy the functions, its better to remove them and deploy entirely again.
last issue found was with Yarn in CGP environment, throwing an error about plugin not found.

[the solution was to remove yarn.lock and try again](https://stackoverflow.com/questions/76427975/firebase-functions-deployment-error-cant-resolve-command-plugin-not-found)

- when recreating funcitons, you need to generate, relate the api key again for access.
-

# EXPO PUBLISH - DEPLOY TO LIVE

go to the root of project, run:

> expo publish

how to revisit live version of expo app ?
enter the expo app in the mobile or website
you will see Projects listed
![Expo Go](readme_files/exp-app-live-project.png)

Users for testing: [Firebase Authentication](https://console.firebase.google.com/u/4/project/catalog-12a8d/authentication/users)

eg. user+1@test.com -> user1test

# Setup payments with Stripe

- you create an account with stripe, you can use test data during dev.
- you create a new firebase function.
- we use [stripe client](https://www.npmjs.com/package/stripe-client)
- added [react-native-credit-card-input](https://www.npmjs.com/package/react-native-credit-card-input)
- you use LiteCreditCardInput to validate and caputer credit card info from user

### Setup firebase function for Stripe payment

- you create a new function payRequest, with the stripe client
- added pay function locally at `http://127.0.0.1:5001/catalog-12a8d/us-central1/pay`
-
