const { Router } = require("express");
const { order } = require("../models/index");
const router = Router();

// 주문하기
router.post("/api/orders", async (req, res) => {
  const { orderedBy, address, phoneNumber, products } = req.body;

  // 서버연결없이도 겹치지않는 번호만들기
  const orderNumber = 3;

  const orders = await Category.create({
    orderNumber: orderNumber,
    orderedBy: orderedBy,
    address: address,
    phoneNumber: phoneNumber,
    orderStatus: "배송준비중",
    products: products,
  });

  res.json({
    error: null,
    data: orders.toObject
  });
});

// 전체 주문 조회 (해당유저의 주문기록만 가져오려면... 어쩌죠?)
// api/users/me/:id 같은형식으로 orderedBy: id 를 찾아서 콜하는게...ㅠ 고민이 필요할듯여!
router.get("/api/orders/:id", async (req, res, next) => {
    const { id } = req.params.id;
  const orders = await order.find({ orderedBy: id }.lean( ));

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

// 특정 주문 조회
router.get("/api/orders/:id", async (req, res, next) => {
  const { id } = req.params.id;
  const orders = await order.findOne({ _id: id }).lean();

  if (!orders) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  res.json({
    error: null,
    data: orders,
  });
});

// 특정 주문 수정
router.put("/api/orders/:id", async (req, res, next) => {
  const { id } = req.params.id;
  const orders = await order.findOne({ _id: id }).lean();

  if (!orders) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  res.json({
    error: null,
    data: orders,
  });
});

// 특정 주문 삭제
router.delete("/api/orders/:id", async (req, res, next) => {
  const { id } = req.params.id;

  const orders = await order.findOne({ _id: id }).lean();

  if (!orders) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  const deletedOrder = await order.deleteOne(orders);

  res.status(204).json({
    message: "주문목록에서 제거되었습니다.",
  });
});

module.exports = router;
