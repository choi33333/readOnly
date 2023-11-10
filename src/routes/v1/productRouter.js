const { Router } = require("express");
const { objectIdValidator, validateError} = require("../../middlewares/validators/index");
const productController = require("../../controllers/productController");
const asyncHandler = require("../../utils/asyncHandler");

const router = Router();

// 상품 조회
router.get("/", asyncHandler(productController.getProducts));

// 특정 상품 조회
router.get("/:id", objectIdValidator, validateError, asyncHandler(productController.getOneProduct));

// 상품 soldAmount 추가
router.put("/:id", objectIdValidator, validateError, asyncHandler(productController.increaseSoldAmount));

module.exports = router;