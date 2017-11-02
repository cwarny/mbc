const router = require('express').Router(),
	controller = require('./controller'),
	{ toHTTP } = require('../../../util/http');

router.route('/new')
	.post(toHTTP(controller.create));

module.exports = router;