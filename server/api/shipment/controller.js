exports.create = options => {
	let payload = `${method}&${path}&api_key=${config.se.apiKey}&api_timestamp=${+(new Date())}&${JSON.stringify(body)}`;

	let hash = crypto.createHmac('sha256', config.se.apiSecret)
		.update(payload)
		.digest('base64');


};
