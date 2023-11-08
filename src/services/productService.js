const { ProductModel, CategoryModel } = require('../models');

const productService = {
    // 상품 조회
    async getProducts(){
        const products = await ProductModel.find({}).lean();

        if (!products || products.length === 0) {
            // 데이터베이스에서 제품을 찾지 못한 경우
            const error = new Error("제품이 존재하지 않습니다.");
            error.status = 401;
            throw error;
        }
        return products;
    },

    // 특정 상품 조회
    async getOneProduct(id){
        const product = await ProductModel.findById({ _id : id }).lean();

        if (!product || product.length === 0) {
            const error = new Error("제품이 존재하지 않습니다.");
            error.status = 401;
            throw error;
        };
        return product;
    },

    // 상품 soldAmount 추가
    async increaseSoldAmount(id, soldAmount){
        if (typeof(soldAmount) !== "number") {
            const error = new Error("구매수량이 올바르지 않습니다.");
            error.status = 400;
            return next(error);
        }

        const product = await ProductModel.findOne({ _id: id }).lean();

        if (!product) {
            const error = new Error("제품이 존재하지 않습니다.");
            error.status = 404;
            throw error;
        }

        const newAmount = product.soldAmount + soldAmount;

        const updatedProduct = await ProductModel.updateOne(
            { _id: id },
            {
            soldAmount: newAmount,
            }
        );
        return updatedProduct;
    }
};

module.exports = productService;