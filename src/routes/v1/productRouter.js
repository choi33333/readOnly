const { Router } = require("express");
const { ProductModel } = require("../../models");
const validateError = require("../../middlewares/validators/validateError");
const objectIdValidator = require("../../middlewares/validators/objectId");

const router = Router();

// 상품 조회
router.get("/", async (req, res, next) => {
  const products = await ProductModel.find({}).lean();

  if (!products || products.length === 0) {
    // 데이터베이스에서 제품을 찾지 못한 경우
    const error = new Error("제품이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  res.json({
    error: null,
    data: products,
  });
});

// 특정 상품 조회
router.get("/:id", objectIdValidator, validateError, async (req, res, next) => {
  const productId = req.params.id;
  const product = await ProductModel.findById(productId).lean();

  if (!product || product.length === 0) {
    const error = new Error("제품이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  res.json({
    error: null,
    data: product,
  });
});

// 상품 soldAmount 추가
router.put("/:id", objectIdValidator, validateError, async (req, res, next) => {
  const id = req.params.id;
  const { soldAmount } = req.body;

  if (typeof(soldAmount) !== "number") {
    const error = new Error("구매수량이 올바르지 않습니다.");
    error.status = 401;
    return next(error);
  }

  const product = await ProductModel.findOne({ _id: id }).lean();

  if (!product) {
    const error = new Error("제품이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  const newAmount = product.soldAmount + soldAmount;

  const updatedProduct = await ProductModel.updateOne(
    { _id: id },
    {
      soldAmount: newAmount,
    }
  );

  res.json({
    error: null,
    data: updatedProduct,
  });
});

module.exports = router;
