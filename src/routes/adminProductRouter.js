const { Router } = require("express");
const { Product } = require("../models/index"); // user model

const router = Router();


// 상품 조회
router.get('/', async(req, res, next) => {
    const { products } = Product.find({});

    // 상품이 없을때
    if (products == 0) {
        return res.status(404).json({ error: "제품이 존재하지 않습니다." });
      };

    // 상품이 있을때
    res.json({
        error: null,
        data: products,
    });
})

// 상품 등록
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

router.put('/products/:id', async(req, res, next) => {
    const { id } = req.params;
    const { productName, category, author, price, image, productInfo, releasedDate } = req.body;

    await Product.updateOne(
        { id },
        {
        productName: productName, 
        category: category, 
        author: author, 
        price: price, 
        image: image,
        productInfo: productInfo, 
        releasedDate: releasedDate, 
        });
    
    res.redirect('/products/:id');
}) 

module.exports = router;