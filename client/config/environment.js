/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'mbc',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    googleFonts: [
      'Open+Sans+Condensed:300',
      'Open+Sans',
      'PT+Sans+Narrow'
    ],

    torii: {
      providers: {
        'quickbooks-oauth2': {
          scope: process.env.QB_SCOPE
        }
      }
    },
    'ember-simple-auth': {
      authenticationRoute: 'application'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.torii.providers['quickbooks-oauth2'].tokenExchangeUri = process.env.PROD_TOKEN_EXCHANGE_URL;
    ENV.torii.providers['quickbooks-oauth2'].tokenRefreshUri = process.env.PROD_TOKEN_REFRESH_URL;
    ENV.torii.providers['quickbooks-oauth2'].clientId = process.env.PROD_QB_CLIENT_ID;
    ENV.torii.providers['quickbooks-oauth2'].redirectUri = process.env.PROD_QB_REDIRECT_URI;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.torii.providers['quickbooks-oauth2'].tokenExchangeUri = process.env.PROD_TOKEN_EXCHANGE_URL;
    ENV.torii.providers['quickbooks-oauth2'].tokenRefreshUri = process.env.PROD_TOKEN_REFRESH_URL;
    ENV.torii.providers['quickbooks-oauth2'].clientId = process.env.PROD_QB_CLIENT_ID;
    ENV.torii.providers['quickbooks-oauth2'].redirectUri = process.env.PROD_QB_REDIRECT_URI;
  }

  return ENV;
};
