const { Router } = require("express");
const { Product } = require("../models/"); 
const { ProductType } = require("../models/"); 
const { Category } = require("../models/");
const user = require("../models/schemas/user");

const router = Router();


// 상품 조회
router.get('/api/products', async(req, res, next) => {
    const products = await ProductType.find({}).lean();

    if(!products){
        const error = new Error("제품이 존재하지 않습니다.");
        error.status = 404;
        return next(error);
    }
    res.json({
        error: null,
        data: products,
      });
})

// 상품 등록)
router.post('/api/admin/products', async(req, res, next) => {
    const { name, category, author, price, imageUrl, productInfo, releasedDate } = req.body;

    const categoryId = await Category.findOne({ _id: category })

   const products = await ProductType.create({
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
        data: products,
      });
});

// 상품 수정
router.put('/api/admin/products/:id', async(req, res, next) => {
    const id = req.params.id;
    const { productName, category, author, price, image, productInfo, releasedDate } = req.body;

    const product = await Product.findOne({ _id: id }).lean();

    if (!product) {
        const error = new Error("제품이 존재하지 않습니다.");
        error.status = 401;
        return next(error);
      }

    // category를 프론트에서 id 값으로 받아와야한다.
    const categoryId = await Category.findOne({ _id : category });

    const updatedProduct = await Product.updateOne(
        { _id : id },
        {
        productName: productName, 
        category: categoryId, 
        author: author, 
        price: price, 
        image: image,
        productInfo: productInfo, 
        releasedDate: releasedDate, 
        }
        );
    
    res.json({
        error: null,
        data: updatedProduct,
    })
});

// 상품 삭제
router.delete('/api/admin/products/:id', async (req, res) => {
    const { id } = req.params.id;
    const product = await Product.findOne({ _id: id }).lean();
    const deletedProduct = await Product.deleteOne(product);

    if(!product){
        const error = new Error("제품이 존재하지 않습니다.");
        error.status = 401;
        return next(error);
    };

    res.json({
        error: null,
        data: deletedProduct
    });
});

module.exports = router;