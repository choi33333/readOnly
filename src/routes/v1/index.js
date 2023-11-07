const { Router } = require('express');

const isAdmin = require("../../middlewares/admin");

const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');
const categoryRouter = require('./categoryRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const adminRouter = require('./admin/index');


const router = Router();
// USER
router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);
router.use('/users', userRouter);

// ADMIN
router.use('/admin',isAdmin, adminRouter);

module.exports = router;
