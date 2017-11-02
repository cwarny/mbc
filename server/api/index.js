const router = require('express').Router();

router.use('/customers', require('./customer/routes'));
router.use('/orders', require('./order/routes'));
router.use('/products', require('./product/routes'));
router.use('/invoices', require('./invoice/routes'));

module.exports = router;