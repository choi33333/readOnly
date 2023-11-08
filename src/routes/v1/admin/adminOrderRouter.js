const { Router } = require("express");
const { OrderModel } = require("../../../models");
const { objectIdValidator, validateError } = require("../../../middlewares/validators/index");
const router = Router();

// 전체 주문 조회
router.get("/", async (req, res, next) => {
  const orders = await OrderModel.find({}).lean();

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
router.put("/:id", objectIdValidator, validateError, async (req, res, next) => {
  const id = req.params.id;
  const { orderStatus } = req.body;
  let order = await OrderModel.findOne({ _id: id }).lean();

  if (!order) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  order = await OrderModel.updateOne({
    orderStatus: orderStatus,
  });

  res.json({
    error: null,
    data: order,
  });
});

// 특정 주문 삭제
router.delete("/:id", objectIdValidator, validateError, async (req, res, next) => {
  const { id }= req.params.id;

  const order = await OrderModel.deleteOne({ id });

  if (!order) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 404;
    return next(error);
  }

  res.json({
    error: null,
    message: "주문목록에서 제거되었습니다.",
  });
});

module.exports = router;
