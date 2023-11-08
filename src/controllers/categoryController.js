const categoryService = require('../services/categoryService');

const categoryController = {
    async getCategories(req, res){
        const categories = await categoryService.getCategories();
        
        res.json({
            error: null,
            data: categories,
         });
    }
};

module.exports = categoryController;