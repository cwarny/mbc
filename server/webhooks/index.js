const router = require('express').Router();

router.use('/shopify', require('./shopify'));
router.use('/quickbooks', require('./quickbooks'));

module.exports = router;