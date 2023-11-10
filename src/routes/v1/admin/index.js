const { Router } = require('express');

const adminCategoryRouter = require('./adminCategoryRouter');
const adminOrderRouter = require('./adminOrderRouter');
const adminProductRouter = require('./adminProductRouter');
const adminUserRouter = require('./adminUserRouter');

const router = Router();

router.use('/categories', adminCategoryRouter);
router.use('/orders', adminOrderRouter);
router.use('/products', adminProductRouter);
router.use('/users', adminUserRouter);

module.exports = router;