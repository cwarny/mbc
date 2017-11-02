const router = require('express').Router(),
	controller = require('./controller'),
	{ toHTTP } = require('../../util/http');

router.route('/')
	.post(toHTTP(controller.create));

router.route('/:invoice_id')
	.get(controller.getOne);

module.exports = router;