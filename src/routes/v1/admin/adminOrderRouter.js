const { Router } = require("express");
const { objectIdValidator, validateError } = require("../../../middlewares/validators/index");
const adminController = require("../../../controllers/adminController");
const asyncHandler = require("../../../utils/asyncHandler");

const router = Router();

// 전체 주문 조회
router.get("/", asyncHandler(adminController.getOrders));

// 특정 주문 수정 상태 수정
// orderedBy에 고객이 입력한 이름이이면 이름도 수정가능 - 협의필요
router.put("/:id", objectIdValidator, validateError, asyncHandler(adminController.updateOrder));

// 특정 주문 삭제
router.delete("/:id", objectIdValidator, validateError, asyncHandler(adminController.deleteOrder));

module.exports = router;
