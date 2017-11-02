const crypto = require('crypto'),
	config = require('../config'),
	_ = require('lodash');

module.exports = {
	isValidPayload: (provider, signature, payload) => {
		console.log(config[provider].webhooksVerifier);
		let hash = crypto.createHmac('sha256', config[provider].webhooksVerifier)
			.update(payload)
			.digest('base64');

		return (signature === hash);
	}
};