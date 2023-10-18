# Running the local environment

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

### Kepp Firebase functions up to date

Make sure to check for updates and fixes from firebase functions by running the following commands:

> npm install firebase-functions@latest firebase-admin@latest --save
> (sudo) npm install -g firebase-tools

## Deploying functions

command: `npm run deploy`
It seems to be caused by a missing/inaccessible file in the restore/rollback process.

I was successfully removing the problem by simply:

Deleting functions using the web firebase console.
Deploying normally again >firebase deploy
Review the following documentation of [gcloud functions deploy.](https://cloud.google.com/sdk/gcloud/reference/functions/deploy#--source)

Additionally you could also run firebase deploy --only functions again and it deployed successfully.

Also, I found two stackoverflow links that may help you with your issue.

Firebase functions deployment not updating
Firebase deploy not updating JS file

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

- use yarn deploy
- as they need billing info, they went to Catalog instance directly/
- check the [functions_url](https://console.firebase.google.com/u/4/project/catalog-12a8d/functions/list)

Note each function has its own base url:

- test with: `https://geocode-4pua46p62a-uc.a.run.app/?city=toronto`

## toggle which firebase api - local vs live (paid)

- services/utils/env is checking for NODE_ENV to decide what url to use.
  local functions running in development or google api funcitons in production

  You can pass NODE_ENV value as convinient

  > npm run ios-dev

  this will ensure, we run local serve functions that connect with Google API

## Services

- note that services have been separated in concern, build as a context provider to have accees to data within the app at any level.
- the service is deciding to use mocked data or firebase data.
- firebase can use free account for users data and simple lambda functions
  - firebase pay-as-you-go instance is needed to integrate google maps api.

## last video 233

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

  - taking a look to the module in the library [github](https://github.com/googlemaps/google-maps-services-js/blob/master/src/places/placesnearby.ts)
  -

  ## Note changes in functions, need re-deploy to firebase functions

# EXPO PUBLISH - DEPLOY TO LIVE

go to the root of project, run:

> expo publish

how to revisit live version of expo app ?
enter the expo app in the mobile or website
you will see Projects listed
![Expo Go](readme_files/exp-app-live-project.png)

Users for testing: [Firebase Authentication](https://console.firebase.google.com/u/4/project/catalog-12a8d/authentication/users)

eg. user+1@test.com -> user1test
