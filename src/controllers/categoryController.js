const categoryService = require('../services/categoryService');

const categoryController = {
    async getCategories(req, res){
        res.json({
            error: null,
            data: categories,
         });
    }
};

module.exports = categoryController;