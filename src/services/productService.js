const { ProductModel, CategoryModel } = require('../models');

const productService = {
    // 상품 조회
    async getProducts(){
        const products = await ProductModel.find({}).lean();
        return products;
    },

    // 특정 상품 조회
    async getOneProduct(id){
        const product = await ProductModel.findById(id).lean();

        if (product === null) {
            const error = new Error("제품이 존재하지 않습니다.");
            error.status = 404;
            throw error;
        };
        return product;
    },

    // 상품 soldAmount 추가
    async increaseSoldAmount(id, soldAmount){
        if (typeof(soldAmount) !== "number") {
            const error = new Error("구매수량의 형식 올바르지 않습니다.");
            error.status = 400;
            throw error;
        }

        // transaction 해주면 굿
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
