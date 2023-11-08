const productService = require('../services/productService');

const productController = {
    // 상품 조회
    async getProducts(req, res){
        const products = await productService.getProducts();

        res.json({
            error: null,
            data: products,
         });
    },

    // 특정 상품 조회
    async getOneProduct(req, res){
        const product = await productService.getOneProduct(req.params.id);

        res.json({
            error: null,
            data: product,
        });
    },

    // 상품 soldAmount 추가
    async increaseSoldAmount(req, res){
        const updatedProduct = await productService.increaseSoldAmount(req.params.id, req.body);

        res.json({
            error: null,
            data: updatedProduct,
        });
    }   
};

module.exports = productController;
