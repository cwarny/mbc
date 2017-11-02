const router = require('express').Router(),
	controller = require('./controller'),
	{ toHTTP } = require('../../util/http');

router.route('/')
	.get(toHTTP(controller.get));

router.route('/:order_id')
	.get(toHTTP(controller.getOne))
	.patch(toHTTP(controller.updateOne));

module.exports = router;