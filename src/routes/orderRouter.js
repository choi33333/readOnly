const { Router } = require("express");
const { OrderModel, UserModel } = require("../models");
const router = Router();

// 주문하기
// orderedBy에 고객이 입력한 이름? or user.id? - 협의필요
router.post("/api/orders", async (req, res) => {
  //토큰 -> 헤더 -> 페이지마다 해당 유저 이메일 판단/ 해당유저 이름, 전화번호, 주소 send
  const { orderedBy, address, phoneNumber, products } = req.body;
  const { em } = res.locals.userInfo;

  // 서버연결없이도 겹치지않는 번호만들기 - 수정중
  const orderNumber = ();

  const orders = await OrderModel.create({
    orderNumber: orderNumber,
    orderedBy: orderedBy,
    address: address,
    phoneNumber: phoneNumber,
    orderStatus: "배송준비중",
    products: products,
  });

  res.json({
    error: null,
    data: orders.toObject(),
  });
});

// 전체 주문 조회 (해당유저의 주문기록만 가져오려면... 어쩌죠?)
// api/users/me/:id 같은형식으로 orderedBy: id 를 찾아서 콜하는게..ㅠ - 협의필요
router.get("/api/orders/", async (req, res, next) => {
    const { em } = res.locals.userInfo;
    const orders = await OrderModel.find({ orderedBy: id }.lean( ));

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
  const orders = await OrderModel.findOne({ _id: id }).lean();

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
// orderedBy에 고객이 입력한 이름이이면 이름도 수정가능 - 협의필요
router.put("/api/orders/:id", async (req, res, next) => {
  const { id } = req.params.id;
  const { orderedBy, address, phoneNumber} = req.body;
  const orders = await OrderModel.findOne({ _id: id }).lean();

  if (!orders) {
    const error = new Error("주문이 존재하지 않습니다.");
    error.status = 401;
    return next(error);
  }

  orders = await order.update({
    orderedBy: orderedBy,
    address: address,
    phoneNumber: phoneNumber,
  });
  

  res.json({
    error: null,
    data: orders,
  });
});

// 특정 주문 삭제
router.delete("/api/orders/:id", async (req, res, next) => {
  const { id } = req.params.id;

  const order = await OrderModel.findOne({ _id: id }).lean();

  if (!orders) {
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
