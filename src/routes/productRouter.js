const { Router } = require("express");
const { Product } = require("../models/index"); // user model

const router = Router();


// 상품 조회
router.get('/products', async(req, res) => {
    const products = await Product.find({});
    res.json(products);
})


module.exports = router;