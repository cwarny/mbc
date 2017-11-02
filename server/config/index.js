const _ = require('lodash'),
	fs = require('fs');

let config = {
	dev: 'development',
	test: 'testing',
	prod: 'production'
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;

let envConfig = require('./' + config.env);

module.exports = _.merge(config, envConfig);