const { Router } = require("express");
const { ProductModel } = require("../models/index"); 
const router = Router();


// 상품 조회
router.get('/api/products', async(req, res) => {
    const products = await ProductModel.find({}).lean();
    
    res.json({
        error: null,
        data: products,
    });
})


module.exports = router;