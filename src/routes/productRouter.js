const { Router } = require("express");
const { Product } = require("../models/index"); 
const router = Router();


// 상품 조회
router.get('/products', async(req, res) => {
    const { productId } = req.body;

    const products = await Product.find({}).lean();
    
    res.json(products);

})


module.exports = router;