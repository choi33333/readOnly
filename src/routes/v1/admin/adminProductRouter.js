const { Router } = require("express");
const { ProductModel, CategoryModel } = require("../../../models");
const { addProductValidator, objectIdValidator, validateError } = require("../../../middlewares/validators/index");
const adminController = require("../../../controllers/adminController");
const adminService = require("../../../services/adminService");
const router = Router();

// 상품 조회
router.get("/", adminController.getProducts);

// 상품 등록
router.post("/", addProductValidator, validateError, adminController.createProduct);

// 상품 수정
router.put("/:id", objectIdValidator, addProductValidator, validateError, adminController.updateProduct);

// 상품 삭제
router.delete("/:id", objectIdValidator, validateError, adminController.deleteProduct);

module.exports = router;
