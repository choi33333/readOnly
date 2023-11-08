const { CategoryModel } = require('../models');

const categoryService = {
    async getCategories(){
        const categories = await CategoryModel.find({}).lean();
        return categories;
    }
};

module.exports = categoryService;