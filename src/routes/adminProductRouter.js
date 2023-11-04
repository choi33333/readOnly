const { Router } = require("express");
const { product } = require("../models/"); // user model

const router = Router();


// 상품 조회
router.get('/api/products', async(req, res, next) => {
    const { products } = product.find({}).lean();

    res.json(products);
})

// 상품 등록)
router.post('/api/products', async(req, res, next) => {
    const { productName, category, author, price, image, productInfo, releasedDate } = req.body;

   await product.create({
        productName: productName, 
        category: category, 
        author: author, 
        price: price, 
        image: image, 
        productInfo: productInfo, 
        releasedDate: releasedDate, 
        soldAmount: "0",
    });

    res.json({
        error: null,
        data: product.toObject(),
      });
});

// 상품 수정 - 제작중
// router.put('/', async(req, res, next) => {

// })

module.exports = router;