const { Router } = require("express");
const { CategoryModel } = require("../models"); 
const router = Router();

// 카테고리 조회
router.get('/api/categories', async(req, res) => {

    const categories = await CategoryModel.find({}).lean();

    res.json({
      error: null,
      data: categories,
  });
  })

  router.get('/api/categories/:id', async(req, res) => {
    const id = req.params.id;

    const category = await CategoryModel.find({_id: id}).lean();
    
    res.json({
      error: null,
      data: category,
  });
  })

module.exports = router;