'use strict';

// Global import
const dotenv = require('dotenv');

// Load environment variables from .env file
const env = dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'development';
const configValue = {
  // base env
  base: {
    CDN_URL: env.parsed.CDN_URL || '',
    FACEBOOK_APP_ID: env.parsed.FACEBOOK_APP_ID || '',
    FACEBOOK_PIXEL_ID: env.parsed.FACEBOOK_PIXEL_ID || '',
    GA_TRACKING_ID: env.parsed.GA_TRACKING_ID || '',
    NAVER_APP_ID: env.parsed.NAVER_APP_ID || '',
    NODE_ENV
  },
  production: {},
  development: {
    HOST: 'localhost',
    PORT: env.parsed.PORT || 3000
  },
  test: {}
};
const config = {
  ...configValue.base,
  ...configValue[NODE_ENV]
};

module.exports = config;
