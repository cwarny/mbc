const router = require('express').Router(),
	controller = require('./controller'),
	{ toHTTP } = require('../../util/http');

router.route('/')
	.post(toHTTP(controller.handle));

module.exports = router;