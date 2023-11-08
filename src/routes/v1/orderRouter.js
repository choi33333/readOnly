const { Router } = require("express");
const { OrderModel } = require("../../models");
const { userOrderValidator, objectIdValidator, validateError} = require("../../middlewares/validators/index");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const router = Router();

// 주문하기
router.post("/",isAuthenticated,  userOrderValidator, validateError, async (req, res, next) => {
  const { orderedBy, postCode, address, addressDetail, phoneNumber, products } =
    req.body;
  const { em } = res.locals.user;

  console.log(em);
  const date = new Date();


  // 서버연결없이도 겹치지않는 난수만들기
  const orderNumber = date.getTime().toString().slice(5) + String(Math.floor(Math.random()*10000)).padStart(4,"0");

  const order = await OrderModel.create({
    orderNumber: orderNumber,
    orderedBy: orderedBy,
    postCode: postCode,
    address: address,
    addressDetail: addressDetail,
    phoneNumber: phoneNumber,
    orderStatus: "결제 완료",
    products: products,
    orderedEmail: em,
  });

  res.json({
    error: null,
    data: order.toObject(),
  });
});

// 비회원 주문하기
router.post("/non-member", userOrderValidator, validateError, async (req, res, next) => {
  const { orderedBy, postCode, address, addressDetail, phoneNumber, products } = req.body;

  const date = new Date();
  // 서버연결없이도 겹치지않는 난수만들기
  const orderNumber = date.getTime().toString().slice(5) + String(Math.floor(Math.random()*10000)).padStart(4,"0");

  const order = await OrderModel.create({
    orderNumber: orderNumber,
    orderedBy: orderedBy,
    postCode: postCode,
    address: address,
    addressDetail: addressDetail,
    phoneNumber: phoneNumber,
    orderStatus: "결제 완료",
    products: products,
    orderedEmail: "비회원",
  });

  res.json({
    error: null,
    data: order.toObject(),
  });
});

// 본인 전체 주문 조회 (해당유저의 주문기록만 가져오려면... 어쩌죠?)
router.get("/me", isAuthenticated, async (req, res, next) => {
  const { em } = res.locals.user;
  const orders = await OrderModel.find({ orderedEmail: em }).lean();

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

// 주문조회
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const orders = await OrderModel.findById( id ).lean();

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

// 주문조회 by 주문번호
router.get("/me/:orderNumber", async (req, res, next) => {
  const orderNumber = req.params.orderNumber;
  const orders = await OrderModel.findOne({ orderNumber: orderNumber }).lean();

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
router.put("/:id", objectIdValidator, validateError, async (req, res, next) => {
  const id = req.params.id;
  const { orderStatus } = req.body;
  let order = await OrderModel.findById(id).lean();

if (!order) {
  const error = new Error("주문이 존재하지 않습니다.");
  error.status = 401;
  return next(error);
};

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

// 비회원 특정 주문 조회
router.post("/search", async (req, res, next) => {
  const { orderNumber, phoneNumber } = req.body;
  const order = await OrderModel.findOne({ orderNumber: orderNumber }).lean();

  if (!order) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  if (order.phoneNumber != phoneNumber) {
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
// 11-08 진행중
router.put("/:id", objectIdValidator, userOrderValidator, validateError, async (req, res, next) => {
  const id = req.params.id;
  const { orderedBy, postCode, address, addressDetail,phoneNumber } = req.body;

  const order = await OrderModel.findById(id).lean();

  if (!order) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  if (order.orderStatus != "결제 완료")
  {
    const error = new Error("주문수정이 불가능합니다.");
    error.status = 401;
    return next(error);
  }

  order = await order.update({
    orderedBy: orderedBy,
    postCode: postCode,
    address: address,
    addressDetail: addressDetail,
    phoneNumber: phoneNumber,
  });

  res.json({
    error: null,
    data: order,
  });
});

// 특정 주문 취소
router.delete("/:id", objectIdValidator, validateError, async (req, res, next) => {
  const { id } = req.params.id;

  const order = await OrderModel.findById(id)
    .lean();

  if (!order) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  const deletedOrder = await order.deleteOne(order);

  res.json({
    error: null,
    message: "주문목록에서 제거되었습니다.",
  });
});

module.exports = router;
