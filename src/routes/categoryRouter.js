const { Router } = require("express");
const { CategoryModel } = require("../models"); 
const router = Router();

// 카테고리 조회
router.get('/api/categories', async(req, res) => {
    const categories = await CategoryModel.find({}).lean();
    res.json(categories);
  })

module.exports = router;