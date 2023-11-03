const { Router } = require("express");
const { Product } = require("../models/index"); // user model

const router = Router();


// 상품 조회
router.get('/', async(req, res) => {
    const products = await Product.find({});

    // 상품이 없을때
    if (products == 0) {
        return res.status(404).json({ error: "제품이 존재하지 않습니다." });
      }

    // 상품이 있을때
    res.json({
        error: null,
        data: products,
    });
});


module.exports = router;