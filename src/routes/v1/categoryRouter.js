const { Router } = require("express");
const { CategoryModel } = require("../../models");
const router = Router();

// 카테고리 조회
router.get("/", async (req, res, next) => {
  const categories = await CategoryModel.find({}).lean();

  res.json({
    error: null,
    data: categories,
  });
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  const category = await CategoryModel.findById(id)
    .lean()
    .catch((error) => {
      error = new Error("카테고리가 존재하지 않습니다.");
      error.status = 401;
      return next(error);
    });

  if (!category) {
    const error = new Error("카테고리가 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  res.json({
    error: null,
    category,
  });
});

module.exports = router;
