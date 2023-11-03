const { Router } = require("express");
const { Product } = require("../models/index"); // user model

const router = Router();


// 상품 조회
router.get('/', async(req, res, next) => {
    const { products } = Product.find({});

    res.json(products);
})

// 상품 등록)
router.post('/products', async(req, res, next) => {
    const { productName, category, author, price, image, productInfo, releasedDate } = req.body;

   await Product.create({
        productName: productName, 
        category: category, 
        author: author, 
        price: price, 
        image: image, 
        productInfo: productInfo, 
        releasedDate: releasedDate, 
        soldAmount: "0",
    });
});

// 상품 수정
router.put('/', async(req, res, next) => {

})

module.exports = router;