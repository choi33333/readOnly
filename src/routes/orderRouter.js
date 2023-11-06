const { Router } = require("express");
const { OrderModel, UserModel } = require("../models");
const router = Router();

// 주문하기
router.post("/api/orders", async (req, res, next) => {
  const { orderedBy, address, phoneNumber, products } = req.body;
  const { em } = res.locals.user;

  // 서버연결없이도 겹치지않는 난수만들기
  const orderNumber = 3;

  const order = await OrderModel.create({
    orderNumber: orderNumber,
    orderedBy: orderedBy,
    address: address,
    phoneNumber: phoneNumber,
    orderStatus: "배송 준비중",
    products: products,
    orderedEmail: em,
  });

  res.json({
    error: null,
    data: order.toObject(),
  });
});

// 본인 전체 주문 조회 (해당유저의 주문기록만 가져오려면... 어쩌죠?)
router.get("/api/orders", async (req, res, next) => {
    const { em } = res.locals.user;
    const orders = await OrderModel.find({ email: em }.lean( ));

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
router.put("/api/orders/:id", async (req, res, next) => {
  const id = req.params.id;
  const { orderStatus } = req.body;
  let order = await OrderModel.findOne({ _id: id }).lean();

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

// 비회원 특정 주문 조회
router.get("/api/orders/search", async (req, res, next) => {
  const { orderNumber, phoneNumber} = req.body;
  const order = await OrderModel.findOne({ orderNumber: orderNumber }).lean();

  if (!order) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  if (order.phoneNumber ==  phoneNumber) {
    const error = new Error("전화번호가 일치하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  res.json({
    error: null,
    data: order,
  });
});


// 특정 주문 수정
// orderedBy에 고객이 입력한 이름이이면 이름도 수정가능 - 협의필요
router.put("/api/orders/:id", async (req, res, next) => {
  const { id } = req.params.id;
  const { orderedBy, address, phoneNumber} = req.body;
  const order = await OrderModel.findOne({ _id: id }).lean();

  if (!order) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  order = await order.update({
    orderedBy: orderedBy,
    address: address,
    phoneNumber: phoneNumber,
  });
  

  res.json({
    error: null,
    data: order,
  });
});

// 특정 주문 취소
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
