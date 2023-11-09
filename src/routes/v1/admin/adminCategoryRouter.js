const { Router } = require("express");
const adminController = require('../../../controllers/adminController');

const router = Router();

// 카테고리 조회
router.get("/", adminController.getCategories);

// 카테고리 만들기
router.post("/", adminController.createCategory);

// 카테고리 삭제
router.delete("/:name", adminController.deleteCategory);

module.exports = router;
