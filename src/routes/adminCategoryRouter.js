const { Router } = require("express");
const { Category } = require("../models/index");

const router = Router();


// 카테고리 조회
router.get("/api/admin/cartegories", async (req, res) => {

  const categories = await Category.find({});
  res.json({
    category: categories,
  });
});


// 카테고리 만들기
router.post("/api/admin/cartegories", async (req, res) => {
  const { name } = req.body;
  
  let category = await Category.findOne({ name });

  if (category) {
    return res.status(409).json({ error: "이미 존재하는 카테고리입니다." });
  }

  category = await Category.create({
    name: name,
  });

  res.status(201).json({ message: category.name + "카테고리 생성을 완료했습니다."});
});

// 카테고리 삭제
router.delete("/api/admin/cartegories", async (req, res) => {
  const { name } = req.body;
 
  const category = await Category.deleteOne({ name });

  if (category) {
    return res.status(404).json({ error: "존재하지 않는 카테고리입니다." });
  }

  res.status(204).json({ message: category.name + "카테고리를 성공적으로 제거 했습니다."});
});

module.exports = router;