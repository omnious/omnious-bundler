'use strict';

// Global import
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const configValue = {
  // base env
  base: {
    CDN_URL: process.env.CDN_URL || '',
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '',
    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID || '',
    GA_TRACKING_ID: process.env.GA_TRACKING_ID || '',
    NAVER_APP_ID: process.env.NAVER_APP_ID || '',
    NODE_ENV
  },
  production: {},
  development: {
    HOST: process.env.HOST || '0.0.0.0',
    PORT: process.env.PORT || 3000
  },
  test: {}
};
const config = {
  ...configValue.base,
  ...configValue[NODE_ENV]
};

module.exports = config;
