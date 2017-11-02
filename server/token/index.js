const router = require('express').Router(),
	controller = require('./controller'),
	{ toHTTP } = require('../util/http');

router.route('/authorize')
	.post(toHTTP(controller.authorize));

router.route('/refresh')
	.post(toHTTP(controller.refresh));

module.exports = router;