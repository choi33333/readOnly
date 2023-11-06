const { Router } = require("express");
const { ProductModel } = require("../models"); 
const router = Router();


// 상품 조회
router.get('/api/products', async(req, res) => {
    const products = await ProductModel.find({}).lean();
    
    res.json({
        error: null,
        data: products,
    });
})
router.get('/api/products/:id', async(req, res) => {
    const productId = req.params.id;
    const product = await ProductModel.find({_id: productId}).lean();
    
    res.json({
        error: null,
        data: product,
    });
})


module.exports = router;