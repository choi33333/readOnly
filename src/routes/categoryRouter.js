const { Router } = require("express");
const { category } = require("../models/index"); 
const router = Router();

// 카테고리 조회
router.get('/api/cartegories', async(req, res) => {
    const categories = await category.find({}).lean();
    res.json(categories);
  })

module.exports = router;