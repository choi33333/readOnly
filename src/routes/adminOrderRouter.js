const { Router } = require("express");
const { OrderModel } = require("../models");
const router = Router();

// 전체 주문 조회 (해당유저의 주문기록만 가져오려면... 어쩌죠?)
router.get("/api/admin/orders", async (req, res, next) => {
    const orders = await OrderModel.find({ }.lean( ));

  if (orders == 0) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  res.json({
    error: null,
    data: orders,
  });
});

// 특정 주문 수정 상태 수정
// orderedBy에 고객이 입력한 이름이이면 이름도 수정가능 - 협의필요
router.put("/api/admin/orders/:id", async (req, res, next) => {
  const { id } = req.params.id;
  const { orderStatus } = req.body;
  const order = await OrderModel.findOne({ _id: id }).lean();

  if (!order) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  order = await order.update({
    orderStatus: orderStatus,
  });
  
  res.json({
    error: null,
    data: order,
  });
});

// 특정 주문 삭제
router.delete("/api/orders/:id", async (req, res, next) => {
  const { id } = req.params.id;

  const order = await OrderModel.findOne({ _id: id }).lean();

  if (!order) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  const deletedOrder = await order.deleteOne(order);

  res.status(204).json({
    message: "주문목록에서 제거되었습니다.",
  });
});

module.exports = router;
