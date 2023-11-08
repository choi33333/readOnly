const { Router } = require("express");
const { CategoryModel } = require("../../models");
const { objectIdValidator, validateError } = require("../../middlewares/validators/index");
const categoryController = require("../../controllers/categoryController");
const router = Router();

// 카테고리 조회
router.get("/", categoryController.getCategories);

router.get("/:id", objectIdValidator, validateError, async (req, res, next) => {
  const id = req.params.id;

  const category = await CategoryModel.findById(id)
    .lean();
    
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

a
