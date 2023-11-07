const { Router } = require("express");
const { ProductModel } = require("../../models");
const router = Router();

// 상품 조회
router.get("/", async (req, res, next) => {
  const products = await ProductModel.find({}).lean();

  res.json({
    error: null,
    data: products,
  });
});


router.get("/:id", async (req, res, next) => {
  const productId = req.params.id;
  console.log(productId)
  const product = await ProductModel.find({ _id: productId }).lean();

  if (!product || product.length === 0) {
    // 데이터베이스에서 제품을 찾지 못한 경우
    const error = new Error("제품이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  res.json({
    error: null,
    data: product,
  });
});

module.exports = router;
