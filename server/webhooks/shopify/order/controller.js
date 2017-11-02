const es = require('../../../util/es'),
	{ isValidPayload } = require('../../../util');

exports.create = options => {
	const payload = JSON.stringify(options.body);
	const signature = options.get('X-Shopify-Hmac-SHA256');
	console.log(isValidPayload('shopify', signature, payload))
	// return es.create({
	// 	index: 'mbc',
	// 	type: 'order',
	// 	id: options.body.id,
	// 	body: options.body
	// });
	return Promise.resolve();
};