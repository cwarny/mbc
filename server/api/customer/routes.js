const router = require('express').Router(),
	controller = require('./controller'),
	{ toHTTP } = require('../../util/http');

router.route('/')
	.get(toHTTP(controller.get));

router.route('/:customer_id')
	.get(toHTTP(controller.getOne));

router.route('/:customer_id/orders')
	.get(toHTTP(controller.getCustomerOrders));

module.exports = router;