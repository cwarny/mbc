const querystring = require('querystring'),
	config = require('../config'),
	es = require('../util/es'),
	_ = require('lodash'),
	{ httpRequest } = require('../util/http');

exports.authorize = options => {
	const payload = {
		code: options.body.authorizationCode,
		redirect_uri: options.body.redirectUri,
		grant_type: 'authorization_code'
	};

	const data = querystring.stringify(payload);

	const params = {
		hostname: 'oauth.platform.intuit.com',
		path: '/oauth2/v1/tokens/bearer',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json',
			'Authorization': `Basic ${(new Buffer(`${config.qb.clientId}:${config.qb.clientSecret}`)).toString('base64')}`
		}
	};

	return httpRequest(params, data).then(resp => {
		return es.update({
			index: 'mbc',
			type: 'client',
			id: options.body.realmId,
			body: {
				doc: resp,
				upsert: _.merge(resp, {last_cdc_timestamp: (new Date()).toISOString()})
			}
		}).then(() => {
			return resp;
		});
	});
};

exports.refresh = options => {
	const payload = {
		grant_type: 'refresh_token',
		refresh_token: options.body.refresh_token
	};

	const data = querystring.stringify(payload);

	const params = {
		hostname: 'oauth.platform.intuit.com',
		path: '/oauth2/v1/tokens/bearer',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/json',
			'Authorization': `Basic ${(new Buffer(`${config.qb.clientId}:${config.qb.clientSecret}`)).toString('base64')}`
		}
	};

	return httpRequest(params, data).then(resp => {
		return es.update({
			index: 'mbc',
			type: 'client',
			id: options.body.realmId,
			body: {
				doc: resp
			}		
		}).then(() => {
			return resp;
		});
	});
};