const { Router } = require("express");
const { Product } = require("../models"); // user model

const router = Router();


// 상품 조회
router.get('/', async(req, res, next) => {
    const { products } = Product.find({});

    res.json(products);
})
