const { Router } = require("express");
const { category } = require("../models/index");

const router = Router();

// 카테고리 조회
router.get("/api/admin/cartegories", async (req, res) => {
  const categories = await category.find({}).lean();
  res.json({
    category: categories,
  });
});

// 카테고리 만들기
router.post("/api/admin/cartegories/:name", async (req, res) => {
  const { name } = req.params.name;

  if(String.IsNullOrEmpty(name)){
    const error = new Error("카테고리를 입력해주세요.");
    error.status = 400;
    return next(error);
  }

  const categories = await category.findOne({ name }).lean();

  if (categories) {
    const error = new Error("이미 존재하는 카테고리입니다.");
    error.status = 409;
    return next(error);
  }

  categories = await category.create({
    name: name,
  });

  res
    .status(201)
    .json({ message: categories.name + "카테고리 생성을 완료했습니다." });
});

// 카테고리 삭제
router.delete("/api/admin/cartegories", async (req, res) => {
  const { name } = req.body;

  const categories = await category.deleteOne({ name });

  if (categories) {
    const error = new Error("존재하지 않는 카테고리입니다.");
    error.status = 404;
    return next(error);
  }

  res
    .status(204)
    .json({
      message: categories.name + "카테고리를 성공적으로 제거 했습니다.",
    });
});

module.exports = router;
