const { Router } = require("express");
const { product } = require("../models/"); 
const { productType } = require("../models/"); 
const { category } = require("../models/");
const user = require("../models/schemas/user");

const router = Router();


// 상품 조회
router.get('/api/products', async(req, res, next) => {
    const { products } = productType.find({}).lean();

    res.json(products);
})

// 상품 등록)
router.post('/api/admin/products', async(req, res, next) => {
    const { name, categories, author, price, imageUrl, productInfo, releasedDate } = req.body;

    const categoryId = category.find({ categories }).populate('id');

   const products = await productType.create({
        name: name, 
        category: categoryId, 
        author: author, 
        price: price,  
        imageUrl: imageUrl, 
        productInfo: productInfo, 
        releasedDate: releasedDate,
        soldAmount: 0,
    });

    res.json({
        error: null,
        data: products.toObject(),
      });
});

// 상품 수정 - 제작중
// router.put('/', async(req, res, next) => {

// })

module.exports = router;