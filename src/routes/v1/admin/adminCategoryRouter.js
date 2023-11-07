const { Router } = require("express");
const { CategoryModel } = require("../../../models");
const isAdmin = require("../../../middlewares/admin");

const router = Router();

// 카테고리 조회
router.get("/",isAdmin , async (req, res, next) => {

  const categories = await CategoryModel.find({}).lean();

  res.json({
    error: null,
    data: categories,
  });
});

// 카테고리 만들기
router.post("/",isAdmin , async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const error = new Error("카테고리를 입력해주세요.");
    error.status = 400;
    return next(error);
  }

  let category = await CategoryModel.findOne({ name }).lean();

  if (category) {
    const error = new Error("이미 존재하는 카테고리입니다.");
    error.status = 409;
    return next(error);
  }

  category = await CategoryModel.create({
    name: name,
  });

  res.json({
    error: null,
    data: category,
    message: category.name + " 카테고리를 성공적으로 제거 했습니다.",
  });
});

// 카테고리 삭제
router.delete("/:name",isAdmin , async (req, res, next) => {
  const name = req.params.name;

  const category = await CategoryModel.deleteOne({ name });

  if (!category) {
    const error = new Error("존재하지 않는 카테고리입니다.");
    error.status = 404;
    return next(error);
  }

  res.json({
    error: null,
    data: category,
    message: category.name + " 카테고리를 성공적으로 제거 했습니다.",
  });
});

module.exports = router;
