const { Router } = require("express");
const { Category } = require("../models/index"); 
const router = Router();



// 카테고리 조회
router.get('/', async(req, res) => {
  const categories = await Category.find({});
  res.json(categories);
})


// 카테고리 만들기

router.post("/", async (req, res) => {
  const { name } = req.body;
  console.log(name)
  
  let category = await Category.findOne({ name });

  if (category) {
    return res.status(409).json({ error: "이미 존재하는 카테고리입니다." });
  }

  category = await Category.create({
    name: name,
  });
});

module.exports = router;