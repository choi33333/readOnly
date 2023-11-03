const { Router } = require("express");
const { Product } = require("../models/index"); // user model

const router = Router();


// 상품 조회
router.get('/products', async(req, res, next) => {
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

    // 필수요소가 포함되지 않았을때

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
    const { id } = req.query;
    const product = await Product.findOne({ _id: id });
    const { productName, category, author, price, image, productInfo, releasedDate } = req.body;

    await Product.updateOne(
        product,
        {
        productName: productName, 
        category: category, 
        author: author, 
        price: price, 
        image: image,
        productInfo: productInfo, 
        releasedDate: releasedDate, 
        }
        );
    
    res.json({
        error: null,
        data: product,
    })
    // res.redirect('/products/:id');
}) ;


// 상품 삭제
router.delete('/products/:id', async (req, res) => {
    const { id } = req.query;
    const product = await Product.findOne({ _id: id });
    const deletedProduct = await Product.deleteOne(product);

    if(!product){
        return res.status(404).json({ error: "제품이 존재하지 않습니다." });
    }

    res.json({
        error: null,
        data: deletedProduct
    })
})

module.exports = router;