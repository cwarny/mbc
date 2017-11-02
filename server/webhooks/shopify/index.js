const router = require('express').Router();

router.use('/customers', require('./customer/routes'));
router.use('/orders', require('./order/routes'));

module.exports = router;