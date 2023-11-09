const { Router } = require("express");
const adminController = require('../../../controllers/adminController');
const asyncHandler = require("../../../utils/asyncHandler");

const router = Router();

// 카테고리 조회
router.get("/", asyncHandler(adminController.getCategories));

// 카테고리 만들기
router.post("/", asyncHandler(adminController.createCategory));

// 카테고리 삭제
router.delete("/:name", asyncHandler(adminController.deleteCategory));

module.exports = router;
