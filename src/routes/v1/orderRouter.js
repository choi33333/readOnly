const { Router } = require("express");
const { userOrderValidator, objectIdValidator, validateError} = require("../../middlewares/validators/index");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const orderController = require("../../controllers/orderController");

const router = Router();

// 주문하기
router.post("/", isAuthenticated, userOrderValidator, validateError, orderController.createOrder);

// 전체 주문조회
router.get("/me", isAuthenticated, orderController.getOrders);

// 주문조회(id)
router.get("/:id", orderController.getOneOrder);

// 주문조회(orderNumber)
router.get("/me/:orderNumber", orderController.getOrderByOrderNum);

// 주문수정
// 11-08 진행중
router.put("/me/:id", objectIdValidator, userOrderValidator, validateError, orderController.updateOrder);

// 주문수정(주문취소후 배송상태 변경 때문)
router.put("/:id", objectIdValidator, validateError, orderController.updateOrderStatus);

// 주문취소
router.delete("/:id", objectIdValidator, validateError, orderController.deleteOrder);

// 비회원 주문하기
router.post("/non-member", userOrderValidator, validateError, orderController.nonMemberOrder);

// 비회원 주문번호로 조회
router.post("/search", orderController.nonMemberGetOrder);

module.exports = router;