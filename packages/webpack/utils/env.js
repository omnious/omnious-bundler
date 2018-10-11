'use strict';

// Global import
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const {
  CDN_URL = '',
  CIRCLE_TAG = 'prod',
  FACEBOOK_APP_ID = '',
  FACEBOOK_PIXEL_ID = '',
  GA_TRACKING_ID = 'UA-XXXXX-Y',
  NAVER_APP_ID = '',
  NODE_ENV = 'development',
  PORT = 3000
} = process.env;

const configValue = {
  // base env
  base: {
    CDN_URL,
    FACEBOOK_APP_ID,
    FACEBOOK_PIXEL_ID,
    GA_TRACKING_ID,
    NAVER_APP_ID,
    NODE_ENV
  },
  production: {
    TAG: CIRCLE_TAG
  },
  development: {
    HOST: 'localhost',
    PORT
  },
  test: {}
};
const config = {
  ...configValue.base,
  ...configValue[NODE_ENV]
};

module.exports = config;
